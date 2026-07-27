'use client';

import { useAuth } from './useAuth';
import { UserRole, normalizeRole } from '@/services/auth.service';

export interface UseRoleReturn {
  role: UserRole | null;
  isCustomer: boolean;
  isShopkeeper: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

export function useRole(): UseRoleReturn {
  const { user, profile, role, isLoading } = useAuth();

  const rawRole = profile?.role || role || user?.user_metadata?.role;
  const activeRole: UserRole | null = user || profile ? normalizeRole(rawRole) : null;

  return {
    role: activeRole,
    isCustomer: activeRole === 'customer',
    isShopkeeper: activeRole === 'shopkeeper',
    isAdmin: activeRole === 'admin',
    isLoading,
  };
}
