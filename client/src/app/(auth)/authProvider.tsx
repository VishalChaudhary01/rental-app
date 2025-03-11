'use client';

import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter, usePathname } from 'next/navigation';
import { authFormFields } from '@/constants/authFormFields';
import { AuthComponents } from './AuthComponents';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

export default function Auth({ children }: { children: React.ReactNode }) {
  const { user, route } = useAuthenticator((context) => [
    context.user,
    context.route,
  ]);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith('/manager') || pathname.startsWith('/tenants');

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (route === 'signUp' && pathname !== '/signup') {
      router.replace('/signup');
    } else if (route === 'signIn' && pathname !== '/signin') {
      router.replace('/signin');
    } else if (user && isAuthPage) {
      router.replace('/');
    }
  }, [route, user, pathname, router, isAuthPage]);

  // Allow access to public pages without authentication
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className='h-full py-6'>
      <Authenticator
        initialState={pathname.includes('signup') ? 'signUp' : 'signIn'}
        components={AuthComponents}
        formFields={authFormFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
}
