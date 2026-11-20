import React from 'react';
import { motion } from 'motion/react';
import { type SquaiBlockPreset, SquaiCornerBlocks } from './AardvarkPrimitives';
import { TESTIMONIALS } from '../content/landing';

/* ============================================================
   9. LO QUE DICEN · ¿A otros les sirvió?
   Composición de "Our subscriptions" (aardvarkbookclub.com/gifting):
   tarjetas pastel con bloques de Squai detrás, sin botón CTA,
   cita escrita en Gloria Hallelujah y nombre/rol en Atkinson.
   ============================================================ */
const TESTIMONIAL_CARD_STYLES: Array<{
  bg: string;
  blockBackColor: string;
  preset: SquaiBlockPreset;
  restingRotate: number;
  tiltClass: string;
}> = [
  {
    bg: 'bg-white',
    blockBackColor: '#8A8EF9',
    preset: 'mod-2',
    restingRotate: -2,
    tiltClass: '-rotate-[1.6deg]',
  },
  {
    bg: 'bg-[#eef0fd]',
    blockBackColor: '#F9C24D',
    preset: 'mod-3',
    restingRotate: 1.5,
    tiltClass: 'rotate-[1.2deg]',
  },
  {
    bg: 'bg-[#d2d7fc]',
    blockBackColor: '#5a5bb6',
    preset: 'mod-4',
    restingRotate: 2.2,
    tiltClass: 'rotate-[1.8deg]',
  },
];

export function TestimonialsSection() {
  const { quotes } = TESTIMONIALS;

  return (
    <section
      id="testimonios"
      className="w-full relative z-20 bg-[#fcf6ea] text-[#0A0C1A] rounded-t-[var(--edge-r)] rounded-b-[var(--edge-r)] -mt-10 sm:-mt-16 lg:-mt-24 py-[var(--section-py)] px-[var(--gutter)] overflow-hidden scroll-mt-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-10 max-w-[calc(var(--u)*1520)] mx-auto">
        <div className="text-center max-w-[calc(var(--u)*1160)] mx-auto mb-[calc(var(--u)*56)] space-y-[calc(var(--u)*20)]">
          <h2 id="testimonials-heading" className="aardvark-h2 text-[#0A0C1A]">
            {TESTIMONIALS.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*760)] mx-auto">
            {TESTIMONIALS.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[calc(var(--u)*36)] items-stretch pt-4 pb-6">
          {quotes.map((quote, idx) => {
            const style = TESTIMONIAL_CARD_STYLES[idx % TESTIMONIAL_CARD_STYLES.length];
            return (
              <motion.figure
                key={quote.author}
                initial={{ opacity: 0, y: 40, rotate: style.restingRotate * 1.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 195, damping: 18, delay: idx * 0.08 }}
                className="relative flex group"
              >
                <div
                  className={`relative w-full ${style.tiltClass} group-hover:rotate-0 group-hover:-translate-y-2 transition-all duration-300 ease-[var(--ease-bounce)] flex`}
                >
                  <SquaiCornerBlocks
                    size="card"
                    preset={style.preset}
                    backColor={style.blockBackColor}
                  />

                  <div
                    className={`relative z-10 w-full ${style.bg} rounded-[var(--card-r)] px-[max(24px,calc(var(--u)*34))] py-[max(28px,calc(var(--u)*42))] shadow-xl flex flex-col justify-between gap-[calc(var(--u)*28)] text-center`}
                  >
                    <blockquote className="font-human text-[max(20px,calc(var(--u)*26))] leading-[1.35] text-[#0A0C1A] my-auto">
                      <p>“{quote.text}”</p>
                    </blockquote>

                    <figcaption className="font-sans pt-2 space-y-1">
                      <span className="block font-bold text-[max(16px,calc(var(--u)*20))] text-[#0A0C1A] leading-snug">
                        {quote.author}
                      </span>
                      <span className="block text-[max(15px,calc(var(--u)*17))] text-[#525770] leading-snug">
                        {quote.context}
                      </span>
                    </figcaption>
                  </div>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
