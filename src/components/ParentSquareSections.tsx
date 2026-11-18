import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  ModuleIllustration,
  ProgramCriteriaDiagram,
  PromptWorkflowDiagram,
  RoleSceneIllustration,
} from './Illustrations';
import { SquaiMark } from './SquaiBrand';

interface ParentSquareSectionsProps {
  currency: 'COP' | 'USD';
  onChangeCurrency: (currency: 'COP' | 'USD') => void;
  onSelectPlan: (currency: 'COP' | 'USD', plan: 'full' | 'installments', label: string) => void;
  onScrollTo: (sectionId: string, label: string) => void;
}

const WORK_TASKS = [
  'Resúmenes de reuniones',
  'Propuestas comerciales',
  'Protección de datos',
  'Plantillas de correo',
  'Análisis de documentos',
  'Seguimiento de proyectos',
];

const METHODOLOGY_SLIDES = [
  {
    step: '01. Entender',
    variant: 'understand' as const,
    quote:
      '“Ahora sí entiendo qué está pasando detrás de cada respuesta. Dejé de copiar instrucciones al azar y sé cuándo confiar en un resultado.”',
    author: 'Módulo 01 · Cómo funciona la IA por dentro',
    role: 'De la prueba y error sin rumbo al criterio propio en cada tarea.',
  },
  {
    step: '02. Experimentar',
    variant: 'prompt' as const,
    quote:
      '“El resumen de la reunión me salía genérico porque no le decía quién lo iba a leer ni qué decisión íbamos a tomar. Ahora sale útil al primer intento.”',
    author: 'Módulo 02 · Prompts con contexto real',
    role: 'Práctica directa con correos, propuestas y cotizaciones de tu semana.',
  },
  {
    step: '03. Proteger',
    variant: 'safety' as const,
    quote:
      '“Tenía la duda constante de qué pasaba al pegar contratos o cifras de clientes. Hoy sé exactamente qué anonimizar y qué ajustes activar.”',
    author: 'Módulo 03 · Cuidado de tu información',
    role: 'Reglas claras para trabajar con tranquilidad sin exponer datos sensibles.',
  },
  {
    step: '04. Ampliar',
    variant: 'growth' as const,
    quote:
      '“Salí con tres plantillas armadas sobre mis archivos reales que ya uso todas las semanas en reportes y seguimiento de pendientes.”',
    author: 'Módulo 04 · Rutinas aplicables a tu rol',
    role: 'Profesionales en lo que sabemos, relajados en cómo lo contamos.',
  },
];

const ROLE_TABS = [
  {
    key: 'operaciones' as const,
    title: 'Administración y operaciones',
    heading: 'Orden, minutas y seguimiento sin perder horas redactando',
    description:
      'Convierte notas dispersas de reuniones en acuerdos claros, actualiza manuales internos y organiza pendientes semanales manteniendo el control sobre cada archivo.',
    ctaLabel: 'Aplicar a operaciones',
  },
  {
    key: 'ventas' as const,
    title: 'Ventas y propuestas',
    heading: 'Propuestas adaptadas a cada cliente en minutos',
    description:
      'Prepara respuestas comerciales claras, resume llamadas de descubrimiento y ajusta cotizaciones según las prioridades reales de quien las va a leer.',
    ctaLabel: 'Aplicar a ventas',
  },
  {
    key: 'analisis' as const,
    title: 'Análisis y reportes',
    heading: 'Lectura rápida de documentos largos con verificación',
    description:
      'Extrae hallazgos clave de PDFs extensos, compara versiones de informes y detecta rápidamente cuándo un modelo inventa cifras que debes revisar.',
    ctaLabel: 'Aplicar a análisis',
  },
  {
    key: 'liderazgo' as const,
    title: 'Liderazgo de equipos',
    heading: 'Criterios compartidos para todo tu equipo',
    description:
      'Define reglas sencillas sobre qué herramientas usar, cómo proteger la información de tus clientes y qué tareas conviene apoyar con IA y cuáles no.',
    ctaLabel: 'Aplicar a equipos',
  },
  {
    key: 'consultoria' as const,
    title: 'Consultoría independiente',
    heading: 'Más capacidad para entregar sin bajar tu estándar',
    description:
      'Arma tus propias plantillas reutilizables para diagnósticos, entregables y correos frecuentes manteniendo tu tono profesional intacto.',
    ctaLabel: 'Aplicar a consultoría',
  },
];

