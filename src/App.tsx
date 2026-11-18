import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { AardvarkTopBar } from './components/AardvarkTopBar';
import { AardvarkHero } from './components/AardvarkHero';
import { AardvarkSections } from './components/AardvarkSections';
import { AardvarkInteractiveSections } from './components/AardvarkInteractiveSections';
import { AardvarkButtonAlt, SquaiSocialLinks } from './components/AardvarkPrimitives';
import { SignupFormSection } from './components/SignupFormSection';
import { BoldCheckoutModal } from './components/BoldCheckoutModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { NotificationCenter } from './components/NotificationCenter';
import { SquaiLockup } from './components/SquaiBrand';
import { useAppStore } from './store/useAppStore';
import { trackConversionEvent } from './utils/analyticsClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      retry: 1,
    },
  },
});

function LandingContent() {
  const currency = useAppStore((s) => s.currency);
  const setCurrency = useAppStore((s) => s.setCurrency);
  const setWhatsappOpen = useAppStore((s) => s.setWhatsappOpen);
  const pushNotification = useAppStore((s) => s.pushNotification);
  const trackedPageViewRef = useRef(false);
  const trackedDepthsRef = useRef<Set<number>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const boldOrder = params.get('bold-order');
    const boldStatus = params.get('bold-tx-status');
    if (boldOrder) {
      pushNotification({
        title: boldStatus === 'rejected' ? 'Pago no aprobado' : 'Orden recibida',
        body:
          boldStatus === 'rejected'
            ? `La orden ${boldOrder} no fue completada. Puedes intentar de nuevo o escribirnos por WhatsApp.`
            : `Registramos tu confirmación de pago para la orden ${boldOrder}. Revisa tu correo para los detalles de acceso.`,
        tone: boldStatus === 'rejected' ? 'warning' : 'success',
      });
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }

    if (!trackedPageViewRef.current) {
      trackedPageViewRef.current = true;
      void trackConversionEvent({
        type: 'page_view',
        label: 'Visita a Fundamentos de IA para el Trabajo',
      });
    }

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 520);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      for (const milestone of [25, 50, 75]) {
        if (pct >= milestone && !trackedDepthsRef.current.has(milestone)) {
          trackedDepthsRef.current.add(milestone);
          void trackConversionEvent({
            type: 'scroll_depth',
            label: `Lectura de página al ${milestone}%`,
          });
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pushNotification]);

  const scrollToSection = (sectionId: string, label: string) => {
    void trackConversionEvent({ type: 'cta_click', label });
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToSignup = (chosenCurrency: 'COP' | 'USD' = currency, label = 'CTA: Inscribirme') => {
    setCurrency(chosenCurrency);
    void trackConversionEvent({
      type: 'cta_click',
      label,
      currency: chosenCurrency,
    });
    document.getElementById('inscripcion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      pushNotification({
        title: 'Revisa tu correo',
        body: 'Ingresa un correo electrónico válido para recibir novedades del programa.',
        tone: 'warning',
      });
      return;
    }
    void trackConversionEvent({
      type: 'cta_click',
      label: `Newsletter footer: ${trimmed}`,
    });
    pushNotification({
      title: '¡Lista confirmada!',
      body: `Guardamos ${trimmed} para enviarte fechas y recursos nuevos de Squai.`,
      tone: 'success',
    });
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0C1A] overflow-x-clip">
      <AardvarkTopBar />

      <main>
        <AardvarkHero
          onPrimaryCta={() =>
            goToSignup(currency, 'Hero CTA: Inscribirme al programa')
          }
          onExploreModules={() =>
            scrollToSection('contenido', 'Hero CTA: Ver los 4 módulos')
          }
        />

        <AardvarkSections
          onSelectCta={() =>
            goToSignup(currency, 'Sección módulos/flujo CTA: Inscribirme')
          }
        />

        <AardvarkInteractiveSections
          currency={currency}
          onSelectCta={goToSignup}
        />

        <SignupFormSection />
      </main>

      {/* Deep Periwinkle Footer aligned to aardvarkbookclub.com (without bottom Squai watermark) */}
      <footer
        className="w-full relative z-0 bg-[#303163] text-[#F4F6FF] -mt-10 sm:-mt-16 lg:-mt-24 pt-24 sm:pt-36 lg:pt-44 pb-10 overflow-hidden"
      >
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
            {/* Left Column: Lockup, Social (Instagram & LinkedIn), Links */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <a href="#programa" aria-label="Volver al inicio de Squai" className="inline-flex">
                  <SquaiLockup size="lg" variant="color" className="text-[#F4F6FF]" />
                </a>
                <p className="text-base sm:text-lg text-[#d2d7fc] leading-relaxed max-w-md">
                  Formación práctica en inteligencia artificial para personas y equipos. Clara, cercana y aplicable desde el primer día.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <SquaiSocialLinks
                  bgClass="bg-[#F4F6FF]"
                  iconColorClass="text-[#0A0C1A]"
                />
                <button
                  type="button"
                  onClick={() => setWhatsappOpen(true)}
                  className="text-base font-display font-bold text-[#F9C24D] hover:text-[#F4F6FF] transition-colors cursor-pointer px-2 py-1"
                >
                  Escribir al equipo Squai
                </button>
              </div>

              <nav aria-label="Navegación de pie de página">
                <ul className="flex flex-wrap gap-x-8 gap-y-3 text-base font-display font-bold text-[#F4F6FF]">
                  <li>
                    <a href="#programa" className="hover:text-[#F9C24D] transition-colors">
                      El programa
                    </a>
                  </li>
                  <li>
                    <a href="#contenido" className="hover:text-[#F9C24D] transition-colors">
                      Módulos
                    </a>
                  </li>
                  <li>
                    <a href="#como-funciona" className="hover:text-[#F9C24D] transition-colors">
                      Cómo funciona
                    </a>
                  </li>
                  <li>
                    <a href="#preguntas" className="hover:text-[#F9C24D] transition-colors">
                      Preguntas
                    </a>
                  </li>
                  <li>
                    <a href="#inscripcion" className="hover:text-[#F9C24D] transition-colors">
                      Inscribirme
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right Column: Newsletter Subscription matching Aardvark's "Join our mailing list" */}
            <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="aardvark-h3 text-[#F4F6FF]">
                  Recibe novedades del programa
                </h3>
                <p className="text-base text-[#d2d7fc] leading-relaxed max-w-lg">
                  Fechas de nuevas cohortes, plantillas editables y ejemplos aplicados para tu equipo. Sin spam.
                </p>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 h-13 px-5 rounded-[13px] bg-[#F4F6FF] text-base text-[#0A0C1A] placeholder:text-[#7a7f9c] focus:bg-white transition-colors outline-none"
                />
                <AardvarkButtonAlt
                  type="submit"
                  label="Suscribirme"
                  variant="marigold"
                  size="md"
                />
              </form>

              <p className="text-sm text-[#d2d7fc] tabular-nums">
                Pago en Colombia: $399.000 COP · Internacional: $129 USD · PSE, Nequi, Bancolombia y tarjetas
              </p>
            </div>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#d2d7fc]">
            <span>© 2026 Squai. Todos los derechos reservados.</span>
            <span>Fundamentos de IA para el Trabajo · Programa práctico en línea</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="hidden md:inline-flex fixed bottom-5 left-5 z-40 w-12 h-12 rounded-full bg-white text-[#0A0C1A] shadow-xl items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <BoldCheckoutModal />
      <WhatsAppWidget />
      <NotificationCenter />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <LandingContent />
      </MotionConfig>
    </QueryClientProvider>
  );
}
