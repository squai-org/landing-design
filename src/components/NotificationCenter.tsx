import React from 'react';
import { Bell, CheckCircle2, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

export function NotificationCenter() {
  const notifications = useAppStore((s) => s.notifications);
  const dismissNotification = useAppStore((s) => s.dismissNotification);

  return (
    <div
      className="fixed top-20 right-4 z-40 w-[calc(100vw-2rem)] max-w-sm space-y-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-white rounded-2xl p-3.5 shadow-xl flex items-start gap-3"
          >
            {item.tone === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#14532d] shrink-0 mt-0.5" aria-hidden="true" />
            ) : item.tone === 'warning' ? (
              <Bell className="w-5 h-5 text-[#9a6000] shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <Info className="w-5 h-5 text-[#5a5bb6] shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-[#0A0C1A]">{item.title}</p>
              <p className="text-xs text-[#525770] mt-0.5 leading-relaxed">{item.body}</p>
            </div>

            <button
              type="button"
              onClick={() => dismissNotification(item.id)}
              className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#525770] hover:bg-[#edeff5] shrink-0 cursor-pointer"
              aria-label={`Cerrar aviso: ${item.title}`}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
