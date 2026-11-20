import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AardvarkButtonAlt, SquaiSingleBlock } from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { HERO } from '../content/landing';

interface AardvarkHeroProps {
  onPrimaryCta: () => void;
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
export function AardvarkHero({ onPrimaryCta }: AardvarkHeroProps) {
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
          {/* La foto, el bloque dorado y los dos bloques de datos comparten un
              mismo marco con la proporción de la foto: todo se posiciona y
              escala en % de la persona, así la composición es la misma en
              móvil, tablet y desktop. */}
          <motion.div
            style={{ y: personY }}
            className="absolute bottom-0 right-[12%] h-[96%] lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:h-[calc(100%-var(--u)*170)] aspect-[768/1050]"
          >
            <motion.div
              style={{ y: blockY }}
              aria-hidden="true"
              className="absolute left-[62%] top-[6%] w-[42%]"
            >
              <SquaiSingleBlock color="#F9C24D" className="w-full h-auto rotate-[14deg]" />
            </motion.div>

            <img
              src={HERO.person.src}
              alt={HERO.person.alt}
              width={HERO.person.width}
              height={HERO.person.height}
              fetchPriority="high"
              draggable={false}
              className="relative block w-full h-full select-none"
            />

            {/* Bloques de datos: fondo Midnight, texto Canvas (18:1), fuente Gloria */}
            <p className="absolute right-[80%] top-[20%] sm:top-[40%] lg:right-auto lg:left-[-10%] lg:top-[56%] w-max max-w-[calc(var(--u)*150)] sm:max-w-none -rotate-[4deg] bg-[#0A0C1A] text-[#F4F6FF] rounded-[18px] sm:rounded-[var(--tag-r)] px-[calc(var(--u)*14)] py-[calc(var(--u)*9)] sm:px-[calc(var(--u)*16)] sm:py-[calc(var(--u)*10)] font-human text-[length:max(15px,var(--fs-tag))] lg:text-[length:calc(var(--u)*28)] leading-snug sm:whitespace-nowrap shadow-xl">
              {HERO.note}
            </p>
            <p className="absolute right-[76%] top-[46%] sm:top-[64%] lg:right-auto lg:left-[59%] lg:top-[70%] w-max max-w-[calc(var(--u)*150)] sm:max-w-none rotate-[3deg] bg-[#0A0C1A] text-[#F4F6FF] rounded-[18px] sm:rounded-full px-[calc(var(--u)*14)] py-[calc(var(--u)*9)] sm:px-[calc(var(--u)*22)] sm:py-[calc(var(--u)*12)] font-human text-[length:max(15px,var(--fs-tag))] lg:text-[length:calc(var(--u)*28)] leading-snug sm:whitespace-nowrap shadow-xl">
              {HERO.stickerNoCode}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
