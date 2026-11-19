import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import {
  AardvarkButtonAlt,
  AardvarkPillButton,
  BadgeRibbonSvg,
  BenefitsRibbonSvg,
  FaqRibbonSvg,
  type SquaiBlockPreset,
  SquaiCornerBlocks,
} from './AardvarkPrimitives';
import { SquaiMark } from './SquaiBrand';
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
   3. PRESENTACIÓN · ¿Quién me va a enseñar? (.gift parity)
   The curved headline is pinned: the page holds while the whole phrase
   travels along the curve, then the story and video scroll in.
   ============================================================ */
const CURVE_PATH = 'M-165 410 C60 276 760 210 1304 210 C1848 210 2320 284 2820 393';
const CURVE_VIEW_W = 1920;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && Boolean(window.matchMedia?.(REDUCED_MOTION_QUERY).matches)
  );
  useEffect(() => {
    const query = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!query) return;
    const onChange = () => setReduced(query.matches);
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

/** Arc length where the curve reaches `x` (the path only moves to the right). */
function lengthAtX(path: SVGPathElement, total: number, x: number) {
  let lo = 0;
  let hi = total;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).x < x) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

interface CurveTravel {
  /** startOffset (% of the path) when the pin starts: first word entering on the right. */
  start: number;
  /** startOffset when the pin ends: last word fully inside the right margin. */
  end: number;
  /** Extra scroll distance the section stays pinned. */
  scrollPx: number;
}

const DEFAULT_TRAVEL: CurveTravel = { start: 60, end: -45, scrollPx: 1400 };

/** Pinned track: only mounted when motion is allowed, so useScroll always
 * has a hydrated target. */
