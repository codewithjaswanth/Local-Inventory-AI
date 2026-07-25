'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { MetricCard } from '@/components/ui/MetricCard';
import { AIInsightCard } from '@/components/ui/AIInsightCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { InventoryUpdateForm } from '@/components/forms/InventoryUpdateForm';
import {
  SHOP_PORTAL_METRICS,
  AI_REVIEW_QUEUE,
  RECENT_AI_ACTIVITIES,
  PORTAL_NOTIFICATIONS,
  AiReviewItem
} from '@/data/shopPortalData';
import {
  Sparkles,
  Boxes,
  CheckSquare,
  TrendingUp,
  Search,
  Bell,
  X,
  Menu,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  DollarSign,
  ShoppingBag,
  Mic,
  Camera,
  Bot
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { shopService } from '@/services/shop.service';

export default function ShopManagementDashboard() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <ShopManagementDashboardContent />
    </RoleGuard>
  );
}

function ShopManagementDashboardContent() {
  const { user, profile, isLoading: isAuthLoading } = useAuth();
  const [reviewQueue, setReviewQueue] = useState<AiReviewItem[]>(AI_REVIEW_QUEUE);
  const [notifications, setNotifications] = useState(PORTAL_NOTIFICATIONS);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function verifyShopRegistered() {
      if (!isAuthLoading && user) {
        const shop = await shopService.getShopByOwnerId(user.id);
        if (!shop) {
          window.location.href = '/shop/create';
        }
      }
    }
    verifyShopRegistered();
  }, [user, isAuthLoading]);

  const handleApproveItem = (id: string) => {
    setReviewQueue(reviewQueue.filter((item) => item.id !== id));
  };

  const handleRejectItem = (id: string) => {
    setReviewQueue(reviewQueue.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100 flex overflow-hidden selection:bg-emerald-500/30 font-sans">
      {/* Sidebar Navigation */}
      <ShopPortalSidebar activePath="/dashboard" />

      {/* Main SaaS Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#060B14]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-400">
              <span>Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-bold">Live AI Control Panel</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Vision Bot: 100% Online</span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 relative transition-all"
              >
                <Bell className="w-4.5 h-4.5 text-slate-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Welcome Section Header */}
          <SectionHeader
            title={`Welcome back, ${profile?.name || 'Partner'} — Shopkeeper`}
            description="Real-time multi-modal AI inventory updates, WhatsApp receipt extractions & marketplace sync."
            icon={Sparkles}
            badgeText="SHOPKEEPER PORTAL"
            action={
              <div className="flex items-center space-x-3">
                <a href="/shop/create">
                  <AnimatedButton variant="secondary" size="sm" leftIcon={<PackageCheck className="w-4 h-4" />}>
                    Shop Details
                  </AnimatedButton>
                </a>
              </div>
            }
          />

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Live Stock Items"
              value="348"
              change="+14% this week"
              isPositive={true}
              icon={Boxes}
              badgeText="320 Verified"
              accentColor="emerald"
            />
            <MetricCard
              title="AI Confidence Score"
              value="99.4%"
              change="+2.1% accuracy"
              isPositive={true}
              icon={Bot}
              badgeText="Vision & Voice"
              accentColor="blue"
            />
            <MetricCard
              title="Daily Pickups"
              value="84"
              change="+18% vs yesterday"
              isPositive={true}
              icon={ShoppingBag}
              badgeText="Active Passes"
              accentColor="amber"
            />
            <MetricCard
              title="Monthly Marketplace Revenue"
              value="$12,840"
              change="+24% vs last mo"
              isPositive={true}
              icon={DollarSign}
              badgeText="Live Orders"
              accentColor="purple"
            />
          </div>

          {/* AI Quick Stock & AI Review Queue Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 5 Cols: AI Quick Stock Form */}
            <div className="lg:col-span-5 space-y-4">
              <InventoryUpdateForm />
            </div>

            {/* Right 7 Cols: Pending AI Extractions Review Queue */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-white flex items-center">
                  <CheckSquare className="w-5 h-5 text-amber-400 mr-2" />
                  AI Review Queue ({reviewQueue.length} Pending)
                </h3>
                <a href="/review" className="text-xs font-mono text-emerald-400 hover:underline">
                  View All ({reviewQueue.length}) →
                </a>
              </div>

              {reviewQueue.length === 0 ? (
                <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 text-center space-y-2">
                  <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Review Queue Clean!</h4>
                  <p className="text-xs text-slate-400">All incoming WhatsApp voice notes and OCR photos are verified.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviewQueue.map((item) => (
                    <AIInsightCard
                      key={item.id}
                      title={item.source}
                      source={item.source}
                      timestamp={item.timestamp}
                      confidenceScore={item.confidenceScore}
                      extractedItem={item.extractedItem}
                      suggestedPrice={item.suggestedPrice}
                      suggestedQty={item.suggestedQty}
                      audioSnippet={item.audioSnippet}
                      onApprove={() => handleApproveItem(item.id)}
                      onReject={() => handleRejectItem(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table: Inventory Live Stream */}
          <div className="bg-[#111827] rounded-3xl border border-slate-800/80 shadow-2xl p-6 space-y-5 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-white">Active Produce Stock</h3>
                <p className="text-xs text-slate-400 mt-0.5">Live inventory catalog synchronized with local shoppers.</p>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search stock..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0F172A] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Item Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock Qty</th>
                    <th className="p-3.5">AI Confidence</th>
                    <th className="p-3.5 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: '1', name: 'Organic Hass Avocados', category: 'Fruits', price: '$1.99 / ea', qty: '45 pcs', score: '99.4%', status: 'Live' },
                    { id: '2', name: 'Fresh Vine Tomatoes', category: 'Vegetables', price: '$2.49 / lb', qty: '80 lbs', score: '98.8%', status: 'Live' },
                    { id: '3', name: 'Sweet Honeycrisp Apples', category: 'Fruits', price: '$3.10 / lb', qty: '120 lbs', score: '99.1%', status: 'Live' },
                    { id: '4', name: 'Baby Spinach Bags 200g', category: 'Vegetables', price: '$2.99 / bag', qty: '30 bags', score: '97.5%', status: 'Low Stock' },
                  ]
                    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5 font-bold text-white">{item.name}</td>
                        <td className="p-3.5 font-mono text-slate-400">{item.category}</td>
                        <td className="p-3.5 font-bold text-emerald-400">{item.price}</td>
                        <td className="p-3.5 font-mono text-white">{item.qty}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">{item.score}</td>
                        <td className="p-3.5">
                          <StatusBadge type={item.status === 'Low Stock' ? 'warning' : 'success'} label={item.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
