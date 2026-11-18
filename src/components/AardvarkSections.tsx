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

interface AardvarkSectionsProps {
  onSelectCta: () => void;
}

interface ModuleCardData {
  id: string;
  title: string;
  shortNote: string;
  tags: Array<{ label: string; bg: string; text: string }>;
  cardBg: string;
  blockBackColor: string;
  blockPreset: SquaiBlockPreset;
  ctaVariant: 'dark' | 'periwinkle' | 'marigold' | 'white';
  imageUrl: string;
  imageAlt: string;
  tilt: string;
  staggerClass: string;
}

const MODULES: ModuleCardData[] = [
  {
    id: 'm1',
    title: 'Cómo funciona sin mitos',
    shortNote:
      'Entiendes qué hace bien la IA y en qué casos inventa respuestas para trabajar con criterio real.',
    tags: [
      { label: 'Criterio', bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]' },
      { label: 'Casos reales', bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]' },
    ],
    cardBg: 'bg-[#eef0fd]',
    blockBackColor: '#b4bafc',
    blockPreset: 'mod-1',
    ctaVariant: 'dark',
    imageUrl:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Dos colegas revisando resultados claros frente a su computador',
    tilt: '-rotate-2',
    staggerClass: 'lg:translate-y-0',
  },
  {
    id: 'm2',
    title: 'Pedir con contexto',
    shortNote:
      'Escribes instrucciones claras con objetivo, público y formato para obtener resultados útiles al primer intento.',
    tags: [
      { label: 'Prompts', bg: 'bg-[#0A0C1A]', text: 'text-[#F9C24D]' },
      { label: 'Plantillas', bg: 'bg-white', text: 'text-[#0A0C1A]' },
    ],
    cardBg: 'bg-[#F9C24D]',
    blockBackColor: '#ffe29a',
    blockPreset: 'mod-2',
    ctaVariant: 'dark',
    imageUrl:
      'https://images.pexels.com/photos/7437087/pexels-photo-7437087.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Persona revisando documentos laborales en escritorio ordenado',
    tilt: 'rotate-[1.8deg]',
    staggerClass: 'lg:translate-y-6',
  },
  {
    id: 'm3',
    title: 'Cuidar tu información',
    shortNote:
      'Proteges contratos, cifras y datos de clientes con reglas claras de anonimización sin frenar tu ritmo.',
    tags: [
      { label: 'Privacidad', bg: 'bg-[#0A0C1A]', text: 'text-[#F4F6FF]' },
      { label: 'Seguridad', bg: 'bg-[#8A8EF9]', text: 'text-[#0A0C1A]' },
    ],
    cardBg: 'bg-[#e1e4fd]',
    blockBackColor: '#969bfc',
    blockPreset: 'mod-3',
    ctaVariant: 'dark',
    imageUrl:
      'https://images.pexels.com/photos/7651928/pexels-photo-7651928.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Equipo organizando metas y procesos semanales',
    tilt: '-rotate-[1.6deg]',
    staggerClass: 'lg:translate-y-1',
  },
  {
    id: 'm4',
    title: 'Rutinas para tu semana',
    shortNote:
      'Integras flujos repetibles en correos, síntesis y reportes semanales conservando tu propia voz.',
    tags: [
      { label: 'Flujos', bg: 'bg-[#F9C24D]', text: 'text-[#0A0C1A]' },
      { label: 'Productividad', bg: 'bg-white', text: 'text-[#0A0C1A]' },
    ],
    cardBg: 'bg-[#8A8EF9]',
    blockBackColor: '#5a5bb6',
    blockPreset: 'mod-4',
    ctaVariant: 'dark',
    imageUrl:
      'https://images.pexels.com/photos/7693685/pexels-photo-7693685.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Profesional revisando reportes y métricas en computador portátil',
    tilt: 'rotate-2',
    staggerClass: 'lg:translate-y-7',
  },
];

