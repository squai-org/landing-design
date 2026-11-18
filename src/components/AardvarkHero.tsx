import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AardvarkButtonAlt, HeroRibbonSvg, SquaiCornerBlocks } from './AardvarkPrimitives';
import { HERO, pexelsUrl } from '../content/landing';

interface AardvarkHeroProps {
  onPrimaryCta: () => void;
  onExploreSessions: () => void;
}

export function AardvarkHero({ onPrimaryCta, onExploreSessions }: AardvarkHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const visualDeckY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 84]);

  return (
    <div className="bg-white">
      <section
        id="inicio"
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="w-full relative bg-[#8A8EF9] text-[#0A0C1A] rounded-b-[40px] md:rounded-b-[96px] lg:rounded-b-[120px] pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 min-h-[calc(100vh-16px)] flex flex-col justify-between overflow-x-clip"
      >
        {/* Inner backdrop clip for organic Aardvark ribbon wave */}
        <div
          className="absolute inset-0 overflow-hidden rounded-b-[40px] md:rounded-b-[96px] lg:rounded-b-[120px] pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            style={{ y: ribbonY }}
            className="w-[125%] -ml-[12%] -mt-[8%] sm:-mt-[10%]"
          >
            <HeroRibbonSvg />
          </motion.div>
        </div>

        <div className="max-w-[1680px] w-full mx-auto relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Giant Aardvark-Scale Display H1 + Copy + Single Clear CTA + Handwritten Pricing Note */}
          <div className="lg:col-span-6 space-y-7 sm:space-y-8 pt-2 lg:pt-4">
            <h1 id="hero-heading" className="aardvark-h1 text-[#0A0C1A]">
              {HERO.title}
            </h1>

            <p className="aardvark-lead text-[#0A0C1A] max-w-[440px]">{HERO.lead}</p>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <AardvarkButtonAlt
                label={HERO.ctaPrimary}
                variant="dark"
                size="lg"
                onClick={onPrimaryCta}
              />
              <button
                type="button"
                onClick={onExploreSessions}
                className="font-display font-bold text-lg text-[#0A0C1A] underline decoration-2 underline-offset-4 hover:text-[#303163] transition-colors py-2 cursor-pointer whitespace-nowrap"
              >
                {HERO.ctaSecondary}
              </button>
            </div>

            <div className="pt-1">
              <p className="font-human text-lg sm:text-xl lg:text-[26px] leading-tight text-[#0A0C1A] inline-block -rotate-1 xl:whitespace-nowrap">
                {HERO.note}
              </p>
            </div>
          </div>

          {/* Right Column: 2 Oversized Borderless Cards Filling the Right Region (Zero background logo watermark) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[430px] sm:min-h-[600px] lg:min-h-[700px] pt-8 lg:pt-4">
            <div className="relative w-full max-w-[740px] h-[420px] sm:h-[600px] lg:h-[690px]">
              {/* Card 1 (Left tall White card): varied outer-edge blocks behind card surface (z-0) */}
              <motion.div
                style={{ y: secondaryCardY }}
                className="group/hero1 absolute left-0 top-0 w-[53%] sm:w-[355px] xl:w-[410px] -rotate-[3.5deg] z-10 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300"
              >
                <SquaiCornerBlocks size="card" preset="hero-left" backColor="#d2d7fc" />
                <div className="relative z-10 bg-white rounded-[32px] sm:rounded-[38px] p-3 sm:p-4 shadow-2xl">
                  <div className="pb-2.5 sm:pb-3 pt-1 px-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                    <span className="aardvark-h3 text-[#0A0C1A]">{HERO.cardLive.title}</span>
                    <span className="font-human text-sm sm:text-lg text-[#5a5bb6]">{HERO.cardLive.note}</span>
                  </div>
                  <div className="aspect-[4/4.7] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#eef0fd]">
                    <img
                      src={pexelsUrl(HERO.cardLive.imageId, 1000)}
                      alt={HERO.cardLive.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Card 2 (Right primary Marigold card): varied outer-edge blocks behind card surface */}
              <motion.div
                style={{ y: visualDeckY }}
                className="group/hero2 absolute right-0 top-16 sm:top-24 w-[53%] sm:w-[365px] xl:w-[420px] rotate-[3deg] z-20 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300"
              >
                <SquaiCornerBlocks size="card" preset="hero-right" backColor="#ffe29a" />
                <div className="relative z-10 bg-[#F9C24D] rounded-[32px] sm:rounded-[38px] p-3 sm:p-4 shadow-2xl">
                  <div className="aspect-[4/4.7] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#eef0fd]">
                    <img
                      src={pexelsUrl(HERO.cardNoCode.imageId, 1000)}
                      alt={HERO.cardNoCode.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-3.5 sm:pt-4 pb-1 px-2">
                    <p className="aardvark-h3 text-[#0A0C1A]">{HERO.cardNoCode.title}</p>
                    <p className="font-human text-sm sm:text-lg text-[#0A0C1A] mt-0.5">{HERO.cardNoCode.note}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
