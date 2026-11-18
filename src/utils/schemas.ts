import { z } from 'zod';

export const CurrencySchema = z.enum(['COP', 'USD']);
export type Currency = z.infer<typeof CurrencySchema>;

export const PaymentMethodSchema = z.enum(['CARD', 'PSE', 'NEQUI', 'BANCOLOMBIA']);
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const SignupFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Escribe tu nombre completo para preparar tu cupo.')
    .max(80, 'El nombre no puede superar 80 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Revisa tu correo, necesitamos una dirección válida para enviarte el acceso.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, 'Escribe un número de WhatsApp válido (mínimo 7 dígitos).'),
  currency: CurrencySchema,
});

export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export const AnalyticsEventTypeSchema = z.enum([
  'page_view',
  'scroll_depth',
  'cta_click',
  'form_start',
  'signup_submitted',
  'bold_checkout_opened',
  'payment_completed',
  'whatsapp_click',
  'push_opt_in',
]);

export type AnalyticsEventType = z.infer<typeof AnalyticsEventTypeSchema>;
