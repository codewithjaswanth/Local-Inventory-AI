'use client';

import React, { useState } from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { Settings, PhoneCall, Bell, Shield, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ShopSettingsPage() {
  const [autoApprove99Score, setAutoApprove99Score] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [endOfDayDiscountRule, setEndOfDayDiscountRule] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Portal settings saved!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/settings" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Portal Settings</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto w-full">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              AUTOMATION RULES & WEBHOOKS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
              <Settings className="w-7 h-7 text-emerald-400 mr-2" />
              Portal & WhatsApp Rules
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Configure automated pricing rules, WhatsApp receipt webhooks, and AI vision threshold settings.
            </p>
          </div>

          <form onSubmit={handleSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-3">
                <Sparkles className="w-5 h-5 text-emerald-400 mr-2" />
                AI Vision & Dictation Rules
              </h3>

              <label className="flex items-center justify-between cursor-pointer p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-white">Auto-Publish Over 99% Confidence Extractions</h4>
                  <p className="text-xs text-slate-400">Bypass review queue if WhatsApp voice dictation confidence exceeds 99%.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoApprove99Score}
                  onChange={(e) => setAutoApprove99Score(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-white">WhatsApp Confirmation Receipts</h4>
                  <p className="text-xs text-slate-400">Receive instant WhatsApp reply receipt whenever an audio note is processed.</p>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappNotifications}
                  onChange={(e) => setWhatsappNotifications(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-white">Automated Evening Freshness Discounting</h4>
                  <p className="text-xs text-slate-400">Automatically apply 10% discount to daily produce after 7:00 PM.</p>
                </div>
                <input
                  type="checkbox"
                  checked={endOfDayDiscountRule}
                  onChange={(e) => setEndOfDayDiscountRule(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded"
                />
              </label>
            </div>

            <Button type="submit" variant="primary" size="md" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
              Save Automation Settings
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
