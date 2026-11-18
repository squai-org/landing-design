import React from 'react';
import { SquaiMark } from './SquaiBrand';
import { INCLUDES, MENTORS } from '../content/landing';

/** Portada de muestra de la guía que acompaña cada sesión. */
export function GuideMockup() {
  const { label, title, steps } = INCLUDES.guideMockup;
  return (
    <div
      role="img"
      aria-label={`Portada de muestra de la ${label.toLowerCase()}: ${title}`}
      className="relative w-full h-full bg-[#303163] flex items-center justify-center p-6 overflow-hidden"
    >
      <div
        className="absolute w-[72%] h-[76%] bg-[#F9C24D] rounded-[18px] rotate-[6deg] translate-x-3 translate-y-2"
        aria-hidden="true"
      />
      <div className="relative w-[78%] h-[80%] bg-[#F4F6FF] rounded-[18px] -rotate-[3deg] shadow-xl p-5 flex flex-col justify-between">
        <div className="space-y-2.5">
          <span className="block font-display font-bold text-[10px] tracking-[0.12em] uppercase text-[#5a5bb6]">
            {label}
          </span>
          <span className="block font-display font-bold text-[20px] leading-[0.98] tracking-[-0.03em] text-[#0A0C1A]">
            {title}
          </span>
        </div>
        <ol className="space-y-1.5">
          {steps.map((step, idx) => (
            <li key={step} className="flex items-center gap-2 text-[12px] leading-tight text-[#0A0C1A]">
              <span className="w-5 h-5 rounded-full bg-[#8A8EF9] font-display font-bold text-[11px] inline-flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-1.5">
          <SquaiMark variant="color" className="w-4 h-4" />
          <span className="font-display font-bold text-[13px] tracking-[-0.03em] text-[#0A0C1A]">Squai One</span>
        </div>
      </div>
    </div>
  );
}

/** Certificado de muestra que se entrega al terminar el programa. */
export function CertificateMockup() {
  const { label, program, awardedTo, detail } = INCLUDES.certificateMockup;
  return (
    <div
      role="img"
      aria-label={`${label} de muestra del programa ${program}`}
      className="relative w-full h-full bg-[#eef0fd] flex items-center justify-center p-5 overflow-hidden"
    >
      <div className="relative w-[84%] h-[86%] bg-white rounded-[16px] rotate-[2.5deg] shadow-xl p-2.5">
        <div className="w-full h-full rounded-[10px] border-2 border-[#8A8EF9] p-4 flex flex-col items-center justify-between text-center">
          <SquaiMark variant="color" className="w-7 h-7" />
          <div className="space-y-1.5">
            <span className="block font-display font-bold text-[9px] tracking-[0.12em] uppercase text-[#5a5bb6]">
              {label}
            </span>
            <span className="block font-display font-bold text-[17px] leading-[1] tracking-[-0.03em] text-[#0A0C1A]">
              {program}
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="block font-human text-[16px] leading-tight text-[#303163] whitespace-nowrap">{awardedTo}</span>
            <span className="block text-[10px] text-[#525770]">{detail}</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 text-[8.5px] leading-tight text-[#525770]">
            {MENTORS.people.map((person) => (
              <span key={person.id} className="border-t border-[#a7adcc] pt-1">
                {person.name}
              </span>
            ))}
          </div>
        </div>
        <span
          className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-[#F9C24D] shadow-md inline-flex items-center justify-center"
          aria-hidden="true"
        >
          <SquaiMark variant="mono" className="w-6 h-6 text-[#0A0C1A]" />
        </span>
      </div>
    </div>
  );
}
