'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetAuthUserQuery } from '@/state/api';
import { APPBAR_HEIGHT } from '@/lib/config';
import Appbar from '@/components/custom/Appbar';
import AppSidebar from '@/components/custom/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === 'manager' && pathname.startsWith('/tenants')) ||
        (userRole === 'tenant' && pathname.startsWith('/managers'))
      ) {
        router.push(
          userRole === 'manager'
            ? '/managers/properties'
            : '/tenants/favorites',
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname, setIsLoading]);

  if (authLoading || isLoading) return <>Loading...</>;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <Appbar />
      <main
        className='flex min-h-screen w-full'
        style={{ marginTop: `${APPBAR_HEIGHT}px` }}
      >
        <AppSidebar userType={authUser.userRole.toLowerCase()} />
        <div className='flex-grow transition-all duration-300'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
