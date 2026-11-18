import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';
import {
  calculatePriceBreakdown,
  computeFunnelMetrics,
  type AnalyticsEventRecord,
} from './src/utils/pricing';
import {
  AnalyticsEventTypeSchema,
  CurrencySchema,
  PaymentMethodSchema,
  SignupFormSchema,
  type Currency,
  type PaymentMethod,
} from './src/utils/schemas';

dotenv.config();

interface InscriptionRecord {
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
}

interface StoreState {
  events: AnalyticsEventRecord[];
  inscriptions: InscriptionRecord[];
}

const STORE_PATH = path.resolve(process.cwd(), '.squai-store.json');

function createSeedStore(): StoreState {
  const now = Date.now();
  const minsAgo = (m: number) => new Date(now - m * 60_000).toISOString();

  const events: AnalyticsEventRecord[] = [
    { id: 'ev-1', type: 'page_view', label: 'Visita a la página del programa', timestamp: minsAgo(165) },
    { id: 'ev-2', type: 'scroll_depth', label: 'Lectura hasta sección de pago Bold (75%)', timestamp: minsAgo(160) },
    { id: 'ev-3', type: 'cta_click', label: 'Clic en botón principal de inscripción', timestamp: minsAgo(155) },
    { id: 'ev-4', type: 'signup_submitted', label: 'Registro completado (COP)', timestamp: minsAgo(150), currency: 'COP', amount: 399000 },
    { id: 'ev-5', type: 'bold_checkout_opened', label: 'Pasarela Bold iniciada (PSE)', timestamp: minsAgo(148), currency: 'COP', amount: 399000 },
    { id: 'ev-6', type: 'payment_completed', label: 'Pago confirmado con Bold (PSE)', timestamp: minsAgo(146), currency: 'COP', amount: 399000 },
    { id: 'ev-7', type: 'page_view', label: 'Visita a la página del programa', timestamp: minsAgo(115) },
    { id: 'ev-8', type: 'whatsapp_click', label: 'Consulta rápida por WhatsApp', timestamp: minsAgo(105) },
    { id: 'ev-9', type: 'page_view', label: 'Visita a la página del programa', timestamp: minsAgo(90) },
    { id: 'ev-10', type: 'scroll_depth', label: 'Lectura completa de módulos (50%)', timestamp: minsAgo(84) },
    { id: 'ev-11', type: 'form_start', label: 'Inicio de formulario de inscripción', timestamp: minsAgo(80) },
    { id: 'ev-12', type: 'signup_submitted', label: 'Registro completado (USD)', timestamp: minsAgo(75), currency: 'USD', amount: 129 },
    { id: 'ev-13', type: 'bold_checkout_opened', label: 'Pasarela Bold iniciada (Tarjeta)', timestamp: minsAgo(73), currency: 'USD', amount: 129 },
    { id: 'ev-14', type: 'payment_completed', label: 'Pago confirmado con Bold (Tarjeta)', timestamp: minsAgo(70), currency: 'USD', amount: 129 },
    { id: 'ev-15', type: 'page_view', label: 'Visita a la página del programa', timestamp: minsAgo(45) },
  ];

  const inscriptions: InscriptionRecord[] = [
    {
      id: 'ins-1',
      fullName: 'Registro verificado #101',
      email: 'registro101@squai.co',
      phone: '+57 300 000 0101',
      currency: 'COP',
      amountDueNow: 399000,
      totalAmount: 399000,
      status: 'paid',
      orderId: 'SQUAI-PAY-101',
      paymentMethod: 'PSE',
      createdAt: minsAgo(150),
      paidAt: minsAgo(146),
    },
    {
      id: 'ins-2',
      fullName: 'Registro verificado #102',
      email: 'registro102@squai.co',
      phone: '+1 305 000 0102',
      currency: 'USD',
      amountDueNow: 129,
      totalAmount: 129,
      status: 'paid',
      orderId: 'SQUAI-PAY-102',
      paymentMethod: 'CARD',
      createdAt: minsAgo(75),
      paidAt: minsAgo(70),
    },
  ];

  return { events, inscriptions };
}

