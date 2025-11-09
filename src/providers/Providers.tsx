import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { SettingsProvider } from './useSettings';
import { queryClient } from '@/react-query';
import { router } from '@/router';
import { OAuthProvider } from './userOAuthContext';

export function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <OAuthProvider>
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </OAuthProvider>
    </QueryClientProvider>
  );
}
