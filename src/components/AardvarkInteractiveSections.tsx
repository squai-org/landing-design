import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  AardvarkButtonAlt,
  AardvarkPillButton,
  BadgeRibbonSvg,
} from './AardvarkPrimitives';
import { SectionBackdrop } from './Backdrops';
import { PresentationMedia } from './PresentationMedia';
import { trackConversionEvent } from '../utils/analyticsClient';
import {
  AUDIENCE,
  FAQ,
  KEY_FACTS,
  MENTORS,
  OUTCOMES,
  PRESENTATION,
  pexelsUrl,
} from '../content/landing';

type Currency = 'COP' | 'USD';

interface CurrencyCtaProps {
  currency: Currency;
  onSelectCta: (chosenCurrency?: Currency, trackLabel?: string) => void;
}

/* ============================================================
   3. PRESENTACIÓN · ¿Quién me va a enseñar? (.gift)
   Título estático, sin animación ni scroll fijado, con el mismo
   espacio arriba y abajo que los títulos de las demás secciones.
   ============================================================ */
export function PresentationSection({ onMeetMentors }: { onMeetMentors: () => void }) {
  const { video } = PRESENTATION;

  return (
    <section
      id="presentacion"
      className="w-full relative bg-[#eef0fd] text-[#0A0C1A] rounded-t-[var(--edge-r)] overflow-hidden pt-[var(--section-py)] pb-[calc(var(--section-py)+var(--edge-r))] scroll-mt-16"
      aria-labelledby="presentation-heading"
    >
      <SectionBackdrop shape="faq" colors={['#FFFFFF']} opacities={[0.7]} flip="x" align="xMaxYMin" />

        <div className="relative z-10 text-center max-w-[calc(var(--u)*1280)] mx-auto px-[var(--gutter)] mb-[calc(var(--u)*56)]">
          <h2 id="presentation-heading" className="aardvark-h2 text-[#0A0C1A]">
            {PRESENTATION.title}
          </h2>
        </div>

        <div className="relative z-10 max-w-[calc(var(--u)*1760)] mx-auto px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*56)] items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6 space-y-[calc(var(--u)*28)]"
          >
            <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[1.5deg]">
              {PRESENTATION.handwritten}
            </span>

            <p className="aardvark-medium text-[#0A0C1A] max-w-[calc(var(--u)*720)]">{PRESENTATION.lead}</p>

            <p className="aardvark-small text-[#525770] max-w-[calc(var(--u)*660)]">{PRESENTATION.body}</p>

            <div className="pt-1">
              <AardvarkButtonAlt label={PRESENTATION.cta} variant="dark" onClick={onMeetMentors} />
            </div>

            <div className="pt-[calc(var(--u)*24)] space-y-[calc(var(--u)*12)]">
              <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[4deg]">
                {PRESENTATION.logosLabel}
              </span>
              <ul className="flex flex-wrap gap-[calc(var(--u)*12)]" aria-label={PRESENTATION.logosLabel}>
                {PRESENTATION.logos.map((logo) => (
                  <li
                    key={logo}
                    className="h-[max(56px,calc(var(--u)*104))] min-w-[max(56px,calc(var(--u)*104))] px-[calc(var(--u)*16)] rounded-[calc(var(--u)*26)] bg-[#f2f3f6] inline-flex items-center justify-center font-display font-bold text-[max(14px,calc(var(--u)*20))] tracking-[-0.03em] text-[#303163]"
                  >
                    {logo}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.figure
              initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: 2.5, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 210, damping: 18 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full max-w-[calc(var(--u)*760)] bg-white rounded-[calc(var(--u)*48)] p-[calc(var(--u)*20)] shadow-2xl"
            >
              <div className="aspect-[4/4.2] rounded-[var(--card-r)] overflow-hidden bg-[#d2d7fc]">
                <PresentationMedia
                  src={video.src}
                  poster={pexelsUrl(video.imageId, 1000)}
                  alt={video.alt}
                  captionsSrc={video.captionsSrc}
                  captionsLang={video.captionsLang}
                  title={video.title}
                />
              </div>
              <figcaption className="pt-[calc(var(--u)*20)] pb-[calc(var(--u)*8)] px-[calc(var(--u)*12)] flex flex-wrap items-center justify-between gap-2">
                <span className="aardvark-h3 text-[#0A0C1A]">{PRESENTATION.mediaTitle}</span>
                <span className="aardvark-handwritten-lg text-[#5a5bb6]">
                  {video.src ? PRESENTATION.mediaNoteReady : PRESENTATION.mediaNotePending}
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
    </section>
  );
}

/* ============================================================
   4. ¿ES PARA TI? · ¿Entienden mi caso? (.genre Inset #303163)
   ============================================================ */
export function AudienceSection({ currency, onSelectCta }: CurrencyCtaProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(AUDIENCE.defaultId);
  const [pointerShift, setPointerShift] = useState({ x: 0, y: 0 });

  const activeId = hoveredId ?? selectedId;
  const activeIndex = Math.max(0, AUDIENCE.items.findIndex((r) => r.id === activeId));
  const preview = AUDIENCE.items[activeIndex] ?? AUDIENCE.items[0];
  const rowVerticalY = activeIndex * 54;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 22;
    setPointerShift({ x: nx, y: ny });
  };

  return (
    <section
      id="para-ti"
      onMouseMove={handleMouseMove}
      className="w-full relative z-10 bg-[#303163] text-[#F4F6FF] rounded-t-[var(--edge-r)] -mt-[var(--edge-r)] overflow-hidden pt-[var(--section-py)] pb-[calc(var(--section-py)+var(--edge-r))] px-[var(--gutter)]"
      aria-labelledby="audience-heading"
    >
      <SectionBackdrop shape="benefits" colors={['#5a5bb6', '#777ae3']} opacities={[0.35, 0.18]} flip="x" small />
      <div className="relative z-10 mx-auto">
          <div className="text-center max-w-[calc(var(--u)*1100)] mx-auto mb-[calc(var(--u)*64)] space-y-[calc(var(--u)*16)]">
            <h2 id="audience-heading" className="aardvark-h2 text-[#F4F6FF]">
              {AUDIENCE.title}
            </h2>
            <p className="aardvark-handwritten-lg text-[#F9C24D] inline-block -rotate-[1.5deg]">
              {AUDIENCE.handwritten}
            </p>
          </div>

          <div className="relative max-w-[calc(var(--u)*1760)] mx-auto">
            <div className="hidden lg:block pointer-events-none" aria-hidden="true">
              <motion.div
                animate={{
                  scale: hoveredId ? 1 : 0.88,
                  opacity: hoveredId ? 1 : 0.42,
                  rotate: hoveredId ? -8 : -14,
                  x: pointerShift.x * -0.7,
                  y: rowVerticalY * 0.5 + pointerShift.y * -0.5,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="absolute left-0 top-4 w-[calc(var(--u)*333)] bg-white rounded-[calc(var(--u)*37)] p-[calc(var(--u)*13)] shadow-2xl z-20"
              >
                <div className="aspect-[3/4] rounded-[calc(var(--u)*26)] overflow-hidden bg-[#eef0fd]">
                  <img
                    src={pexelsUrl(preview.images[0].imageId, 700)}
                    alt=""
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${preview.images[0].objectPositionClass ?? 'object-center'}`}
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  scale: hoveredId ? 1 : 0.88,
                  opacity: hoveredId ? 1 : 0.42,
                  rotate: hoveredId ? 7 : 13,
                  x: pointerShift.x * 0.85,
                  y: rowVerticalY * 0.5 + 32 + pointerShift.y * 0.65,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="absolute right-0 top-10 w-[calc(var(--u)*333)] bg-[#F9C24D] rounded-[calc(var(--u)*37)] p-[calc(var(--u)*13)] shadow-2xl z-20"
              >
                <div className="aspect-[3/4] rounded-[calc(var(--u)*26)] overflow-hidden bg-[#eef0fd]">
                  <img
                    src={pexelsUrl(preview.images[1].imageId, 700)}
                    alt=""
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${preview.images[1].objectPositionClass ?? 'object-center'}`}
                  />
                </div>
              </motion.div>
            </div>

            <ul
              className="relative z-10 max-w-[calc(var(--u)*1120)] mx-auto flex flex-col items-center text-center"
              onMouseLeave={() => setHoveredId(null)}
            >
              {AUDIENCE.items.map((item) => {
                const isActive = hoveredId === item.id || (selectedId === item.id && !hoveredId);
                return (
                  <li
                    key={item.id}
                    data-selected={isActive ? 'true' : 'false'}
                    className="aardvark-genre-item w-full py-[calc(var(--u)*10)]"
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      onClick={() => {
                        setSelectedId(item.id);
                        void trackConversionEvent({ type: 'cta_click', label: `Selección de caso: ${item.label}` });
                      }}
                      aria-pressed={selectedId === item.id}
                      aria-controls="audience-example"
                      className="aardvark-genre-btn relative w-full inline-flex items-center justify-center cursor-pointer py-1"
                    >
                      <span className="aardvark-genre-link-default aardvark-benefit-text text-[#F4F6FF]">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="aardvark-genre-link-hover absolute inset-0 flex items-center justify-center font-human text-[calc(var(--fs-h2)*0.8)] leading-none text-[#F9C24D]"
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-[calc(var(--u)*64)] text-center space-y-[calc(var(--u)*24)] max-w-[calc(var(--u)*840)] mx-auto relative z-20">
            <div id="audience-example" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={preview.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="aardvark-lead text-[#d2d7fc]"
                >
                  {preview.example}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <AardvarkButtonAlt
                label={AUDIENCE.cta}
                variant="marigold"
                onClick={() => onSelectCta(currency, `CTA desde caso: ${preview.label}`)}
              />
            </div>
          </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. QUÉ VAS A LOGRAR · ¿Qué gano? (.benefits)
   Sin logo: título arriba y las etiquetas repartidas en el escenario
   como en la referencia. Entrada igual a la referencia: cuando la
   sección llega al 25% superior de la pantalla, cada etiqueta crece
   desde 0 con un giro (mismo ángulo para todas, entre -33° y 33°) y
   rebota elástica hasta 0°, una tras otra cada 72 ms. Al pasar el
   cursor, la etiqueta recibe el empuje y el giro del movimiento del
   mouse y vuelve a su sitio (momentum hover).
   ============================================================ */
/* Posiciones en el escenario (móvil / desktop): se tocan por los bordes
   como en la referencia, pero ninguna tapa el texto de otra. */
const OUTCOME_LABELS: Array<{ pos: string; bg: string; text: string }> = [
  {
    pos: 'top-[0%] left-[0%] -rotate-[6deg] lg:top-[0%] lg:left-[4%] lg:-rotate-[5deg]',
    bg: 'bg-[#0A0C1A]',
    text: 'text-[#F4F6FF]',
  },
  {
    pos: 'top-[19%] right-[0%] rotate-[4deg] lg:top-[19%] lg:right-[3%] lg:-rotate-[1.8deg]',
    bg: 'bg-[#F9C24D]',
    text: 'text-[#0A0C1A]',
  },
  {
    pos: 'top-[39%] left-[3%] -rotate-[2.5deg] lg:top-[46%] lg:left-[5%] lg:rotate-[2.5deg]',
    bg: 'bg-[#8A8EF9]',
    text: 'text-[#0A0C1A]',
  },
  {
    pos: 'top-[53%] right-[2%] rotate-[5deg] lg:top-[42%] lg:right-[2%] lg:rotate-[5.8deg]',
    bg: 'bg-white',
    text: 'text-[#303163]',
  },
  {
    pos: 'top-[75%] left-[6%] -rotate-[4deg] lg:top-[76%] lg:left-[28%] lg:-rotate-[5.3deg]',
    bg: 'bg-[#303163]',
    text: 'text-[#F4F6FF]',
  },
];

const MOMENTUM = { xy: 25, rotation: 15, clampXY: 1080, clampRot: 60, stiffness: 170, damping: 13 };

/** Momentum hover de la referencia (GSAP Inertia) con un resorte propio:
 * la velocidad del puntero empuja la etiqueta y un resorte la regresa. */
function useMomentumHover(count: number) {
  const targets = useRef<Array<HTMLDivElement | null>>([]);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const states = useRef(Array.from({ length: count }, () => ({ x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, raf: 0, last: 0 })));
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      Boolean(window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const all = states.current;
    return () => all.forEach((st) => st.raf && cancelAnimationFrame(st.raf));
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const p = pointer.current;
    p.vx = e.clientX - p.x;
    p.vy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;
  }, []);

  const onEnter = useCallback((idx: number, e: React.MouseEvent) => {
    const el = targets.current[idx];
    if (!enabled.current || !el) return;
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    const { vx, vy } = pointer.current;
    const torque = (offsetX * vy - offsetY * vx) / (Math.hypot(offsetX, offsetY) || 1);
    const st = states.current[idx];
    st.vx += clamp(vx * MOMENTUM.xy, MOMENTUM.clampXY);
    st.vy += clamp(vy * MOMENTUM.xy, MOMENTUM.clampXY);
    st.vr += clamp(torque * MOMENTUM.rotation, MOMENTUM.clampRot);
    if (st.raf) return;
    st.last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - st.last) / 1000);
      st.last = now;
      for (const [pos, vel] of [['x', 'vx'], ['y', 'vy'], ['r', 'vr']] as const) {
        const acc = -MOMENTUM.stiffness * st[pos] - MOMENTUM.damping * st[vel];
        st[vel] += acc * dt;
        st[pos] += st[vel] * dt;
      }
      el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${st.r.toFixed(2)}deg)`;
      const settled = [st.x, st.y, st.r, st.vx / 10, st.vy / 10, st.vr / 10].every((v) => Math.abs(v) < 0.05);
      if (settled) {
        Object.assign(st, { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, raf: 0 });
        el.style.transform = '';
        return;
      }
      st.raf = requestAnimationFrame(tick);
    };
    st.raf = requestAnimationFrame(tick);
  }, []);

  return { targets, onMouseMove, onEnter };
}

export function OutcomesSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Igual que ScrollTrigger "top 25%": se dispara cuando el escenario llega al 25% superior.
  const started = useInView(stageRef, { once: true, margin: '0px 0px -75% 0px' });
  const [entryRotate] = useState(() => Math.round(Math.random() * 66 - 33));
  const { targets, onMouseMove, onEnter } = useMomentumHover(OUTCOMES.pills.length);

  return (
    <section
      id="logros"
      className="w-full relative z-20 bg-[#fcf6ea] text-[#0A0C1A] rounded-t-[var(--edge-r)] rounded-b-[var(--edge-r)] -mt-[var(--edge-r)] overflow-hidden pt-[var(--section-py)] pb-[calc(var(--section-py)*0.65)] px-[var(--gutter)]"
      aria-labelledby="outcomes-heading"
    >
      <SectionBackdrop shape="benefits" colors={['#fdebc9', '#FFFFFF']} opacities={[0.7, 0.85]} />

      <div className="relative z-10">
          <div className="text-center max-w-[calc(var(--u)*1280)] mx-auto mb-[calc(var(--u)*24)] space-y-[calc(var(--u)*24)]">
            <h2 id="outcomes-heading" className="aardvark-h2 text-[#0A0C1A]">
              {OUTCOMES.title}
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*640)] mx-auto">{OUTCOMES.lead}</p>
          </div>

          <div
            ref={stageRef}
            onMouseMove={onMouseMove}
            className="relative w-full mt-[calc(var(--u)*24)] lg:mt-[calc(var(--u)*56)] aspect-[402/570] md:aspect-[834/560] lg:aspect-[1840/760] mx-auto"
          >
            <ul className="absolute inset-0">
              {OUTCOMES.pills.map((text, idx) => {
                const label = OUTCOME_LABELS[idx % OUTCOME_LABELS.length];
                return (
                  <li
                    key={text}
                    data-testid="outcome-label"
                    className={`absolute list-none select-none ${label.pos}`}
                    onMouseEnter={(e) => onEnter(idx, e)}
                  >
                    <div
                      ref={(el) => {
                        targets.current[idx] = el;
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: entryRotate }}
                        animate={started ? { scale: 1, rotate: 0 } : { scale: 0, rotate: entryRotate }}
                        transition={{ type: 'spring', duration: 0.85, bounce: 0.45, delay: idx * 0.072 }}
                        className={`${label.bg} ${label.text} rounded-[var(--label-r)] px-[var(--label-px)] py-[var(--label-py)] flex items-center justify-center`}
                      >
                        <span className="aardvark-benefit-pill-text text-[length:var(--fs-label)] text-center [text-wrap:balance] max-w-[12ch] lg:max-w-none lg:whitespace-nowrap">
                          {text}
                        </span>
                      </motion.div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
      </div>
    </section>
  );
}

/* ============================================================
   Franja .badge: fecha, horario y precio siempre a la vista.
   ============================================================ */
function MarqueeItems({ items }: { items: readonly string[] }) {
  // Two copies so the -50% marquee loop is seamless.
  const doubled = [...items, ...items];
  return (
    <>
      {doubled.map((item, idx) => (
        <React.Fragment key={`${item}-${idx}`}>
          <span>{item}</span>
          <span>·</span>
        </React.Fragment>
      ))}
    </>
  );
}

export function KeyFactsMarquee() {
  return (
    <section className="w-full bg-white py-[calc(var(--u)*96)] select-none overflow-x-clip" aria-label="Fecha, horario y precio">
      <p className="sr-only">{KEY_FACTS.summary}</p>
      <div className="space-y-4" aria-hidden="true">
        <div className="relative -rotate-[1.8deg] scale-[1.03] bg-[#F9C24D] text-[#0A0C1A] py-[calc(var(--u)*60)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-65">
            <BadgeRibbonSvg colorClass="text-[#fedea0]" />
          </div>
          <div className="relative z-10 aardvark-marquee-track aardvark-badge-text gap-[calc(var(--u)*64)]">
            <MarqueeItems items={KEY_FACTS.lineA} />
          </div>
        </div>

        <div className="relative rotate-[1.4deg] scale-[1.03] bg-[#0A0C1A] text-[#F4F6FF] py-[calc(var(--u)*48)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-35">
            <BadgeRibbonSvg colorClass="text-[#303163]" />
          </div>
          <div className="relative z-10 aardvark-marquee-track-reverse aardvark-badge-text gap-[calc(var(--u)*64)]">
            <MarqueeItems items={KEY_FACTS.lineB} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. QUIÉNES ENSEÑAN · ¿Por qué ustedes? (.choice Gold Band)
   Cards are 30% larger than the previous composition from sm up.
   ============================================================ */
export const MENTOR_CARD_SCALE = 1.3;

/** Previous (100%) dimensions of the mentor card at sm and up, in px. */
const MENTOR_CARD_BASE = {
  '--mc-w': 324,
  '--mc-min-h': 465,
  '--mc-avatar': 118,
  '--mc-avatar-top': 120,
  '--mc-avatar-left': 44,
  '--mc-stamp-offset': 20,
  '--mc-stamp-font': 16,
  '--mc-frame-pad': 14,
  '--mc-frame-radius': 32,
  '--mc-inner-radius': 22,
  '--mc-inner-pad': 24,
  '--mc-block-lg': 96,
  '--mc-block-sm': 88,
} as const;

const mentorCardVars = {
  ...Object.fromEntries(
    Object.entries(MENTOR_CARD_BASE).map(([key, value]) => [key, `${Math.round(value * MENTOR_CARD_SCALE)}px`])
  ),
  '--mc-text-scale': String(MENTOR_CARD_SCALE),
} as React.CSSProperties;

const MENTOR_STYLES: Array<{
  frameBg: string;
  innerBg: string;
  stampBg: string;
  stampText: string;
  tilt: string;
  cropTight: boolean;
}> = [
  {
    frameBg: 'bg-[#fcf0db]',
    innerBg: 'bg-white',
    stampBg: 'bg-[#8A8EF9]',
    stampText: 'text-[#0A0C1A]',
    tilt: '-rotate-[1.8deg]',
    cropTight: false,
  },
  {
    frameBg: 'bg-white',
    innerBg: 'bg-[#eef0fd]',
    stampBg: 'bg-[#0A0C1A]',
    stampText: 'text-[#F9C24D]',
    tilt: 'rotate-[1.8deg]',
    cropTight: true,
  },
];

export function MentorsSection({ currency, onSelectCta }: CurrencyCtaProps) {
  return (
    <section
      id="mentores"
      className="w-full bg-[#F9C24D] text-[#0A0C1A] rounded-t-[var(--edge-r)] pt-[var(--section-py)] pb-[calc(var(--section-py)*1.6)] px-[var(--gutter)] relative z-10 overflow-hidden scroll-mt-10"
      aria-labelledby="mentors-heading"
    >
      <SectionBackdrop shape="hero" colors={['#ffd688', '#fedea0']} opacities={[0.7, 0.8]} flip="x" small />

      <div className="relative z-10 mx-auto space-y-[calc(var(--u)*72)]">
        <div className="max-w-[calc(var(--u)*1100)] mx-auto text-center space-y-[calc(var(--u)*20)] flex flex-col items-center">
          <AardvarkButtonAlt
            label={MENTORS.ctaTop}
            variant="dark"
            onClick={() => onSelectCta(currency, 'Sección Mentores CTA')}
          />
          <h2 id="mentors-heading" className="aardvark-h2 text-[#0A0C1A]">
            {MENTORS.title}
          </h2>
          <p className="aardvark-lead text-[#1c1e2e] max-w-[calc(var(--u)*800)]">{MENTORS.lead}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-20 max-w-[760px] xl:max-w-[1100px] mx-auto pt-8 pb-6 justify-items-center items-stretch">
          {MENTORS.people.map((mentor, idx) => {
            const style = MENTOR_STYLES[idx % MENTOR_STYLES.length];
            return (
              <motion.article
                key={mentor.id}
                data-testid="mentor-card"
                style={mentorCardVars}
                initial={{ opacity: 0, y: 40, rotate: idx === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: 'spring', stiffness: 195, damping: 18, delay: idx * 0.1 }}
                className="mentor-card relative flex justify-center w-[min(295px,calc(100vw-96px))] sm:w-[var(--mc-w)]"
                aria-labelledby={`mentor-${mentor.id}-name`}
              >
                <div className={`relative w-full ${style.tilt} hover:rotate-0 transition-transform duration-300 flex`}>

                  <div
                    className={`absolute -top-5 -right-5 sm:top-[calc(var(--mc-stamp-offset)*-1)] sm:right-[calc(var(--mc-stamp-offset)*-1)] z-30 ${style.stampBg} ${style.stampText} px-4 py-2 sm:px-[21px] sm:py-[10px] rounded-[16px] sm:rounded-[21px] shadow-xl rotate-6 font-display font-bold text-sm sm:text-[length:var(--mc-stamp-font)] tracking-tight pointer-events-none`}
                  >
                    {mentor.badge}
                  </div>

                  <div className="absolute top-30 max-[379px]:top-40 -left-9 sm:top-[var(--mc-avatar-top)] sm:left-[calc(var(--mc-avatar-left)*-1)] w-[112px] h-[112px] sm:w-[var(--mc-avatar)] sm:h-[var(--mc-avatar)] rounded-full overflow-hidden shadow-2xl z-30 bg-[#eef0fd]">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.avatarAlt}
                      className={`w-full h-full object-cover object-center ${style.cropTight ? 'scale-[1.16]' : ''}`}
                    />
                  </div>

                  <div
                    className={`relative z-10 w-full ${style.frameBg} rounded-[32px] sm:rounded-[var(--mc-frame-radius)] p-3.5 sm:p-[var(--mc-frame-pad)] shadow-2xl min-h-[465px] sm:min-h-[var(--mc-min-h)] flex`}
                  >
                    <div
                      className={`w-full ${style.innerBg} rounded-[22px] sm:rounded-[var(--mc-inner-radius)] p-5 sm:p-[var(--mc-inner-pad)] flex flex-col justify-between gap-3`}
                    >
                      <div className="pr-10 space-y-1">
                        <h3 id={`mentor-${mentor.id}-name`} className="aardvark-h3 text-[#0A0C1A]">
                          {mentor.name}
                        </h3>
                        <p className="font-sans font-semibold text-sm sm:text-[18px] text-[#5a5bb6] leading-tight">
                          {mentor.role}
                        </p>
                      </div>

                      <div className="relative pl-[64px] min-[380px]:pl-[72px] sm:pl-[88px] py-2 my-auto">
                        <svg
                          viewBox="0 0 64 64"
                          aria-hidden="true"
                          focusable="false"
                          className={`absolute -top-2 left-[48px] min-[380px]:left-[56px] sm:left-[68px] w-14 h-14 sm:w-16 sm:h-16 pointer-events-none select-none ${
                            idx === 0 ? 'text-[#fde4b5]' : 'text-[#d2d7fc]'
                          }`}
                        >
                          <path
                            fill="currentColor"
                            d="M14 14h14v16c0 10.5-5.2 17.6-14 21l-3.6-6.8c5.2-2.2 7.8-6.2 8.2-11.2H14V14Zm28 0h14v16c0 10.5-5.2 17.6-14 21l-3.6-6.8c5.2-2.2 7.8-6.2 8.2-11.2H42V14Z"
                          />
                        </svg>
                        <p className="relative z-10 font-human text-[15px] sm:text-[19px] leading-[1.35] text-[#303163]">
                          “{mentor.quote}”
                        </p>
                      </div>

                      <p className="aardvark-body text-[#1c1e2e] leading-snug">{mentor.bio}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-[960px] mx-auto">
          {MENTORS.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`bg-white rounded-[28px] px-6 py-5 text-center shadow-lg flex flex-col-reverse ${
                idx === 1 ? 'sm:-rotate-[1.5deg]' : idx === 2 ? 'sm:rotate-[1.8deg]' : 'sm:rotate-[1deg]'
              }`}
            >
              <dt className="text-base sm:text-lg text-[#0A0C1A]">{stat.label}</dt>
              <dd className="font-display font-bold text-5xl sm:text-6xl tracking-[-0.04em] text-[#0A0C1A] tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============================================================
   11. PREGUNTAS FRECUENTES · Dudas antes de pagar
   Composición de aardvarkbookclub.com/faq: barra lateral fija con
   categorías en pasteles suaves, grupos ordenados por tema y tarjetas
   plegables con animación de aparición en scroll.
   ============================================================ */
type FaqCategory = (typeof FAQ.categories)[number];
type FaqGroupCategory = Exclude<FaqCategory, 'Todas'>;

const FAQ_CATEGORY_ORDER: readonly FaqGroupCategory[] = ['Programa', 'Pagos', 'Requisitos'];

const FAQ_CATEGORY_THEME: Record<
  FaqCategory,
  {
    bgClass: string;
    activeBgClass: string;
    blockBackColor: string;
    preset: (typeof FAQ_PILL_PRESETS)[number];
  }
> = {
  Todas: {
    bgClass: 'bg-[#eef0fd]',
    activeBgClass: 'bg-[#d2d7fc]',
    blockBackColor: '#969bfc',
    preset: 'pill-diag-tl',
  },
  Programa: {
    bgClass: 'bg-[#fcf0db]',
    activeBgClass: 'bg-[#fde4b5]',
    blockBackColor: '#ffd688',
    preset: 'pill-diag-tr',
  },
  Pagos: {
    bgClass: 'bg-[#e1e4fd]',
    activeBgClass: 'bg-[#c3c9fc]',
    blockBackColor: '#8A8EF9',
    preset: 'pill-bottom-spread',
  },
  Requisitos: {
    bgClass: 'bg-[#f2f3f6]',
    activeBgClass: 'bg-[#d9dcea]',
    blockBackColor: '#b4bafc',
    preset: 'pill-edge-mix',
  },
};

const FAQ_PILL_PRESETS = ['pill-diag-tl', 'pill-diag-tr', 'pill-bottom-spread', 'pill-edge-mix'] as const;

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('Todas');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ.items[0]?.id ?? '');

  const visibleGroups: readonly FaqGroupCategory[] =
    activeCategory === 'Todas' ? FAQ_CATEGORY_ORDER : [activeCategory];

  return (
    <section
      id="preguntas"
      className="w-full relative z-20 bg-white text-[#0A0C1A] rounded-b-[var(--edge-r)] py-[var(--section-py)] px-[var(--gutter)] scroll-mt-10 overflow-x-clip"
      aria-labelledby="faq-heading"
    >
      <SectionBackdrop shape="faq" colors={['#eef0fd']} opacities={[0.9]} align="xMinYMin" />

      <div className="mx-auto max-w-[calc(var(--u)*1680)] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*56)] items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-[calc(var(--u)*24)]">
          <div className="space-y-[calc(var(--u)*16)]">
            <h2 id="faq-heading" className="aardvark-h2 text-[#0A0C1A]">
              {FAQ.title}
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*520)]">{FAQ.lead}</p>
          </div>

          <div className="space-y-4 pt-2">
            <span className="block font-display font-bold text-base sm:text-lg text-[#303163]">
              Categorías
            </span>
            <div
              className="flex flex-wrap lg:flex-col lg:items-start gap-4"
              role="group"
              aria-label="Filtrar preguntas"
            >
              {FAQ.categories.map((cat) => {
                const isActive = activeCategory === cat;
                const theme = FAQ_CATEGORY_THEME[cat];
                return (
                  <div key={cat} className={isActive ? 'relative z-10' : 'relative z-0'}>
                    <AardvarkPillButton
                      label={cat}
                      active={isActive}
                      withBlocks
                      blockPreset={theme.preset}
                      blockBackColor={theme.blockBackColor}
                      ariaPressed={isActive}
                      bgClass={isActive ? theme.activeBgClass : theme.bgClass}
                      textClass="text-[#0A0C1A]"
                      onClick={() => {
                        setActiveCategory(cat);
                        const first =
                          cat === 'Todas'
                            ? FAQ.items[0]?.id
                            : FAQ.items.find((f) => f.category === cat)?.id;
                        if (first) setOpenFaqId(first);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 w-full max-w-[calc(var(--u)*960)] lg:ml-auto space-y-[calc(var(--u)*48)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-[calc(var(--u)*48)]"
            >
              {visibleGroups.map((group) => {
                const groupItems = FAQ.items.filter((item) => item.category === group);
                return (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
                    className="space-y-[calc(var(--u)*14)]"
                  >
                    <h3 className="aardvark-h3 text-[#0A0C1A] mb-[calc(var(--u)*16)]">
                      {group}
                    </h3>

                    <div className="space-y-[calc(var(--u)*14)]">
                      {groupItems.map((item) => {
                        const isOpen = openFaqId === item.id;
                        const panelId = `${item.id}-panel`;
                        return (
                          <div
                            key={item.id}
                            className={`rounded-[var(--faq-r)] transition-colors duration-200 ${
                              isOpen ? 'bg-[#eef0fd]' : 'bg-[#f2f3f6] hover:bg-[#eef0fd]'
                            }`}
                          >
                            <h4>
                              <button
                                type="button"
                                onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="w-full min-h-[max(56px,calc(var(--u)*92))] py-[var(--faq-py)] px-[var(--faq-px)] flex items-center justify-between gap-4 text-left cursor-pointer group"
                              >
                                <span className="font-display font-bold text-[length:var(--fs-lead)] leading-[1.2] tracking-[-0.02em] text-[#0A0C1A] group-hover:text-[#303163] transition-colors">
                                  {item.q}
                                </span>
                                <span
                                  className={`w-[max(32px,calc(var(--u)*38))] h-[max(32px,calc(var(--u)*38))] rounded-full inline-flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                    isOpen ? 'bg-[#0A0C1A] text-[#F4F6FF] rotate-45' : 'bg-white text-[#0A0C1A]'
                                  }`}
                                  aria-hidden="true"
                                >
                                  <Plus className="w-1/2 h-1/2" />
                                </span>
                              </button>
                            </h4>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  id={panelId}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                                  className="overflow-hidden"
                                >
                                  <p className="px-[var(--faq-px)] pb-[var(--faq-py)] pr-[calc(var(--u)*96)] aardvark-body text-[#525770]">
                                    {item.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

