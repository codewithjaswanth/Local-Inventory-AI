'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { Settings, Sparkles, CheckCircle2, ChevronRight, Bell, Shield, PhoneCall } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function ShopSettingsPage() {
  return (
    <ProtectedRoute>
      <ShopSettingsPageContent />
    </ProtectedRoute>
  );
}

function ShopSettingsPageContent() {
  const [autoApprove99Score, setAutoApprove99Score] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [endOfDayDiscountRule, setEndOfDayDiscountRule] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B14] text-slate-900 dark:text-slate-100 flex overflow-hidden selection:bg-emerald-500/30 transition-colors">
      <ShopPortalSidebar activePath="/settings" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white/90 dark:bg-[#060B14]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-bold">Portal & Automation Settings</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto w-full">
          <SectionHeader
            title="Portal & WhatsApp Rules"
            description="Configure automated pricing rules, WhatsApp receipt webhooks, and AI vision threshold settings."
            icon={Settings}
            badgeText="AUTOMATION ENGINE"
          />

          <form onSubmit={handleSave} className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6 shadow-xl dark:shadow-2xl transition-colors">
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2 font-mono"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Portal settings saved successfully!</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-2" />
                AI Vision & Voice Dictation Automation
              </h3>

              {/* Setting Card 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Auto-Publish &gt;99% Confidence Extractions</h4>
                    <StatusBadge type="success" label="Active Rule" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bypass review queue if WhatsApp voice dictation confidence exceeds 99%.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoApprove99Score}
                  onChange={(e) => setAutoApprove99Score(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Setting Card 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp Confirmation Receipts</h4>
                    <StatusBadge type="info" label="Webhook Sync" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receive instant WhatsApp reply receipt whenever an audio note is processed.</p>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappNotifications}
                  onChange={(e) => setWhatsappNotifications(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Setting Card 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Automated Evening Freshness Discounting</h4>
                    <StatusBadge type="warning" label="7:00 PM Trigger" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Automatically apply 10% discount to daily produce after 7:00 PM.</p>
                </div>
                <input
                  type="checkbox"
                  checked={endOfDayDiscountRule}
                  onChange={(e) => setEndOfDayDiscountRule(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer shrink-0"
                />
              </div>
            </div>

            <AnimatedButton type="submit" variant="primary" size="md" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
              Save Automation Rules
            </AnimatedButton>
          </form>
        </main>
      </div>
    </div>
  );
}
