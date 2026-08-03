import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import CssBaseline from '@mui/material/CssBaseline';
import { queryClient } from '@/app/providers/query-client';
import { router } from '@/app/providers/router';
import { enableMocks } from '@/app/providers/enable-mocks';
import { AppNotification } from '@/app/ui/app-notification.component';

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AppNotification />
      </QueryClientProvider>
    </StrictMode>,
  );
}

enableMocks().then(renderApp);
