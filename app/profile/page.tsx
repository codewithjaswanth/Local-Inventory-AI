'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { DETAILED_SHOPS } from '@/data/mockData';
import { Store, Camera, Save, ChevronRight, CheckCircle2, Phone, MapPin, Clock } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ShopProfilePage() {
  return (
    <ProtectedRoute>
      <ShopProfilePageContent />
    </ProtectedRoute>
  );
}

function ShopProfilePageContent() {
  const shop = DETAILED_SHOPS[0];

  const [shopName, setShopName] = useState(shop.name);
  const [address, setAddress] = useState(shop.address);
  const [phone, setPhone] = useState(shop.phone);
  const [openTime, setOpenTime] = useState(shop.openTime);
  const [description, setDescription] = useState(shop.description);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B14] text-slate-900 dark:text-slate-100 flex overflow-hidden selection:bg-emerald-500/30 transition-colors">
      <ShopPortalSidebar activePath="/profile" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white/90 dark:bg-[#060B14]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-bold">Shop Profile & WhatsApp Metadata</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto w-full">
          <SectionHeader
            title="Shop Profile Settings"
            description="Manage your marketplace listing details, cover photos, and linked WhatsApp voice bot number."
            icon={Store}
            badgeText="MARKETPLACE METADATA"
          />

          <form onSubmit={handleSave} className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6 shadow-xl dark:shadow-2xl transition-colors">
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2 font-mono"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Shop Profile & WhatsApp Sync details updated successfully!</span>
              </motion.div>
            )}

            {/* Cover Photo Banner */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={shop.coverImage || shop.image} alt={shopName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <button
                type="button"
                className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs border border-slate-700 flex items-center space-x-2 backdrop-blur-md transition-all shadow-lg"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Change Cover Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Physical Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Store Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            <AnimatedButton type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </AnimatedButton>
          </form>
        </main>
      </div>
    </div>
  );
}
