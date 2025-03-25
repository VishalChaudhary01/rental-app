import { Building, FileText, Heart, Home, Settings } from 'lucide-react';

export const getNavLinks = (userType: UserType) =>
  userType === 'manager'
    ? [
        { icon: Building, label: 'Properties', href: '/managers/properties' },
        {
          icon: FileText,
          label: 'Applications',
          href: '/managers/applications',
        },
        { icon: Settings, label: 'Settings', href: '/managers/settings' },
      ]
    : [
        { icon: Heart, label: 'Favorites', href: '/tenants/favorites' },
        {
          icon: FileText,
          label: 'Applications',
          href: '/tenants/applications',
        },
        { icon: Home, label: 'Residences', href: '/tenants/residences' },
        { icon: Settings, label: 'Settings', href: '/tenants/settings' },
      ];
