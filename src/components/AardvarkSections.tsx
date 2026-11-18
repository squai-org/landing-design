import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  AardvarkButtonAlt,
  FlowRibbonSvg,
  FlowStepIllustration,
  type SquaiBlockPreset,
  SquaiCornerBlocks,
} from './AardvarkPrimitives';
import { SquaiMark } from './SquaiBrand';
import { CertificateMockup, GuideMockup } from './IncludesMockups';
import { FLOW, INCLUDES, SESSIONS, pexelsUrl } from '../content/landing';

interface SectionCtaProps {
  onSelectCta: () => void;
}

interface CardStyle {
  cardBg: string;
  blockBackColor: string;
  blockPreset: SquaiBlockPreset;
  ctaVariant: 'dark' | 'periwinkle' | 'marigold' | 'white';
  tagStyles: Array<{ bg: string; text: string }>;
  tilt: string;
  staggerClass: string;
}

/* Composición de las 4 tarjetas (.books de la referencia). */
const INCLUDE_CARD_STYLES: CardStyle[] = [
  {
    cardBg: 'bg-[#eef0fd]',
    blockBackColor: '#b4bafc',
    blockPreset: 'mod-1',
    ctaVariant: 'dark',
    tagStyles: [
      { bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]' },
      { bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]' },
    ],
    tilt: '-rotate-2',
    staggerClass: 'lg:translate-y-0',
  },
  {
    cardBg: 'bg-[#F9C24D]',
    blockBackColor: '#ffe29a',
    blockPreset: 'mod-2',
    ctaVariant: 'dark',
    tagStyles: [
      { bg: 'bg-[#0A0C1A]', text: 'text-[#F9C24D]' },
      { bg: 'bg-white', text: 'text-[#0A0C1A]' },
    ],
    tilt: 'rotate-[1.8deg]',
    staggerClass: 'lg:translate-y-6',
  },
  {
    cardBg: 'bg-[#e1e4fd]',
    blockBackColor: '#969bfc',
    blockPreset: 'mod-3',
    ctaVariant: 'dark',
    tagStyles: [
      { bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]' },
      { bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]' },
    ],
    tilt: '-rotate-[1.6deg]',
    staggerClass: 'lg:translate-y-1',
  },
  {
    cardBg: 'bg-[#8A8EF9]',
    blockBackColor: '#5a5bb6',
    blockPreset: 'mod-4',
    ctaVariant: 'dark',
    tagStyles: [
      { bg: 'bg-[#F9C24D]', text: 'text-[#0A0C1A]' },
      { bg: 'bg-white', text: 'text-[#0A0C1A]' },
    ],
    tilt: 'rotate-2',
    staggerClass: 'lg:translate-y-7',
  },
];

const FLOW_STEP_STYLES = [
  { bg: 'bg-[#8A8EF9]', restingRotate: 2.2, restingY: 4 },
  { bg: 'bg-[#F9C24D]', restingRotate: -1.4, restingY: -4 },
  { bg: 'bg-white', restingRotate: 1.5, restingY: 8 },
  { bg: 'bg-[#d2d7fc]', restingRotate: -2.2, restingY: 0 },
];

const SESSION_PILL_STYLES = [
  { bg: 'bg-white', tilt: '-rotate-3' },
  { bg: 'bg-[#F9C24D]', tilt: 'rotate-2' },
  { bg: 'bg-[#8A8EF9]', tilt: '-rotate-2' },
  { bg: 'bg-white', tilt: 'rotate-3' },
];

/* ============================================================
   2. DATOS CLAVE · ¿Qué incluye? (.books Full-Width White Band)
   ============================================================ */
