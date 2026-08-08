'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const AdminRedirectGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { user, role, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // If user is authenticated as an Admin, enforce that they ONLY access /admin routes
    if (user && role === 'admin') {
      if (!pathname?.startsWith('/admin')) {
        console.log('[AdminRedirectGuard] Admin user attempted to access non-admin route:', pathname, '-> Redirecting to /admin');
        window.location.replace('/admin');
      }
    }
  }, [user, role, isLoading, pathname]);

  // Block rendering non-admin storefront content for admin users while redirect is in progress
  if (!isLoading && user && role === 'admin' && !pathname?.startsWith('/admin')) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#040810] flex items-center justify-center text-slate-900 dark:text-white transition-colors">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Redirecting to Admin Console...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
