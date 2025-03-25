'use client';

import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetAuthUserQuery } from '@/state/api';
import { APPBAR_HEIGHT } from '@/lib/config';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';

export default function Appbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: authUser } = useGetAuthUserQuery();
  const { signOut } = useAuthenticator();

  const isDashboardPage =
    pathname.includes('/managers') || pathname.includes('/tenants');

  function handleSignOut() {
    signOut();
    window.location.href = '/';
  }

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full shadow-md bg-primary/90`}
      style={{ height: `${APPBAR_HEIGHT}px` }}
    >
      <div className='flex items-center justify-between w-full h-full px-6 py-2'>
        {isDashboardPage && (
          <div className='md:hidden'>
            <SidebarTrigger className='w-8 h-8 bg-white text-primary/90' />
          </div>
        )}
        <Link href={'/'} className='text-lg font-bold text-secondary'>
          Rental-App
        </Link>
        {isDashboardPage && authUser && (
          <Button
            variant='secondary'
            onClick={() =>
              router.push(
                authUser.userRole?.toLowerCase() === 'manager'
                  ? '/managers/newproperty'
                  : '/search'
              )
            }
          >
            {authUser.userRole?.toLowerCase() === 'manager' ? (
              <>
                <Plus className='w-4 h-4' />
                <span className='hidden md:block ml-2'>Add New Property</span>
              </>
            ) : (
              <>
                <Search className='w-4 h-4' />
                <span>Search Properties</span>
              </>
            )}
          </Button>
        )}
        {!isDashboardPage && (
          <p className='text-primary-foreground/80 hidden md:block'>
            Discover your perfect rental apartment with our advanced search
          </p>
        )}
        <div className='flex items-center gap-5'>
          {!authUser ? (
            <div className='flex items-center justify-center gap-4'>
              <Button variant='outline' onClick={() => router.push('/signin')}>
                Signin
              </Button>
              <Button
                variant='secondary'
                onClick={() => router.push('/signup')}
              >
                Signup
              </Button>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-4 text-secondary'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={authUser.userInfo.image} alt='profile' />
                    <AvatarFallback className='text-primary'>
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Go to Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
