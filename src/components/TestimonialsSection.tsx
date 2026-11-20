import React from 'react';
import { SectionBackdrop } from './Backdrops';
import { motion } from 'motion/react';
import { AardvarkButtonAlt, SquaiSingleBlock } from './AardvarkPrimitives';
import { SquaiMark } from './SquaiBrand';
import { TESTIMONIALS, pexelsUrl } from '../content/landing';

/* ============================================================
   9. LO QUE DICEN · ¿A otros les sirvió? (.exclusive parity)
   Reference composition: 1242 × 897 frame with a 16 px Midnight border and
   80 px radius; a dark 352 px card in the middle with a star sticker; one
   handwritten quote top-left, one top-right, one bottom-left; a tilted
   sticky note bottom-right. Squai blocks take the place of the emojis.
   ============================================================ */
type Quote = (typeof TESTIMONIALS.quotes)[number];

function HandwrittenQuote({ quote, tilt, delay }: { quote: Quote; tilt: string; delay: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay, ease: [0.32, 0.72, 0, 1] }}
      className={`${tilt} max-w-[max(260px,calc(var(--u)*311))] mx-auto text-center`}
    >
      <blockquote className="aardvark-handwritten-lg text-[#303163]">
        <p>“{quote.text}”</p>
      </blockquote>
      <figcaption className="mt-[calc(var(--u)*8)] font-human text-[calc(var(--fs-hand)*0.78)] leading-snug text-[#303163]">
        {quote.author}, {quote.context.toLowerCase()}
      </figcaption>
    </motion.figure>
  );
}

/** 12-point starburst sticker, like the rating star on the reference card. */
function StarSticker({ value, label }: { value: string; label: string }) {
  return (
    <span
      className="absolute -top-[calc(var(--u)*22)] -right-[calc(var(--u)*26)] z-20 w-[max(76px,calc(var(--u)*110))] h-[max(76px,calc(var(--u)*110))] rotate-[12deg] inline-flex items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
        <polygon
          fill="#F9C24D"
          stroke="#0A0C1A"
          strokeWidth="3"
          strokeLinejoin="round"
          points="50,2 58,20 76,8 76,29 97,29 85,46 99,60 79,66 85,86 66,80 58,98 50,82 42,98 34,80 15,86 21,66 1,60 15,46 3,29 24,29 24,8 42,20"
        />
      </svg>
      <span className="relative flex flex-col items-center leading-none text-[#0A0C1A]">
        <span className="font-display font-bold text-[max(18px,calc(var(--u)*30))]">{value}</span>
        <span className="font-display font-bold text-[max(10px,calc(var(--u)*13))]">{label}</span>
      </span>
    </span>
  );
}

