import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { HeroLearningIllustration, ModuleIllustration } from './Illustrations';

export interface ModuleItem {
  num: string;
  title: string;
  description: string;
  outcome: string;
  variant: 'understand' | 'prompt' | 'safety' | 'growth';
}

const WORK_TASKS = [
  'Resúmenes de reuniones',
  'Propuestas comerciales',
  'Protección de datos',
  'Plantillas de correo',
  'Análisis de documentos',
  'Seguimiento de proyectos',
];

export function HeroScrollStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 96%', 'center 52%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const y = useTransform(smoothProgress, [0, 1], [48, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.35], [0.85, 1]);
  const radius = useTransform(smoothProgress, [0, 1], [36, 28]);

  return (
    <div ref={stageRef} className="mt-14 sm:mt-20 max-w-[1280px] mx-auto">
      <motion.div
        style={{ scale, y, opacity, borderRadius: radius }}
        className="will-change-transform overflow-hidden"
      >
        <HeroLearningIllustration />
      </motion.div>
    </div>
  );
}

export function MarqueeWorkStrip() {
  const prefersReducedMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });

  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, -64]);

  return (
    <section
      ref={stripRef}
      aria-label="Tareas laborales incluidas en la práctica"
      className="border-b border-[#d9dcea] bg-[#eef0fd] py-5 sm:py-6 overflow-hidden select-none"
    >
      {prefersReducedMotion ? (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm sm:text-base font-display font-bold tracking-[-0.02em] text-[#303163]">
          {WORK_TASKS.map((task, idx) => (
            <React.Fragment key={task}>
              <span>{task}</span>
              {idx < WORK_TASKS.length - 1 && (
                <span className="text-[#5a5bb6]" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <motion.div style={{ x: parallaxX }} className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 sm:gap-10 shrink-0 pr-8 sm:pr-10"
          >
            {[...WORK_TASKS, ...WORK_TASKS].map((task, idx) => (
              <React.Fragment key={`${task}-${idx}`}>
                <span className="font-display font-bold text-lg sm:text-2xl tracking-[-0.025em] text-[#303163]">
                  {task}
                </span>
                <span className="text-xl text-[#5a5bb6] font-bold" aria-hidden="true">
                  ·
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function EditorialModuleCard({
  mod,
  index,
}: {
  mod: ModuleItem;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isRightColumn = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 92%', 'end 18%'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const cardY = useTransform(
    smooth,
    [0, 1],
    isRightColumn ? [44, -22] : [18, -8]
  );
  const illustrationScale = useTransform(smooth, [0, 0.55, 1], [0.96, 1, 1.02]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.42, delay: isRightColumn ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative z-10 bg-white border border-[#c3c9fc] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg ${
        isRightColumn ? 'lg:mt-12' : ''
      }`}
    >
      <div className="overflow-hidden rounded-2xl">
        <motion.div style={{ scale: illustrationScale }} className="will-change-transform">
          <ModuleIllustration variant={mod.variant} />
        </motion.div>
      </div>

      <div className="mt-7 pt-6 border-t border-[#e3e5ef] grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
        <div className="sm:col-span-5">
          <h3 className="font-display font-bold text-2xl sm:text-[26px] leading-[1.08] tracking-[-0.03em] text-[#0A0C1A]">
            {mod.num} {mod.title}
          </h3>
        </div>

        <div className="sm:col-span-7 space-y-3">
          <p className="text-base text-[#525770] leading-[1.55]">
            {mod.description}
          </p>
          <p className="text-sm font-semibold text-[#303163]">
            {mod.outcome}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function EditorialModuleShowcase({ modules }: { modules: ModuleItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 80%'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="contenido"
      className="py-24 sm:py-32 px-4 sm:px-10 border-b border-[#d9dcea] bg-[#F4F6FF] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end"
        >
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[0.94] tracking-[-0.04em] text-[#0A0C1A]">
              Cuatro módulos pensados para tu trabajo diario.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-[#525770] leading-[1.52]">
              Trabajamos sobre casos cotidianos de oficina, ventas, operaciones, análisis y gestión. Cada sesión termina con un ejercicio que puedes usar al día siguiente.
            </p>
          </div>
        </motion.div>

        <div ref={containerRef} className="relative mt-16 sm:mt-20">
          {/* Winding scroll-drawn connector path behind the 2-column showcase */}
          <svg
            viewBox="0 0 1200 900"
            preserveAspectRatio="none"
            className="hidden lg:block pointer-events-none absolute inset-0 w-full h-full z-0"
            aria-hidden="true"
          >
            <path
              d="M 180 120 C 480 120, 720 190, 1020 220 C 1100 230, 1080 450, 600 470 C 140 490, 120 670, 220 710 C 480 780, 780 740, 1020 790"
              fill="none"
              stroke="#e1e4fd"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.path
              d="M 180 120 C 480 120, 720 190, 1020 220 C 1100 230, 1080 450, 600 470 C 140 490, 120 670, 220 710 C 480 780, 780 740, 1020 790"
              fill="none"
              stroke="#8A8EF9"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {modules.map((mod, index) => (
              <EditorialModuleCard key={mod.num} mod={mod} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MonumentalStatementSection({
  onAction,
}: {
  onAction: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center 52%'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 26 });
  const scale = useTransform(smooth, [0, 1], [0.93, 1]);
  const y = useTransform(smooth, [0, 1], [32, 0]);
  const opacity = useTransform(smooth, [0, 0.35], [0.65, 1]);

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-4 sm:px-10 bg-[#0A0C1A] text-[#F4F6FF] overflow-hidden"
    >
      <motion.div
        style={{ scale, y, opacity }}
        className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end will-change-transform"
      >
        <div className="lg:col-span-8">
          <h2 className="font-display font-bold text-[clamp(2.35rem,5.4vw,4.75rem)] leading-[0.94] tracking-[-0.045em] text-[#F4F6FF]">
            Menos ruido sobre inteligencia artificial, más criterio para tu semana laboral.
          </h2>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <p className="text-base sm:text-lg text-[#c8cce0] leading-[1.55]">
            Aprende paso a paso en vivo con ejercicios reales, sin presiones ni promesas vacías.
          </p>
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center bg-[#8A8EF9] hover:bg-[#777ae3] active:scale-[0.98] text-[#0A0C1A] font-display font-bold text-base px-7 py-3.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            Reservar mi cupo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
