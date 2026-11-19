import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { SignupFormSchema, type SignupFormValues } from '../utils/schemas';
import { calculatePriceBreakdown } from '../utils/pricing';
import { useAppStore } from '../store/useAppStore';
import { AardvarkButtonAlt, SquaiCornerBlocks } from './AardvarkPrimitives';
import { FOOTER, SIGNUP } from '../content/landing';
import {
  createBoldCheckoutSession,
  submitInscription,
  trackConversionEvent,
} from '../utils/analyticsClient';

export function SignupFormSection() {
  const currency = useAppStore((s) => s.currency);
  const setCurrency = useAppStore((s) => s.setCurrency);
  const setActiveCheckout = useAppStore((s) => s.setActiveCheckout);
  const setCheckoutModalOpen = useAppStore((s) => s.setCheckoutModalOpen);
  const pushNotification = useAppStore((s) => s.pushNotification);

  const formStartedRef = useRef(false);
  const breakdown = calculatePriceBreakdown(currency);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      currency,
    },
  });

  const handleCurrencyChange = (nextCurrency: 'COP' | 'USD') => {
    setCurrency(nextCurrency);
    setValue('currency', nextCurrency, { shouldValidate: true });
  };

  const handleFormFocus = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      void trackConversionEvent({
        type: 'form_start',
        label: 'Inicio de formulario de inscripción',
      });
    }
  };

  const signupMutation = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      const created = await submitInscription(values);
      const checkout = await createBoldCheckoutSession({
        inscriptionId: created.inscription.id,
        currency: values.currency,
      });
      return { values, created, checkout };
    },
    onSuccess: ({ values, created, checkout }) => {
      setActiveCheckout({
        inscriptionId: created.inscription.id,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        currency: checkout.currency,
        orderId: checkout.orderId,
        amount: checkout.amount,
        boldAmount: checkout.boldAmount,
        description: checkout.description,
        integritySignature: checkout.integritySignature,
        identityKey: checkout.identityKey,
        identityKeyConfigured: checkout.identityKeyConfigured,
        availableMethods: checkout.availableMethods,
        status: 'pending',
      });
      setCheckoutModalOpen(true);
      pushNotification({
        title: '¡Quedaste registrado!',
        body: `Preparamos tu enlace de pago (${checkout.orderId}) para asegurar tu cupo.`,
        tone: 'success',
      });
    },
    onError: (err: Error) => {
      pushNotification({
        title: 'No pudimos completar el registro',
        body: err.message,
        tone: 'warning',
      });
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    signupMutation.mutate({
      ...values,
      currency,
    });
  };

  return (
    <section
      id="inscripcion"
      className="w-full relative z-20 bg-white py-[calc(var(--section-py)*0.6)] px-[var(--gutter)] scroll-mt-24"
      aria-labelledby="signup-heading"
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*64)] items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-[calc(var(--u)*24)]"
        >
          <h2 id="signup-heading" className="aardvark-h2 text-[#0A0C1A]">
            {SIGNUP.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*620)]">{SIGNUP.lead}</p>

          <div className="bg-[#eef0fd] rounded-[var(--card-r)] p-[calc(var(--u)*32)] space-y-[calc(var(--u)*16)]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="aardvark-small font-medium text-[#525770]">{SIGNUP.priceLabel}</span>
              <span className="aardvark-h3 text-[#0A0C1A] tabular-nums">
                {breakdown.formattedTotal}
              </span>
            </div>
            <p className="font-display font-bold text-base text-[#0A0C1A]">{SIGNUP.priceNote}</p>
            <p className="text-sm sm:text-base text-[#525770] leading-relaxed">
              {currency === 'COP' ? SIGNUP.methodsCOP : SIGNUP.methodsUSD}
            </p>
            <p className="text-sm sm:text-base text-[#525770] leading-relaxed">
              {SIGNUP.refundNote}{' '}
              <a
                href={FOOTER.legalLinks[0].href}
                className="font-display font-bold text-[#303163] underline decoration-2 underline-offset-2 hover:text-[#5a5bb6]"
              >
                {SIGNUP.refundLinkLabel}
              </a>
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-7 relative mt-6 lg:mt-0">
          <SquaiCornerBlocks
            backColor="#d2d7fc"
            size="card"
            preset="signup-form"
            hoverOnly={false}
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-[#eef0fd] rounded-[calc(var(--u)*48)] p-[max(24px,calc(var(--u)*40))] shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} noValidate className="space-y-6">
              <div>
                <span className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]">
                  Moneda de pago
                </span>
                <div
                  className="grid grid-cols-2 gap-2 p-1.5 bg-white rounded-2xl max-w-md"
                  role="group"
                  aria-label="Elegir moneda"
                >
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('COP')}
                    aria-pressed={currency === 'COP'}
                    className={`py-2.5 px-2 min-[380px]:px-4 rounded-xl text-sm min-[380px]:text-base font-display font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      currency === 'COP'
                        ? 'bg-[#8A8EF9] text-[#0A0C1A]'
                        : 'text-[#525770] hover:text-[#0A0C1A]'
                    }`}
                  >
                    COP · $399.000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange('USD')}
                    aria-pressed={currency === 'USD'}
                    className={`py-2.5 px-2 min-[380px]:px-4 rounded-xl text-sm min-[380px]:text-base font-display font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      currency === 'USD'
                        ? 'bg-[#F9C24D] text-[#0A0C1A]'
                        : 'text-[#525770] hover:text-[#0A0C1A]'
                    }`}
                  >
                    USD · $129
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej. Laura Gómez"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  {...register('fullName')}
                  className="aardvark-input w-full bg-white text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="laura@tuempresa.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                    className="aardvark-input w-full bg-white text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]">
                    WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+57 300 000 0000"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone')}
                    className="aardvark-input w-full bg-white text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#525770] leading-relaxed">
                {SIGNUP.consent}{' '}
                <a
                  href={FOOTER.legalLinks[1].href}
                  className="font-display font-bold text-[#303163] underline decoration-2 underline-offset-2 hover:text-[#5a5bb6]"
                >
                  {FOOTER.legalLinks[1].label}
                </a>
              </p>

              {signupMutation.isError && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-[#fde2e2] text-[#9b1c1c] text-sm font-medium"
                >
                  {signupMutation.error.message}
                </div>
              )}

              <div className="pt-1">
                {/* Phones get the short label so the two-part button fits the card.
                    Wrappers toggle display because .aardvark-btn-alt sets it unlayered. */}
                <div className="sm:hidden">
                  <AardvarkButtonAlt
                    type="submit"
                    disabled={signupMutation.isPending}
                    variant="periwinkle"
                    size="md"
                    label={signupMutation.isPending ? `${SIGNUP.pendingLabel}...` : SIGNUP.ctaSubmit}
                    className="w-full"
                  />
                </div>
                <div className="hidden sm:block">
                  <AardvarkButtonAlt
                    type="submit"
                    disabled={signupMutation.isPending}
                    variant="periwinkle"
                    size="lg"
                    label={
                      signupMutation.isPending
                        ? `${SIGNUP.pendingLabel}...`
                        : `${SIGNUP.ctaSubmit} (${breakdown.formattedDueNow})`
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#525770]">
                <Lock className="w-4 h-4 text-[#5a5bb6]" aria-hidden="true" />
                <span>{SIGNUP.secureNote}</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
