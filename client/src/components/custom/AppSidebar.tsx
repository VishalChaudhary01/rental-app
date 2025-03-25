'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { APPBAR_HEIGHT } from '@/lib/config';
import { getNavLinks } from '@/constants/navLinks';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';

export default function AppSidebar({ userType }: IAppSidebarProps) {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();

  const navLinks = getNavLinks(userType);

  return (
    <Sidebar
      collapsible='icon'
      className={`fixed left-0 bg-white shadow-md`}
      style={{
        top: `${APPBAR_HEIGHT}px`,
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex items-center min-h-[56px] w-full ${
                open ? 'justify-between px-4' : 'justify-center'
              }`}
            >
              {open ? (
                <>
                  <h3 className='text-h3'>
                    {userType === 'manager' ? 'Manager View' : ' Tenant View'}
                  </h3>
                  <Button variant='secondary' onClick={() => toggleSidebar()}>
                    <X className='h-6 w-6 text-primary/90' />
                  </Button>
                </>
              ) : (
                <Button variant='secondary' onClick={() => toggleSidebar()}>
                  <Menu className='w-6 h-6 text-primary/90' />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={`flex items-center px-6 py-6 ${
                    isActive
                      ? 'bg-gray-100'
                      : 'text-primary/90 hover:bg-gray-100'
                  } ${open ? 'text-blue-600' : 'ml-[5px]'}`}
                >
                  <Link href={link.href} className='w-full' scroll={false}>
                    <div className='flex items-center gap-2'>
                      <link.icon
                        className={`h-5 w-5 ${
                          isActive ? 'text-blue-600' : 'text-primary/90'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? 'text-blue-600' : 'text-primary/90'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
