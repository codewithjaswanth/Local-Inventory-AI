'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import {
  SHOP_PORTAL_METRICS,
  AI_REVIEW_QUEUE,
  RECENT_AI_ACTIVITIES,
  PORTAL_NOTIFICATIONS,
  AiReviewItem
} from '@/data/shopPortalData';
import {
  PhoneCall,
  Mic,
  Camera,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  Search,
  Bell,
  X,
  Menu,
  ShieldCheck,
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { shopService } from '@/services/shop.service';

export default function ShopManagementDashboard() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [reviewQueue, setReviewQueue] = useState<AiReviewItem[]>(AI_REVIEW_QUEUE);
  const [notifications, setNotifications] = useState(PORTAL_NOTIFICATIONS);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
    setReviewQueue(reviewQueue.filter(item => item.id !== id));
    alert('AI extraction approved and published to live marketplace stock!');
  };

  const handleRejectItem = (id: string) => {
    setReviewQueue(reviewQueue.filter(item => item.id !== id));
    alert('Extraction rejected.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <ShopPortalSidebar activePath="/dashboard" />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Open portal menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <span>Shop Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-100 font-bold">Overview</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* WhatsApp Sync Badge */}
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>WhatsApp Bot Active: +1 (555) 839-2041</span>
            </div>

            {/* Notification Indicator */}
            <div className="relative">
              <button
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Overview Dashboard Workspace */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Top Banner Notice */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  AUTOMATED INVENTORY
                </span>
                <span className="text-xs text-slate-400 font-medium">Daily manual typing not required</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Shop Management Portal
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
                Daily stock updates happen automatically via WhatsApp voice notes & photos. Use this portal for review, analytics, and stock accuracy oversight.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <PhoneCall className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
              <div>
                <span className="text-slate-400 font-mono text-[10px] block">WhatsApp Voice/Photo Bot</span>
                <span className="font-bold text-white font-mono text-xs">+1 (555) 839-2041</span>
              </div>
            </div>
          </div>

          {/* 5 Required Dashboard KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Card 1: Today's AI Updates */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Today's AI Updates</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Mic className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{SHOP_PORTAL_METRICS.todaysAiUpdates}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +8 voice/photos
                </span>
              </div>
            </motion.div>

            {/* Card 2: Products Updated */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Products Updated</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{SHOP_PORTAL_METRICS.productsUpdated}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12% today
                </span>
              </div>
            </motion.div>

            {/* Card 3: Customer Searches */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Customer Searches</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{SHOP_PORTAL_METRICS.customerSearches.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +24% in 2mi
                </span>
              </div>
            </motion.div>

            {/* Card 4: Freshness Score */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Freshness Score</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{SHOP_PORTAL_METRICS.freshnessScore}%</span>
                <span className="text-xs text-amber-400 font-semibold">AI Verified</span>
              </div>
            </motion.div>

            {/* Card 5: Availability Confidence */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Stock Confidence</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{SHOP_PORTAL_METRICS.availabilityConfidence}%</span>
                <span className="text-xs text-emerald-400 font-semibold">Verified</span>
              </div>
            </motion.div>
          </div>

          {/* Main Grid: AI Review Queue + Activity Feed + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: AI Review Queue */}
            <div className="lg:col-span-7 space-y-6">
              {/* Review Queue Widget */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center">
                      <CheckSquare className="w-5 h-5 text-amber-400 mr-2" />
                      AI Extractions Pending Review ({reviewQueue.length})
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Confirm or adjust prices & quantities extracted from WhatsApp voice notes & photos.
                    </p>
                  </div>
                  <a href="/review" className="text-xs font-bold text-emerald-400 hover:underline">
                    Full Queue →
                  </a>
                </div>

                {reviewQueue.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs font-mono">
                    ✓ All AI extractions approved and synced to marketplace!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviewQueue.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            {item.source}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">{item.timestamp}</span>
                        </div>

                        {/* Audio or photo preview */}
                        {item.audioSnippet && (
                          <div className="p-3 rounded-xl bg-slate-900 text-xs font-mono text-slate-200 border border-slate-800">
                            {item.audioSnippet}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <h4 className="font-bold text-white text-sm">{item.extractedItem}</h4>
                            <p className="text-xs text-slate-400">
                              Suggested: <strong className="text-emerald-400">{item.suggestedPrice}</strong> • Qty: {item.suggestedQty} ({item.category})
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleRejectItem(item.id)}
                              className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveItem(item.id)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                            >
                              Approve & Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent AI Activity Feed */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Clock className="w-5 h-5 text-emerald-400 mr-2" />
                    Recent WhatsApp & AI Activity Stream
                  </h3>
                  <a href="/history" className="text-xs font-bold text-emerald-400 hover:underline">
                    View Full History →
                  </a>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {RECENT_AI_ACTIVITIES.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <div>
                          <p className="font-bold text-slate-100">{act.description}</p>
                          <span className="text-[10px] text-slate-400">{act.type} • {act.itemCount} items</span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-[11px]">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Notifications & Quick Actions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Notifications Widget */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Bell className="w-5 h-5 text-amber-400 mr-2" />
                    Portal Notifications
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Real-time</span>
                </div>

                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                        notif.read
                          ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                          : 'bg-slate-950 border-emerald-500/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Linking Quick Info Card */}
              <div className="bg-gradient-to-br from-emerald-950 to-slate-900 p-6 rounded-3xl border border-emerald-800/60 space-y-3 text-white">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <PhoneCall className="w-4 h-4" />
                  <span>How Daily Updates Work</span>
                </div>
                <h4 className="text-base font-extrabold">No app download needed.</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Shopkeepers record 5-second voice memos or snap photo crates directly on WhatsApp. LocalInventory AI processes audio & vision OCR into live marketplace stock instantly.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-emerald-300">
                  <span>Bot Number:</span>
                  <strong className="bg-slate-950 px-2 py-1 rounded border border-emerald-800">+1 (555) 839-2041</strong>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileSidebarOpen(false)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between z-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Shop Portal</span>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
                </div>
                <nav className="space-y-2">
                  {['/dashboard', '/profile', '/history', '/review', '/feedback', '/analytics', '/settings'].map((path) => (
                    <a key={path} href={path} className="block px-4 py-2.5 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 text-xs capitalize">
                      {path.replace('/', '')}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