const FLOW_STEPS = [
  {
    step: 'Paso #1',
    title: 'Te inscribes en dos minutos',
    copy: 'Dejas tu nombre, correo y WhatsApp y pasas a la pasarela segura para completar tu pago.',
    bg: 'bg-[#8A8EF9]',
    restingRotate: 2.2,
    restingY: 4,
  },
  {
    step: 'Paso #2',
    title: 'Recibes tu acceso previo',
    copy: 'Te enviamos los enlaces de las sesiones y una guía corta para llegar con un caso real.',
    bg: 'bg-[#F9C24D]',
    restingRotate: -1.4,
    restingY: -4,
  },
  {
    step: 'Paso #3',
    title: 'Practicas con casos reales',
    copy: 'Trabajas sobre tus correos, tablas o documentos en vivo con acompañamiento directo.',
    bg: 'bg-white',
    restingRotate: 1.5,
    restingY: 8,
  },
  {
    step: 'Paso #4',
    title: 'Aplicas con tus plantillas',
    copy: 'Te quedas con las grabaciones, la biblioteca editable y reglas claras de privacidad.',
    bg: 'bg-[#d2d7fc]',
    restingRotate: -2.2,
    restingY: 0,
  },
];

const KIT_NOTES = [
  {
    label: '18 plantillas editables',
    bg: 'bg-white',
    tilt: '-rotate-3',
  },
  {
    label: 'Lista de privacidad para equipos',
    bg: 'bg-[#F9C24D]',
    tilt: 'rotate-2',
  },
  {
    label: 'Grabaciones siempre listas',
    bg: 'bg-[#8A8EF9]',
    tilt: '-rotate-2',
  },
  {
    label: 'Acompañamiento por WhatsApp',
    bg: 'bg-white',
    tilt: 'rotate-3',
  },
];

