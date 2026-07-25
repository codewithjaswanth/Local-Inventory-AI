'use client';

import React from 'react';
import { useRole } from '@/hooks/useRole';

export interface NavItem {
  name: string;
  href: string;
}

export const RoleBasedNavigation: React.FC<{
  className?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
}> = ({ className = '', linkClassName = '', onLinkClick }) => {
  const { role, isCustomer, isShopkeeper, isAdmin } = useRole();

  let navItems: NavItem[] = [];

  if (isAdmin) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Admin', href: '/admin' },
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
    ];
  } else if (isShopkeeper) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Search', href: '/search' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
    ];
  } else if (isCustomer) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Search', href: '/search' },
      { name: 'Shops', href: '/shops' },
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
    ];
  } else {
    // Unauthenticated user
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Search', href: '/search' },
      { name: 'Shops', href: '/shops' },
    ];
  }

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={linkClassName}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
};
