import React, { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import {
  AardvarkButtonAlt,
  AardvarkPillButton,
  BadgeRibbonSvg,
  BenefitsRibbonSvg,
  FaqRibbonSvg,
  MentorIllustration,
  SquaiCornerBlocks,
} from './AardvarkPrimitives';
import { SquaiMark } from './SquaiBrand';
import { trackConversionEvent } from '../utils/analyticsClient';

interface AardvarkInteractiveSectionsProps {
  currency: 'COP' | 'USD';
  onSelectCta: (chosenCurrency?: 'COP' | 'USD', trackLabel?: string) => void;
}

interface RoleItem {
  id: string;
  label: string;
  example: string;
  imageLeft: string;
  imageRight: string;
}

const ROLES: RoleItem[] = [
  {
    id: 'ops',
    label: 'Operaciones',
    example:
      'Estandarizas instructivos internos y resúmenes semanales sin rehacer textos cada viernes.',
    imageLeft:
      'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    id: 'sales',
    label: 'Ventas y propuestas',
    example:
      'Armas cotizaciones a medida según tu cliente y sus objeciones sin perder tu tono.',
    imageLeft:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    id: 'analysis',
    label: 'Análisis y reportes',
    example:
      'Limpias bases de comentarios y preparas resúmenes ejecutivos verificando cada cifra.',
    imageLeft:
      'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    id: 'leadership',
    label: 'Liderazgo',
    example:
      'Defines reglas de juego claras para que todo tu equipo use IA cuidando los datos.',
    imageLeft:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    id: 'consulting',
    label: 'Consultoría',
    example:
      'Preparas diagnósticos iniciales y entregas ordenadas sin sonar igual que todo el mundo.',
    imageLeft:
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    id: 'writing',
    label: 'Correos y minutas',
    example:
      'Respondes hilos largos con precisión indicando audiencia, objetivo y extensión exacta.',
    imageLeft:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=700',
    imageRight:
      'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
];

const BENEFIT_PILLS = [
  {
    text: 'Menos retrabajo manual',
    bg: 'bg-white',
    tilt: '-rotate-[3deg]',
  },
  {
    text: 'Cero jerga técnica',
    bg: 'bg-[#F9C24D]',
    tilt: 'rotate-[2.5deg]',
  },
  {
    text: 'Privacidad bajo control',
    bg: 'bg-[#8A8EF9]',
    tilt: '-rotate-[2deg]',
  },
  {
    text: 'Casos reales de tu oficina',
    bg: 'bg-[#eef0fd]',
    tilt: 'rotate-[2.8deg]',
  },
  {
    text: 'Criterio que te dura años',
    bg: 'bg-[#d2d7fc]',
    tilt: '-rotate-[1.5deg]',
  },
];

type FaqCategory = 'Todas' | 'Programa' | 'Pagos' | 'Requisitos';

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'Todas'>;
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Requisitos',
    q: '¿Necesito saber programar o haber usado herramientas de pago?',
    a: 'No necesitas experiencia técnica previa. Empezamos desde cero con lo que ya usas todos los días y trabajamos tanto con opciones gratuitas como con las cuentas que tengas disponibles.',
  },
  {
    id: 'faq-2',
    category: 'Programa',
    q: '¿Qué pasa si no puedo asistir en vivo a uno de los cuatro módulos?',
    a: 'Cada sesión queda grabada y disponible junto con las plantillas editables para que la revises cuando te quede mejor y compartas tus dudas por WhatsApp.',
  },
  {
    id: 'faq-3',
    category: 'Pagos',
    q: '¿Cómo funciona el pago en línea?',
    a: 'Dejas tu nombre, correo y WhatsApp en el formulario y te llevamos a nuestra pasarela segura de pagos. Ahí eliges el medio que prefieras sin recargos escondidos y confirmamos tu cupo de inmediato.',
  },
  {
    id: 'faq-4',
    category: 'Pagos',
    q: '¿Qué medios de pago aceptan en Colombia y desde el exterior?',
    a: 'En Colombia pagas $399.000 COP con PSE, Nequi, cuentas Bancolombia o tarjetas débito y crédito. Fuera de Colombia pagas $129 USD con tarjetas Visa, Mastercard o American Express.',
  },
  {
    id: 'faq-5',
    category: 'Programa',
    q: '¿Puedo inscribir a varias personas de mi equipo?',
    a: 'Claro. Puedes escribirnos por el botón de WhatsApp abajo a la derecha para coordinar la inscripción grupal y enviarte un único enlace de pago para todo tu equipo.',
  },
];

