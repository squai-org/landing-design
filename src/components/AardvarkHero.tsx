import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AardvarkButtonAlt, SquaiCornerBlocks } from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { HERO, pexelsUrl } from '../content/landing';

interface AardvarkHeroProps {
  onPrimaryCta: () => void;
  onExploreSessions: () => void;
}

/* ============================================================
   1. ENCABEZADO (.hero de la referencia)
   El encabezado completo cabe en la primera pantalla en cualquier
   dispositivo: la sección mide 100svh, el título escala con el alto
   disponible y, en móvil, las tarjetas ocupan el espacio que sobra y se
   recortan contra el borde inferior (como el libro de la referencia).
   ============================================================ */
export function AardvarkHero({ onPrimaryCta, onExploreSessions }: AardvarkHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const visualDeckY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 84]);

  return (
    <div className="bg-white">
      <section
        id="inicio"
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="aardvark-hero w-full relative bg-[#8A8EF9] text-[#0A0C1A] rounded-b-[var(--edge-r)] overflow-hidden h-[100svh] min-h-[540px] pt-[var(--hero-pt)] px-[var(--gutter)] flex flex-col lg:flex-row lg:items-center lg:gap-[calc(var(--u)*40)] lg:pb-[calc(var(--u)*48)]"
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

        {/* Texto: título, bajada, CTA y nota manuscrita */}
        <div className="relative z-10 flex flex-col gap-[var(--hero-gap)] lg:w-[58%] shrink-0 lg:self-center">
          <p className="order-first self-end lg:self-start aardvark-handwritten-lg text-[#0A0C1A] max-w-[22ch] lg:max-w-none text-right lg:text-left rotate-[3deg] lg:-rotate-1 lg:order-last">
            {HERO.note}
          </p>

          <h1 id="hero-heading" className="aardvark-h1 aardvark-hero-title text-[#0A0C1A] max-w-[11ch]">
            {HERO.title}
          </h1>

          <p className="aardvark-body text-[#0A0C1A] max-w-[calc(var(--u)*640)] lg:max-w-[30ch]">{HERO.lead}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <AardvarkButtonAlt label={HERO.ctaPrimary} variant="dark" onClick={onPrimaryCta} />
            <button
              type="button"
              onClick={onExploreSessions}
              className="font-display font-bold text-[length:var(--btn-fs)] text-[#0A0C1A] underline decoration-2 underline-offset-4 hover:text-[#303163] transition-colors min-h-[44px] cursor-pointer whitespace-nowrap"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Tarjetas: ocupan el alto restante y nunca empujan el contenido fuera de la pantalla */}
        <div className="relative z-10 flex-1 min-h-0 w-full mt-[calc(var(--u)*28)] lg:mt-0 lg:h-full flex justify-center lg:items-center lg:justify-end">
          <div className="relative w-full max-w-[420px] h-[380px] sm:max-w-[600px] sm:h-[560px] lg:max-w-none lg:w-auto lg:h-[min(100%,calc(var(--u)*920))] lg:aspect-[740/920]">
            <motion.div
              style={{ y: secondaryCardY }}
              className="group/hero1 absolute left-[2%] top-[6%] w-[53%] lg:left-0 lg:top-0 lg:w-[58%] -rotate-[3.5deg] z-10 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300"
            >
              <SquaiCornerBlocks size="card" preset="hero-left" backColor="#d2d7fc" />
              <div className="relative z-10 bg-white rounded-[28px] sm:rounded-[38px] lg:rounded-[calc(var(--u)*48)] p-2.5 sm:p-4 lg:p-[calc(var(--u)*20)] shadow-2xl">
                <div className="pb-2 sm:pb-3 pt-1 px-1.5 sm:px-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <span className="aardvark-h3 text-[#0A0C1A]">{HERO.cardLive.title}</span>
                  <span className="font-human text-sm sm:text-lg lg:text-[length:calc(var(--fs-hand)*0.8)] text-[#5a5bb6]">{HERO.cardLive.note}</span>
                </div>
                <div className="aspect-[4/4.7] rounded-[20px] sm:rounded-[28px] lg:rounded-[calc(var(--u)*36)] overflow-hidden bg-[#eef0fd]">
                  <img
                    src={pexelsUrl(HERO.cardLive.imageId, 1000)}
                    alt={HERO.cardLive.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: visualDeckY }}
              className="group/hero2 absolute right-[2%] top-[16%] w-[53%] lg:right-0 lg:top-[11%] lg:w-[60%] rotate-[3deg] z-20 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300"
            >
              <SquaiCornerBlocks size="card" preset="hero-right" backColor="#fedea0" />
              <div className="relative z-10 bg-[#F9C24D] rounded-[28px] sm:rounded-[38px] lg:rounded-[calc(var(--u)*48)] p-2.5 sm:p-4 lg:p-[calc(var(--u)*20)] shadow-2xl">
                <div className="aspect-[4/4.7] rounded-[20px] sm:rounded-[28px] lg:rounded-[calc(var(--u)*36)] overflow-hidden bg-[#eef0fd]">
                  <img
                    src={pexelsUrl(HERO.cardNoCode.imageId, 1000)}
                    alt={HERO.cardNoCode.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-3 sm:pt-4 pb-1 px-1.5 sm:px-2">
                  <p className="aardvark-h3 text-[#0A0C1A]">{HERO.cardNoCode.title}</p>
                  <p className="font-human text-sm sm:text-lg lg:text-[length:calc(var(--fs-hand)*0.8)] text-[#0A0C1A] mt-0.5">{HERO.cardNoCode.note}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
