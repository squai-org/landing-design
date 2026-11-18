import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Custom editorial illustrations built from Squai's Visual DNA (Bloque + Unión)
 * and Periwinkle + Midnight + Neutral palette. Zero generic icons, zero AI clichés.
 */

export function HeroLearningIllustration({ compact = false }: { compact?: boolean }) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div
      className={`relative w-full h-full bg-[#eef0fd] flex flex-col justify-between overflow-hidden ${
        compact
          ? 'p-4 sm:p-5'
          : 'min-h-[340px] lg:min-h-[440px] border border-[#d2d7fc] rounded-[28px] p-6 sm:p-8'
      }`}
    >
      <svg
        viewBox="0 0 560 440"
        className={`w-full mx-auto ${compact ? 'h-full max-h-[330px]' : 'max-w-[640px] max-h-[420px] h-auto'}`}
        role="img"
        aria-label="Ilustración editorial de aprendizaje progresivo en inteligencia artificial con bloques conectados"
      >
        {/* Subtle 2x2 architectural grid from Squai DNA */}
        <rect x="28" y="24" width="236" height="184" rx="22" fill="#f9faff" stroke="#d2d7fc" strokeWidth="1.5" strokeDasharray="7 7" />
        <rect x="296" y="24" width="236" height="184" rx="22" fill="#f9faff" stroke="#d2d7fc" strokeWidth="1.5" strokeDasharray="7 7" />
        <rect x="28" y="232" width="236" height="184" rx="22" fill="#f9faff" stroke="#d2d7fc" strokeWidth="1.5" strokeDasharray="7 7" />
        <rect x="296" y="232" width="236" height="184" rx="22" fill="#f9faff" stroke="#d2d7fc" strokeWidth="1.5" strokeDasharray="7 7" />

        {/* Stage 1: Everyday work input block */}
        <g transform="translate(46, 44)">
          <rect x="0" y="0" width="200" height="144" rx="24" fill="#FFFFFF" stroke="#c3c9fc" strokeWidth="1.5" />
          <rect x="20" y="22" width="68" height="14" rx="7" fill="#d2d7fc" />
          <rect x="20" y="50" width="160" height="10" rx="5" fill="#e3e5ef" />
          <rect x="20" y="68" width="134" height="10" rx="5" fill="#e3e5ef" />
          <rect x="20" y="96" width="112" height="26" rx="13" fill="#e1e4fd" />
          <circle cx="38" cy="109" r="5" fill="#5a5bb6" />
          <rect x="50" y="105" width="66" height="8" rx="4" fill="#5a5bb6" />
        </g>

        {/* Squai Union Flow connecting Top-Left -> Center -> Bottom-Right */}
        <motion.path
          d="M 246 116 C 315 116, 330 198, 280 226 C 230 254, 244 324, 314 324"
          fill="none"
          stroke="#8A8EF9"
          strokeWidth="26"
          strokeLinecap="round"
          initial={{ pathLength: 0.4, opacity: 0.65 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 246 116 C 315 116, 330 198, 280 226 C 230 254, 244 324, 314 324"
          fill="none"
          stroke="#303163"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -24] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          cx="280"
          cy="226"
          r="9"
          fill="#F9C24D"
          stroke="#0A0C1A"
          strokeWidth="2.5"
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.24, 1], opacity: [0.9, 1, 0.9] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Stage 2: Context & Criteria Block (Top Right) */}
        <g transform="translate(314, 44)">
          <rect x="0" y="0" width="200" height="144" rx="28" fill="#8A8EF9" />
          <rect x="22" y="24" width="156" height="22" rx="11" fill="#0A0C1A" opacity="0.14" />
          <rect x="22" y="24" width="96" height="22" rx="11" fill="#0A0C1A" />
          <rect x="22" y="62" width="144" height="10" rx="5" fill="#0A0C1A" opacity="0.72" />
          <rect x="22" y="80" width="118" height="10" rx="5" fill="#0A0C1A" opacity="0.52" />
          <rect x="22" y="106" width="156" height="16" rx="8" fill="#f9faff" />
        </g>

        {/* Stage 3: Safe Data & Practice Workspace (Bottom Left) */}
        <g transform="translate(46, 252)">
          <rect x="0" y="0" width="200" height="144" rx="26" fill="#0A0C1A" />
          <rect x="22" y="24" width="44" height="44" rx="16" fill="#8A8EF9" />
          <path d="M36 46 L42 52 L53 40" fill="none" stroke="#0A0C1A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="80" y="28" width="98" height="12" rx="6" fill="#F4F6FF" />
          <rect x="80" y="48" width="74" height="9" rx="4.5" fill="#a7adcc" />
          <rect x="22" y="88" width="156" height="32" rx="16" fill="#1c1e2e" stroke="#5a5bb6" strokeWidth="1.5" />
          <rect x="36" y="100" width="88" height="8" rx="4" fill="#c3c9fc" />
        </g>

        {/* Stage 4: Growth & Real Work Outcome (Bottom Right) */}
        <g transform="translate(314, 252)">
          <rect x="0" y="0" width="200" height="144" rx="28" fill="#FFFFFF" stroke="#969bfc" strokeWidth="1.5" />
          {/* Ascending skill bars built from Bloque geometry */}
          <rect x="24" y="86" width="32" height="36" rx="10" fill="#e1e4fd" />
          <rect x="64" y="66" width="32" height="56" rx="10" fill="#c3c9fc" />
          <rect x="104" y="44" width="32" height="78" rx="10" fill="#8A8EF9" />
          <rect x="144" y="22" width="32" height="100" rx="10" fill="#303163" />
          <path
            d="M 40 76 L 80 56 L 120 34 L 160 14"
            fill="none"
            stroke="#5a5bb6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="160" cy="14" r="5" fill="#0A0C1A" />
        </g>
      </svg>

      {!compact && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#d2d7fc] text-sm text-[#303163]">
          <span className="font-medium">De prueba y error a criterio propio</span>
          <span className="font-human text-base text-[#5a5bb6]">sin tecnicismos innecesarios</span>
        </div>
      )}
    </div>
  );
}

