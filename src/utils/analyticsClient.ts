import type { AnalyticsEventType, Currency, PaymentMethod, SignupFormValues } from './schemas';
import type { AnalyticsEventRecord, FunnelMetrics, PriceBreakdown } from './pricing';

export interface AnalyticsSnapshotResponse {
  metrics: FunnelMetrics;
  events: AnalyticsEventRecord[];
  inscriptions: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    currency: Currency;
    amountDueNow: number;
    totalAmount: number;
    status: 'registered' | 'checkout_pending' | 'paid';
    orderId?: string;
    paymentMethod?: PaymentMethod;
    createdAt: string;
    paidAt?: string;
  }>;
  updatedAt: string;
}

export async function trackConversionEvent(payload: {
  type: AnalyticsEventType;
  label: string;
  currency?: Currency;
  amount?: number;
  metadata?: Record<string, string | number>;
}): Promise<void> {
  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking telemetry call.
  }
}

export async function fetchAnalyticsSnapshot(): Promise<AnalyticsSnapshotResponse> {
  const res = await fetch('/api/analytics');
  if (!res.ok) {
    throw new Error('No pudimos cargar las métricas en este momento.');
  }
  return res.json() as Promise<AnalyticsSnapshotResponse>;
}

export async function submitInscription(values: SignupFormValues): Promise<{
  inscription: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    currency: Currency;
    amountDueNow: number;
    totalAmount: number;
    status: 'registered' | 'checkout_pending' | 'paid';
    createdAt: string;
  };
  breakdown: PriceBreakdown;
}> {
  const res = await fetch('/api/inscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'No pudimos guardar tu inscripción. Intenta nuevamente.');
  }
  return data;
}

export async function createBoldCheckoutSession(payload: {
  inscriptionId: string;
  currency: Currency;
}): Promise<{
  orderId: string;
  amount: number;
  boldAmount: string;
  currency: Currency;
  description: string;
  integritySignature: string;
  identityKey: string;
  identityKeyConfigured: boolean;
  checkoutMode: 'live' | 'sandbox';
  availableMethods: PaymentMethod[];
}> {
  const res = await fetch('/api/bold/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'No pudimos abrir la pasarela Bold.');
  }
  return data;
}

export async function confirmBoldPayment(payload: {
  inscriptionId: string;
  orderId: string;
  paymentMethod: PaymentMethod;
}): Promise<{
  status: 'APPROVED';
  orderId: string;
  paymentMethod: PaymentMethod;
  receiptMessage: string;
}> {
  const res = await fetch('/api/bold/confirm-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'No pudimos confirmar tu pago con Bold.');
  }
  return data;
}
