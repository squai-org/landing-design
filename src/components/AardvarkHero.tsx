import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AardvarkButtonAlt, SquaiSingleBlock } from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { HERO } from '../content/landing';

interface AardvarkHeroProps {
  onPrimaryCta: () => void;
  onExploreSessions: () => void;
}

/* ============================================================
   1. ENCABEZADO (.hero de la referencia)
   Mismas medidas que la referencia en unidades de diseño: el bloque de
   texto arranca en x 20 / y 240 (desktop), el título mide 160 con
   ancho máximo 1232, el párrafo 24 con ancho 421 y el botón queda 16
   debajo. En desktop la sección mide 1100 de alto (sin franja vacía bajo
   el botón) y la persona arranca a la altura del título; en móvil y tablet,
   al menos una pantalla, con las tarjetas recortadas contra el borde
   inferior como el libro de la referencia.
   ============================================================ */
export function AardvarkHero({ onPrimaryCta, onExploreSessions }: AardvarkHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const personY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const blockY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 84]);

  return (
    <div className="bg-white">
      <section
        id="inicio"
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="w-full relative bg-[#8A8EF9] text-[#0A0C1A] rounded-b-[var(--edge-r)] overflow-hidden h-[100svh] min-h-[640px] flex flex-col lg:block lg:min-h-0 lg:h-[calc(var(--u)*1100)]"
      >
        {/* El marco extra arriba y abajo cubre el recorrido del parallax. */}
        <SectionBackdrop
          shape="hero"
          colors={['#969bfc', '#777ae3']}
          opacities={[0.45, 0.35]}
          align="xMaxYMin"
          small
          frameClassName="absolute inset-x-0 -top-[8%] -bottom-[14%]"
          y={ribbonY}
        />

        {/* Bloque de texto (.hero__content) */}
        <div className="relative z-20 flex flex-col pl-[var(--hero-x)] pr-[var(--gutter)] pt-[var(--hero-title-top)]">
          <h1 id="hero-heading" className="aardvark-h1 aardvark-hero-title text-[#0A0C1A] max-w-[var(--hero-title-w)]">
            {HERO.title}
          </h1>

          <p className="aardvark-hero-lead text-[#0A0C1A] max-w-[var(--hero-p-w)] mt-[var(--hero-gap-title)]">{HERO.lead}</p>

          <div className="flex items-center gap-x-5 mt-[var(--hero-gap-cta)]">
            <AardvarkButtonAlt label={HERO.ctaPrimary} variant="dark" onClick={onPrimaryCta} />
            <button
              type="button"
              onClick={onExploreSessions}
              className="hidden lg:inline-flex items-center font-display font-bold text-[length:var(--btn-fs)] text-[#0A0C1A] underline decoration-2 underline-offset-4 hover:text-[#303163] transition-colors min-h-[44px] cursor-pointer whitespace-nowrap"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
          <p className="aardvark-small font-bold text-[#0A0C1A] mt-[calc(var(--u)*14)]">{HERO.schedule}</p>
        </div>

        {/* Persona recortada sobre las formas de la marca (como los heros de
            referencia): un arco detrás, el bloque del logo asomando por
            encima del hombro y la cabeza rompiendo el borde del arco. La foto
            se corta contra el borde inferior del encabezado. */}
        <div className="relative z-10 flex-1 min-h-[280px] w-full mt-[calc(var(--u)*24)] lg:absolute lg:mt-0 lg:min-h-0 lg:inset-y-0 lg:right-[calc(var(--u)*190)] lg:w-[calc(var(--u)*640)]">
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-[6%] w-[64%] h-[72%] lg:right-[6%] lg:w-[88%] lg:h-[62%] rounded-t-full bg-[#777ae3]"
          />
          <motion.div
            style={{ y: blockY }}
            aria-hidden="true"
            className="absolute right-[2%] bottom-[48%] w-[34%] lg:right-[-2%] lg:bottom-[60%] lg:w-[26%]"
          >
            <SquaiSingleBlock color="#F9C24D" className="w-full h-auto rotate-[14deg]" />
          </motion.div>

          <motion.img
            style={{ y: personY }}
            src={HERO.person.src}
            alt={HERO.person.alt}
            width={HERO.person.width}
            height={HERO.person.height}
            fetchPriority="high"
            draggable={false}
            className="absolute bottom-0 right-[12%] h-[96%] lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:h-[calc(100%-var(--u)*170)] w-auto max-w-none select-none"
          />

          {/* Bloques de datos con contraste de marca (Brand Guideline v8.7):
              Midnight + Canvas (18:1) y Gold + Midnight (11,9:1) */}
          <p className="absolute left-0 top-[26%] lg:left-[-14%] lg:top-[64%] -rotate-[4deg] bg-[#0A0C1A] text-[#F4F6FF] rounded-[var(--tag-r)] px-[calc(var(--u)*16)] py-[calc(var(--u)*10)] font-display font-bold text-[length:var(--fs-tag)] lg:text-[length:calc(var(--u)*30)] leading-tight whitespace-nowrap shadow-xl">
            {HERO.note}
          </p>
          <p className="hidden sm:block absolute right-[4%] top-[80%] lg:right-[-10%] lg:top-[76%] rotate-[4deg] bg-[#F9C24D] text-[#0A0C1A] rounded-full px-[calc(var(--u)*22)] py-[calc(var(--u)*12)] font-display font-bold text-[length:var(--fs-tag)] lg:text-[length:calc(var(--u)*30)] leading-tight whitespace-nowrap shadow-xl">
            {HERO.stickerNoCode}
          </p>
        </div>
      </section>
    </div>
  );
}
