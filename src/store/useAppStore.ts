import { create } from 'zustand';
import type { Currency, PaymentMethod } from '../utils/schemas';

export interface StatusNotification {
  id: string;
  title: string;
  body: string;
  tone: 'info' | 'success' | 'warning';
  timestamp: string;
}

export interface ActiveCheckout {
  inscriptionId: string;
  fullName: string;
  email: string;
  phone: string;
  currency: Currency;
  orderId: string;
  amount: number;
  boldAmount: string;
  description: string;
  integritySignature: string;
  identityKey: string;
  identityKeyConfigured: boolean;
  availableMethods: PaymentMethod[];
  status: 'pending' | 'paid';
  paidMethod?: PaymentMethod;
  paidAt?: string;
}

export type AnalyticsFilter = 'all' | 'inscriptions' | 'payments' | 'interactions';

interface AppState {
  currency: Currency;
  activeSection: string;
  analyticsFilter: AnalyticsFilter;
  activeCheckout: ActiveCheckout | null;
  checkoutModalOpen: boolean;
  whatsappOpen: boolean;
  pushPermission: NotificationPermission | 'unsupported';
  pushEnabled: boolean;
  notifications: StatusNotification[];

  setCurrency: (currency: Currency) => void;
  setActiveSection: (section: string) => void;
  setAnalyticsFilter: (filter: AnalyticsFilter) => void;
  setActiveCheckout: (checkout: ActiveCheckout | null) => void;
  setCheckoutModalOpen: (open: boolean) => void;
  setWhatsappOpen: (open: boolean) => void;
  setPushPermission: (permission: NotificationPermission | 'unsupported') => void;
  setPushEnabled: (enabled: boolean) => void;
  pushNotification: (notification: Omit<StatusNotification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
}

const initialPermission: NotificationPermission | 'unsupported' =
  typeof window !== 'undefined' && 'Notification' in window
    ? window.Notification.permission
    : 'unsupported';

export const useAppStore = create<AppState>((set, get) => ({
  currency: 'COP',
  activeSection: 'inicio',
  analyticsFilter: 'all',
  activeCheckout: null,
  checkoutModalOpen: false,
  whatsappOpen: false,
  pushPermission: initialPermission,
  pushEnabled: initialPermission === 'granted',
  notifications: [],

  setCurrency: (currency) => set({ currency }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setAnalyticsFilter: (analyticsFilter) => set({ analyticsFilter }),
  setActiveCheckout: (activeCheckout) => set({ activeCheckout }),
  setCheckoutModalOpen: (checkoutModalOpen) => set({ checkoutModalOpen }),
  setWhatsappOpen: (whatsappOpen) => set({ whatsappOpen }),
  setPushPermission: (pushPermission) =>
    set({ pushPermission, pushEnabled: pushPermission === 'granted' }),
  setPushEnabled: (pushEnabled) => set({ pushEnabled }),

  pushNotification: ({ title, body, tone }) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const next: StatusNotification = {
      id,
      title,
      body,
      tone,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      notifications: [next, ...state.notifications].slice(0, 1),
    }));

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        }));
      }, 5500);
    }

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      window.Notification.permission === 'granted' &&
      get().pushEnabled
    ) {
      try {
        new window.Notification(title, {
          body,
          tag: id,
        });
      } catch {
        // Fallback silently to the accessible in-app notification banner.
      }
    }
  },

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((item) => item.id !== id),
    })),
}));
