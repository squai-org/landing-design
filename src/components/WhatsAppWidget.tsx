import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SquaiSingleBlock } from './AardvarkPrimitives';
import { useAppStore } from '../store/useAppStore';
import { trackConversionEvent } from '../utils/analyticsClient';

const QUICK_TOPICS = [
  {
    label: 'Dudas sobre los 4 módulos del programa',
    message:
      'Hola Squai, quiero resolver una duda sobre los módulos de Fundamentos de IA para el Trabajo.',
  },
  {
    label: 'Medios de pago disponibles',
    message: 'Hola Squai, quiero consultar los medios de pago en línea para inscribirme.',
  },
  {
    label: 'Inscribir a varias personas de mi equipo',
    message: 'Hola Squai, me interesa inscribir a varias personas de mi equipo en el programa.',
  },
];

function WhatsAppLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFFFFF"
        d="M16.01 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.1 29.05l6.83-1.79a12.74 12.74 0 0 0 6.08 1.54h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.05A12.71 12.71 0 0 0 16.01 3.2Zm0 23.43h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.05 1.06 1.08-3.95-.25-.41a10.58 10.58 0 0 1-1.62-5.62c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.51c0 5.87-4.77 10.63-10.62 10.63Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.67.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}

export function WhatsAppWidget() {
  const open = useAppStore((s) => s.whatsappOpen);
  const setOpen = useAppStore((s) => s.setWhatsappOpen);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567';

  const openWhatsAppLink = (message: string, topicLabel: string) => {
    void trackConversionEvent({
      type: 'whatsapp_click',
      label: `WhatsApp: ${topicLabel}`,
    });
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="w-[310px] sm:w-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-label="Asistencia rápida por WhatsApp"
          >
            <div className="bg-[#075E54] text-white px-5 py-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative w-10 h-10 inline-flex items-center justify-center shrink-0">
                  <SquaiSingleBlock color="#25D366" className="w-10 h-10" />
                  <WhatsAppLogo className="w-5 h-5 relative z-10" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Chatea con Squai
                  </h3>
                  <p className="text-xs text-[#d9fdd3] mt-0.5">
                    Te respondemos directo, sin bots eternos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-white/80 hover:bg-white/15 hover:text-white cursor-pointer"
                aria-label="Cerrar ventana de WhatsApp"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2 bg-[#f2f3f6]">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => openWhatsAppLink(topic.message, topic.label)}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl bg-white hover:bg-[#e7fce9] text-sm font-medium text-[#0A0C1A] flex items-center justify-between gap-2 transition-colors cursor-pointer"
                >
                  <span>{topic.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#075E54] shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.07, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) {
            void trackConversionEvent({
              type: 'whatsapp_click',
              label: 'Apertura del panel de WhatsApp',
            });
          }
        }}
        aria-expanded={open}
        aria-label="Escríbenos por WhatsApp"
        className="group relative w-16 h-16 inline-flex items-center justify-center cursor-pointer drop-shadow-xl"
      >
        <SquaiSingleBlock
          color="#25D366"
          className="w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
        <WhatsAppLogo className="w-8 h-8 absolute inset-0 m-auto z-10 pointer-events-none" />
      </motion.button>
    </div>
  );
}