function PinnedCurve() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [travel, setTravel] = useState<CurveTravel>(DEFAULT_TRAVEL);

  useEffect(() => {
    const measure = () => {
      const path = pathRef.current;
      const text = textRef.current;
      if (
        !path ||
        !text ||
        typeof path.getTotalLength !== 'function' ||
        typeof text.getComputedTextLength !== 'function'
      ) {
        return;
      }
      const total = path.getTotalLength();
      const textLength = text.getComputedTextLength();
      if (!total || !textLength) return;
      // Start with the first word already entering from the right, so the
      // pinned screen is never empty.
      const start = lengthAtX(path, total, CURVE_VIEW_W * 0.72);
      const end = lengthAtX(path, total, CURVE_VIEW_W * 0.94) - textLength;
      const svgWidth = path.ownerSVGElement?.getBoundingClientRect().width ?? CURVE_VIEW_W;
      const screenTravel = ((start - end) * svgWidth) / CURVE_VIEW_W;
      setTravel({
        start: (start / total) * 100,
        end: (end / total) * 100,
        scrollPx: Math.max(600, Math.round(screenTravel * 0.75)),
      });
    };
    measure();
    void document.fonts?.ready.then(measure).catch(() => undefined);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const startOffset = useTransform(scrollYProgress, [0, 1], [`${travel.start}%`, `${travel.end}%`]);

  return (
    <div
      ref={trackRef}
      data-testid="presentation-track"
      className="relative"
      style={{ height: `calc(100svh + ${travel.scrollPx}px)` }}
    >
      <div className="sticky top-0 h-[100svh] flex items-center" aria-hidden="true">
        <svg viewBox={`0 0 ${CURVE_VIEW_W} 430`} className="w-full h-auto overflow-visible select-none">
          <defs>
            <path id="squai-gift-curve" ref={pathRef} d={CURVE_PATH} />
          </defs>
          <text
            ref={textRef}
            fill="#0A0C1A"
            className="aardvark-curve-text font-display font-bold"
            style={{ letterSpacing: '-0.03em' }}
          >
            <motion.textPath href="#squai-gift-curve" startOffset={startOffset}>
              {PRESENTATION.curvedText}
            </motion.textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export function PresentationSection({ onMeetMentors }: { onMeetMentors: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const { video } = PRESENTATION;

  return (
    <section
      id="presentacion"
      className="w-full bg-white text-[#0A0C1A] p-[var(--band-inset)] scroll-mt-16"
      aria-labelledby="presentation-heading"
    >
      {/* overflow-clip (not hidden) so the sticky curve can pin to the viewport. */}
      <div className="w-full bg-[#eef0fd] rounded-[var(--band-r)] pb-[var(--section-py)] overflow-clip">
        <h2 id="presentation-heading" className="sr-only">
          {PRESENTATION.srTitle}
        </h2>

        {reducedMotion ? (
          <p className="aardvark-h1 text-center text-[#0A0C1A] px-[var(--gutter)] pt-[var(--section-py)] pb-[calc(var(--u)*56)]">
            {PRESENTATION.curvedText}
          </p>
        ) : (
          <PinnedCurve />
        )}

        <div className="max-w-[calc(var(--u)*1760)] mx-auto px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*56)] items-center">
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
      className="w-full bg-white p-[var(--band-inset)]"
      aria-labelledby="audience-heading"
    >
      <div className="w-full relative bg-[#303163] text-[#F4F6FF] rounded-[var(--band-r)] overflow-hidden py-[var(--section-py)] px-[var(--gutter)]">
        <div className="mx-auto">
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
                    className="w-full h-full object-cover"
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
                    className="w-full h-full object-cover"
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
      </div>
    </section>
  );
}

/* ============================================================
   5. QUÉ VAS A LOGRAR · ¿Qué gano? (.benefits Warm Cream Band)
   ============================================================ */
const OUTCOME_PILL_STYLES = [
  { bg: 'bg-white', text: 'text-[#0A0C1A]', tilt: '-rotate-[3deg]' },
  { bg: 'bg-[#F9C24D]', text: 'text-[#0A0C1A]', tilt: 'rotate-[2.5deg]' },
  { bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]', tilt: '-rotate-[2deg]' },
  { bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]', tilt: 'rotate-[2.8deg]' },
  { bg: 'bg-[#d2d7fc]', text: 'text-[#0A0C1A]', tilt: '-rotate-[1.5deg]' },
];

export function OutcomesSection() {
  return (
    <section
      id="logros"
      className="w-full bg-white text-[#0A0C1A] p-[var(--band-inset)]"
      aria-labelledby="outcomes-heading"
    >
      <div className="w-full relative bg-[#fcf6ea] rounded-[var(--band-r)] overflow-hidden py-[var(--section-py)] px-[var(--gutter)]">
        <div className="absolute inset-0 pointer-events-none select-none opacity-85" aria-hidden="true">
          <BenefitsRibbonSvg />
        </div>

        <div className="mx-auto relative z-10 text-center space-y-[calc(var(--u)*64)]">
          <div className="max-w-[calc(var(--u)*1100)] mx-auto space-y-[calc(var(--u)*20)]">
            <div className="flex justify-center">
              <span className="w-[max(48px,calc(var(--u)*72))] h-[max(48px,calc(var(--u)*72))] rounded-full bg-white inline-flex items-center justify-center shadow-sm">
                <SquaiMark variant="color" className="w-1/2 h-1/2" />
              </span>
            </div>
            <h2 id="outcomes-heading" className="aardvark-h2 text-[#0A0C1A]">
              {OUTCOMES.title}
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*760)] mx-auto">{OUTCOMES.lead}</p>
          </div>

          <ul className="max-w-[calc(var(--u)*1800)] mx-auto flex flex-wrap items-center justify-center gap-[calc(var(--u)*24)] py-4">
            {OUTCOMES.pills.map((text, idx) => {
              const style = OUTCOME_PILL_STYLES[idx % OUTCOME_PILL_STYLES.length];
              return (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, scale: 0.72, y: 28 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 230, damping: 16, delay: idx * 0.07 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`${style.bg} ${style.tilt} rounded-[calc(var(--u)*93)] px-[calc(var(--u)*42)] py-[calc(var(--u)*29)] shadow-xl max-w-full list-none`}
                >
                  <span className={`aardvark-benefit-pill-text ${style.text} sm:whitespace-nowrap text-center block`}>
                    {text}
                  </span>
                </motion.li>
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
  blockBackColor: string;
  blockPreset: SquaiBlockPreset;
  tilt: string;
  cropTight: boolean;
}> = [
  {
    frameBg: 'bg-[#fcf0db]',
    innerBg: 'bg-white',
    stampBg: 'bg-[#8A8EF9]',
    stampText: 'text-[#0A0C1A]',
    blockBackColor: '#8A8EF9',
    blockPreset: 'mentor-laura',
    tilt: '-rotate-[1.8deg]',
    cropTight: false,
  },
  {
    frameBg: 'bg-white',
    innerBg: 'bg-[#eef0fd]',
    stampBg: 'bg-[#0A0C1A]',
    stampText: 'text-[#F9C24D]',
    blockBackColor: '#FFFFFF',
    blockPreset: 'mentor-sebastian',
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
      <div className="mx-auto space-y-[calc(var(--u)*72)]">
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
                  <SquaiCornerBlocks size="card" preset={style.blockPreset} backColor={style.blockBackColor} />

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
                        <p className="font-human text-sm sm:text-[18px] text-[#5a5bb6] leading-tight">{mentor.role}</p>
                      </div>

                      <ul className="pl-[64px] min-[380px]:pl-[72px] sm:pl-[88px] py-2 flex flex-col items-start gap-2" aria-label={`Temas de ${mentor.name}`}>
                        {mentor.tags.map((tag) => (
                          <li
                            key={tag}
                            className="px-3 py-1 min-[380px]:px-3.5 min-[380px]:py-1.5 sm:px-[18px] sm:py-[10px] rounded-lg sm:rounded-[10px] text-[13px] min-[380px]:text-sm sm:text-[18px] leading-tight font-display font-bold bg-[#0A0C1A] text-[#F4F6FF]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

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
   11. PREGUNTAS FRECUENTES · Dudas antes de pagar (.faq White Band)
   Rounded bottom so the footer tucks underneath.
   ============================================================ */
type FaqCategory = (typeof FAQ.categories)[number];

const FAQ_PILL_PRESETS = ['pill-diag-tl', 'pill-diag-tr', 'pill-bottom-spread', 'pill-edge-mix'] as const;

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('Todas');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ.items[0]?.id ?? '');

  const filteredFaqs =
    activeCategory === 'Todas' ? FAQ.items : FAQ.items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="preguntas"
      className="w-full relative z-20 bg-white text-[#0A0C1A] overflow-hidden rounded-b-[var(--edge-r)] py-[var(--section-py)] px-[var(--gutter)] scroll-mt-10"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 pointer-events-none select-none opacity-80" aria-hidden="true">
        <FaqRibbonSvg />
      </div>

      <div className="mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-[calc(var(--u)*64)]">
        <div className="lg:col-span-5 space-y-[calc(var(--u)*24)]">
          <h2 id="faq-heading" className="aardvark-h2 text-[#0A0C1A]">
            {FAQ.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*590)]">{FAQ.lead}</p>

          <div className="flex flex-wrap gap-[calc(var(--u)*16)] pt-[calc(var(--u)*24)]" role="group" aria-label="Filtrar preguntas">
            {FAQ.categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <div key={cat} className={isActive ? 'relative z-10' : 'relative z-0'}>
                  <AardvarkPillButton
                    label={cat}
                    active={isActive}
                    withBlocks
                    blockPreset={FAQ_PILL_PRESETS[idx % FAQ_PILL_PRESETS.length]}
                    blockBackColor="#ffd688"
                    ariaPressed={isActive}
                    bgClass={isActive ? 'bg-[#F9C24D]' : 'bg-[#eef0fd]'}
                    textClass="text-[#0A0C1A]"
                    onClick={() => {
                      setActiveCategory(cat);
                      const first =
                        cat === 'Todas' ? FAQ.items[0]?.id : FAQ.items.find((f) => f.category === cat)?.id;
                      if (first) setOpenFaqId(first);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 w-full max-w-[calc(var(--u)*936)] lg:ml-auto space-y-[calc(var(--u)*14)]">
          {filteredFaqs.map((item) => {
            const isOpen = openFaqId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <div
                key={item.id}
                className={`rounded-[var(--faq-r)] transition-colors duration-200 ${
                  isOpen ? 'bg-[#eef0fd]' : 'bg-[#f2f3f6] hover:bg-[#eef0fd]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full min-h-[max(56px,calc(var(--u)*96))] py-[var(--faq-py)] px-[var(--faq-px)] flex items-center justify-between gap-4 text-left cursor-pointer group"
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
                </h3>

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
                      <p className="px-[var(--faq-px)] pb-[var(--faq-py)] pr-[calc(var(--u)*96)] aardvark-body text-[#525770]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

