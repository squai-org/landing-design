import React, { useEffect, useRef } from 'react';
import { ExternalLink, ShieldCheck, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { formatMoney } from '../utils/pricing';
import { trackConversionEvent } from '../utils/analyticsClient';

export function BoldCheckoutModal() {
  const activeCheckout = useAppStore((s) => s.activeCheckout);
  const open = useAppStore((s) => s.checkoutModalOpen);
  const setOpen = useAppStore((s) => s.setCheckoutModalOpen);
  const setWhatsappOpen = useAppStore((s) => s.setWhatsappOpen);
  const boldMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open || !activeCheckout || !boldMountRef.current) return;
    if (!activeCheckout.identityKeyConfigured || !activeCheckout.identityKey) return;

    const container = boldMountRef.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://checkout.bold.co/library/boldPaymentButton.js';
    script.async = true;
    script.setAttribute('data-bold-button', 'dark-L');
    script.setAttribute('data-api-key', activeCheckout.identityKey);
    script.setAttribute('data-order-id', activeCheckout.orderId);
    script.setAttribute('data-currency', activeCheckout.currency);
    script.setAttribute('data-amount', activeCheckout.boldAmount);
    script.setAttribute('data-integrity-signature', activeCheckout.integritySignature);
    script.setAttribute('data-description', activeCheckout.description);
    script.setAttribute('data-render-mode', 'embedded');
    script.setAttribute(
      'data-customer-data',
      JSON.stringify({
        email: activeCheckout.email,
        fullName: activeCheckout.fullName,
        phone: activeCheckout.phone,
      })
    );

    if (window.location.protocol === 'https:') {
      const returnUrl = `${window.location.origin}/?bold-order=${encodeURIComponent(
        activeCheckout.orderId
      )}&inscription=${encodeURIComponent(activeCheckout.inscriptionId)}`;
      script.setAttribute('data-redirection-url', returnUrl);
    }

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [open, activeCheckout]);

  if (!open || !activeCheckout) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0C1A]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bold-modal-title"
    >
      <div className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 bg-[#eef0fd]">
          <div>
            <p className="text-xs font-semibold text-[#5a5bb6]">
              Pasarela de pago segura
            </p>
            <h3 id="bold-modal-title" className="font-display font-bold text-xl text-[#0A0C1A]">
              Finaliza tu inscripción
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full inline-flex items-center justify-center text-[#525770] hover:bg-white hover:text-[#0A0C1A] transition-colors cursor-pointer"
            aria-label="Cerrar ventana de pago"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-[#f9faff] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#0A0C1A]">
                Fundamentos de IA para el Trabajo
              </p>
              <p className="text-xs text-[#525770] mt-0.5 tabular-nums">
                Orden {activeCheckout.orderId} · {activeCheckout.fullName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-bold text-2xl text-[#0A0C1A] tabular-nums whitespace-nowrap">
                {formatMoney(activeCheckout.amount, activeCheckout.currency)}
              </p>
              <p className="text-xs text-[#5a5bb6] whitespace-nowrap">
                Pago único en línea
              </p>
            </div>
          </div>

          {activeCheckout.identityKeyConfigured && activeCheckout.identityKey ? (
            <div className="rounded-2xl bg-[#f9faff] p-5 flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-[#525770]">
                Haz clic en el botón seguro para pagar con PSE, Nequi, Bancolombia o tarjeta:
              </p>
              <div
                ref={boldMountRef}
                className="min-h-[52px] flex items-center justify-center w-full"
              />
            </div>
          ) : (
            <div className="rounded-2xl bg-[#fff8e6] p-5 space-y-3 text-left">
              <p className="font-display font-bold text-base text-[#0A0C1A]">
                Enlace de pago listo para activar
              </p>
              <p className="text-sm text-[#525770] leading-relaxed">
                Tu orden <strong className="text-[#0A0C1A] tabular-nums">{activeCheckout.orderId}</strong> ya tiene monto y firma criptográfica verificados en el servidor. Puedes solicitar tu enlace directo de pago por WhatsApp con nuestro equipo en cualquier momento.
              </p>
              <div className="pt-1 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    void trackConversionEvent({
                      type: 'cta_click',
                      label: 'Pasarela pendiente: pedir enlace directo por WhatsApp',
                      currency: activeCheckout.currency,
                    });
                    setOpen(false);
                    setWhatsappOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#8A8EF9] hover:bg-[#777ae3] text-[#0A0C1A] font-display font-bold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Solicitar enlace directo por WhatsApp</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5 text-xs text-[#525770] bg-[#f2f3f6] rounded-xl p-3">
            <ShieldCheck className="w-4 h-4 text-[#5a5bb6] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Integración segura con firma criptográfica SHA-256 verificada en servidor ({activeCheckout.integritySignature.slice(0, 12)}...).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
