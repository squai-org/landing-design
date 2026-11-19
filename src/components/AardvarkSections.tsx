import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  AardvarkButtonAlt,
  FlowRibbonSvg,
  FlowStepIllustration,
  type SquaiBlockPreset,
  SquaiCornerBlocks,
  SquaiSingleBlock,
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
  tagStyles: Array<{ bg: string; text: string }>;
  tilt: string;
  staggerClass: string;
}

/* Composición de las 4 tarjetas (.books de la referencia: 372 × ~718, radio 32).
   Color: tintes Periwinkle por tarjeta; el acento Gold queda en una etiqueta. */
const INCLUDE_CARD_STYLES: CardStyle[] = [
  {
    cardBg: 'bg-[#eef0fd]',
    blockBackColor: '#b4bafc',
    blockPreset: 'mod-1',
    tagStyles: [
      { bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]' },
      { bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]' },
    ],
    tilt: '-rotate-2',
    staggerClass: 'lg:translate-y-0',
  },
  {
    cardBg: 'bg-[#d2d7fc]',
    blockBackColor: '#a5abfc',
    blockPreset: 'mod-2',
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
  { bg: 'bg-white', restingRotate: -1.4, restingY: -4 },
  { bg: 'bg-[#8A8EF9]', restingRotate: 1.5, restingY: 8 },
  { bg: 'bg-white', restingRotate: -2.2, restingY: 0 },
];

/* ============================================================
   2. DATOS CLAVE · ¿Qué incluye? (.books Full-Width White Band)
   ============================================================ */
export function IncludesSection({ onSelectCta }: SectionCtaProps) {
  return (
    <section
      id="incluye"
      className="w-full bg-white text-[#0A0C1A] py-[var(--section-py)] px-[var(--gutter)] relative z-10 scroll-mt-10"
      aria-labelledby="includes-heading"
    >
      <div className="mx-auto">
        <div className="text-center max-w-[calc(var(--u)*1280)] mx-auto mb-[calc(var(--u)*24)] space-y-[calc(var(--u)*24)] relative">
          <h2 id="includes-heading" className="aardvark-h2 text-[#0A0C1A]">
            {INCLUDES.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*640)] mx-auto">{INCLUDES.lead}</p>
        </div>

        <div className="text-center mb-[calc(var(--u)*56)]">
          <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[1.6deg]">
            {INCLUDES.handwritten}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-12 lg:gap-[calc(var(--u)*48)] pt-6 pb-8 items-stretch">
          {INCLUDES.cards.map((card, idx) => {
            const style = INCLUDE_CARD_STYLES[idx % INCLUDE_CARD_STYLES.length];
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.48, delay: idx * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className={`aardvark-book-card group/card pt-8 ${style.staggerClass} flex lg:w-[calc(var(--u)*372)] lg:shrink-0`}
              >
                <div className={`aardvark-book-card__inner relative w-full ${style.tilt}`}>
                  <SquaiCornerBlocks
                    size="card"
                    preset={style.blockPreset}
                    hoverOnly
                    backColor={style.blockBackColor}
                  />

                  <div
                    className={`relative z-10 rounded-[var(--card-r)] ${style.cardBg} flex flex-col justify-between shadow-lg h-full min-h-[530px] lg:min-h-[calc(var(--u)*718)]`}
                  >
                    <button
                      type="button"
                      onClick={onSelectCta}
                      className="w-full flex-1 text-left p-[calc(var(--u)*16)] pb-[calc(var(--u)*24)] flex flex-col justify-between gap-[calc(var(--u)*16)] cursor-pointer rounded-[var(--card-r)] focus-visible:outline-offset-4"
                    >
                      <div className="aspect-[4/4.6] w-full rounded-[var(--media-r)] overflow-hidden bg-white">
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

                      <div className="flex flex-wrap gap-[calc(var(--u)*6)] px-[calc(var(--u)*4)]">
                        {card.tags.map((tag, tagIdx) => {
                          const tagStyle = style.tagStyles[tagIdx % style.tagStyles.length];
                          return (
                            <span key={tag} className={`aardvark-tag ${tagStyle.bg} ${tagStyle.text}`}>
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                      <div className="space-y-[calc(var(--u)*10)] px-[calc(var(--u)*4)]">
                        <h3 className="aardvark-h3 text-[#0A0C1A]">{card.title}</h3>
                        <p className="aardvark-small text-[#1c1e2e]">{card.note}</p>
                      </div>
                    </button>

                    <div
                      className={`aardvark-book-card__bg-bottom ${style.cardBg} -mt-12 -z-10`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="aardvark-book-card__cta" aria-hidden="true">
                    <AardvarkButtonAlt label={INCLUDES.ctaCard} variant="dark" tabIndex={-1} />
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
   Cards 451 × 633 design px, radius 32, overlapping in one row.
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
      className="w-full bg-white text-[#0A0C1A] p-[var(--band-inset)]"
      aria-labelledby="flow-heading"
    >
      <div className="w-full relative bg-[#eef0fd] rounded-[var(--band-r)] overflow-hidden py-[var(--section-py)] px-[var(--gutter)] lg:px-[calc(var(--u)*112)]">
        <div className="absolute inset-x-0 top-0 pointer-events-none select-none opacity-80" aria-hidden="true">
          <FlowRibbonSvg />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-[calc(var(--u)*80)]">
            <div className="space-y-[calc(var(--u)*16)] max-w-[calc(var(--u)*1040)]">
              <h2 id="flow-heading" className="aardvark-h2 text-[#0A0C1A]">
                {FLOW.title}
              </h2>
              <p className="aardvark-handwritten-lg text-[#5a5bb6] inline-block rotate-[1.8deg]">
                {FLOW.handwritten}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <span className="w-[max(44px,calc(var(--u)*56))] h-[max(44px,calc(var(--u)*56))] rounded-full bg-white inline-flex items-center justify-center shrink-0">
                <SquaiMark variant="color" className="w-1/2 h-1/2" />
              </span>
              <AardvarkButtonAlt label={FLOW.cta} variant="dark" onClick={onSelectCta} />
            </div>
          </div>

          <motion.ol
            style={{ y: flowDeckY }}
            onMouseLeave={() => setHoveredFlowIdx(null)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-stretch pt-4 pb-6"
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
                    className={`${style.bg} rounded-[var(--card-r)] p-[calc(var(--u)*40)] shadow-xl min-h-[calc(var(--u)*460)] lg:min-h-[calc(var(--u)*633)] flex flex-col justify-between gap-6`}
                  >
                    <div className="text-center">
                      <span className="aardvark-handwritten-lg text-[#0A0C1A]">{item.step}</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center py-2">
                      <FlowStepIllustration stepIndex={idx} />
                    </div>

                    <div className="space-y-[calc(var(--u)*12)]">
                      <h3 className="aardvark-h3 text-[#0A0C1A]">{item.title}</h3>
                      <p className="aardvark-body text-[#1c1e2e]">{item.copy}</p>
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
   Sessions use the reference app-store badges: straight Midnight boxes,
   radius 16, icon left and two lines of text.
   ============================================================ */
export function SessionsSection({ onSelectCta }: SectionCtaProps) {
  return (
    <section
      id="sesiones"
      className="w-full bg-white text-[#0A0C1A] p-[var(--band-inset)] scroll-mt-10"
      aria-labelledby="sessions-heading"
    >
      <div className="w-full relative bg-[#d2d7fc] rounded-[var(--band-r)] overflow-hidden py-[calc(var(--section-py)*1.3)] px-[var(--gutter)]">
        <div className="relative flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, rotate: -6, y: 12 }}
            whileInView={{ opacity: 1, rotate: -2.5, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="lg:absolute lg:-top-[calc(var(--u)*40)] lg:right-[calc(var(--u)*80)] aardvark-handwritten-lg text-[#303163] max-w-[calc(var(--u)*360)] mb-8 lg:mb-0"
          >
            {SESSIONS.note}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <h2 id="sessions-heading" className="aardvark-h1 text-[#0A0C1A]">
              <span className="block">{SESSIONS.titleTop}</span>
              <span className="inline-flex items-center justify-center gap-[calc(var(--u)*20)] bg-[#0A0C1A] text-[#F4F6FF] px-[calc(var(--u)*40)] py-[calc(var(--u)*12)] rounded-[calc(var(--u)*30)] mt-[calc(var(--u)*12)] shadow-2xl -rotate-[1.2deg]">
                <span>{SESSIONS.titleBox}</span>
                <SquaiMark variant="color" className="w-[0.7em] h-[0.7em] shrink-0" />
              </span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[calc(var(--u)*900)] flex justify-center lg:justify-end pt-[calc(var(--u)*24)] pb-[calc(var(--u)*48)]">
            <span className="aardvark-handwritten-lg text-[#303163] rotate-[3deg] inline-block">
              {SESSIONS.tagline}
            </span>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[calc(var(--u)*16)] w-full max-w-[calc(var(--u)*1680)] pb-[calc(var(--u)*56)]">
            {SESSIONS.items.map((session, idx) => (
              <motion.li
                key={session.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.32, 0.72, 0, 1] }}
                className="list-none bg-[#0A0C1A] text-[#F4F6FF] rounded-[calc(var(--u)*16)] min-h-[max(72px,calc(var(--u)*96))] px-[calc(var(--u)*20)] py-[calc(var(--u)*14)] flex items-center gap-[calc(var(--u)*16)] text-left"
              >
                <span className="relative inline-flex items-center justify-center shrink-0 w-[max(40px,calc(var(--u)*52))] h-[max(40px,calc(var(--u)*52))]" aria-hidden="true">
                  <SquaiSingleBlock color="#F9C24D" className="absolute inset-0 w-full h-full" />
                  <span className="relative font-display font-bold text-[max(16px,calc(var(--u)*22))] text-[#0A0C1A] tabular-nums">
                    {session.number}
                  </span>
                </span>
                <span className="flex flex-col gap-[calc(var(--u)*4)] min-w-0">
                  <span className="text-[max(14px,calc(var(--u)*16))] leading-tight text-[#c3c9fc]">
                    <span className="sr-only">Sesión {session.number}, </span>
                    <time dateTime={session.isoDate}>
                      {session.date} · {SESSIONS.time}
                    </time>
                  </span>
                  <span className="font-display font-bold text-[max(16px,calc(var(--u)*24))] leading-[1.1] tracking-[-0.02em]">
                    {session.topic}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>

          <div>
            <AardvarkButtonAlt label={SESSIONS.cta} variant="dark" onClick={onSelectCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