function loadStore(): StoreState {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf8');
      const parsed = JSON.parse(raw) as StoreState;
      if (Array.isArray(parsed.events) && Array.isArray(parsed.inscriptions)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('No se pudo leer el almacén local, iniciando estado limpio.', error);
  }
  const seeded = createSeedStore();
  saveStore(seeded);
  return seeded;
}

function saveStore(state: StoreState): void {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2), 'utf8');
  } catch (error) {
    console.warn('No se pudo persistir el almacén local.', error);
  }
}

const store: StoreState = loadStore();
const sseClients = new Set<Response>();

function buildAnalyticsSnapshot() {
  const metrics = computeFunnelMetrics(store.events);
  return {
    metrics,
    events: [...store.events].slice(-60).reverse(),
    inscriptions: [...store.inscriptions].slice(-30).reverse(),
    updatedAt: new Date().toISOString(),
  };
}

function broadcastAnalyticsUpdate() {
  const payload = `data: ${JSON.stringify(buildAnalyticsSnapshot())}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

function addEvent(event: Omit<AnalyticsEventRecord, 'id' | 'timestamp'>): AnalyticsEventRecord {
  const created: AnalyticsEventRecord = {
    ...event,
    id: `ev-${crypto.randomUUID().slice(0, 8)}`,
    timestamp: new Date().toISOString(),
  };
  store.events.push(created);
  if (store.events.length > 300) {
    store.events = store.events.slice(-300);
  }
  saveStore(store);
  broadcastAnalyticsUpdate();
  return created;
}

function createBoldIntegritySignature(orderId: string, amount: number, currency: Currency): string {
  const secretKey = process.env.BOLD_SECRET_KEY || 'squai_sandbox_integrity_key';
  const raw = `${orderId}${Math.round(amount)}${currency}${secretKey}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'squai-landing' });
  });

  app.get('/api/analytics', (_req: Request, res: Response) => {
    res.json(buildAnalyticsSnapshot());
  });

  app.get('/api/analytics/stream', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    sseClients.add(res);
    res.write(`data: ${JSON.stringify(buildAnalyticsSnapshot())}\n\n`);

    const keepAlive = setInterval(() => {
      try {
        res.write(': keepalive\n\n');
      } catch {
        clearInterval(keepAlive);
        sseClients.delete(res);
      }
    }, 20_000);

    req.on('close', () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
    });
  });

  app.post('/api/analytics/event', (req: Request, res: Response) => {
    const typeParsed = AnalyticsEventTypeSchema.safeParse(req.body?.type);
    if (!typeParsed.success) {
      res.status(400).json({ error: 'Tipo de evento no válido.' });
      return;
    }

    const label =
      typeof req.body?.label === 'string' && req.body.label.trim().length > 0
        ? req.body.label.trim().slice(0, 120)
        : typeParsed.data;

    const currencyParsed = CurrencySchema.safeParse(req.body?.currency);
    const amount =
      typeof req.body?.amount === 'number' && Number.isFinite(req.body.amount)
        ? req.body.amount
        : undefined;

    const created = addEvent({
      type: typeParsed.data,
      label,
      currency: currencyParsed.success ? currencyParsed.data : undefined,
      amount,
      metadata:
        req.body?.metadata && typeof req.body.metadata === 'object' ? req.body.metadata : undefined,
    });

    res.status(201).json({ event: created, snapshot: buildAnalyticsSnapshot() });
  });

  app.post('/api/inscriptions', (req: Request, res: Response) => {
    const parsed = SignupFormSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Revisa los campos del formulario.',
        issues: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { fullName, email, phone, currency } = parsed.data;
    const breakdown = calculatePriceBreakdown(currency);

    const inscription: InscriptionRecord = {
      id: `ins-${crypto.randomUUID().slice(0, 8)}`,
      fullName,
      email,
      phone,
      currency,
      amountDueNow: breakdown.amountDueNow,
      totalAmount: breakdown.totalAmount,
      status: 'registered',
      createdAt: new Date().toISOString(),
    };

    store.inscriptions.push(inscription);
    saveStore(store);

    addEvent({
      type: 'signup_submitted',
      label: `Inscripción de ${fullName} (${currency})`,
      currency,
      amount: breakdown.amountDueNow,
      metadata: { inscriptionId: inscription.id },
    });

    res.status(201).json({
      inscription,
      breakdown,
    });
  });

  app.post('/api/bold/create-checkout', (req: Request, res: Response) => {
    const inscriptionId = typeof req.body?.inscriptionId === 'string' ? req.body.inscriptionId : '';
    const currencyParsed = CurrencySchema.safeParse(req.body?.currency);

    if (!inscriptionId || !currencyParsed.success) {
      res.status(400).json({ error: 'Datos incompletos para iniciar el pago en línea.' });
      return;
    }

    const inscription = store.inscriptions.find((item) => item.id === inscriptionId);
    if (!inscription) {
      res.status(404).json({ error: 'No encontramos tu inscripción. Intenta registrarte de nuevo.' });
      return;
    }

    const breakdown = calculatePriceBreakdown(currencyParsed.data);
    const orderId = `SQUAI-PAY-${Date.now().toString(36).toUpperCase()}`;
    const boldAmount = Math.round(breakdown.amountDueNow);
    const integritySignature = createBoldIntegritySignature(
      orderId,
      boldAmount,
      breakdown.currency
    );

    inscription.status = 'checkout_pending';
    inscription.orderId = orderId;
    inscription.currency = breakdown.currency;
    inscription.amountDueNow = breakdown.amountDueNow;
    inscription.totalAmount = breakdown.totalAmount;
    saveStore(store);

    addEvent({
      type: 'bold_checkout_opened',
      label: `Pasarela segura abierta · Orden ${orderId}`,
      currency: breakdown.currency,
      amount: breakdown.amountDueNow,
      metadata: { orderId, inscriptionId },
    });

    const identityKey =
      process.env.BOLD_IDENTITY_KEY &&
      process.env.BOLD_IDENTITY_KEY !== 'MY_BOLD_IDENTITY_KEY'
        ? process.env.BOLD_IDENTITY_KEY
        : '';
    const hasLiveBoldKey = Boolean(identityKey);

    res.json({
      orderId,
      amount: breakdown.amountDueNow,
      boldAmount: String(boldAmount),
      currency: breakdown.currency,
      description: 'Squai · Programa Fundamentos de IA para el Trabajo',
      integritySignature,
      identityKey,
      identityKeyConfigured: hasLiveBoldKey,
      checkoutMode: hasLiveBoldKey ? 'live' : 'sandbox',
      availableMethods:
        breakdown.currency === 'COP'
          ? ['CARD', 'PSE', 'NEQUI', 'BANCOLOMBIA']
          : ['CARD'],
    });
  });

  app.post('/api/bold/confirm-payment', (req: Request, res: Response) => {
    const inscriptionId = typeof req.body?.inscriptionId === 'string' ? req.body.inscriptionId : '';
    const orderId = typeof req.body?.orderId === 'string' ? req.body.orderId : '';
    const methodParsed = PaymentMethodSchema.safeParse(req.body?.paymentMethod);

    if (!inscriptionId || !orderId || !methodParsed.success) {
      res.status(400).json({ error: 'Falta información para confirmar el pago en línea.' });
      return;
    }

    const inscription = store.inscriptions.find((item) => item.id === inscriptionId);
    if (!inscription) {
      res.status(404).json({ error: 'Inscripción no encontrada.' });
      return;
    }

    inscription.status = 'paid';
    inscription.orderId = orderId;
    inscription.paymentMethod = methodParsed.data;
    inscription.paidAt = new Date().toISOString();
    saveStore(store);

    const methodLabels: Record<PaymentMethod, string> = {
      CARD: 'Tarjeta',
      PSE: 'PSE',
      NEQUI: 'Nequi',
      BANCOLOMBIA: 'Botón Bancolombia',
    };

    addEvent({
      type: 'payment_completed',
      label: `Pago confirmado (${methodLabels[methodParsed.data]}) · ${inscription.fullName}`,
      currency: inscription.currency,
      amount: inscription.amountDueNow,
      metadata: { orderId, method: methodParsed.data, inscriptionId },
    });

    res.json({
      status: 'APPROVED',
      orderId,
      paymentMethod: methodParsed.data,
      inscription,
      receiptMessage: `¡Pago confirmado! Tu cupo en Fundamentos de IA para el Trabajo quedó asegurado con la referencia ${orderId}.`,
    });
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Squai servidor activo en http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});
