import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePriceBreakdown,
  computeFunnelMetrics,
  formatMoney,
  type AnalyticsEventRecord,
} from './pricing';
import { SignupFormSchema } from './schemas';

test('formats COP and USD amounts consistently', () => {
  assert.equal(formatMoney(399000, 'COP'), '$399.000 COP');
  assert.equal(formatMoney(129, 'USD'), '$129 USD');
});

test('calculates single-payment COP and USD breakdowns accurately', () => {
  const cop = calculatePriceBreakdown('COP');
  assert.equal(cop.totalAmount, 399000);
  assert.equal(cop.amountDueNow, 399000);
  assert.equal(cop.formattedTotal, '$399.000 COP');
  assert.equal(cop.formattedDueNow, '$399.000 COP');

  const usd = calculatePriceBreakdown('USD');
  assert.equal(usd.totalAmount, 129);
  assert.equal(usd.amountDueNow, 129);
  assert.equal(usd.formattedTotal, '$129 USD');
  assert.equal(usd.formattedDueNow, '$129 USD');
});

test('computes funnel metrics and revenue totals from events', () => {
  const events: AnalyticsEventRecord[] = [
    { id: '1', type: 'page_view', label: 'Visita', timestamp: '2026-11-17T10:00:00Z' },
    { id: '2', type: 'page_view', label: 'Visita', timestamp: '2026-11-17T10:05:00Z' },
    { id: '3', type: 'cta_click', label: 'Clic CTA', timestamp: '2026-11-17T10:06:00Z' },
    { id: '4', type: 'signup_submitted', label: 'Registro', timestamp: '2026-11-17T10:07:00Z' },
    { id: '5', type: 'bold_checkout_opened', label: 'Bold abierto', timestamp: '2026-11-17T10:08:00Z' },
    {
      id: '6',
      type: 'payment_completed',
      label: 'Pago Bold',
      timestamp: '2026-11-17T10:09:00Z',
      currency: 'COP',
      amount: 399000,
    },
    {
      id: '7',
      type: 'payment_completed',
      label: 'Pago Bold USD',
      timestamp: '2026-11-17T10:12:00Z',
      currency: 'USD',
      amount: 129,
    },
  ];

  const metrics = computeFunnelMetrics(events);
  assert.equal(metrics.visitors, 2);
  assert.equal(metrics.engaged, 1);
  assert.equal(metrics.signups, 1);
  assert.equal(metrics.checkoutsOpened, 1);
  assert.equal(metrics.paymentsCompleted, 2);
  assert.equal(metrics.conversionRate, 100);
  assert.equal(metrics.totalRevenueCOP, 399000);
  assert.equal(metrics.totalRevenueUSD, 129);
});

test('validates minimal signup form fields with clear Spanish errors', () => {
  const valid = SignupFormSchema.safeParse({
    fullName: 'Camila Mendoza',
    email: 'camila@empresa.co',
    phone: '+57 311 456 7890',
    currency: 'COP',
  });
  assert.equal(valid.success, true);

  const invalid = SignupFormSchema.safeParse({
    fullName: 'Ca',
    email: 'correo-invalido',
    phone: '123',
    currency: 'COP',
  });
  assert.equal(invalid.success, false);
});
