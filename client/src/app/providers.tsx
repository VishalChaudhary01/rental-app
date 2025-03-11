'use client';
import { Authenticator } from '@aws-amplify/ui-react';
import Auth from './(auth)/authProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator.Provider>
      <Auth>{children}</Auth>
    </Authenticator.Provider>
  );
}
