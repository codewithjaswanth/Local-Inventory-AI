'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/services/auth.service';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { role, isLoading: isRoleLoading } = useRole();
  const [mounted, setMounted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = !mounted || ((isAuthLoading || isRoleLoading) && !timedOut);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        console.warn('[RoleGuard] Unauthenticated access. Redirecting to /login');
        window.location.href = '/login';
        return;
      }

      if (role && !allowedRoles.includes(role)) {
        console.warn(`[RoleGuard] Access Denied: User role "${role}" is not in allowed roles:`, allowedRoles);
        window.location.href = '/unauthorized';
      }
    }
  }, [user, role, isLoading, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060B14] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Verifying authorization permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};