export function AardvarkSections({ onSelectCta }: AardvarkSectionsProps) {
  const [hoveredFlowIdx, setHoveredFlowIdx] = useState<number | null>(null);
  const flowRef = useRef<HTMLElement>(null);
  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ['start end', 'end start'],
  });
  const flowDeckY = useTransform(flowProgress, [0, 1], [32, -32]);

  return (
    <>
      {/* ============================================================
          SECTION 2: LOS 4 MÓDULOS (.books Full-Width White Rounded Band)
          Zero slider arrows (all 4 cards visible), tall Aardvark proportions,
          single oversized corner blocks appearing BEHIND cards ONLY on hover.
          ============================================================ */}
      <section
        id="contenido"
        className="w-full bg-white text-[#0A0C1A] pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 relative z-10 scroll-mt-10"
        aria-labelledby="modules-heading"
      >
        <div className="max-w-[1680px] mx-auto">
          <div className="text-center max-w-[960px] mx-auto mb-8 sm:mb-10 space-y-5 relative">
            <h2 id="modules-heading" className="aardvark-h2 text-[#0A0C1A]">
              Cuatro módulos que sí usas el lunes.
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[560px] mx-auto">
              Dejamos fuera la teoría pesada para trabajar sobre correos, análisis y documentos que ya hacen parte de tu rutina semanal.
            </p>
          </div>

          {/* Handwritten legend placed cleanly BETWEEN description and the 4 module cards */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[1.6deg]">
              Cuatro sesiones en vivo
            </span>
          </div>

          {/* 4 Tall Borderless Module Cards with Slim Edge Frame + Large Cover Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-10 pt-6 pb-8 items-stretch">
            {MODULES.map((mod, idx) => (
              <motion.article
                key={mod.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.48, delay: idx * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className={`aardvark-book-card group/card pt-8 ${mod.staggerClass} flex`}
              >
                <div className={`aardvark-book-card__inner relative w-full ${mod.tilt}`}>
                  {/* Varied asymmetrical Squai blocks behind edges: visible ONLY on hover */}
                  <SquaiCornerBlocks
                    size="card"
                    preset={mod.blockPreset}
                    hoverOnly
                    backColor={mod.blockBackColor}
                  />

                  {/* Tall Solid Borderless Card Surface (z-10) + Bottom Extension Lip */}
                  <div
                    className={`relative z-10 rounded-[34px] ${mod.cardBg} flex flex-col justify-between shadow-lg h-full min-h-[530px] lg:min-h-[565px]`}
                  >
                    <button
                      type="button"
                      onClick={onSelectCta}
                      className="w-full flex-1 text-left p-3 sm:p-3.5 pb-6 flex flex-col justify-between gap-4 cursor-pointer rounded-[34px] focus-visible:outline-offset-4"
                    >
                      <div className="aspect-[4/4.6] w-full rounded-[24px] overflow-hidden bg-white">
                        <img
                          src={mod.imageUrl}
                          alt={mod.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                        />
                      </div>

                      <div className="space-y-2 px-2">
                        <h3 className="aardvark-h3 text-[#0A0C1A]">{mod.title}</h3>
                        <p className="aardvark-body text-[#0A0C1A]/85">{mod.shortNote}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 px-2 pt-0.5">
                        {mod.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={`px-3.5 py-1.5 rounded-lg text-sm font-display font-bold ${tag.bg} ${tag.text}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </button>

                    <div
                      className={`aardvark-book-card__bg-bottom ${mod.cardBg} -mt-12 -z-10`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Detached CTA popping cleanly below card on hover */}
                  <div className="aardvark-book-card__cta">
                    <AardvarkButtonAlt
                      label="Inscribirme"
                      size="sm"
                      variant={mod.ctaVariant}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: CÓMO FUNCIONA (.flow.is--inner-clip Full-Width Inset Band)
          Taller reference card proportions + thick bold titles + mouse parting wave
          ============================================================ */}
      <section
        id="como-funciona"
        ref={flowRef}
        className="w-full bg-white text-[#0A0C1A] py-4 sm:py-6 px-3 sm:px-5 lg:px-6"
        aria-labelledby="flow-heading"
      >
        <div className="w-full relative bg-[#eef0fd] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
          <div
            className="absolute inset-x-0 top-0 pointer-events-none select-none opacity-80"
            aria-hidden="true"
          >
            <FlowRibbonSvg />
          </div>

          <div className="max-w-[1680px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-14 sm:mb-20">
              <div className="space-y-4 max-w-[780px]">
                <h2 id="flow-heading" className="aardvark-h2 text-[#0A0C1A]">
                  Cómo funciona de principio a fin.
                </h2>
                <p className="aardvark-handwritten-lg text-[#5a5bb6] inline-block rotate-[1.8deg]">
                  Cuatro pasos simples, cero relleno
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <span className="w-14 h-14 rounded-full bg-white inline-flex items-center justify-center shrink-0">
                  <SquaiMark variant="color" className="w-7 h-7" />
                </span>
                <AardvarkButtonAlt
                  label="Empezar mi inscripción"
                  variant="dark"
                  size="lg"
                  onClick={onSelectCta}
                />
              </div>
            </div>

            {/* 4 Overlapping Tall Tilted Flow Step Cards */}
            <motion.div
              style={{ y: flowDeckY }}
              onMouseLeave={() => setHoveredFlowIdx(null)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-stretch pt-4 pb-6 lg:px-10"
            >
              {FLOW_STEPS.map((item, idx) => {
                const isHovered = hoveredFlowIdx === idx;
                let pushPercent = 0;
                if (hoveredFlowIdx !== null && hoveredFlowIdx !== idx) {
                  pushPercent = 18 / (idx - hoveredFlowIdx);
                }

                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 120, rotate: item.restingRotate * 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      type: 'spring',
                      stiffness: 185,
                      damping: 18,
                      delay: idx * 0.08,
                    }}
                    className="aardvark-flow-item relative"
                    style={{ zIndex: isHovered ? 40 : 10 + idx }}
                    onMouseEnter={() => setHoveredFlowIdx(idx)}
                  >
                    <motion.div
                      animate={{
                        x: `${pushPercent}%`,
                        scale: isHovered ? 1.075 : 1,
                        rotate: isHovered ? 0 : item.restingRotate,
                        y: isHovered ? -10 : item.restingY,
                      }}
                      transition={{
                        duration: 0.48,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className={`${item.bg} rounded-[36px] p-8 sm:p-10 shadow-xl min-h-[485px] lg:min-h-[520px] flex flex-col justify-between gap-6`}
                    >
                      <div className="text-center">
                        <span className="aardvark-handwritten-lg text-[#0A0C1A]">
                          {item.step}
                        </span>
                      </div>

                      <div className="flex-1 flex items-center justify-center py-2">
                        <FlowStepIllustration stepIndex={idx} />
                      </div>

                      <div className="space-y-3">
                        <h3 className="aardvark-h3 text-[#0A0C1A]">{item.title}</h3>
                        <p className="aardvark-body text-[#0A0C1A]/85">{item.copy}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: LO QUE TE LLEVAS (.box Reference-Accurate Centered Inset Showcase)
          Full-bleed rounded sky-periwinkle #d2d7fc inset section between #eef0fd Flow above
          and #303163 Roles below, featuring centered giant inverted box typography,
          floating handwritten margin notes, tilted deliverable pills & dark CTA.
          ============================================================ */}
      <section
        id="entregables"
        className="w-full bg-white text-[#0A0C1A] py-4 sm:py-6 px-3 sm:px-5 lg:px-6"
        aria-labelledby="kit-heading"
      >
        <div className="w-full relative bg-[#d2d7fc] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden py-24 sm:py-36 px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1340px] mx-auto relative flex flex-col items-center text-center">
            {/* Upper-right handwritten margin callout matching .box__text-outer without overlapping 'Todo listo para' */}
            <motion.p
              initial={{ opacity: 0, rotate: -6, y: 12 }}
              whileInView={{ opacity: 1, rotate: -2.5, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="lg:absolute lg:-top-14 lg:right-2 xl:right-6 font-human text-lg sm:text-xl text-[#303163] max-w-[270px] leading-snug mb-8 lg:mb-0"
            >
              Cada sesión deja plantillas editables para aplicar desde el primer día
            </motion.p>

            {/* Centered Giant .box Headline + Inverted Midnight Box Badge + Squai Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="space-y-4 sm:space-y-5"
            >
              <h2 id="kit-heading" className="aardvark-h1 text-[#0A0C1A]">
                <span className="block">Todo listo para</span>
                <span className="inline-flex items-center justify-center gap-3 sm:gap-5 bg-[#0A0C1A] text-[#F4F6FF] px-6 sm:px-10 py-2.5 sm:py-4 rounded-[22px] sm:rounded-[30px] mt-3 shadow-2xl -rotate-[1.2deg]">
                  <span>tu escritorio.</span>
                  <SquaiMark variant="color" className="w-9 h-9 sm:w-14 sm:h-14 shrink-0" />
                </span>
              </h2>
            </motion.div>

            {/* Offset Handwritten Tagline below centerpiece */}
            <div className="w-full max-w-[680px] flex justify-center lg:justify-end pt-6 pb-8">
              <span className="aardvark-handwritten-lg text-[#303163] rotate-[3deg] inline-block">
                Hecho para equipos reales
              </span>
            </div>

            {/* 4 Tilted Deliverable Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 max-w-[900px] pb-10">
              {KIT_NOTES.map((note, idx) => (
                <motion.div
                  key={note.label}
                  initial={{ opacity: 0, scale: 0.78, rotate: idx % 2 === 0 ? -8 : 8 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -1.8 : 1.8 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 18,
                    delay: idx * 0.06,
                  }}
                  whileHover={{ scale: 1.06, rotate: 0 }}
                  className={`${note.bg} ${note.tilt} rounded-[22px] px-6 py-3.5 shadow-md`}
                >
                  <span className="font-display font-bold text-lg sm:text-xl text-[#0A0C1A]">
                    {note.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div>
              <AardvarkButtonAlt
                label="Inscribirme ahora"
                variant="dark"
                size="lg"
                onClick={onSelectCta}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
