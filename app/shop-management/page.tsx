'use client';

import React, { useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useRouter } from 'next/navigation';

export default function ShopManagementRedirectPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <ShopManagementContent />
    </RoleGuard>
  );
}

function ShopManagementContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#040810] text-emerald-400 flex items-center justify-center font-mono text-xs">
      Redirecting to Shop Management Dashboard...
    </div>
  );
}
