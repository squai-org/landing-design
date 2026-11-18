import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Play, X } from 'lucide-react';

interface ParentSquareHeroProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onJumpToSection: (sectionId: string, label: string) => void;
}

interface FloatingCallout {
  id: string;
  shortLabel: string;
  expandedCopy: string;
  targetSection: string;
  swatchColor: string;
  cardBg: string;
  imageUrl: string;
  imageAlt: string;
  startTop: string;
  startLeft: string;
  endTop: string;
  endLeft: string;
  enterOnScroll?: boolean;
  delay: number;
}

const HERO_VIDEO_POSTER =
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';

const HERO_CALLOUTS: FloatingCallout[] = [
  {
    id: 'funciona',
    shortLabel: 'Cómo funciona',
    expandedCopy: 'Entiende cómo responde la IA sin tecnicismos',
    targetSection: 'contenido',
    swatchColor: '#5a5bb6',
    cardBg: 'bg-[#e1e4fd] border-[#c3c9fc]',
    imageUrl:
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Equipo analizando resultados en computador portátil',
    startTop: '59%',
    startLeft: '17%',
    endTop: '14%',
    endLeft: '1.5%',
    delay: 0.1,
  },
  {
    id: 'criterio',
    shortLabel: 'Criterio práctico',
    expandedCopy: 'Une criterio propio y práctica semanal en un solo método',
    targetSection: 'programa',
    swatchColor: '#8A8EF9',
    cardBg: 'bg-[#eef0fd] border-[#c3c9fc]',
    imageUrl:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Profesionales colaborando en mesa de trabajo',
    startTop: '45%',
    startLeft: '21%',
    endTop: '3%',
    endLeft: '25%',
    delay: 0.14,
  },
  {
    id: 'prompts',
    shortLabel: 'Prompts claros',
    expandedCopy: 'Deja de perder horas corrigiendo textos genéricos',
    targetSection: 'contenido',
    swatchColor: '#777ae3',
    cardBg: 'bg-[#f3f0ff] border-[#d2d7fc]',
    imageUrl:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Dos colegas acordando una tarea en oficina',
    startTop: '46%',
    startLeft: '71%',
    endTop: '12%',
    endLeft: '56%',
    delay: 0.18,
  },
  {
    id: 'cero',
    shortLabel: 'Sin programar',
    expandedCopy: 'Empieza desde cero con tus herramientas de oficina',
    targetSection: 'programa',
    swatchColor: '#F9C24D',
    cardBg: 'bg-[#fff8e6] border-[#f6dc9b]',
    imageUrl:
      'https://images.pexels.com/photos/7437087/pexels-photo-7437087.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Persona sonriendo mientras trabaja en portátil',
    startTop: '24%',
    startLeft: '82%',
    endTop: '4%',
    endLeft: '79%',
    enterOnScroll: true,
    delay: 0.22,
  },
  {
    id: 'datos',
    shortLabel: 'Cuidado de datos',
    expandedCopy: 'Protege archivos internos y datos confidenciales',
    targetSection: 'contenido',
    swatchColor: '#303163',
    cardBg: 'bg-[#eef0fd] border-[#c3c9fc]',
    imageUrl:
      'https://images.pexels.com/photos/7651928/pexels-photo-7651928.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Reunión de revisión de documentos en oficina',
    startTop: '73%',
    startLeft: '21%',
    endTop: '66%',
    endLeft: '9.5%',
    delay: 0.2,
  },
  {
    id: 'rutinas',
    shortLabel: 'Plantillas reales',
    expandedCopy: 'Crea rutinas reutilizables para reportes y correos',
    targetSection: 'contenido',
    swatchColor: '#F9C24D',
    cardBg: 'bg-[#fff8e6] border-[#f6dc9b]',
    imageUrl:
      'https://images.pexels.com/photos/7693685/pexels-photo-7693685.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Equipo de trabajo compartiendo ideas con computador',
    startTop: '60%',
    startLeft: '73%',
    endTop: '61%',
    endLeft: '43%',
    delay: 0.24,
  },
  {
    id: 'bold',
    shortLabel: 'Pago con Bold',
    expandedCopy: 'Paga fácil desde Colombia o el exterior sin fricción',
    targetSection: 'inversion',
    swatchColor: '#5a5bb6',
    cardBg: 'bg-[#e1e4fd] border-[#c3c9fc]',
    imageUrl:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageAlt: 'Profesionales celebrando avance de proyecto',
    startTop: '74%',
    startLeft: '70%',
    endTop: '68%',
    endLeft: '76%',
    delay: 0.28,
  },
];

