import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { SignupFormSchema, type SignupFormValues } from '../utils/schemas';
import { calculatePriceBreakdown, formatMoney } from '../utils/pricing';
import { useAppStore } from '../store/useAppStore';
import { AardvarkButtonAlt } from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { FOOTER, PROGRAM, SIGNUP } from '../content/landing';
import {
  createBoldCheckoutSession,
  submitInscription,
  trackConversionEvent,
} from '../utils/analyticsClient';

export function SignupFormSection() {
  const currency = useAppStore((s) => s.currency);
  const setCurrency = useAppStore((s) => s.setCurrency);
  const activeCheckout = useAppStore((s) => s.activeCheckout);
  const setActiveCheckout = useAppStore((s) => s.setActiveCheckout);
  const setCheckoutModalOpen = useAppStore((s) => s.setCheckoutModalOpen);
  const setWhatsappOpen = useAppStore((s) => s.setWhatsappOpen);
  const pushNotification = useAppStore((s) => s.pushNotification);

  const formStartedRef = useRef(false);
  const inlinePayMountRef = useRef<HTMLDivElement>(null);
  const breakdown = calculatePriceBreakdown(currency);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const hasLiveCheckout = Boolean(
    activeCheckout && activeCheckout.identityKeyConfigured && activeCheckout.identityKey
  );

  useEffect(() => {
    if (!hasLiveCheckout || !activeCheckout || !inlinePayMountRef.current) return;

    const container = inlinePayMountRef.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://checkout.bold.co/library/boldPaymentButton.js';
    script.async = true;
    script.setAttribute('data-bold-button', 'dark-L');
    script.setAttribute('data-api-key', activeCheckout.identityKey);
    script.setAttribute('data-order-id', activeCheckout.orderId);
    script.setAttribute('data-currency', activeCheckout.currency);
    script.setAttribute('data-amount', activeCheckout.boldAmount);
    script.setAttribute('data-integrity-signature', activeCheckout.integritySignature);
    script.setAttribute('data-description', activeCheckout.description);
    script.setAttribute('data-render-mode', 'embedded');
    script.setAttribute(
      'data-customer-data',
      JSON.stringify({
        email: activeCheckout.email,
        fullName: activeCheckout.fullName,
        phone: activeCheckout.phone,
      })
    );

    if (window.location.protocol === 'https:') {
      const returnUrl = `${window.location.origin}/?bold-order=${encodeURIComponent(
        activeCheckout.orderId
      )}&inscription=${encodeURIComponent(activeCheckout.inscriptionId)}`;
      script.setAttribute('data-redirection-url', returnUrl);
    }

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [hasLiveCheckout, activeCheckout]);

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
      setCheckoutModalOpen(false);
      pushNotification({
        title: 'Cupo reservado',
        body: `Registramos tu orden ${checkout.orderId} para asegurar tu lugar.`,
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
      className="w-full relative z-10 bg-white text-[#0A0C1A] overflow-hidden py-[var(--section-py)] px-[var(--gutter)] lg:px-[calc(var(--u)*112)] scroll-mt-24"
      aria-labelledby="signup-heading"
    >
      <SectionBackdrop shape="signup" colors={['#fdebc9']} opacities={[0.68]} align="xMidYMid" />

      <div className="relative z-10 max-w-[calc(var(--u)*1560)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*56)] items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 space-y-[calc(var(--u)*24)]"
          >
            <h2 id="signup-heading" className="aardvark-h2 text-[#0A0C1A]">
              {SIGNUP.title}
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*620)]">{SIGNUP.lead}</p>

            {/* Aardvark USA / Canada reference selector */}
            <div className="space-y-3 pt-1">
              <span className="block font-display font-bold text-[length:var(--fs-small)] text-[#303163]">
                Moneda de pago
              </span>
              <div
                className="inline-flex flex-wrap items-center gap-3"
                role="group"
                aria-label="Elegir moneda"
              >
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('COP')}
                  aria-pressed={currency === 'COP'}
                  className={`rounded-full border-2 border-[#303163] px-6 py-2.5 font-display font-bold text-sm sm:text-base whitespace-nowrap transition-colors cursor-pointer ${
                    currency === 'COP'
                      ? 'bg-[#303163] text-[#F4F6FF]'
                      : 'bg-transparent text-[#303163] hover:bg-[#e1e4fd]'
                  }`}
                >
                  COP · $399.000
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('USD')}
                  aria-pressed={currency === 'USD'}
                  className={`rounded-full border-2 border-[#303163] px-6 py-2.5 font-display font-bold text-sm sm:text-base whitespace-nowrap transition-colors cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#303163] text-[#F4F6FF]'
                      : 'bg-transparent text-[#303163] hover:bg-[#e1e4fd]'
                  }`}
                >
                  USD · $129
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-[calc(var(--u)*12)]">
              <div className="flex items-baseline gap-4">
                <span className="aardvark-small font-medium text-[#525770]">{SIGNUP.priceLabel}</span>
                <span className="aardvark-h3 text-[#0A0C1A] tabular-nums">
                  {breakdown.formattedTotal}
                </span>
              </div>
              <p className="font-display font-bold text-base text-[#0A0C1A]">{SIGNUP.priceNote}</p>
              <p className="aardvark-small text-[#525770]">
                {currency === 'COP' ? SIGNUP.methodsCOP : SIGNUP.methodsUSD}
              </p>
              <p className="aardvark-small text-[#525770]">
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

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-7"
          >
            {activeCheckout ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#e1e4fd] rounded-[var(--card-r)] p-[max(24px,calc(var(--u)*40))] space-y-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-7 h-7 text-[#5a5bb6] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <h3 className="aardvark-h3 text-[#0A0C1A]">Inscripción registrada</h3>
                    <p className="aardvark-small text-[#525770]">
                      Guardamos tu lugar en {PROGRAM.name} para el {PROGRAM.startDateShort}.
                    </p>
                  </div>
                </div>

                <div className="rounded-[var(--faq-r)] bg-white p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-base text-[#0A0C1A]">
                      {activeCheckout.fullName}
                    </p>
                    <p className="text-sm text-[#525770] tabular-nums">
                      Orden {activeCheckout.orderId} · {activeCheckout.email}
                    </p>
                  </div>
                  <span className="font-display font-bold text-2xl text-[#0A0C1A] tabular-nums">
                    {formatMoney(activeCheckout.amount, activeCheckout.currency)}
                  </span>
                </div>

                {hasLiveCheckout ? (
                  <div className="rounded-[var(--faq-r)] bg-white p-5 flex flex-col items-start gap-3">
                    <p className="aardvark-small text-[#525770]">
                      Completa tu pago en línea con PSE, Nequi, Bancolombia o tarjeta:
                    </p>
                    <div ref={inlinePayMountRef} className="min-h-[52px] flex items-center" />
                  </div>
                ) : (
                  <p className="aardvark-small text-[#525770]">
                    Si necesitas el enlace directo para terminar tu pago ahora, escríbenos por WhatsApp con tu número de orden o revisa tu correo.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  {!hasLiveCheckout && (
                    <AardvarkButtonAlt
                      type="button"
                      variant="periwinkle"
                      size="md"
                      label="Pedir enlace por WhatsApp"
                      onClick={() => {
                        void trackConversionEvent({
                          type: 'cta_click',
                          label: 'Inscripción inline: pedir enlace directo por WhatsApp',
                          currency: activeCheckout.currency,
                        });
                        setWhatsappOpen(true);
                      }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCheckout(null);
                      reset({ fullName: '', email: '', phone: '', currency });
                    }}
                    className="font-display font-bold text-sm sm:text-base text-[#303163] underline decoration-2 underline-offset-4 hover:text-[#0A0C1A] cursor-pointer py-2 px-1"
                  >
                    Registrar otra persona
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} noValidate className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]"
                  >
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
                    className="aardvark-input w-full bg-[#e1e4fd] text-[#0A0C1A] placeholder:text-[#525770] focus:bg-[#d2d7fc] transition-colors outline-none"
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]"
                    >
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
                      className="aardvark-input w-full bg-[#e1e4fd] text-[#0A0C1A] placeholder:text-[#525770] focus:bg-[#d2d7fc] transition-colors outline-none"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[length:var(--fs-small)] font-display font-bold text-[#0A0C1A] mb-[calc(var(--u)*10)]"
                    >
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
                      className="aardvark-input w-full bg-[#e1e4fd] text-[#0A0C1A] placeholder:text-[#525770] focus:bg-[#d2d7fc] transition-colors outline-none"
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
                  {/* Phones get the short label so the two-part button fits cleanly. */}
                  <div className="sm:hidden">
                    <AardvarkButtonAlt
                      type="submit"
                      disabled={signupMutation.isPending}
                      variant="dark"
                      size="md"
                      label={signupMutation.isPending ? `${SIGNUP.pendingLabel}...` : SIGNUP.ctaSubmit}
                      className="w-full"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <AardvarkButtonAlt
                      type="submit"
                      disabled={signupMutation.isPending}
                      variant="dark"
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

                <div className="flex items-center justify-start gap-2 text-sm text-[#525770]">
                  <Lock className="w-4 h-4 text-[#5a5bb6]" aria-hidden="true" />
                  <span>{SIGNUP.secureNote}</span>
                </div>
              </form>
            )}
          </motion.div>
      </div>
    </section>
  );
}
