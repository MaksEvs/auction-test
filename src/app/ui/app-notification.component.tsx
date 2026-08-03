import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNotificationStore } from '@/shared/model/notification-store';

const NOTIFICATION_AUTO_HIDE_DURATION_MS = 5000;

export function AppNotification() {
  const isOpen = useNotificationStore((state) => state.isOpen);
  const message = useNotificationStore((state) => state.message);
  const severity = useNotificationStore((state) => state.severity);
  const closeNotification = useNotificationStore((state) => state.closeNotification);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={NOTIFICATION_AUTO_HIDE_DURATION_MS}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={closeNotification}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
        onClose={closeNotification}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
