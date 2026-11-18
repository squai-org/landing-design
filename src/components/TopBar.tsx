import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SquaiLockup } from './SquaiBrand';
import { useAppStore } from '../store/useAppStore';
import { trackConversionEvent } from '../utils/analyticsClient';

const NAV_ITEMS = [
  { id: 'programa', label: 'El programa' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'inscripcion', label: 'Inscripción' },
];

export function TopAnnouncementBar() {
  const scrollToInscripcion = () => {
    void trackConversionEvent({
      type: 'cta_click',
      label: 'Barra superior: Inscribirme al nuevo programa',
    });
    document.getElementById('inscripcion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      role="region"
      aria-label="Anuncio de nuevo programa"
      className="w-full bg-[#8A8EF9] text-[#0A0C1A] border-b border-[#777ae3] px-4 py-2"
    >
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-center">
        <p className="text-xs sm:text-sm font-medium text-[#0A0C1A]">
          Nuevo programa en vivo: <strong className="font-bold">Fundamentos de IA para el Trabajo</strong> · $399.000 COP / $129 USD
        </p>
        <button
          type="button"
          onClick={scrollToInscripcion}
          className="inline-flex items-center justify-center bg-white hover:bg-[#f9faff] text-[#0A0C1A] font-display font-bold text-xs px-3.5 py-1 rounded-lg border border-[#5a5bb6]/25 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Reservar cupo
        </button>
      </div>
    </div>
  );
}

export function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['inicio', ...NAV_ITEMS.map((item) => item.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  const scrollToSection = (id: string, trackLabel?: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (trackLabel) {
      void trackConversionEvent({
        type: 'cta_click',
        label: trackLabel,
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#d9dcea] transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="h-16 sm:h-[72px] flex items-center justify-between gap-8">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:rounded-lg"
            aria-label="Squai, volver al inicio"
          >
            <SquaiLockup size="sm" />
          </a>

          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative py-1 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#303163] font-semibold'
                      : 'text-[#525770] hover:text-[#0A0C1A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="topbar-active-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#5a5bb6] rounded-full"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('inscripcion', 'Clic en CTA superior: Inscribirme ahora')}
              className="hidden sm:inline-flex items-center justify-center bg-[#0A0C1A] hover:bg-[#303163] active:scale-[0.98] text-[#F4F6FF] font-display font-bold text-sm px-5 py-2.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Inscribirme ahora
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#c8cce0] bg-white text-[#0A0C1A]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Navegación móvil"
            className="md:hidden border-t border-[#d9dcea] py-3 flex flex-col gap-1.5"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="py-2.5 px-3 rounded-xl text-base font-medium text-[#0A0C1A] hover:bg-[#eef0fd]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('inscripcion', 'Clic en menú móvil: Inscribirme ahora')}
              className="mt-1 w-full bg-[#0A0C1A] hover:bg-[#303163] text-[#F4F6FF] font-display font-bold text-base py-3 px-5 rounded-xl"
            >
              Inscribirme ahora
            </button>
          </nav>
        )}
      </div>

      <div className="h-[2px] w-full overflow-hidden bg-[#eef0fd]">
        <motion.div
          className="h-full bg-[#5a5bb6] origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
