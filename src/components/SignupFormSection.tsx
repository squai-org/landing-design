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
      className="w-full relative z-20 bg-white rounded-[40px] md:rounded-[96px] lg:rounded-[120px] -mt-10 sm:-mt-16 lg:-mt-24 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 scroll-mt-24"
      aria-labelledby="signup-heading"
    >
      <div className="max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <h2 id="signup-heading" className="aardvark-h2 text-[#0A0C1A]">
            Inscríbete en dos minutos.
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[460px]">
            Solo te pedimos tres datos básicos para crear tu acceso y abrir tu enlace de pago seguro en línea. No llenas formularios eternos ni creas contraseñas antes de tiempo.
          </p>

          <div className="bg-[#eef0fd] rounded-[28px] p-7 space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-[#525770]">Valor del programa</span>
              <span className="font-display font-bold text-3xl text-[#0A0C1A] tabular-nums">
                {breakdown.formattedTotal}
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#525770] leading-relaxed">
              {currency === 'COP'
                ? 'Medios disponibles en línea: PSE, Nequi, Bancolombia y tarjetas débito o crédito.'
                : 'Medios internacionales en línea: tarjetas Visa, Mastercard y American Express.'}
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
            className="relative z-10 bg-[#eef0fd] rounded-[36px] p-7 sm:p-10 shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} noValidate className="space-y-6">
              <div>
                <span className="block text-base font-display font-bold text-[#0A0C1A] mb-2.5">
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
                    className={`py-2.5 px-4 rounded-xl text-base font-display font-bold transition-colors cursor-pointer whitespace-nowrap ${
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
                    className={`py-2.5 px-4 rounded-xl text-base font-display font-bold transition-colors cursor-pointer whitespace-nowrap ${
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
                <label htmlFor="fullName" className="block text-base font-display font-bold text-[#0A0C1A] mb-2">
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
                  className="w-full px-4 py-3.5 rounded-2xl bg-white text-base sm:text-lg text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-base font-display font-bold text-[#0A0C1A] mb-2">
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
                    className="w-full px-4 py-3.5 rounded-2xl bg-white text-base sm:text-lg text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-display font-bold text-[#0A0C1A] mb-2">
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
                    className="w-full px-4 py-3.5 rounded-2xl bg-white text-base sm:text-lg text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-[#f9faff] transition-colors outline-none"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-[#9b1c1c]" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#525770] leading-relaxed">
                Al enviar tus datos confirmas que son tuyos y correctos. El pago completo se procesa de forma segura en nuestra pasarela en línea.
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
                <AardvarkButtonAlt
                  type="submit"
                  disabled={signupMutation.isPending}
                  variant="periwinkle"
                  size="lg"
                  label={
                    signupMutation.isPending
                      ? 'Preparando enlace...'
                      : `Ir al pago seguro (${breakdown.formattedDueNow})`
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#525770]">
                <Lock className="w-4 h-4 text-[#5a5bb6]" aria-hidden="true" />
                <span>Transacción segura en línea · Confirmación inmediata</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
