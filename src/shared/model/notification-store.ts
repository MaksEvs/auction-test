import { create } from 'zustand';
import type { INotificationState } from '@/shared/types/notification';

export const useNotificationStore = create<INotificationState>((set) => ({
  isOpen: false,
  message: '',
  severity: 'info',
  showNotification: (message, severity) => {
    set({
      isOpen: true,
      message,
      severity,
    });
  },
  closeNotification: () => {
    set({ isOpen: false });
  },
}));