export function IncludesSection({ onSelectCta }: SectionCtaProps) {
  return (
    <section
      id="incluye"
      className="w-full bg-white text-[#0A0C1A] pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 relative z-10 scroll-mt-10"
      aria-labelledby="includes-heading"
    >
      <div className="max-w-[1680px] mx-auto">
        <div className="text-center max-w-[960px] mx-auto mb-8 sm:mb-10 space-y-5 relative">
          <h2 id="includes-heading" className="aardvark-h2 text-[#0A0C1A]">
            {INCLUDES.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[560px] mx-auto">{INCLUDES.lead}</p>
        </div>

        <div className="text-center mb-10 sm:mb-14">
          <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[1.6deg]">
            {INCLUDES.handwritten}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-10 pt-6 pb-8 items-stretch">
          {INCLUDES.cards.map((card, idx) => {
            const style = INCLUDE_CARD_STYLES[idx % INCLUDE_CARD_STYLES.length];
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.48, delay: idx * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className={`aardvark-book-card group/card pt-8 ${style.staggerClass} flex`}
              >
                <div className={`aardvark-book-card__inner relative w-full ${style.tilt}`}>
                  <SquaiCornerBlocks
                    size="card"
                    preset={style.blockPreset}
                    hoverOnly
                    backColor={style.blockBackColor}
                  />

                  <div
                    className={`relative z-10 rounded-[34px] ${style.cardBg} flex flex-col justify-between shadow-lg h-full min-h-[530px] lg:min-h-[565px]`}
                  >
                    <button
                      type="button"
                      onClick={onSelectCta}
                      className="w-full flex-1 text-left p-3 sm:p-3.5 pb-6 flex flex-col justify-between gap-4 cursor-pointer rounded-[34px] focus-visible:outline-offset-4"
                    >
                      <div className="aspect-[4/4.6] w-full rounded-[24px] overflow-hidden bg-white">
                        {card.photo ? (
                          <img
                            src={pexelsUrl(card.photo.imageId)}
                            alt={card.photo.alt}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                          />
                        ) : card.mockup === 'guide' ? (
                          <GuideMockup />
                        ) : (
                          <CertificateMockup />
                        )}
                      </div>

                      <div className="space-y-2 px-2">
                        <h3 className="aardvark-h3 text-[#0A0C1A]">{card.title}</h3>
                        <p className="aardvark-body text-[#0A0C1A]/85">{card.note}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 px-2 pt-0.5">
                        {card.tags.map((tag, tagIdx) => {
                          const tagStyle = style.tagStyles[tagIdx % style.tagStyles.length];
                          return (
                            <span
                              key={tag}
                              className={`px-3.5 py-1.5 rounded-lg text-sm font-display font-bold ${tagStyle.bg} ${tagStyle.text}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </button>

                    <div
                      className={`aardvark-book-card__bg-bottom ${style.cardBg} -mt-12 -z-10`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="aardvark-book-card__cta" aria-hidden="true">
                    <AardvarkButtonAlt label={INCLUDES.ctaCard} size="sm" variant={style.ctaVariant} tabIndex={-1} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. CÓMO ES EL PROGRAMA · ¿Cómo funciona? (.flow Inset Band)
   ============================================================ */
export function FlowSection({ onSelectCta }: SectionCtaProps) {
  const [hoveredFlowIdx, setHoveredFlowIdx] = useState<number | null>(null);
  const flowRef = useRef<HTMLElement>(null);
  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ['start end', 'end start'],
  });
  const flowDeckY = useTransform(flowProgress, [0, 1], [32, -32]);

  return (
    <section
      id="como-funciona"
      ref={flowRef}
      className="w-full bg-white text-[#0A0C1A] py-4 sm:py-6 px-3 sm:px-5 lg:px-6"
      aria-labelledby="flow-heading"
    >
      <div className="w-full relative bg-[#eef0fd] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 pointer-events-none select-none opacity-80" aria-hidden="true">
          <FlowRibbonSvg />
        </div>

        <div className="max-w-[1680px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-14 sm:mb-20">
            <div className="space-y-4 max-w-[780px]">
              <h2 id="flow-heading" className="aardvark-h2 text-[#0A0C1A]">
                {FLOW.title}
              </h2>
              <p className="aardvark-handwritten-lg text-[#5a5bb6] inline-block rotate-[1.8deg]">
                {FLOW.handwritten}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <span className="w-14 h-14 rounded-full bg-white inline-flex items-center justify-center shrink-0">
                <SquaiMark variant="color" className="w-7 h-7" />
              </span>
              <AardvarkButtonAlt label={FLOW.cta} variant="dark" size="lg" onClick={onSelectCta} />
            </div>
          </div>

          <motion.ol
            style={{ y: flowDeckY }}
            onMouseLeave={() => setHoveredFlowIdx(null)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-stretch pt-4 pb-6 lg:px-10"
          >
            {FLOW.steps.map((item, idx) => {
              const style = FLOW_STEP_STYLES[idx % FLOW_STEP_STYLES.length];
              const isHovered = hoveredFlowIdx === idx;
              let pushPercent = 0;
              if (hoveredFlowIdx !== null && hoveredFlowIdx !== idx) {
                pushPercent = 18 / (idx - hoveredFlowIdx);
              }

              return (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 120, rotate: style.restingRotate * 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: 'spring', stiffness: 185, damping: 18, delay: idx * 0.08 }}
                  className="aardvark-flow-item relative list-none"
                  style={{ zIndex: isHovered ? 40 : 10 + idx }}
                  onMouseEnter={() => setHoveredFlowIdx(idx)}
                >
                  <motion.div
                    animate={{
                      x: `${pushPercent}%`,
                      scale: isHovered ? 1.075 : 1,
                      rotate: isHovered ? 0 : style.restingRotate,
                      y: isHovered ? -10 : style.restingY,
                    }}
                    transition={{ duration: 0.48, ease: [0.32, 0.72, 0, 1] }}
                    className={`${style.bg} rounded-[36px] p-8 sm:p-10 shadow-xl min-h-[485px] lg:min-h-[520px] flex flex-col justify-between gap-6`}
                  >
                    <div className="text-center">
                      <span className="aardvark-handwritten-lg text-[#0A0C1A]">{item.step}</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center py-2">
                      <FlowStepIllustration stepIndex={idx} />
                    </div>

                    <div className="space-y-3">
                      <h3 className="aardvark-h3 text-[#0A0C1A]">{item.title}</h3>
                      <p className="aardvark-body text-[#0A0C1A]/85">{item.copy}</p>
                    </div>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. PROGRAMA · ¿Qué voy a ver y cuándo? (.box Centered Inset Showcase)
   ============================================================ */
export function SessionsSection({ onSelectCta }: SectionCtaProps) {
  return (
    <section
      id="sesiones"
      className="w-full bg-white text-[#0A0C1A] py-4 sm:py-6 px-3 sm:px-5 lg:px-6 scroll-mt-10"
      aria-labelledby="sessions-heading"
    >
      <div className="w-full relative bg-[#d2d7fc] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden py-24 sm:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1340px] mx-auto relative flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, rotate: -6, y: 12 }}
            whileInView={{ opacity: 1, rotate: -2.5, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="lg:absolute lg:-top-14 lg:right-2 xl:right-6 font-human text-lg sm:text-xl text-[#303163] max-w-[270px] leading-snug mb-8 lg:mb-0"
          >
            {SESSIONS.note}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="space-y-4 sm:space-y-5"
          >
            <h2 id="sessions-heading" className="aardvark-h1 text-[#0A0C1A]">
              <span className="block">{SESSIONS.titleTop}</span>
              <span className="inline-flex items-center justify-center gap-3 sm:gap-5 bg-[#0A0C1A] text-[#F4F6FF] px-6 sm:px-10 py-2.5 sm:py-4 rounded-[22px] sm:rounded-[30px] mt-3 shadow-2xl -rotate-[1.2deg]">
                <span>{SESSIONS.titleBox}</span>
                <SquaiMark variant="color" className="w-9 h-9 sm:w-14 sm:h-14 shrink-0" />
              </span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[680px] flex justify-center lg:justify-end pt-6 pb-8">
            <span className="aardvark-handwritten-lg text-[#303163] rotate-[3deg] inline-block">
              {SESSIONS.tagline}
            </span>
          </div>

          <ol className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 max-w-[1080px] pb-10">
            {SESSIONS.items.map((session, idx) => {
              const style = SESSION_PILL_STYLES[idx % SESSION_PILL_STYLES.length];
              return (
                <motion.li
                  key={session.number}
                  initial={{ opacity: 0, scale: 0.78, rotate: idx % 2 === 0 ? -8 : 8 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -1.8 : 1.8 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18, delay: idx * 0.06 }}
                  whileHover={{ scale: 1.06, rotate: 0 }}
                  className={`${style.bg} ${style.tilt} rounded-[22px] px-6 py-3.5 shadow-md text-left list-none`}
                >
                  <span className="block text-sm text-[#0A0C1A] tabular-nums">
                    Sesión {session.number} · {session.date}
                  </span>
                  <span className="block font-display font-bold text-lg sm:text-xl leading-tight text-[#0A0C1A]">
                    {session.topic}
                  </span>
                </motion.li>
              );
            })}
          </ol>

          <div>
            <AardvarkButtonAlt label={SESSIONS.cta} variant="dark" size="lg" onClick={onSelectCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
