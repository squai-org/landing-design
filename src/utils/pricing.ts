import type { AnalyticsEventType, Currency } from './schemas';

export const PROGRAM_PRICES: Record<Currency, number> = {
  COP: 399000,
  USD: 129,
};

export interface PriceBreakdown {
  currency: Currency;
  totalAmount: number;
  amountDueNow: number;
  formattedTotal: string;
  formattedDueNow: string;
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === 'COP') {
    const formatted = Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${formatted} COP`;
  }
  const hasDecimals = Math.round(amount * 100) % 100 !== 0;
  const formatted = hasDecimals ? amount.toFixed(2) : Math.round(amount).toString();
  return `$${formatted} USD`;
}

export function calculatePriceBreakdown(currency: Currency): PriceBreakdown {
  const totalAmount = PROGRAM_PRICES[currency];
  return {
    currency,
    totalAmount,
    amountDueNow: totalAmount,
    formattedTotal: formatMoney(totalAmount, currency),
    formattedDueNow: formatMoney(totalAmount, currency),
  };
}

export interface AnalyticsEventRecord {
  id: string;
  type: AnalyticsEventType;
  label: string;
  timestamp: string;
  currency?: Currency;
  amount?: number;
  metadata?: Record<string, string | number>;
}

export interface FunnelMetrics {
  visitors: number;
  engaged: number;
  signups: number;
  checkoutsOpened: number;
  paymentsCompleted: number;
  conversionRate: number;
  checkoutCompletionRate: number;
  totalRevenueCOP: number;
  totalRevenueUSD: number;
}

export function computeFunnelMetrics(events: AnalyticsEventRecord[]): FunnelMetrics {
  let visitors = 0;
  let engaged = 0;
  let signups = 0;
  let checkoutsOpened = 0;
  let paymentsCompleted = 0;
  let totalRevenueCOP = 0;
  let totalRevenueUSD = 0;

  for (const event of events) {
    switch (event.type) {
      case 'page_view':
        visitors += 1;
        break;
      case 'cta_click':
      case 'form_start':
      case 'scroll_depth':
        engaged += 1;
        break;
      case 'signup_submitted':
        signups += 1;
        break;
      case 'bold_checkout_opened':
        checkoutsOpened += 1;
        break;
      case 'payment_completed':
        paymentsCompleted += 1;
        if (event.currency === 'COP' && typeof event.amount === 'number') {
          totalRevenueCOP += event.amount;
        } else if (event.currency === 'USD' && typeof event.amount === 'number') {
          totalRevenueUSD += event.amount;
        }
        break;
      default:
        break;
    }
  }

  const baseVisitors = Math.max(visitors, 1);
  const conversionRate =
    visitors === 0 ? 0 : Number(((paymentsCompleted / baseVisitors) * 100).toFixed(1));
  const checkoutCompletionRate =
    checkoutsOpened === 0
      ? 0
      : Number(((paymentsCompleted / checkoutsOpened) * 100).toFixed(1));

  return {
    visitors,
    engaged,
    signups,
    checkoutsOpened,
    paymentsCompleted,
    conversionRate,
    checkoutCompletionRate,
    totalRevenueCOP,
    totalRevenueUSD,
  };
}
