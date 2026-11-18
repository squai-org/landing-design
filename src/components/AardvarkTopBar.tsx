import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SquaiLockup } from './SquaiBrand';
import { AardvarkButtonAlt, AardvarkPillButton, SquaiSocialLinks } from './AardvarkPrimitives';
import { useAppStore } from '../store/useAppStore';
import { trackConversionEvent } from '../utils/analyticsClient';

const NAV_ITEMS = [
  { id: 'programa', label: 'El programa' },
  { id: 'contenido', label: 'Módulos' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'preguntas', label: 'Preguntas' },
];

export function AardvarkTopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollingStarted, setScrollingStarted] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const manualLockUntilRef = React.useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollingStarted(window.scrollY > 70);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['inicio', ...NAV_ITEMS.map((item) => item.id), 'mentores', 'inscripcion'];
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < manualLockUntilRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
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
    manualLockUntilRef.current = Date.now() + 900;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (trackLabel) {
      void trackConversionEvent({
        type: 'cta_click',
        label: trackLabel,
      });
    }
  };

  return (
    <>
      <header
        data-scrolling-started={scrollingStarted ? 'true' : 'false'}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none pt-5 sm:pt-7 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-4">
          {/* Left slot (.header__title): 38px logo matching Aardvark's 38px mark beside 42-48px nav pills */}
          <div
            className={`pointer-events-auto lg:w-[240px] shrink-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              scrollingStarted
                ? 'lg:-translate-y-24 lg:opacity-0 lg:pointer-events-none'
                : 'translate-y-0 opacity-100'
            }`}
          >
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('inicio');
              }}
              className={`inline-flex items-center whitespace-nowrap shrink-0 rounded-full transition-colors focus-visible:outline-offset-4 ${
                scrollingStarted
                  ? 'bg-[#F4F6FF]/95 backdrop-blur-md px-4 py-2 text-[#0A0C1A]'
                  : 'py-1 text-[#0A0C1A]'
              }`}
              aria-label="Squai, volver al inicio"
            >
              <SquaiLockup
                size="xl"
                variant={scrollingStarted ? 'color' : 'mono'}
                className="text-[#0A0C1A]"
              />
            </a>
          </div>

          {/* Center slot (.header__nav): Borderless floating pills with asymmetrical non-occluding Squai accent blocks */}
          <nav className="hidden lg:flex items-center justify-center pointer-events-auto" aria-label="Navegación principal">
            <ul className="flex items-center gap-3.5">
              {NAV_ITEMS.map((item, idx) => {
                const isActive =
                  activeSection === item.id ||
                  (item.id === 'programa' && activeSection === 'inicio');
                const pillPresets = ['pill-diag-tl', 'pill-diag-tr', 'pill-bottom-spread', 'pill-edge-mix'] as const;
                return (
                  <li key={item.id} className={isActive ? 'relative z-10' : 'relative z-0'}>
                    <AardvarkPillButton
                      label={item.label}
                      href={`#${item.id}`}
                      active={isActive}
                      withBlocks
                      blockPreset={pillPresets[idx % pillPresets.length]}
                      blockBackColor="#d2d7fc"
                      bgClass="bg-[#F4F6FF]"
                      textClass="text-[#0A0C1A]"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    />
                  </li>
                );
              })}
              <li className="pl-1.5 relative z-10">
                <AardvarkButtonAlt
                  label="Inscribirme"
                  size="sm"
                  variant="dark"
                  onClick={() => scrollToSection('inscripcion', 'Header CTA: Inscribirme')}
                />
              </li>
            </ul>
          </nav>

          {/* Right slot (.header__sub): Instagram & LinkedIn circular social buttons */}
          <div
            className={`hidden lg:flex items-center justify-end gap-2 lg:w-[240px] shrink-0 pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              scrollingStarted
                ? '-translate-y-24 opacity-0 pointer-events-none'
                : 'translate-y-0 opacity-100'
            }`}
          >
            <SquaiSocialLinks bgClass="bg-[#F4F6FF]" iconColorClass="text-[#0A0C1A]" />
          </div>

          {/* Mobile right menu toggle */}
          <div className="flex lg:hidden items-center pointer-events-auto shrink-0">
            <AardvarkButtonAlt
              label={mobileMenuOpen ? 'Cerrar' : 'Menú'}
              size="sm"
              variant="dark"
              icon={mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      {/* Mobile rounded overlay drawer matching Aardvark's .menu container */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#0A0C1A]/45 backdrop-blur-sm p-3 pt-24 flex flex-col justify-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Navegación móvil"
              className="bg-[#eef0fd] rounded-[32px] p-5 shadow-2xl space-y-2.5"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="block py-3.5 px-5 rounded-2xl bg-white text-[#0A0C1A] font-display font-bold text-xl tracking-[-0.02em]"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-2">
                <AardvarkButtonAlt
                  label="Inscribirme al programa"
                  size="md"
                  variant="dark"
                  onClick={() => scrollToSection('inscripcion', 'Menú móvil CTA: Inscribirme')}
                  className="w-full"
                />
              </div>

              <div className="pt-3 flex items-center justify-center">
                <SquaiSocialLinks bgClass="bg-white" iconColorClass="text-[#0A0C1A]" />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
