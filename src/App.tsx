import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { AardvarkTopBar } from './components/AardvarkTopBar';
import { AardvarkHero } from './components/AardvarkHero';
import { FlowSection, IncludesSection, SessionsSection } from './components/AardvarkSections';
import {
  AudienceSection,
  FaqSection,
  KeyFactsMarquee,
  MentorsSection,
  OutcomesSection,
  PresentationSection,
} from './components/AardvarkInteractiveSections';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AardvarkButtonAlt, SquaiSocialLinks } from './components/AardvarkPrimitives';
import { SignupFormSection } from './components/SignupFormSection';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { NotificationCenter } from './components/NotificationCenter';
import { SquaiLockup } from './components/SquaiBrand';
import { useAppStore } from './store/useAppStore';
import { trackConversionEvent } from './utils/analyticsClient';
import { FOOTER, NAV, PROGRAM } from './content/landing';

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
        label: `Visita a ${PROGRAM.name}`,
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
        {/* Orden de la guía: 1 Encabezado */}
        <AardvarkHero
          onPrimaryCta={() => goToSignup(currency, 'Hero CTA: Inscribirme al programa')}
        />
        {/* 2 Datos clave */}
        <IncludesSection onSelectCta={() => goToSignup(currency, 'Datos clave CTA: Inscribirme')} />
        {/* 3 Presentación */}
        <PresentationSection
          onMeetMentors={() => scrollToSection('mentores', 'Presentación CTA: Conocer a Laura y Sebastián')}
        />
        {/* 4 ¿Es para ti? */}
        <AudienceSection currency={currency} onSelectCta={goToSignup} />
        {/* 5 Qué vas a lograr */}
        <OutcomesSection />
        {/* 6 Cómo es el programa */}
        <FlowSection onSelectCta={() => goToSignup(currency, 'Cómo funciona CTA: Empezar mi inscripción')} />
        {/* 7 Programa + franja con fecha, horario y precio */}
        <SessionsSection onSelectCta={() => goToSignup(currency, 'Sesiones CTA: Reservar mi cupo')} />
        <KeyFactsMarquee />
        {/* 8 Quiénes enseñan */}
        <MentorsSection currency={currency} onSelectCta={goToSignup} />
        {/* 9 Lo que dicen */}
        <TestimonialsSection />
        {/* 10 Inscripción */}
        <SignupFormSection />
        {/* 11 Preguntas frecuentes */}
        <FaqSection />
      </main>

      {/* 12 Pie de página · Deep Periwinkle Footer aligned to aardvarkbookclub.com */}
      <footer
        id="contacto"
        aria-label="Pie de página"
        className="w-full relative z-0 bg-[#303163] text-[#F4F6FF] -mt-[var(--edge-r)] pt-[calc(var(--edge-r)+var(--section-py))] pb-0 overflow-hidden"
      >
        <div className="mx-auto px-[var(--gutter)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
            {/* Left Column: Lockup, Social (Instagram & LinkedIn), Links */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <a href="#inicio" aria-label="Volver al inicio de Squai" className="inline-flex">
                  <SquaiLockup size="lg" variant="color" className="text-[#F4F6FF]" />
                </a>
                <p className="text-base sm:text-lg text-[#d2d7fc] leading-relaxed max-w-md">{FOOTER.blurb}</p>
              </div>

              <address className="not-italic text-base text-[#d2d7fc] leading-relaxed">
                <span className="block font-display font-bold text-[#F4F6FF]">{FOOTER.company.legalName}</span>
                <span className="block">
                  {FOOTER.company.taxId} · {FOOTER.company.city}
                </span>
                <a
                  href={`mailto:${FOOTER.company.email}`}
                  className="underline decoration-1 underline-offset-2 hover:text-[#F9C24D] transition-colors"
                >
                  {FOOTER.company.email}
                </a>
              </address>

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
                  {FOOTER.ctaWhatsApp}
                </button>
              </div>

              <nav aria-label="Navegación de pie de página">
                <ul className="flex flex-wrap gap-x-8 gap-y-3 text-base font-display font-bold text-[#F4F6FF]">
                  {NAV.items.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-[#F9C24D] transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#inscripcion" className="hover:text-[#F9C24D] transition-colors">
                      {NAV.ctaHeader}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right Column: Newsletter Subscription matching Aardvark's "Join our mailing list" */}
            <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h2 className="aardvark-h3 text-[#F4F6FF]">{FOOTER.newsletter.title}</h2>
                <p className="text-base text-[#d2d7fc] leading-relaxed max-w-lg">{FOOTER.newsletter.copy}</p>
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
                  className="aardvark-input flex-none sm:flex-1 bg-white text-[#0A0C1A] placeholder:text-[#7a7f9c] transition-colors outline-none"
                />
                <AardvarkButtonAlt
                  type="submit"
                  label={FOOTER.newsletter.cta}
                  variant="marigold"
                  size="md"
                />
              </form>

              <p className="text-sm text-[#d2d7fc] tabular-nums">{FOOTER.priceLine}</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#0A0C1A] text-[#d2d7fc] py-5 sm:py-6 px-[var(--gutter)] sm:px-24">
          <div className="mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
            <span>© 2026 {FOOTER.rights}</span>
            <nav aria-label="Documentos legales">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {FOOTER.legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="underline decoration-1 underline-offset-2 hover:text-[#F9C24D] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <span>{FOOTER.tagline}</span>
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
