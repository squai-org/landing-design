import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AardvarkButtonAlt, HeroRibbonSvg, SquaiCornerBlocks } from './AardvarkPrimitives';

interface AardvarkHeroProps {
  onPrimaryCta: () => void;
  onExploreModules: () => void;
}

export function AardvarkHero({ onPrimaryCta, onExploreModules }: AardvarkHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const visualDeckY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 84]);

  return (
    <div id="programa" className="bg-white">
      <section
        id="inicio"
        ref={heroRef}
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
            <h1 className="aardvark-h1 text-[#0A0C1A]">
              Aprende a usar IA en tu trabajo sin vueltas.
            </h1>

            <p className="aardvark-lead text-[#0A0C1A] max-w-[440px]">
              Cuatro sesiones prácticas para entender cómo funciona la IA, pedirle bien desde la primera vez y cuidar la información de tu trabajo.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <AardvarkButtonAlt
                label="Inscribirme al programa"
                variant="dark"
                size="lg"
                onClick={onPrimaryCta}
              />
              <button
                type="button"
                onClick={onExploreModules}
                className="font-display font-bold text-lg text-[#0A0C1A] underline decoration-2 underline-offset-4 hover:text-[#303163] transition-colors py-2 cursor-pointer whitespace-nowrap"
              >
                Ver los 4 módulos
              </button>
            </div>

            <div className="pt-1">
              <span className="font-human text-lg sm:text-xl lg:text-[26px] leading-tight text-[#0A0C1A] inline-block -rotate-1 sm:whitespace-nowrap">
                $399.000 COP / $129 USD · Pago único en línea
              </span>
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
                    <span className="aardvark-h3 text-[#0A0C1A]">
                      Programa en vivo
                    </span>
                    <span className="font-human text-sm sm:text-lg text-[#5a5bb6]">
                      4 sesiones
                    </span>
                  </div>
                  <div className="aspect-[4/4.7] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#eef0fd]">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000"
                      alt="Equipo revisando procesos reales de trabajo en sesión práctica"
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
                      src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1000"
                      alt="Profesionales practicando instrucciones útiles con IA"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-3.5 sm:pt-4 pb-1 px-2">
                    <p className="aardvark-h3 text-[#0A0C1A]">
                      Sin saber programar
                    </p>
                    <p className="font-human text-sm sm:text-lg text-[#0A0C1A] mt-0.5">
                      De casos reales a tu semana
                    </p>
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