const FAQ_CATEGORIES: FaqCategory[] = ['Todas', 'Programa', 'Pagos', 'Requisitos'];

const FAQ_PILL_PRESETS = [
  'pill-diag-tl',
  'pill-diag-tr',
  'pill-bottom-spread',
  'pill-edge-mix',
] as const;

interface MentorCardData {
  id: 'laura' | 'sebas';
  name: string;
  role: string;
  badgeTag: string;
  bio: string;
  avatarUrl: string;
  avatarAlt: string;
  cropTight?: boolean;
  frameBg: string;
  innerBg: string;
  stampBg: string;
  stampText: string;
  blockBackColor: string;
  blockPreset: 'mentor-laura' | 'mentor-sebas';
  tilt: string;
}

const MENTORS: MentorCardData[] = [
  {
    id: 'laura',
    name: 'Laura Villada',
    role: 'Estratega de Adopción de IA & Co-fundadora',
    badgeTag: 'Co-fundadora',
    bio: 'Laura diseña la estructura de nuestros programas para que el aprendizaje sea fácil, entretenido y sostenible.',
    avatarUrl: '/assets/aistudio/1_65be7eef.jpg',
    avatarAlt: 'Retrato de Laura Villada, Estratega de Adopción de IA y Co-fundadora de Squai',
    frameBg: 'bg-[#FFF4CC]',
    innerBg: 'bg-white',
    stampBg: 'bg-[#8A8EF9]',
    stampText: 'text-[#0A0C1A]',
    blockBackColor: '#8A8EF9',
    blockPreset: 'mentor-laura',
    tilt: '-rotate-[1.8deg]',
  },
  {
    id: 'sebas',
    name: 'Sebas',
    role: 'Ingeniero de IA & Co-fundador',
    badgeTag: 'Co-fundador',
    bio: 'Sebas arma el núcleo técnico de los programas, dejando fuera todo el humo y promesas falsas que abundan en internet.',
    avatarUrl: '/assets/aistudio/perfil_61ac2c28.png',
    avatarAlt: 'Retrato de Sebas, Ingeniero de IA y Co-fundador de Squai',
    cropTight: true,
    frameBg: 'bg-white',
    innerBg: 'bg-[#eef0fd]',
    stampBg: 'bg-[#0A0C1A]',
    stampText: 'text-[#F9C24D]',
    blockBackColor: '#FFFFFF',
    blockPreset: 'mentor-sebas',
    tilt: 'rotate-[1.8deg]',
  },
];