const MODULE_CARDS = [
  {
    num: '01.',
    title: 'Cómo funciona la IA por dentro',
    outcome: 'Entiendes qué hace un modelo cuando responde y por qué a veces inventa datos.',
    variant: 'understand' as const,
    bgClass: 'bg-[#8A8EF9]',
  },
  {
    num: '02.',
    title: 'Prompts con contexto real',
    outcome: 'Obtienes borradores útiles de correos, propuestas y resúmenes al primer intento.',
    variant: 'prompt' as const,
    bgClass: 'bg-[#F9C24D]',
  },
  {
    num: '03.',
    title: 'Cuidado de tus datos y clientes',
    outcome: 'Aprendes qué información nunca pegar tal cual y cómo anonimizar documentos.',
    variant: 'safety' as const,
    bgClass: 'bg-[#eef0fd]',
  },
  {
    num: '04.',
    title: 'Rutinas semanales aplicables',
    outcome: 'Sales con plantillas reutilizables armadas directamente sobre tu trabajo diario.',
    variant: 'growth' as const,
    bgClass: 'bg-[#c3c9fc]',
  },
];

const SESSION_ROWS = [
  {
    swatch: '#8A8EF9',
    title: 'Sesión 1 · Fundamentos sin tecnicismos',
    description:
      'Comprendes cómo generan texto los modelos de lenguaje y en qué casos conviene apoyarse en ellos.',
  },
  {
    swatch: '#F9C24D',
    title: 'Sesión 2 · Estructura práctica para pedir bien',
    description:
      'Practicas contexto, audiencia y formato sobre reuniones, correos y documentos reales de oficina.',
  },
  {
    swatch: '#303163',
    title: 'Sesión 3 · Privacidad y criterio responsable',
    description:
      'Identificas riesgos de confidencialidad y activas buenas prácticas para proteger datos propios y de clientes.',
  },
  {
    swatch: '#5a5bb6',
    title: 'Sesión 4 · Sistema propio de plantillas',
    description:
      'Construyes tus flujos reutilizables para que el aprendizaje quede funcionando desde el día siguiente.',
  },
];

const DELIVERABLES = [
  {
    title: 'Biblioteca de plantillas de prompts',
    description:
      'Guías listas para adaptar a resúmenes, propuestas comerciales, correos difíciles y lectura de documentos.',
    variant: 'prompt' as const,
  },
  {
    title: 'Lista de verificación de privacidad',
    description:
      'Criterios concretos para revisar antes de subir contratos, reportes internos o datos de clientes.',
    variant: 'safety' as const,
  },
  {
    title: 'Grabaciones y certificado Squai',
    description:
      'Acceso permanente a todas las sesiones grabadas y constancia de participación al completar los ejercicios.',
    variant: 'growth' as const,
  },
];

