import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  AardvarkButtonAlt,
  type SquaiBlockPreset,
  SquaiCornerBlocks,
} from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { SquaiMark } from './SquaiBrand';
import { FLOW, INCLUDES, SESSIONS } from '../content/landing';

interface SectionCtaProps {
  onSelectCta: () => void;
}

interface CardStyle {
  cardBg: string;
  blockBackColor: string;
  blockPreset: SquaiBlockPreset;
  tilt: string;
  staggerClass: string;
}

/* Composición de las 4 tarjetas (.books de la referencia: 372 × ~718, radio 32).
   Ilustraciones directo sobre el color de cada tarjeta, como en FlowSection. */
const INCLUDE_CARD_STYLES: CardStyle[] = [
  {
    cardBg: 'bg-[#eef0fd]',
    blockBackColor: '#b4bafc',
    blockPreset: 'mod-1',
    tilt: '-rotate-2',
    staggerClass: 'lg:translate-y-0',
  },
  {
    cardBg: 'bg-[#d2d7fc]',
    blockBackColor: '#a5abfc',
    blockPreset: 'mod-2',
    tilt: 'rotate-[1.8deg]',
    staggerClass: 'lg:translate-y-6',
  },
  {
    cardBg: 'bg-[#e1e4fd]',
    blockBackColor: '#969bfc',
    blockPreset: 'mod-3',
    tilt: '-rotate-[1.6deg]',
    staggerClass: 'lg:translate-y-1',
  },
  {
    cardBg: 'bg-[#8A8EF9]',
    blockBackColor: '#5a5bb6',
    blockPreset: 'mod-4',
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
                    className={`relative z-10 rounded-[var(--card-r)] ${style.cardBg} flex flex-col justify-between shadow-lg h-full min-h-[480px] lg:min-h-[calc(var(--u)*660)]`}
                  >
                    <button
                      type="button"
                      onClick={onSelectCta}
                      className="w-full flex-1 text-left p-[calc(var(--u)*28)] lg:p-[calc(var(--u)*32)] flex flex-col justify-between gap-[calc(var(--u)*20)] cursor-pointer rounded-[var(--card-r)] focus-visible:outline-offset-4"
                    >
                      <div className="flex-1 flex items-end justify-center pt-2">
                        <img
                          src={card.illustration.src}
                          alt={card.illustration.alt}
                          width={1400}
                          height={1365}
                          loading="lazy"
                          draggable={false}
                          className="block w-full h-auto aspect-[1400/1365] select-none transition-transform duration-300 group-hover/card:scale-[1.03]"
                        />
                      </div>

                      <div className="space-y-[calc(var(--u)*10)]">
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
        <SectionBackdrop shape="flow" colors={['#d2d7fc']} opacities={[0.65]} align="xMidYMax" />

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
              <SquaiMark
                variant="color"
                className="w-[max(36px,calc(var(--u)*48))] h-[max(36px,calc(var(--u)*48))] shrink-0"
              />
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

                    <div className="flex-1 flex items-end justify-center">
                      <img
                        src={item.illustration.src}
                        alt={item.illustration.alt}
                        width={1400}
                        height={1365}
                        loading="lazy"
                        draggable={false}
                        className="block w-full h-auto aspect-[1400/1365] select-none"
                      />
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
   7. PROGRAMA · ¿Qué voy a ver y cuándo? (.books "Our Nov books")
   Carrusel horizontal con flechas como el de la referencia: tarjetas
   de 416 × ~720 px de diseño con una ilustración por sesión (Open Peeps
   de Pablo Stanley, CC0, en public/illustrations/sesiones), inclinación y desplazamiento que cambian
   según la distancia al centro, arrastre con mouse en desktop y swipe
   con imán en móvil. Al pasar el cursor, la tarjeta se endereza y asoma
   el botón para reservar.
   ============================================================ */
interface SessionSlideStyle {
  cardBg: string;
  blockColor: string;
  blockPreset: SquaiBlockPreset;
}

/* Tarjetas claras: la ilustración de línea (tinta Midnight, relleno
   blanco) va directo sobre el color de la tarjeta, sin marco interno. */
const SESSION_SLIDE_STYLES: SessionSlideStyle[] = [
  {
    cardBg: 'bg-[#8A8EF9]',
    blockColor: '#303163',
    blockPreset: 'mod-1',
  },
  {
    cardBg: 'bg-[#F9C24D]',
    blockColor: '#8A8EF9',
    blockPreset: 'mod-2',
  },
  {
    cardBg: 'bg-[#d2d7fc]',
    blockColor: '#F9C24D',
    blockPreset: 'mod-3',
  },
  {
    cardBg: 'bg-[#fcf0db]',
    blockColor: '#8A8EF9',
    blockPreset: 'mod-4',
  },
];

/** Inclinación (°) y desplazamiento vertical (%) de cada tarjeta. Fijos (no
 * aleatorios) para que la composición sea estable entre visitas. */
const SESSION_SLIDE_MOTION = [
  { rotate: -2.2, y: -6.5 },
  { rotate: 2.6, y: 4.2 },
  { rotate: -1.7, y: -8.1 },
  { rotate: 2.9, y: 5.6 },
  { rotate: -2.5, y: -3.4 },
  { rotate: 1.9, y: 7.8 },
  { rotate: -2.8, y: -5.2 },
  { rotate: 1.6, y: 3.9 },
];

function prefersReducedMotion() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

export function SessionsSection({ onSelectCta }: SectionCtaProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const frameRef = useRef(0);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const update = useCallback(() => {
    frameRef.current = 0;
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= maxScroll - 4;
    setEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }));

    if (prefersReducedMotion()) return;
    // Mismo cálculo que el ParallaxSlider de la referencia.
    const wrap = track.getBoundingClientRect();
    const center = wrap.left + wrap.width / 2;
    const maxDistance = wrap.width / 2 || 1;
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const norm = Math.max(-2, Math.min(2, (rect.left + rect.width / 2 - center) / maxDistance));
      const strength = Math.sin(norm * 1.2);
      const { rotate, y } = SESSION_SLIDE_MOTION[idx % SESSION_SLIDE_MOTION.length];
      el.style.transform = `translateY(${(strength * y).toFixed(2)}%) rotate(${(strength * rotate).toFixed(2)}deg)`;
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    update();
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [update, scheduleUpdate]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = itemRefs.current[0];
    if (!track || !first) return;
    track.scrollBy({ left: direction * first.offsetWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  /* Arrastre con mouse (en táctil el carrusel usa el scroll nativo). */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !trackRef.current) return;
    dragRef.current = { active: true, moved: false, startX: e.clientX, startScroll: trackRef.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag.active || !track) return;
    const delta = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) > 5) {
      drag.moved = true;
      track.setPointerCapture(e.pointerId);
      track.dataset.dragging = 'true';
    }
    if (drag.moved) track.scrollLeft = drag.startScroll - delta;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    dragRef.current.active = false;
    if (track?.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    if (track) delete track.dataset.dragging;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    // Un arrastre no debe abrir la inscripción al soltar sobre una tarjeta.
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section
      id="sesiones"
      className="w-full relative bg-white text-[#0A0C1A] overflow-clip scroll-mt-10 pb-[var(--books-pb)]"
      aria-labelledby="sessions-heading"
    >
      <div className="relative z-10">
        <header className="relative text-center px-[var(--gutter)] pt-[var(--books-header-pt)] pb-[var(--books-header-pb)]">
          <p className="hidden lg:block absolute top-[calc(var(--u)*150)] left-[calc(var(--u)*116)] -rotate-[10deg] aardvark-handwritten-lg text-[#5a5bb6] max-w-[18ch] text-left">
            {SESSIONS.note}
          </p>
          <div className="flex flex-col items-center gap-[var(--books-header-gap)]">
            <h2 id="sessions-heading" className="aardvark-h2 text-[#0A0C1A] max-w-[18ch]">
              {SESSIONS.title}
            </h2>
            <p className="aardvark-lead text-[#0A0C1A] max-w-[34ch]">{SESSIONS.lead}</p>
            <p className="lg:hidden aardvark-handwritten-lg text-[#5a5bb6] -rotate-2">{SESSIONS.note}</p>
          </div>
        </header>

        <div className="flex justify-end items-center gap-[calc(var(--u)*8)] px-[var(--gutter)] lg:pr-[calc(var(--u)*40)]">
          <SliderArrow direction="prev" label={SESSIONS.prevLabel} disabled={edges.atStart} onClick={() => step(-1)} />
          <SliderArrow direction="next" label={SESSIONS.nextLabel} disabled={edges.atEnd} onClick={() => step(1)} />
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Las 8 sesiones del programa"
          tabIndex={0}
          onScroll={scheduleUpdate}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          className="sessions-track overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x touch-pan-y snap-x snap-mandatory lg:snap-none focus-visible:outline-offset-[-6px]"
        >
          <ol className="flex items-center w-max px-[var(--books-list-px)] pt-[calc(var(--books-list-py)+calc(var(--u)*24))] pb-[calc(var(--books-list-py)+calc(var(--u)*64))]">
            {SESSIONS.items.map((session, idx) => {
              const style = SESSION_SLIDE_STYLES[idx % SESSION_SLIDE_STYLES.length];
              const motionPreset = SESSION_SLIDE_MOTION[idx % SESSION_SLIDE_MOTION.length];
              return (
                <li
                  key={session.number}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className="session-slide list-none shrink-0 snap-start w-[var(--books-item-w)] px-[var(--books-item-px)] will-change-transform"
                  style={{ '--session-rot': `${-motionPreset.rotate}deg` } as React.CSSProperties}
                >
                  <article
                    className="session-slide__inner relative"
                    aria-labelledby={`session-${session.number}-title`}
                  >
                    <SquaiCornerBlocks size="card" preset={style.blockPreset} hoverOnly backColor={style.blockColor} />

                    <div
                      className={`session-slide__bg relative z-[1] ${style.cardBg} rounded-[var(--card-r)] flex items-end min-h-[480px] lg:min-h-[calc(var(--u)*660)]`}
                      aria-hidden="true"
                    >
                      <div className={`session-slide__bg-bottom ${style.cardBg}`} />
                    </div>

                    <div className="relative z-[1] flex flex-col justify-between gap-[calc(var(--u)*20)] p-[calc(var(--u)*28)] lg:p-[calc(var(--u)*32)] min-h-[480px] lg:min-h-[calc(var(--u)*660)] text-[#0A0C1A]">
                      <div className="flex-1 flex items-end justify-center pt-2">
                        <img
                          src={session.illustration.src}
                          alt={session.illustration.alt}
                          width={1400}
                          height={1365}
                          loading="lazy"
                          draggable={false}
                          className="block w-full h-auto aspect-[1400/1365] select-none"
                        />
                      </div>

                      <div className="space-y-[calc(var(--u)*10)]">
                        <time dateTime={session.isoDate} className="sr-only">
                          Sesión {session.number}, {session.date} · {SESSIONS.time}
                        </time>
                        <h3 id={`session-${session.number}-title`} className="aardvark-h3 text-[#0A0C1A]">
                          {session.topic}
                        </h3>
                        <p className="aardvark-small text-[#1c1e2e]">{session.copy}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onSelectCta}
                      className="session-slide__link absolute inset-0 z-[2] cursor-pointer rounded-[var(--card-r)] focus-visible:outline-offset-4"
                      aria-label={`${SESSIONS.cta}: sesión ${session.number}, ${session.topic}`}
                    />

                    <div className="session-slide__cta" aria-hidden="true">
                      <AardvarkButtonAlt label={SESSIONS.cta} variant="dark" tabIndex={-1} />
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SliderArrow({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`slider-arrow ${direction === 'prev' ? 'rotate-180' : ''}`}
    >
      <span className="slider-arrow__bg" aria-hidden="true" />
      <span className="slider-arrow__icon" aria-hidden="true">
        <ArrowRight className="w-[max(16px,calc(var(--u)*18))] h-[max(16px,calc(var(--u)*18))]" strokeWidth={2.75} />
      </span>
    </button>
  );
}
