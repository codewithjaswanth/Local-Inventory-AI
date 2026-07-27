'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/services/auth.service';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { role, isLoading: isRoleLoading } = useRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('[ROLEGUARD] Mounted');
    setMounted(true);
  }, []);

  const allowedRolesKey = useMemo(() => allowedRoles.slice().sort().join(','), [allowedRoles]);

  const isLoading = !mounted || isAuthLoading || isRoleLoading;
  const normalizedRole: UserRole | null = role ? (role.toLowerCase().trim() as UserRole) : null;
  const isAuthorized = Boolean(user && normalizedRole && allowedRoles.includes(normalizedRole));

  console.log('[ROLEGUARD] Entered', { mounted, isAuthLoading, isRoleLoading, isLoading, userEmail: user?.email, role: normalizedRole, allowedRolesKey });

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!user) {
      console.warn('[ROLEGUARD] Unauthenticated. Redirecting to /login');
      router.replace('/login');
      return;
    }

    if (!isAuthorized) {
      console.warn(`[ROLEGUARD] Access Denied for role "${normalizedRole}". Redirecting to /unauthorized`);
      router.replace('/unauthorized');
    } else {
      console.log('[ROLEGUARD] Authorized for role:', normalizedRole);
    }
  }, [mounted, isLoading, user, normalizedRole, isAuthorized, allowedRolesKey, router]);

  if (isLoading) {
    console.log('[ROLEGUARD] Loading...');
    return (
      <div className="min-h-screen bg-[#060B14] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Verifying authorization permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
