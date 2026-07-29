'use client';

import React, { useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useRouter } from 'next/navigation';

export default function AiInventoryRedirectPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <AiInventoryContent />
    </RoleGuard>
  );
}

function AiInventoryContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ai-update');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#040810] text-emerald-400 flex items-center justify-center font-mono text-xs">
      Redirecting to AI Inventory Assistant...
    </div>
  );
}
