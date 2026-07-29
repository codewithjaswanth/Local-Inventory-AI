'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { DashboardMetricCards } from '@/components/dashboard/DashboardMetricCards';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { InventoryManager } from '@/components/inventory/InventoryManager';
import { InventoryItemModel } from '@/services/inventory.service';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';
import { AddProductModal } from '@/components/dashboard/modals/AddProductModal';
import { VoiceUpdateModal } from '@/components/dashboard/modals/VoiceUpdateModal';
import { AIScanModal } from '@/components/dashboard/modals/AIScanModal';
import {
  Sparkles,
  CheckCircle2,
  X,
  Menu,
  FileText,
  MessageSquare,
  BarChart3,
  Boxes,
  LayoutDashboard,
  Settings,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useShopkeeperShops } from '@/hooks/useShopkeeperShops';

export const ShopkeeperDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { selectedShop } = useShopkeeperShops();
  const activeShopId = selectedShop?.id || 'shop-1';
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<InventoryItemModel[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryItemModel | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveProduct = (newProd: any) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? { ...item, ...newProd, updated_at: new Date().toISOString() }
            : item
        )
      );
      showToast(`Updated "${newProd.name}" in live catalog!`);
    } else {
      const createdItem: InventoryItemModel = {
        id: Date.now().toString(),
        ...newProd,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProducts((prev) => [createdItem, ...prev]);
      showToast(`Added "${newProd.name}" to live catalog!`);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Removed "${target?.name || 'item'}" from catalog.`);
  };

  const handleVoiceSuccess = (extractedText: string) => {
    showToast(`AI Speech Parsed: "${extractedText}"`);
  };

  const handleScanComplete = (resultText: string) => {
    showToast(`Vision Audit Completed: "${resultText}"`);
  };

  const handleGenerateReport = () => {
    showToast('Inventory Report CSV generated and downloaded!');
  };

  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length;
  const outOfStockCount = products.filter((p) => p.status === 'Out of Stock').length;

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Sidebar Navigation */}
      <ShopPortalSidebar activePath={`/dashboard`} />

      {/* Main SaaS Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <DashboardNavbar
          shopName={profile?.name ? `${profile.name}'s Fresh Market` : 'GreenLeaf Fresh Market'}
          freshnessScore={98.6}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        {/* Toast Notification Notification Pill */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Body Container */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
          {/* Sub Navigation Bar Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3 overflow-x-auto select-none">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'inventory', label: 'Produce Catalog', icon: Boxes },
              { id: 'insights', label: 'AI Analytics & Forecasts', icon: BarChart3 },
              { id: 'reviews', label: 'Customer Reviews', icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Overview & Default View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metric Cards Grid */}
              <DashboardMetricCards
                totalProducts={products.length}
                lowStockCount={lowStockCount}
                outOfStockCount={outOfStockCount}
                todayVisitors={1420}
                freshnessScore={98.6}
                accuracyScore={99.4}
              />

              {/* Quick Action Section */}
              <QuickActionsSection
                onAddProduct={() => {
                  setEditingProduct(null);
                  setIsAddModalOpen(true);
                }}
                onVoiceUpdate={() => setIsVoiceModalOpen(true)}
                onUploadImage={() => setIsScanModalOpen(true)}
                onAIScan={() => setIsScanModalOpen(true)}
                onGenerateReport={handleGenerateReport}
              />

              {/* AI Insights & Predictive Engine */}
              <AIInsightsPanel />

              {/* Live Inventory Catalog Table */}
              <InventoryManager shopId={activeShopId} />
            </div>
          )}

          {/* Tab 2: Inventory Catalog View */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <InventoryManager shopId={activeShopId} />
            </div>
          )}

          {/* Tab 3: Insights & Analytics View */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <AIInsightsPanel />
            </div>
          )}

          {/* Tab 4: Customer Reviews View */}
          {activeTab === 'reviews' && (
            <div className="p-8 rounded-3xl bg-[#090F1D] border border-slate-800 text-center space-y-3">
              <Star className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-base font-extrabold text-white">4.9 / 5.0 Customer Freshness Rating</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Local buyers consistently rate your produce freshness at 99%. All 48 recent customer reviews verified via AI location passes.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveProduct={handleSaveProduct}
        editingProduct={editingProduct}
      />

      <VoiceUpdateModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onVoiceSuccess={handleVoiceSuccess}
      />

      <AIScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </div>
  );
};
