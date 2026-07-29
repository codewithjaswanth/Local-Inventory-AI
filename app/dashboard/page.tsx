'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { ShopkeeperDashboard } from '@/components/dashboard/ShopkeeperDashboard';

export default function ShopManagementDashboard() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <ShopkeeperDashboard />
    </RoleGuard>
  );
}
