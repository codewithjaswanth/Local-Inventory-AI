'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { ShopOwnershipGuard } from '@/components/auth/ShopOwnershipGuard';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { InventoryManager } from '@/components/inventory/InventoryManager';
import { useAuth } from '@/hooks/useAuth';
import { useShopkeeperShops } from '@/hooks/useShopkeeperShops';

export default function InventoryPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <InventoryPageContent />
    </RoleGuard>
  );
}

function InventoryPageContent() {
  const { profile } = useAuth();
  const { selectedShop } = useShopkeeperShops();
  const activeShopId = selectedShop?.id || 'shop-1';

  return (
    <ShopOwnershipGuard targetShopId={activeShopId}>
      <div className="min-h-screen bg-[#040810] text-slate-100 flex overflow-hidden font-sans selection:bg-emerald-500/30">
        {/* Desktop Sidebar */}
        <ShopPortalSidebar activePath="/inventory" />

        {/* Main Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <DashboardNavbar
            shopName={selectedShop?.name || (profile?.name ? `${profile.name}'s Fresh Market` : 'GreenLeaf Fresh Market')}
            freshnessScore={98.6}
          />

          {/* Inventory Body Workspace */}
          <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
            <InventoryManager shopId={activeShopId} />
          </main>
        </div>
      </div>
    </ShopOwnershipGuard>
  );
}
