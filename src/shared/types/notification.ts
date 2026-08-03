export type TNotificationSeverity = 'success' | 'error' | 'warning' | 'info'

export interface INotificationState {
  isOpen: boolean
  message: string
  severity: TNotificationSeverity
  showNotification: (
    message: string,
    severity: TNotificationSeverity,
  ) => void
  closeNotification: () => void
}