export function AardvarkInteractiveSections({
  currency,
  onSelectCta,
}: AardvarkInteractiveSectionsProps) {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('sales');
  const [pointerShift, setPointerShift] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('Todas');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const giftSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: giftProgress } = useScroll({
    target: giftSectionRef,
    offset: ['start end', 'end start'],
  });
  // Full-span kinetic curved textPath glide (~62% -> -22%) matching Aardvark's tagline-curve speed & responsiveness
  const curveOffset = useTransform(giftProgress, [0.05, 0.95], ['62%', '-22%']);

  const activeRoleId = hoveredRoleId ?? selectedRoleId;
  const activeRoleIndex = Math.max(
    0,
    ROLES.findIndex((r) => r.id === activeRoleId)
  );
  const previewRole = ROLES[activeRoleIndex] ?? ROLES[0];

  const filteredFaqs =
    activeCategory === 'Todas'
      ? FAQS
      : FAQS.filter((item) => item.category === activeCategory);

  const handleGenreMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 22;
    setPointerShift({ x: nx, y: ny });
  };

  const rowVerticalY = activeRoleIndex * 54;

  return (
    <>
      {/* ============================================================
          SECTION 5: PARA TU ROL (.genre Inset #303163 Deep Periwinkle over White)
          ============================================================ */}
      <section
        id="roles"
        onMouseMove={handleGenreMouseMove}
        className="w-full bg-white py-4 sm:py-6 px-3 sm:px-5 lg:px-6"
        aria-labelledby="roles-heading"
      >
        <div className="w-full relative bg-[#303163] text-[#F4F6FF] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden py-20 sm:py-28 px-5 sm:px-8 lg:px-12">
          <div className="max-w-[1680px] mx-auto">
            <div className="text-center max-w-[820px] mx-auto mb-12 sm:mb-16 space-y-4">
              <h2 id="roles-heading" className="aardvark-h2 text-[#F4F6FF]">
                Lo aplicas en lo que haces.
              </h2>
              <p className="aardvark-handwritten-lg text-[#F9C24D] inline-block -rotate-[1.5deg]">
                Pasa el cursor sobre tu área
              </p>
            </div>

            <div className="relative max-w-[1320px] mx-auto">
              {/* Unique Floating Left & Right Borderless Image Cards */}
              <div className="hidden lg:block pointer-events-none" aria-hidden="true">
                <motion.div
                  animate={{
                    scale: hoveredRoleId ? 1 : 0.88,
                    opacity: hoveredRoleId ? 1 : 0.42,
                    rotate: hoveredRoleId ? -8 : -14,
                    x: pointerShift.x * -0.7,
                    y: rowVerticalY * 0.5 + pointerShift.y * -0.5,
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                  className="absolute left-0 top-4 w-[250px] bg-white rounded-[28px] p-2.5 shadow-2xl z-20"
                >
                  <div className="aspect-[3/4] rounded-[20px] overflow-hidden bg-[#eef0fd]">
                    <img
                      src={previewRole.imageLeft}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: hoveredRoleId ? 1 : 0.88,
                    opacity: hoveredRoleId ? 1 : 0.42,
                    rotate: hoveredRoleId ? 7 : 13,
                    x: pointerShift.x * 0.85,
                    y: rowVerticalY * 0.5 + 32 + pointerShift.y * 0.65,
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                  className="absolute right-0 top-10 w-[250px] bg-[#F9C24D] rounded-[28px] p-2.5 shadow-2xl z-20"
                >
                  <div className="aspect-[3/4] rounded-[20px] overflow-hidden bg-[#eef0fd]">
                    <img
                      src={previewRole.imageRight}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Stacked Role Titles with Heavy Display Weight */}
              <ul
                className="relative z-10 max-w-[840px] mx-auto flex flex-col items-center text-center"
                onMouseLeave={() => setHoveredRoleId(null)}
              >
                {ROLES.map((role) => {
                  const isSelected = selectedRoleId === role.id && !hoveredRoleId;
                  const isHovered = hoveredRoleId === role.id;
                  const isActive = isHovered || isSelected;
                  return (
                    <li
                      key={role.id}
                      data-selected={isActive ? 'true' : 'false'}
                      className="aardvark-genre-item w-full py-3 sm:py-3.5"
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setHoveredRoleId(role.id)}
                        onFocus={() => setHoveredRoleId(role.id)}
                        onClick={() => {
                          setSelectedRoleId(role.id);
                          void trackConversionEvent({
                            type: 'cta_click',
                            label: `Selección de rol: ${role.label}`,
                          });
                        }}
                        aria-pressed={selectedRoleId === role.id}
                        className="aardvark-genre-btn relative w-full inline-flex items-center justify-center cursor-pointer py-1"
                      >
                        <span className="aardvark-genre-link-default aardvark-benefit-text text-[clamp(2.45rem,6vw,5.4rem)] leading-[0.88] text-[#F4F6FF]">
                          {role.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="aardvark-genre-link-hover absolute inset-0 flex items-center justify-center font-human text-[clamp(2rem,4.9vw,4.25rem)] leading-none text-[#F9C24D]"
                        >
                          {role.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-12 text-center space-y-6 max-w-[640px] mx-auto relative z-20">
              <AnimatePresence mode="wait">
                <motion.p
                  key={previewRole.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="aardvark-lead text-[#d2d7fc]"
                >
                  {previewRole.example}
                </motion.p>
              </AnimatePresence>

              <div className="flex justify-center">
                <AardvarkButtonAlt
                  label="Quiero aplicarlo en mi área"
                  size="lg"
                  variant="marigold"
                  onClick={() => onSelectCta(currency, `CTA desde rol: ${previewRole.label}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: BENEFITS (.benefits Inset Warm Cream #FFF4CC Band over White)
          Exact Aardvark 78px font-size chunky capsules (~4.875rem) + 60px border-radius
          ============================================================ */}
      <section
        id="beneficios"
        className="w-full bg-white text-[#0A0C1A] py-4 sm:py-6 px-3 sm:px-5 lg:px-6"
        aria-labelledby="outcomes-heading"
      >
        <div className="w-full relative bg-[#FFF4CC] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] overflow-hidden py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
          <div
            className="absolute inset-0 pointer-events-none select-none opacity-85"
            aria-hidden="true"
          >
            <BenefitsRibbonSvg />
          </div>

          <div className="max-w-[1680px] mx-auto relative z-10 text-center space-y-12 sm:space-y-16">
            <div className="max-w-[820px] mx-auto space-y-5">
              <div className="flex justify-center">
                <span className="w-16 h-16 rounded-full bg-white inline-flex items-center justify-center shadow-sm">
                  <SquaiMark variant="color" className="w-8 h-8" />
                </span>
              </div>
              <h2 id="outcomes-heading" className="aardvark-h2 text-[#0A0C1A]">
                Lo que cambia en tu semana.
              </h2>
              <p className="aardvark-lead text-[#525770] max-w-[560px] mx-auto">
                Pasas de probar prompts al azar a trabajar con un método claro que respalda tus entregas.
              </p>
            </div>

            {/* Oversized 78px Reference-Scale Tilted Benefit Pills Over Ribbon */}
            <div className="max-w-[1520px] mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-9 py-4">
              {BENEFIT_PILLS.map((pill, idx) => (
                <motion.div
                  key={pill.text}
                  initial={{ opacity: 0, scale: 0.72, y: 28 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 230,
                    damping: 16,
                    delay: idx * 0.07,
                  }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`${pill.bg} ${pill.tilt} rounded-[36px] sm:rounded-[60px] px-7 sm:px-10 py-5 sm:py-6 shadow-xl max-w-full`}
                >
                  <span className="aardvark-benefit-pill-text text-[#0A0C1A] sm:whitespace-nowrap text-center block">
                    {pill.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: PREGUNTAS FRECUENTES (.faq Crisp White Band + Subtle Ribbon)
          Separates Warm #FFF4CC Benefits above from Soft #eef0fd .gift below.
          ============================================================ */}
      <section
        id="preguntas"
        className="w-full relative bg-white text-[#0A0C1A] overflow-hidden py-24 sm:py-32 px-5 sm:px-8 lg:px-12"
        aria-labelledby="faq-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none select-none opacity-80"
          aria-hidden="true"
        >
          <FaqRibbonSvg />
        </div>

        <div className="max-w-[1680px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <h2 id="faq-heading" className="aardvark-h2 text-[#0A0C1A]">
              Preguntas frecuentes.
            </h2>
            <p className="aardvark-lead text-[#525770] max-w-[440px]">
              Respuestas directas sobre las sesiones, los medios de pago y cómo trabajas en cada módulo.
            </p>

            {/* Borderless Category Pills with Varied Non-Repetitive Squai Block Presets */}
            <div className="flex flex-wrap gap-4 pt-6" role="group" aria-label="Filtrar preguntas">
              {FAQ_CATEGORIES.map((cat, idx) => {
                const isActive = activeCategory === cat;
                return (
                  <div key={cat} className={isActive ? 'relative z-10' : 'relative z-0'}>
                    <AardvarkPillButton
                      label={cat}
                      active={isActive}
                      withBlocks
                      blockPreset={FAQ_PILL_PRESETS[idx % FAQ_PILL_PRESETS.length]}
                      blockBackColor="#ffd966"
                      ariaPressed={isActive}
                      bgClass={isActive ? 'bg-[#F9C24D]' : 'bg-[#eef0fd]'}
                      textClass="text-[#0A0C1A]"
                      onClick={() => {
                        setActiveCategory(cat);
                        const first =
                          cat === 'Todas'
                            ? FAQS[0]?.id
                            : FAQS.find((f) => f.category === cat)?.id;
                        if (first) setOpenFaqId(first);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            {filteredFaqs.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-[26px] transition-colors duration-200 ${
                    isOpen ? 'bg-[#eef0fd]' : 'bg-[#f2f3f6] hover:bg-[#eef0fd]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="aardvark-h3 text-[#0A0C1A] group-hover:text-[#303163] transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#0A0C1A] text-[#F4F6FF] rotate-45' : 'bg-white text-[#0A0C1A]'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 sm:px-7 pb-6 sm:pb-7 pr-12 aardvark-body text-[#525770]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: AARDVARK .gift PARITY ("Aprende IA. Potencia tus habilidades")
          169px curved SVG <textPath> gliding across crest + emotional narrative + right visual
          ============================================================ */}
      <section
        id="potencia"
        ref={giftSectionRef}
        className="w-full bg-white text-[#0A0C1A] pt-4 pb-6 px-3 sm:px-5 lg:px-6 scroll-mt-16"
        aria-labelledby="gift-heading"
      >
        <div className="w-full bg-[#eef0fd] rounded-[40px] md:rounded-[96px] lg:rounded-[120px] pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
          <h2 id="gift-heading" className="sr-only">
            Aprende IA. Potencia tus habilidades
          </h2>

          {/* Full-bleed 169px SVG Curved Headline replicating Aardvark's .gift .tagline-curve */}
          <div className="w-full mb-6 sm:mb-10 overflow-hidden" aria-hidden="true">
            <svg
              viewBox="0 0 1920 430"
              className="w-[112%] -ml-[6%] h-auto select-none"
            >
              <defs>
                <path
                  id="squai-gift-curve"
                  d="M-165 410 C60 276 760 210 1304 210 C1848 210 2320 284 2820 393"
                />
              </defs>
              <text
                fill="#0A0C1A"
                className="font-display font-bold"
                style={{
                  fontSize: '169px',
                  letterSpacing: '-0.03em',
                }}
              >
                <motion.textPath
                  href="#squai-gift-curve"
                  startOffset={curveOffset}
                >
                  Aprende IA. Potencia tus habilidades
                </motion.textPath>
              </text>
            </svg>
          </div>

          {/* 2-Column .gift__inner layout: Left emotional story + CTA · Right inspiring showcase image */}
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="lg:col-span-6 space-y-7"
            >
              <span className="aardvark-handwritten-lg text-[#5a5bb6] inline-block -rotate-[1.5deg]">
                Tu criterio vale más que cualquier herramienta
              </span>

              <p className="aardvark-lead text-[#0A0C1A] leading-[1.32] max-w-[540px]">
                No entras para memorizar funciones que cambian cada mes ni para ver horas de tutoriales vacíos. Entras para recuperar calma en tu semana, sentir confianza frente a cada entrega y tener el criterio de usar la IA a tu favor desde el primer día.
              </p>

              <p className="aardvark-body text-[#525770] max-w-[500px]">
                Pago único en línea de <strong className="text-[#0A0C1A]">$399.000 COP</strong> o{' '}
                <strong className="text-[#0A0C1A]">$129 USD</strong> con las 4 sesiones en vivo, grabaciones y plantillas listas para tu trabajo.
              </p>

              <div className="pt-1">
                <AardvarkButtonAlt
                  label="Quiero dar este paso"
                  variant="dark"
                  size="lg"
                  onClick={() => onSelectCta(currency, 'Sección Potencia CTA: Quiero dar este paso')}
                />
              </div>
            </motion.div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: 2.5, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 210, damping: 18 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="w-full max-w-[560px] bg-white rounded-[36px] p-4 shadow-2xl"
              >
                <div className="aspect-[4/4.2] rounded-[26px] overflow-hidden bg-[#d2d7fc]">
                  <img
                    src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Profesional sonriendo con tranquilidad mientras organiza su jornada con IA"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-4 pb-2 px-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display font-bold text-xl text-[#0A0C1A]">
                    Más tiempo para lo que importa
                  </span>
                  <span className="font-human text-base text-[#5a5bb6]">
                    A tu ritmo y con respaldo
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8.5: STANDALONE .badge MARQUEE SECTION ON WHITE CANVAS
          Matches aardvarkbookclub.com's independent .badge band between .gift and .choice
          ============================================================ */}
      <section
        className="w-full bg-white py-12 sm:py-20 select-none overflow-x-clip"
        aria-label="Resumen de beneficios del programa"
      >
        <div className="space-y-4">
          <div className="relative -rotate-[1.8deg] scale-[1.03] bg-[#F9C24D] text-[#0A0C1A] py-5 sm:py-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-65">
              <BadgeRibbonSvg colorClass="text-[#ffe29a]" />
            </div>
            <div className="relative z-10 aardvark-marquee-track font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] gap-12">
              <span>Fundamentos de IA para el Trabajo · $399.000 COP</span>
              <span>·</span>
              <span>$129 USD pago internacional</span>
              <span>·</span>
              <span>Pago único seguro en línea</span>
              <span>·</span>
              <span>4 módulos en vivo y grabaciones</span>
              <span>·</span>
              <span>Fundamentos de IA para el Trabajo · $399.000 COP</span>
              <span>·</span>
              <span>$129 USD pago internacional</span>
              <span>·</span>
              <span>Pago único seguro en línea</span>
              <span>·</span>
              <span>4 módulos en vivo y grabaciones</span>
            </div>
          </div>

          <div className="relative rotate-[1.4deg] scale-[1.03] bg-[#0A0C1A] text-[#F4F6FF] py-5 sm:py-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-35">
              <BadgeRibbonSvg colorClass="text-[#303163]" />
            </div>
            <div className="relative z-10 aardvark-marquee-track-reverse font-display font-bold text-xl sm:text-2xl tracking-[-0.015em] gap-12">
              <span>PSE · Nequi · Bancolombia · Tarjetas</span>
              <span>·</span>
              <span>Plantillas listas para editar</span>
              <span>·</span>
              <span>Lista de privacidad para equipos</span>
              <span>·</span>
              <span>Soporte directo en español</span>
              <span>·</span>
              <span>PSE · Nequi · Bancolombia · Tarjetas</span>
              <span>·</span>
              <span>Plantillas listas para editar</span>
              <span>·</span>
              <span>Lista de privacidad para equipos</span>
              <span>·</span>
              <span>Soporte directo en español</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9: MENTORES (.choice Gold #F9C24D Band modeled 1:1 on "Members' Choice Winners")
          Centered display heading + compact 320x455 vertical portrait-frame cards
          with overlapping left-side circular mentor avatar + tilted top-right role stamp
          ============================================================ */}
      <section
        id="mentores"
        className="w-full bg-[#F9C24D] text-[#0A0C1A] rounded-t-[40px] md:rounded-t-[96px] lg:rounded-t-[120px] pt-20 sm:pt-28 pb-32 sm:pb-44 px-5 sm:px-8 lg:px-12 relative z-10 overflow-hidden"
        aria-labelledby="mentors-heading"
      >
        <div className="max-w-[1680px] mx-auto space-y-14 sm:space-y-16">
          {/* Centered Header matching Aardvark's .choice centered layout */}
          <div className="max-w-[820px] mx-auto text-center space-y-5 flex flex-col items-center">
            <AardvarkButtonAlt
              label="Quiero aprender con ellos"
              variant="dark"
              size="lg"
              onClick={() => onSelectCta(currency, 'Sección Mentores Gold CTA')}
            />
            <h2 id="mentors-heading" className="aardvark-h2 text-[#0A0C1A]">
              Quiénes diseñan y guían tu proceso.
            </h2>
            <p className="aardvark-lead text-[#0A0C1A]/85 max-w-[600px]">
              Aprendes directo con quienes estructuran cada dinámica y verifican cada ejemplo técnico para que apliques IA de verdad en tu trabajo.
            </p>
          </div>

          {/* 2 Compact Vertical Showcase Cards matching .choice-slider__item proportions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 max-w-[760px] mx-auto pt-8 pb-6 justify-items-center items-stretch">
            {MENTORS.map((mentor, idx) => (
              <motion.article
                key={mentor.id}
                initial={{ opacity: 0, y: 40, rotate: idx === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: 'spring',
                  stiffness: 195,
                  damping: 18,
                  delay: idx * 0.1,
                }}
                className="relative flex justify-center w-[295px] sm:w-[324px]"
              >
                <div className={`relative w-full ${mentor.tilt} hover:rotate-0 transition-transform duration-300 flex`}>
                  {/* Squai accent blocks hugging outer card contour */}
                  <SquaiCornerBlocks
                    size="card"
                    preset={mentor.blockPreset}
                    backColor={mentor.blockBackColor}
                  />

                  {/* Top-Right Tilted Role Stamp Badge matching .choice-slider__year */}
                  <div
                    className={`absolute -top-5 -right-5 z-30 ${mentor.stampBg} ${mentor.stampText} px-4 py-2 rounded-[16px] shadow-xl rotate-6 font-display font-bold text-sm sm:text-base tracking-tight pointer-events-none`}
                  >
                    {mentor.badgeTag}
                  </div>

                  {/* Overlapping Left-Side Circular Portrait matching .choice-slider__author (~115px) */}
                  <div className="absolute top-30 -left-9 sm:-left-11 w-[112px] h-[112px] sm:w-[118px] sm:h-[118px] rounded-full overflow-hidden shadow-2xl z-30 bg-[#eef0fd]">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.avatarAlt}
                      className={`w-full h-full object-cover object-center ${
                        mentor.cropTight ? 'scale-[1.16]' : ''
                      }`}
                    />
                  </div>

                  {/* Slim Outer Frame (p-3.5 = 14px) matching .choice-slider__item-container */}
                  <div
                    className={`relative z-10 w-full ${mentor.frameBg} rounded-[32px] p-3.5 shadow-2xl min-h-[465px] flex`}
                  >
                    <div
                      className={`w-full ${mentor.innerBg} rounded-[22px] p-5 sm:p-6 flex flex-col justify-between gap-3`}
                    >
                      <div className="pr-10 space-y-1">
                        <h3 className="aardvark-h3 text-[#0A0C1A]">{mentor.name}</h3>
                        <p className="font-human text-sm text-[#5a5bb6] leading-tight">
                          {mentor.role}
                        </p>
                      </div>

                      <div className="pl-14 py-2 flex items-center justify-center">
                        <MentorIllustration mentor={mentor.id} />
                      </div>

                      <div>
                        <p className="aardvark-body text-[#0A0C1A]/85 leading-snug">
                          {mentor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