export function ParentSquareSections({
  currency,
  onChangeCurrency,
  onSelectPlan,
  onScrollTo,
}: ParentSquareSectionsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeRoleKey, setActiveRoleKey] = useState<(typeof ROLE_TABS)[number]['key']>('operaciones');
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const currentSlide = METHODOLOGY_SLIDES[slideIndex];
  const currentRole = ROLE_TABS.find((r) => r.key === activeRoleKey) || ROLE_TABS[0];

  const scrollModulesTrack = (direction: -1 | 1) => {
    const track = cardsTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * 360, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Split Feature Section A (Media Right, Copy Left) */}
      <section className="py-20 sm:py-28 px-4 sm:px-10 bg-white border-b border-[#d9dcea]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.06] tracking-[-0.035em] text-[#0A0C1A]">
              Lo complicado se entiende cuando te lo explican desde las bases
            </h2>
            <p className="text-base sm:text-lg text-[#525770] leading-[1.58]">
              Te abruma ver que cada semana sale otra herramienta y sientes que vas tarde, pero el problema casi nunca es la herramienta sino empezar sin criterio. En cuatro sesiones prácticas ordenas cómo pensar y usar la IA en tu trabajo diario.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(currency, 'full', 'Sección 1: Elegir pago único')
                }
                className="bg-[#8A8EF9] hover:bg-[#777ae3] text-[#0A0C1A] font-display font-bold text-sm sm:text-base px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Inscribirme hoy</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onScrollTo('contenido', 'Sección 1: Ver módulos')}
                className="bg-white hover:bg-[#eef0fd] text-[#0A0C1A] border border-[#c3c9fc] font-semibold text-sm sm:text-base px-5 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Explorar el contenido
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <ProgramCriteriaDiagram />
          </motion.div>
        </div>
      </section>

      {/* 2. Split Feature Section B (Media Left, Copy & Outcomes Right) */}
      <section className="py-20 sm:py-28 px-4 sm:px-10 bg-[#F4F6FF] border-b border-[#d9dcea]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <PromptWorkflowDiagram />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 space-y-6"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.06] tracking-[-0.035em] text-[#0A0C1A]">
              Menos tiempo corrigiendo textos genéricos, más claridad en cada entrega
            </h2>

            <ul className="space-y-3 text-base text-[#0A0C1A]">
              <li>· Sabes exactamente qué contexto incluir para evitar respuestas vacías</li>
              <li>· Aprendes a detectar datos inventados antes de enviar un informe</li>
              <li>· Proteges contratos, cifras y correos internos con reglas concretas</li>
              <li>· Armarás tus propias plantillas reutilizables para tu semana laboral</li>
              <li>· Pagas desde Colombia en COP ($399.000) o desde el exterior en USD ($129)</li>
            </ul>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onScrollTo('inversion', 'Sección 2: Ver opciones de pago')}
                className="bg-[#0A0C1A] hover:bg-[#1c1e2e] text-[#F4F6FF] font-display font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl inline-flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver opciones de pago</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Midnight Full-Bleed Band: Continuous Work Strip + Interactive Quote Carousel */}
      <section className="py-20 sm:py-28 bg-[#0A0C1A] text-[#F4F6FF] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-10 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.06] tracking-[-0.035em] max-w-3xl mx-auto">
            Formación práctica para resolver tareas reales de tu día a día
          </h2>
        </div>

        {/* Continuous Marquee inside Midnight band */}
        <div className="mt-10 py-5 border-y border-[#1c1e2e] overflow-hidden select-none">
          {prefersReducedMotion ? (
            <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap justify-center gap-6 text-base font-display font-bold text-[#c3c9fc]">
              {WORK_TASKS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          ) : (
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-10 whitespace-nowrap w-max"
            >
              {[...WORK_TASKS, ...WORK_TASKS].map((task, idx) => (
                <React.Fragment key={`${task}-${idx}`}>
                  <span className="font-display font-bold text-lg sm:text-2xl text-[#c3c9fc]">
                    {task}
                  </span>
                  <span className="text-[#8A8EF9]" aria-hidden="true">
                    ·
                  </span>
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>

        {/* Interactive Quote & Pillar Carousel (01 / 04) */}
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10 mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-4 bg-[#1c1e2e] border border-[#303163] rounded-[24px] p-5">
                <ModuleIllustration variant={currentSlide.variant} />
                <p className="mt-4 font-display font-bold text-lg text-[#F4F6FF]">
                  {currentSlide.step}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <blockquote className="font-display text-2xl sm:text-3xl leading-[1.3] text-[#F4F6FF]">
                  {currentSlide.quote}
                </blockquote>
                <div className="pt-2 border-t border-[#1c1e2e]">
                  <p className="font-semibold text-base text-[#8A8EF9]">{currentSlide.author}</p>
                  <p className="text-sm text-[#a7adcc] mt-1">{currentSlide.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-[#1c1e2e] flex items-center justify-between">
            <span className="text-sm font-semibold text-[#a7adcc] tabular-nums">
              0{slideIndex + 1} / 0{METHODOLOGY_SLIDES.length}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  setSlideIndex((prev) => (prev === 0 ? METHODOLOGY_SLIDES.length - 1 : prev - 1))
                }
                aria-label="Anterior paso del programa"
                className="w-10 h-10 rounded-full border border-[#303163] bg-[#1c1e2e] hover:bg-[#303163] text-[#F4F6FF] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSlideIndex((prev) => (prev + 1) % METHODOLOGY_SLIDES.length)
                }
                aria-label="Siguiente paso del programa"
                className="w-10 h-10 rounded-full border border-[#303163] bg-[#1c1e2e] hover:bg-[#303163] text-[#F4F6FF] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Role Tabs Section ("Diseñado para cada forma de trabajar") */}
      <section id="programa" className="py-20 sm:py-28 px-4 sm:px-10 bg-white border-b border-[#d9dcea]">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.035em] text-[#0A0C1A]">
              Pensado para profesionales, construido alrededor de tu trabajo
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#525770] leading-[1.55]">
              No enseñamos teoría abstracta ni programación avanzada. Adaptamos cada ejemplo a los correos, propuestas, análisis y decisiones que resuelves todas las semanas.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-2" role="tablist" aria-label="Áreas laborales del programa">
              {ROLE_TABS.map((role) => {
                const active = role.key === activeRoleKey;
                return (
                  <button
                    key={role.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveRoleKey(role.key)}
                    className={`text-left px-5 py-4 rounded-2xl border transition-all cursor-pointer font-display font-bold text-xl sm:text-2xl ${
                      active
                        ? 'bg-[#eef0fd] border-[#8A8EF9] text-[#0A0C1A]'
                        : 'bg-transparent border-transparent text-[#525770] hover:bg-[#f2f3f6] hover:text-[#0A0C1A]'
                    }`}
                  >
                    {role.title}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#F4F6FF] border border-[#d2d7fc] rounded-[28px] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-6">
                    <RoleSceneIllustration roleKey={currentRole.key} />
                  </div>
                  <div className="md:col-span-6 space-y-4">
                    <h3 className="font-display font-bold text-2xl leading-[1.15] text-[#0A0C1A]">
                      {currentRole.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-[#525770] leading-[1.55]">
                      {currentRole.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onScrollTo('inscripcion', `Pestaña rol: ${currentRole.title}`)
                      }
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#303163] hover:text-[#0A0C1A] underline underline-offset-4 decoration-[#8A8EF9] cursor-pointer"
                    >
                      <span>{currentRole.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Midnight Colorful Modules Carousel */}
      <section id="contenido" className="py-20 sm:py-28 px-4 sm:px-10 bg-[#0A0C1A] text-[#F4F6FF]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.035em] text-[#F4F6FF]">
                Cuatro módulos hechos para cómo trabajas hoy
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#c8cce0] leading-[1.55]">
                Cada módulo combina explicación clara desde cero con ejercicios prácticos sobre casos cotidianos de oficina, ventas, análisis y gestión.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollModulesTrack(-1)}
                aria-label="Desplazar módulos a la izquierda"
                className="w-11 h-11 rounded-full bg-[#1c1e2e] border border-[#303163] hover:bg-[#303163] text-[#F4F6FF] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollModulesTrack(1)}
                aria-label="Desplazar módulos a la derecha"
                className="w-11 h-11 rounded-full bg-[#1c1e2e] border border-[#303163] hover:bg-[#303163] text-[#F4F6FF] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={cardsTrackRef}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-x-auto pb-2"
          >
            {MODULE_CARDS.map((card, i) => (
              <motion.article
                key={card.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.34, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`${card.bgClass} text-[#0A0C1A] rounded-[24px] p-6 flex flex-col justify-between min-h-[340px]`}
              >
                <div className="space-y-4">
                  <div className="bg-white/85 rounded-2xl p-2">
                    <ModuleIllustration variant={card.variant} />
                  </div>
                  <h3 className="font-display font-bold text-xl leading-[1.15] text-[#0A0C1A]">
                    {card.num} {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-[#1c1e2e] leading-[1.5] font-medium">
                  {card.outcome}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Soft Periwinkle Overview Rows + Highlighted Pricing Banner */}
      <section id="inversion" className="py-20 sm:py-28 px-4 sm:px-10 bg-[#eef0fd] border-b border-[#d2d7fc]">
        <div className="max-w-[1040px] mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.06] tracking-[-0.035em] text-[#0A0C1A]">
              Todo lo que incluye tu inscripción en un solo programa
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#525770]">
              Cuatro sesiones en vivo, ejercicios con acompañamiento real y acceso flexible con Bold.
            </p>
          </div>

          <div className="mt-12 space-y-3.5">
            {SESSION_ROWS.map((row) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#d2d7fc] rounded-2xl p-5 sm:p-6 flex items-start sm:items-center gap-4"
              >
                <span
                  className="w-11 h-11 rounded-xl shrink-0 inline-flex items-center justify-center bg-[#f9faff] border border-[#e1e4fd]"
                  aria-hidden="true"
                >
                  <span
                    className="w-5 h-5 rounded-md"
                    style={{ backgroundColor: row.swatch }}
                  />
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#0A0C1A]">
                    {row.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#525770] mt-0.5">
                    {row.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Highlighted Bold Pricing Banner Card (Periwinkle #8A8EF9 + Midnight #0A0C1A text) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 bg-[#8A8EF9] text-[#0A0C1A] rounded-[28px] p-7 sm:p-10 text-center space-y-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex p-1 bg-[#f9faff]/85 rounded-xl" role="group" aria-label="Cambiar moneda de inversión">
                  <button
                    type="button"
                    onClick={() => onChangeCurrency('COP')}
                    aria-pressed={currency === 'COP'}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      currency === 'COP'
                        ? 'bg-[#0A0C1A] text-[#F4F6FF]'
                        : 'text-[#0A0C1A] hover:bg-white/60'
                    }`}
                  >
                    Pesos (COP)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeCurrency('USD')}
                    aria-pressed={currency === 'USD'}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      currency === 'USD'
                        ? 'bg-[#0A0C1A] text-[#F4F6FF]'
                        : 'text-[#0A0C1A] hover:bg-white/60'
                    }`}
                  >
                    Dólares (USD)
                  </button>
                </div>

                <div>
                  <h3 className="font-display font-bold text-3xl sm:text-5xl tracking-[-0.03em] tabular-nums">
                    {currency === 'COP' ? '$399.000 COP' : '$129 USD'}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-medium text-[#1c1e2e] tabular-nums">
                    {currency === 'COP'
                      ? 'Pago único o 2 cuotas quincenales de $199.500 COP sin interés con Bold (equiv. $129 USD)'
                      : 'Pago único o 2 cuotas quincenales de $64.50 USD sin interés con Bold (equiv. $399.000 COP)'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() =>
                    onSelectPlan(currency, 'full', 'Banner Inversión: Elegir pago único')
                  }
                  className="bg-[#0A0C1A] hover:bg-[#1c1e2e] text-[#F4F6FF] font-display font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  Elegir pago único
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectPlan(currency, 'installments', 'Banner Inversión: Elegir 2 cuotas')
                  }
                  className="bg-[#f9faff] hover:bg-white text-[#0A0C1A] font-display font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  Elegir 2 cuotas sin interés
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Centered Marigold Highlight Callout Banner (00:20) */}
      <section className="py-16 sm:py-20 px-4 sm:px-10 bg-white">
        <div className="max-w-[980px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F9C24D] text-[#0A0C1A] rounded-[28px] p-7 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-4 bg-[#f9faff] rounded-2xl p-6 flex items-center justify-center">
              <SquaiMark className="w-20 h-20" />
            </div>

            <div className="md:col-span-8 space-y-4">
              <h2 className="font-display font-bold text-2xl sm:text-3xl leading-[1.12] text-[#0A0C1A]">
                Da el primer paso hacia una forma más clara de trabajar con IA
              </h2>
              <p className="text-sm sm:text-base text-[#1c1e2e] leading-[1.5]">
                Resuelve tus dudas por WhatsApp o completa tu inscripción en menos de dos minutos con el método de pago Bold que prefieras.
              </p>
              <button
                type="button"
                onClick={() => onScrollTo('inscripcion', 'Banner Marigold: Ir a mi inscripción')}
                className="bg-[#0A0C1A] hover:bg-[#1c1e2e] text-[#F4F6FF] font-display font-bold text-sm sm:text-base px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ir a mi inscripción</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Three-Card Practical Deliverables Strip (00:20) */}
      <section className="pb-20 pt-4 px-4 sm:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.03em] text-[#0A0C1A] text-center">
            Recursos y acompañamiento incluidos
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERABLES.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F4F6FF] border border-[#d9dcea] rounded-[24px] p-6 flex flex-col justify-between"
              >
                <div>
                  <ModuleIllustration variant={item.variant} />
                  <h3 className="mt-5 font-display font-bold text-xl text-[#0A0C1A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#525770] leading-[1.55]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