const HERO_STATS = [
  { value: '4 módulos', caption: 'en vivo y con ejercicios reales' },
  { value: '100%', caption: 'práctica aplicable a tu trabajo' },
  { value: '$399.000', caption: 'pesos COP o $129 USD en el exterior' },
  { value: '2 cuotas', caption: 'quincenales sin interés con Bold' },
];

const YOUTUBE_VIDEO_ID = 'LPZh9BOjkQs';

function FlyOutCalloutNode({
  item,
  scrollProgress,
  reducedMotion,
  onClick,
}: {
  item: FloatingCallout;
  scrollProgress: ReturnType<typeof useSpring>;
  reducedMotion: boolean;
  onClick: () => void;
}) {
  const top = useTransform(
    scrollProgress,
    [0.12, 0.48],
    reducedMotion ? [item.startTop, item.startTop] : [item.startTop, item.endTop]
  );
  const left = useTransform(
    scrollProgress,
    [0.12, 0.48],
    reducedMotion ? [item.startLeft, item.startLeft] : [item.startLeft, item.endLeft]
  );

  // Morphs from compact badge (at scroll 0) to ParentSquare Photo + Card pair (at scroll >= 0.42)
  const thumbWidth = useTransform(scrollProgress, [0.2, 0.44], [0, 56]);
  const thumbOpacity = useTransform(scrollProgress, [0.22, 0.44], [0, 1]);
  const thumbGap = useTransform(scrollProgress, [0.2, 0.44], [0, 10]);

  const shortOpacity = useTransform(scrollProgress, [0.16, 0.3], [1, 0]);
  const longOpacity = useTransform(scrollProgress, [0.28, 0.45], [0, 1]);
  const cardWidth = useTransform(scrollProgress, [0.18, 0.45], [148, 212]);

  const nodeOpacity = useTransform(
    scrollProgress,
    item.enterOnScroll ? [0.14, 0.36, 0.94, 1] : [0, 0.14, 0.94, 1],
    item.enterOnScroll ? [0, 1, 1, 0.85] : [1, 1, 1, 0.85]
  );

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ top, left, opacity: nodeOpacity }}
      initial={{ scale: 0.94 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex items-center text-left absolute z-20 cursor-pointer will-change-transform group"
    >
      <motion.div
        style={{ width: thumbWidth, opacity: thumbOpacity, marginRight: thumbGap }}
        className="h-14 overflow-hidden rounded-xl shrink-0 shadow-md border border-[#d2d7fc]/70 bg-[#eef0fd]"
      >
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          loading="lazy"
          className="w-14 h-14 object-cover"
        />
      </motion.div>

      <motion.div
        style={{ width: cardWidth }}
        className={`relative ${item.cardBg} border rounded-xl px-3.5 py-2.5 shadow-sm min-h-[52px] flex items-center`}
      >
        {/* Initial compact badge state */}
        <motion.span
          style={{ opacity: shortOpacity }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A0C1A] whitespace-nowrap"
        >
          <span
            className="w-3 h-3 rounded-[4px] shrink-0"
            style={{ backgroundColor: item.swatchColor }}
            aria-hidden="true"
          />
          <span>{item.shortLabel}</span>
        </motion.span>

        {/* Morphed expanded card state (dot top-left + 2 lines copy) */}
        <motion.div
          style={{ opacity: longOpacity }}
          className="absolute inset-0 px-3.5 py-2 flex items-start gap-2"
        >
          <span
            className="w-2.5 h-2.5 rounded-[3px] shrink-0 mt-1"
            style={{ backgroundColor: item.swatchColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-[#0A0C1A] leading-snug line-clamp-2">
            {item.expandedCopy}
          </span>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

export function ParentSquareHero({
  onPrimaryCta,
  onSecondaryCta,
  onJumpToSection,
}: ParentSquareHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [playingYoutube, setPlayingYoutube] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 27,
    restDelta: 0.001,
  });

  // Phase 1 Header -> blurs and fades out cleanly before Phase 2 appears
  const phase1Opacity = useTransform(smooth, [0.08, 0.3], [1, 0]);
  const phase1Y = useTransform(smooth, [0.08, 0.32], [0, -24]);
  const phase1Filter = useTransform(smooth, [0.1, 0.3], ['blur(0px)', 'blur(10px)']);
  const phase1Pointer = useTransform(smooth, (v) => (v > 0.24 ? 'none' : 'auto'));

  // Center Video shrinks down AND fades completely out during morph to leave clean center canvas
  const videoScale = useTransform(smooth, [0.12, 0.44], prefersReducedMotion ? [1, 1] : [1, 0.32]);
  const videoY = useTransform(smooth, [0.12, 0.44], prefersReducedMotion ? [0, 0] : [0, -64]);
  const videoOpacity = useTransform(smooth, [0.22, 0.42], [1, 0]);
  const videoPointer = useTransform(smooth, (v) => (v > 0.36 ? 'none' : 'auto'));

  // Phase 2 Statement -> crossfades dead-center between the 2 rows of scattered cards
  const phase2Opacity = useTransform(smooth, [0.28, 0.46, 0.96, 1], [0, 1, 1, 1]);
  const phase2Y = useTransform(smooth, [0.28, 0.46], [20, 0]);
  const phase2Filter = useTransform(smooth, [0.28, 0.44], ['blur(10px)', 'blur(0px)']);

  // Phase 3 Bottom 4-Stat Strip rises in from 0.38 to 0.54
  const statsOpacity = useTransform(smooth, [0.38, 0.54, 0.96, 1], [0, 1, 1, 1]);
  const statsY = useTransform(smooth, [0.38, 0.54], [22, 0]);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative bg-[#F4F6FF] border-b border-[#d9dcea] lg:h-[220vh]"
    >
      {/* Desktop Sticky Scroll Choreography Stage */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between overflow-x-clip px-4 sm:px-6 pt-6 pb-10 lg:pt-[76px] lg:pb-6">
        <div className="max-w-[1440px] w-full mx-auto relative flex-1 flex flex-col items-center">
          {/* Desktop Scattered Morph Nodes (Absolute across full 1440px stage) */}
          {HERO_CALLOUTS.map((item) => (
            <FlyOutCalloutNode
              key={item.id}
              item={item}
              scrollProgress={smooth}
              reducedMotion={prefersReducedMotion}
              onClick={() => onJumpToSection(item.targetSection, `Hero node: ${item.shortLabel}`)}
            />
          ))}

          {/* Phase 1 Top Header Block */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: phase1Opacity,
                    y: phase1Y,
                    filter: phase1Filter,
                    pointerEvents: phase1Pointer,
                  }
            }
            className="relative z-10 max-w-3xl mx-auto text-center pt-4 sm:pt-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(2.2rem,4.1vw,3.45rem)] leading-[1.08] tracking-[-0.038em] text-[#0A0C1A] mx-auto"
            >
              Fundamentos de IA pensados para{' '}
              <span className="text-[#303163]">tu trabajo diario</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3.5 text-base sm:text-lg text-[#525770] leading-[1.5] max-w-2xl mx-auto"
            >
              Un programa práctico de 4 módulos en vivo desde{' '}
              <strong className="text-[#0A0C1A] tabular-nums">$399.000 COP</strong> o{' '}
              <strong className="text-[#0A0C1A] tabular-nums">$129 USD</strong>, en pago único o 2 cuotas con Bold.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-wrap items-center justify-center gap-3.5"
            >
              <button
                type="button"
                onClick={onPrimaryCta}
                className="inline-flex items-center justify-center gap-2.5 bg-[#8A8EF9] hover:bg-[#777ae3] active:scale-[0.98] text-[#0A0C1A] font-display font-bold text-base px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Inscribirme al programa</span>
                <span className="w-6 h-6 rounded-full bg-[#0A0C1A]/15 inline-flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0A0C1A]" aria-hidden="true" />
                </span>
              </button>

              <button
                type="button"
                onClick={onSecondaryCta}
                className="inline-flex items-center justify-center bg-white hover:bg-[#eef0fd] active:scale-[0.98] text-[#0A0C1A] border border-[#c3c9fc] font-semibold text-base px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Ver los 4 módulos
              </button>
            </motion.div>
          </motion.div>

          {/* Phase 2 Centered Statement (Desktop Sticky Morph) */}
          <motion.div
            style={{ opacity: phase2Opacity, y: phase2Y, filter: phase2Filter }}
            className="hidden lg:flex pointer-events-none absolute inset-x-0 top-[44%] -translate-y-1/2 justify-center z-10 px-6 text-center"
            aria-hidden="true"
          >
            <p className="font-display font-bold text-3xl xl:text-[42px] leading-[1.14] tracking-[-0.035em] text-[#0A0C1A] max-w-3xl text-balance">
              Creamos una formación práctica para resolver las dudas reales que enfrentas cada semana en tu trabajo.
            </p>
          </motion.div>

          {/* Centered Pexels Photo / YouTube Video Stage */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    scale: videoScale,
                    y: videoY,
                    opacity: videoOpacity,
                    pointerEvents: videoPointer,
                    transformOrigin: 'center center',
                  }
            }
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-6 sm:mt-7 w-full max-w-[580px] aspect-[16/10] rounded-[24px] overflow-hidden border border-[#c3c9fc] bg-[#0A0C1A] shadow-xl will-change-transform"
          >
            {playingYoutube ? (
              <>
                <iframe
                  src={embedUrl}
                  title="Cómo funcionan los modelos de lenguaje: introducción en YouTube"
                  className="w-full h-full border-0 bg-[#0A0C1A]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <button
                  type="button"
                  onClick={() => setPlayingYoutube(false)}
                  aria-label="Cerrar reproductor de YouTube"
                  className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#0A0C1A]/85 hover:bg-[#0A0C1A] text-white border border-[#5a5bb6]/60 inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={HERO_VIDEO_POSTER}
                  alt="Profesionales colaborando en taller práctico de inteligencia artificial para el trabajo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0A0C1A]/28 flex items-center justify-center p-4">
                  <button
                    type="button"
                    onClick={() => setPlayingYoutube(true)}
                    className="group inline-flex items-center gap-3.5 bg-[#0A0C1A]/90 hover:bg-[#0A0C1A] text-[#F4F6FF] border border-[#8A8EF9]/60 rounded-full pl-3.5 pr-6 py-3 shadow-2xl transition-transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#8A8EF9] text-[#0A0C1A] inline-flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="text-left">
                      <span className="block font-display font-bold text-sm sm:text-base text-[#F4F6FF] leading-tight">
                        Ver video introductorio
                      </span>
                      <span className="block text-xs text-[#c8cce0] mt-0.5">
                        Reproducir en YouTube
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Responsive Topic Grid on Mobile & Tablet (< lg) */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 lg:hidden w-full max-w-[580px]">
            {HERO_CALLOUTS.slice(0, 6).map((item) => (
              <button
                key={`mobile-${item.id}`}
                type="button"
                onClick={() => onJumpToSection(item.targetSection, `Hero node móvil: ${item.shortLabel}`)}
                className={`${item.cardBg} border rounded-xl px-3 py-2.5 text-left flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A0C1A] cursor-pointer`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-[4px] shrink-0"
                  style={{ backgroundColor: item.swatchColor }}
                  aria-hidden="true"
                />
                <span className="truncate">{item.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phase 3 Stat Strip at Bottom of Desktop Sticky Stage */}
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: statsOpacity, y: statsY }}
          className="hidden lg:grid max-w-[1280px] w-full mx-auto grid-cols-4 gap-8 pt-5 border-t border-[#d9dcea]"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="font-display font-bold text-3xl xl:text-[40px] leading-none tracking-[-0.03em] text-[#0A0C1A] tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#525770]">{stat.caption}</p>
            </div>
          ))}
        </motion.div>

        {/* Static Stat Strip on Mobile & Tablet */}
        <div className="lg:hidden mt-8 pt-6 border-t border-[#d9dcea] grid grid-cols-2 gap-5 text-center">
          {HERO_STATS.map((stat) => (
            <div key={`m-${stat.value}`}>
              <p className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.03em] text-[#0A0C1A] tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#525770]">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
