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
  const { role, isCustomer, isShopkeeper, isAdmin } = useRole();

  let navItems: NavItem[] = [];

  if (isAdmin) {
    navItems = [
      { name: 'Dashboard', href: '/admin' },
      { name: 'Users', href: '/admin/users' },
      { name: 'Shops', href: '/admin/shops' },
      { name: 'AI Monitor', href: '/admin/ai-monitor' },
      { name: 'Reports', href: '/admin/reports' },
      { name: 'Audit Logs', href: '/admin/audit-logs' },
    ];
  } else if (isShopkeeper) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'Search', href: '/search' },
      { name: 'Dashboard', href: '/dashboard' },
    ];
  } else if (isCustomer) {
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'AI Search', href: '/search' },
      { name: 'Marketplace', href: '/marketplace' },
    ];
  } else {
    // Unauthenticated user
    navItems = [
      { name: 'Home', href: '/' },
      { name: 'AI Search', href: '/search' },
      { name: 'Marketplace', href: '/marketplace' },
    ];
  }

  return (
    <nav className={className}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`${linkClassName} whitespace-nowrap transition-all ${
              isActive
                ? 'bg-white dark:bg-slate-700/90 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <span className="whitespace-nowrap">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );
};
