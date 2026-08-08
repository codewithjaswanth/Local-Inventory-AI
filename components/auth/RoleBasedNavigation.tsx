'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { isShopkeeper, isAdmin } = useRole();

  let navItems: NavItem[] = [];

  if (isAdmin) {
    navItems = [
      { name: 'Admin Console', href: '/admin' },
    ];
  } else if (isShopkeeper) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Categories', href: '/categories' },
      { name: 'Shops', href: '/shops' },
      { name: 'Shop Portal', href: '/dashboard' },
    ];
  } else {
    // Unauthenticated user or Customer
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Categories', href: '/categories' },
      { name: 'Shops', href: '/shops' },
    ];
  }

  return (
    <nav className={className}>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`${linkClassName} whitespace-nowrap transition-all ${
              isActive
                ? 'bg-purple-600 text-white font-extrabold shadow-sm shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <span className="whitespace-nowrap">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );
};