export function TestimonialsSection({ onSelectCta }: { onSelectCta: () => void }) {
  const { card, note, quotes, badge } = TESTIMONIALS;
  const [first, second, third] = quotes;

  return (
    <section
      id="testimonios"
      className="w-full relative z-20 bg-white text-[#0A0C1A] rounded-t-[var(--edge-r)] -mt-10 sm:-mt-16 lg:-mt-24 pt-[var(--section-py)] pb-[calc(var(--section-py)*0.6)] px-[var(--gutter)] scroll-mt-24"
      aria-labelledby="testimonials-heading"
    >
      <SectionBackdrop shape="flow" colors={['#fcf6ea']} flip="y" align="xMidYMin" />

      <div className="relative z-10 text-center max-w-[calc(var(--u)*1200)] mx-auto mb-[calc(var(--u)*56)] space-y-[calc(var(--u)*20)]">
        <h2 id="testimonials-heading" className="aardvark-h2 text-[#0A0C1A]">
          {TESTIMONIALS.title}
        </h2>
        <p className="aardvark-lead text-[#525770] max-w-[calc(var(--u)*760)] mx-auto">{TESTIMONIALS.lead}</p>
      </div>

      <div className="relative z-10 max-w-[calc(var(--u)*1242)] mx-auto rounded-[var(--frame-r)] border-[length:var(--frame-b)] border-[#0A0C1A] bg-[#e1e4fd] px-[calc(var(--u)*20)] lg:px-[calc(var(--u)*56)] pt-[calc(var(--u)*30)] pb-[calc(var(--u)*56)] lg:min-h-[calc(var(--u)*897)]">
        {/* Squai marks in place of the reference emojis */}
        <SquaiMark
          variant="color"
          className="absolute -right-[calc(var(--u)*30)] top-[calc(var(--u)*90)] w-[max(48px,calc(var(--u)*84))] h-[max(48px,calc(var(--u)*84))] rotate-[10deg]"
        />
        <SquaiSingleBlock
          color="#F9C24D"
          className="absolute -left-[calc(var(--u)*34)] bottom-[calc(var(--u)*90)] w-[max(44px,calc(var(--u)*80))] h-[max(44px,calc(var(--u)*80))] rotate-[18deg]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_calc(var(--u)*352)_1fr] gap-[calc(var(--u)*40)] lg:gap-[calc(var(--u)*48)] items-stretch">
          <div className="order-2 lg:order-1 flex flex-col justify-between gap-[calc(var(--u)*48)] lg:pt-[calc(var(--u)*40)]">
            <HandwrittenQuote quote={first} tilt="-rotate-[8deg]" delay={0} />
            <div className="lg:pt-[calc(var(--u)*24)]">
              <HandwrittenQuote quote={third} tilt="rotate-[4deg]" delay={0.16} />
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center">
            <motion.article
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 210, damping: 20 }}
              className="relative w-full max-w-[max(300px,calc(var(--u)*352))] bg-[#0A0C1A] text-[#F4F6FF] rounded-[var(--card-r)] p-[calc(var(--u)*16)] pb-[calc(var(--u)*28)] shadow-2xl"
              aria-labelledby="testimonials-card-title"
            >
              <div className="relative">
                <div className="aspect-[4/3.9] rounded-[var(--media-r)] overflow-hidden bg-[#303163]">
                  <img
                    src={pexelsUrl(card.imageId)}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <StarSticker value={badge.value} label={badge.label} />
              </div>
              <div className="px-[calc(var(--u)*6)] pt-[calc(var(--u)*18)] space-y-[calc(var(--u)*10)]">
                <div className="flex items-center gap-[calc(var(--u)*8)]">
                  <span className="aardvark-tag bg-[#8A8EF9] text-[#0A0C1A]">{card.tags[0]}</span>
                  <span className="aardvark-tag bg-[#0A0C1A] text-[#F4F6FF] px-0">{card.tags[1]}</span>
                </div>
                <h3 id="testimonials-card-title" className="aardvark-h3 text-[#F4F6FF]">
                  {card.title}
                </h3>
                <p className="aardvark-small text-[#d2d7fc]">{card.copy}</p>
              </div>
              <div className="flex justify-center pt-[calc(var(--u)*24)]">
                <AardvarkButtonAlt label={TESTIMONIALS.cta} variant="marigold" onClick={onSelectCta} />
              </div>
            </motion.article>
          </div>

          <div className="order-3 flex flex-col justify-between gap-[calc(var(--u)*48)] lg:pt-[calc(var(--u)*24)]">
            <HandwrittenQuote quote={second} tilt="rotate-[5deg]" delay={0.08} />

            <motion.aside
              initial={{ opacity: 0, rotate: 10 }}
              whileInView={{ opacity: 1, rotate: 4 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="w-full max-w-[max(200px,calc(var(--u)*254))] mx-auto lg:ml-auto lg:mr-[calc(var(--u)*20)] bg-[#fdebc9] rounded-[var(--card-r)] pt-[calc(var(--u)*16)] px-[calc(var(--u)*18)] pb-[calc(var(--u)*24)] shadow-md"
              aria-labelledby="testimonials-note-title"
            >
              <h3
                id="testimonials-note-title"
                className="font-display font-bold text-[max(18px,calc(var(--u)*24))] leading-tight text-[#0A0C1A]"
              >
                {note.title}
              </h3>
              <ul className="mt-[calc(var(--u)*8)] space-y-[calc(var(--u)*2)] aardvark-small text-[#0A0C1A]">
                {note.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