export function ModuleIllustration({ variant }: { variant: 'understand' | 'prompt' | 'safety' | 'growth' }) {
  if (variant === 'understand') {
    return (
      <svg viewBox="0 0 240 140" className="w-full h-36 rounded-2xl bg-[#f9faff] border border-[#e1e4fd]" aria-hidden="true">
        <rect x="20" y="26" width="74" height="88" rx="20" fill="#e1e4fd" />
        <rect x="34" y="44" width="46" height="10" rx="5" fill="#5a5bb6" />
        <rect x="34" y="62" width="36" height="8" rx="4" fill="#777ae3" />
        <rect x="34" y="78" width="42" height="8" rx="4" fill="#969bfc" />
        <path d="M94 70 C118 70, 122 50, 146 50" fill="none" stroke="#8A8EF9" strokeWidth="14" strokeLinecap="round" />
        <rect x="146" y="26" width="74" height="88" rx="20" fill="#0A0C1A" />
        <circle cx="183" cy="58" r="14" fill="#8A8EF9" />
        <rect x="163" y="84" width="40" height="10" rx="5" fill="#F4F6FF" />
      </svg>
    );
  }

  if (variant === 'prompt') {
    return (
      <svg viewBox="0 0 240 140" className="w-full h-36 rounded-2xl bg-[#f9faff] border border-[#e1e4fd]" aria-hidden="true">
        <rect x="20" y="24" width="200" height="24" rx="12" fill="#e1e4fd" />
        <rect x="34" y="32" width="84" height="8" rx="4" fill="#5a5bb6" />
        <rect x="20" y="58" width="200" height="24" rx="12" fill="#c3c9fc" />
        <rect x="34" y="66" width="128" height="8" rx="4" fill="#303163" />
        <rect x="20" y="92" width="200" height="24" rx="12" fill="#8A8EF9" />
        <rect x="34" y="100" width="152" height="8" rx="4" fill="#0A0C1A" />
      </svg>
    );
  }

  if (variant === 'safety') {
    return (
      <svg viewBox="0 0 240 140" className="w-full h-36 rounded-2xl bg-[#f9faff] border border-[#e1e4fd]" aria-hidden="true">
        <rect x="22" y="26" width="86" height="88" rx="22" fill="#0A0C1A" />
        <rect x="38" y="44" width="54" height="10" rx="5" fill="#8A8EF9" />
        <rect x="38" y="62" width="40" height="8" rx="4" fill="#c3c9fc" />
        <rect x="38" y="78" width="48" height="18" rx="9" fill="#1c1e2e" stroke="#8A8EF9" strokeWidth="1.5" />
        <line x1="120" y1="22" x2="120" y2="118" stroke="#5a5bb6" strokeWidth="2.5" strokeDasharray="5 5" />
        <rect x="132" y="38" width="86" height="64" rx="20" fill="#e1e4fd" />
        <path d="M164 70 L172 78 L188 60" fill="none" stroke="#303163" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 140" className="w-full h-36 rounded-2xl bg-[#f9faff] border border-[#e1e4fd]" aria-hidden="true">
      <rect x="28" y="84" width="32" height="32" rx="10" fill="#e1e4fd" />
      <rect x="74" y="66" width="32" height="50" rx="10" fill="#c3c9fc" />
      <rect x="120" y="46" width="32" height="70" rx="10" fill="#8A8EF9" />
      <rect x="166" y="24" width="32" height="92" rx="10" fill="#303163" />
      <path d="M44 74 L90 56 L136 36 L182 16" fill="none" stroke="#5a5bb6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="182" cy="16" r="4.5" fill="#0A0C1A" />
    </svg>
  );
}

export function ProgramCriteriaDiagram() {
  return (
    <div className="bg-[#eef0fd] border border-[#c3c9fc] rounded-[28px] p-6 sm:p-8">
      <svg
        viewBox="0 0 500 360"
        className="w-full h-auto"
        role="img"
        aria-label="Diagrama visual de progreso de los cuatro módulos prácticos de Squai"
      >
        <rect x="12" y="12" width="476" height="336" rx="24" fill="#FFFFFF" stroke="#d2d7fc" strokeWidth="1.5" />
        {/* Top bar */}
        <rect x="34" y="34" width="140" height="14" rx="7" fill="#303163" />
        <rect x="380" y="32" width="84" height="18" rx="9" fill="#eef0fd" />
        <rect x="394" y="38" width="56" height="6" rx="3" fill="#5a5bb6" />

        {/* 3 upper metric blocks */}
        <rect x="34" y="68" width="136" height="72" rx="16" fill="#f9faff" stroke="#e1e4fd" />
        <rect x="48" y="84" width="60" height="8" rx="4" fill="#a7adcc" />
        <rect x="48" y="102" width="84" height="20" rx="6" fill="#0A0C1A" />

        <rect x="182" y="68" width="136" height="72" rx="16" fill="#f9faff" stroke="#e1e4fd" />
        <rect x="196" y="84" width="72" height="8" rx="4" fill="#a7adcc" />
        <rect x="196" y="102" width="68" height="20" rx="6" fill="#5a5bb6" />

        <rect x="330" y="68" width="134" height="72" rx="16" fill="#fff8e6" stroke="#f6dc9b" />
        <rect x="344" y="84" width="64" height="8" rx="4" fill="#525770" />
        <rect x="344" y="102" width="78" height="20" rx="6" fill="#F9C24D" />

        {/* Progress Donut (left bottom) + Step Bars (right bottom) */}
        <rect x="34" y="158" width="210" height="164" rx="20" fill="#f9faff" stroke="#e1e4fd" />
        <circle cx="139" cy="240" r="46" fill="none" stroke="#e1e4fd" strokeWidth="18" />
        <circle
          cx="139"
          cy="240"
          r="46"
          fill="none"
          stroke="#8A8EF9"
          strokeWidth="18"
          strokeDasharray="240 290"
          strokeLinecap="round"
          transform="rotate(-90 139 240)"
        />
        <circle cx="139" cy="240" r="22" fill="#0A0C1A" />
        <path d="M131 240 L137 246 L149 234" fill="none" stroke="#F9C24D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="260" y="158" width="204" height="164" rx="20" fill="#0A0C1A" />
        <rect x="280" y="182" width="90" height="10" rx="5" fill="#F4F6FF" />
        <rect x="280" y="206" width="164" height="14" rx="7" fill="#1c1e2e" />
        <rect x="280" y="206" width="132" height="14" rx="7" fill="#8A8EF9" />
        <rect x="280" y="234" width="164" height="14" rx="7" fill="#1c1e2e" />
        <rect x="280" y="234" width="146" height="14" rx="7" fill="#c3c9fc" />
        <rect x="280" y="262" width="164" height="14" rx="7" fill="#1c1e2e" />
        <rect x="280" y="262" width="154" height="14" rx="7" fill="#F9C24D" />
      </svg>
    </div>
  );
}

export function PromptWorkflowDiagram() {
  return (
    <div className="bg-[#eef0fd] border border-[#c3c9fc] rounded-[28px] p-6 sm:p-8">
      <svg
        viewBox="0 0 500 360"
        className="w-full h-auto"
        role="img"
        aria-label="Ilustración comparativa de respuestas genéricas frente a flujos con contexto claro"
      >
        <rect x="12" y="12" width="476" height="336" rx="24" fill="#FFFFFF" stroke="#d2d7fc" strokeWidth="1.5" />
        <rect x="34" y="34" width="112" height="14" rx="7" fill="#0A0C1A" />
        <rect x="34" y="64" width="432" height="176" rx="20" fill="#f9faff" stroke="#e1e4fd" />

        {/* Baseline grid */}
        <line x1="56" y1="110" x2="444" y2="110" stroke="#e3e5ef" strokeDasharray="5 5" />
        <line x1="56" y1="154" x2="444" y2="154" stroke="#e3e5ef" strokeDasharray="5 5" />
        <line x1="56" y1="198" x2="444" y2="198" stroke="#e3e5ef" strokeDasharray="5 5" />

        {/* Before curve (flat/erratic) */}
        <path
          d="M 62 198 C 140 192, 210 205, 280 188 C 350 178, 400 184, 438 180"
          fill="none"
          stroke="#a7adcc"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* After curve (clear upward progress with Squai) */}
        <path
          d="M 62 196 C 140 182, 210 132, 290 112 C 360 94, 405 82, 438 76"
          fill="none"
          stroke="#5a5bb6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="290" cy="112" r="7" fill="#8A8EF9" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="438" cy="76" r="8" fill="#F9C24D" stroke="#0A0C1A" strokeWidth="2.5" />

        {/* Bottom structured role blocks */}
        <rect x="34" y="256" width="208" height="68" rx="18" fill="#eef0fd" stroke="#c3c9fc" />
        <circle cx="64" cy="290" r="14" fill="#8A8EF9" />
        <rect x="88" y="278" width="112" height="10" rx="5" fill="#0A0C1A" />
        <rect x="88" y="295" width="84" height="8" rx="4" fill="#525770" />

        <rect x="258" y="256" width="208" height="68" rx="18" fill="#0A0C1A" />
        <rect x="278" y="274" width="28" height="28" rx="10" fill="#F9C24D" />
        <rect x="318" y="278" width="116" height="10" rx="5" fill="#F4F6FF" />
        <rect x="318" y="295" width="90" height="8" rx="4" fill="#a7adcc" />
      </svg>
    </div>
  );
}

export function RoleSceneIllustration({
  roleKey,
}: {
  roleKey: 'operaciones' | 'ventas' | 'analisis' | 'liderazgo' | 'consultoria';
}) {
  const paletteMap: Record<
    typeof roleKey,
    { accent: string; secondary: string; darkCard: string }
  > = {
    operaciones: { accent: '#8A8EF9', secondary: '#F9C24D', darkCard: '#0A0C1A' },
    ventas: { accent: '#F9C24D', secondary: '#8A8EF9', darkCard: '#303163' },
    analisis: { accent: '#5a5bb6', secondary: '#c3c9fc', darkCard: '#0A0C1A' },
    liderazgo: { accent: '#8A8EF9', secondary: '#303163', darkCard: '#1c1e2e' },
    consultoria: { accent: '#F9C24D', secondary: '#5a5bb6', darkCard: '#0A0C1A' },
  };
  const p = paletteMap[roleKey];

  return (
    <svg
      viewBox="0 0 420 260"
      className="w-full h-auto rounded-2xl bg-[#f9faff] border border-[#d2d7fc]"
      aria-hidden="true"
    >
      <rect x="22" y="22" width="176" height="216" rx="22" fill="#FFFFFF" stroke="#d2d7fc" strokeWidth="1.5" />
      <rect x="42" y="44" width="64" height="12" rx="6" fill={p.accent} />
      <rect x="42" y="72" width="136" height="10" rx="5" fill="#d9dcea" />
      <rect x="42" y="92" width="112" height="10" rx="5" fill="#e3e5ef" />
      <rect x="42" y="132" width="136" height="82" rx="18" fill="#eef0fd" />
      <circle cx="80" cy="173" r="18" fill={p.secondary} />
      <rect x="110" y="162" width="52" height="10" rx="5" fill="#303163" />
      <rect x="110" y="178" width="38" height="8" rx="4" fill="#5a5bb6" />

      <rect x="218" y="22" width="180" height="102" rx="22" fill={p.darkCard} />
      <rect x="240" y="46" width="84" height="12" rx="6" fill="#F4F6FF" />
      <rect x="240" y="68" width="126" height="9" rx="4.5" fill="#a7adcc" />
      <rect x="240" y="88" width="66" height="16" rx="8" fill={p.accent} />

      <rect x="218" y="140" width="180" height="98" rx="22" fill="#eef0fd" stroke="#c3c9fc" strokeWidth="1.5" />
      <path d="M 244 206 L 284 176 L 324 190 L 368 158" fill="none" stroke="#303163" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="368" cy="158" r="7" fill={p.secondary} stroke="#0A0C1A" strokeWidth="2" />
    </svg>
  );
}

