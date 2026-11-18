import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SquaiSingleBlock } from './AardvarkPrimitives';
import { TESTIMONIALS, pexelsUrl } from '../content/landing';

/* ============================================================
   9. LO QUE DICEN · ¿A otros les sirvió? (.exclusive parity)
   Bordered rounded frame, central dark card, handwritten quotes
   around it and a tilted sticky note. Sits as a white rounded
   band over the gold mentors section.
   ============================================================ */
const QUOTE_TILTS = ['-rotate-[5deg]', 'rotate-[4deg]', 'rotate-[3deg]', '-rotate-[3deg]'];

function Quote({ quote, idx }: { quote: (typeof TESTIMONIALS.quotes)[number]; idx: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.32, 0.72, 0, 1] }}
      className={`${QUOTE_TILTS[idx % QUOTE_TILTS.length]} max-w-[300px] mx-auto text-center`}
    >
      <blockquote className="font-human text-xl sm:text-[22px] leading-snug text-[#303163]">
        <p>“{quote.text}”</p>
      </blockquote>
      <figcaption className="mt-2 font-human text-base text-[#5a5bb6]">
        {quote.author}, {quote.context.toLowerCase()}
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialsSection({ onSelectCta }: { onSelectCta: () => void }) {
  const { card, note, quotes } = TESTIMONIALS;
  const leftQuotes = quotes.filter((_, idx) => idx % 2 === 0);
  const rightQuotes = quotes.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="testimonios"
      className="w-full relative z-20 bg-white text-[#0A0C1A] rounded-t-[40px] md:rounded-t-[96px] lg:rounded-t-[120px] -mt-10 sm:-mt-16 lg:-mt-24 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 scroll-mt-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-[860px] mx-auto mb-12 sm:mb-16 space-y-5">
          <h2 id="testimonials-heading" className="aardvark-h2 text-[#0A0C1A]">
            {TESTIMONIALS.title}
          </h2>
          <p className="aardvark-lead text-[#525770] max-w-[560px] mx-auto">{TESTIMONIALS.lead}</p>
        </div>

        <div className="relative rounded-[40px] md:rounded-[56px] border-[6px] border-[#0A0C1A] bg-[#e1e4fd] px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
          <SquaiSingleBlock
            color="#F9C24D"
            className="hidden md:block absolute -left-7 bottom-16 w-20 h-20 -rotate-[18deg]"
          />
          <SquaiSingleBlock
            color="#8A8EF9"
            className="hidden md:block absolute -right-6 top-14 w-16 h-16 rotate-[14deg]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-12 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              {leftQuotes.map((quote) => (
                <Quote key={quote.author} quote={quote} idx={quotes.indexOf(quote)} />
              ))}
            </div>

            <div className="order-1 lg:order-2 flex flex-col items-center gap-4">
              <motion.article
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 210, damping: 20 }}
                className="w-full max-w-[330px] bg-[#0A0C1A] text-[#F4F6FF] rounded-[30px] p-3 pb-6 shadow-2xl"
                aria-labelledby="testimonials-card-title"
              >
                <div className="aspect-[4/3.4] rounded-[22px] overflow-hidden bg-[#303163]">
                  <img
                    src={pexelsUrl(card.imageId)}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#8A8EF9] text-[#0A0C1A] font-display font-bold text-sm">
                      {card.tags[0]}
                    </span>
                    <span className="font-display font-bold text-sm text-[#F4F6FF]">{card.tags[1]}</span>
                  </div>
                  <h3 id="testimonials-card-title" className="aardvark-h3 text-[#F4F6FF]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-snug text-[#d2d7fc]">{card.copy}</p>
                </div>
              </motion.article>

              <button
                type="button"
                onClick={onSelectCta}
                className="inline-flex items-center gap-1.5 font-display font-bold text-base text-[#0A0C1A] hover:text-[#303163] underline decoration-2 underline-offset-4 py-2 cursor-pointer"
              >
                {TESTIMONIALS.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" strokeWidth={2.5} />
              </button>
            </div>

            <div className="space-y-10 order-3">
              {rightQuotes.map((quote) => (
                <Quote key={quote.author} quote={quote} idx={quotes.indexOf(quote)} />
              ))}

              <motion.aside
                initial={{ opacity: 0, rotate: 6 }}
                whileInView={{ opacity: 1, rotate: -3 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="max-w-[240px] mx-auto bg-[#FFF4CC] rounded-[20px] p-5 shadow-md"
                aria-labelledby="testimonials-note-title"
              >
                <h3 id="testimonials-note-title" className="font-display font-bold text-lg text-[#0A0C1A]">
                  {note.title}
                </h3>
                <ul className="mt-1.5 space-y-0.5 text-[15px] leading-snug text-[#0A0C1A]">
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
