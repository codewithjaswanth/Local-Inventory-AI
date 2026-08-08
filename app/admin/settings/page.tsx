'use client';

import React, { useState } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  Settings,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Sliders,
  Store,
  MessageSquare,
  Save,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettingsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminSettingsPageContent />
    </RoleGuard>
  );
}

function AdminSettingsPageContent() {
  // Operational Settings State
  const [settings, setSettings] = useState({
    defaultSearchRadius: '5', // 5 km
    inventoryTtlHours: 24, // 24 hours
    minFreshnessThreshold: 40, // 40%
    strictOcrValidation: true,
    autoApproveShops: false,
    whatsappLowStockAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Platform operational settings saved successfully!');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 min-h-screen">
      <AdminHeader currentSection="Platform Settings" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
          >
            <CheckCircle className="w-4 h-4 text-slate-950 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#090F1D] p-6 rounded-3xl border border-slate-200 dark:border-slate-800/90 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Platform Settings</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage live operational rules, search radius thresholds, AI quality controls, and merchant onboarding policies.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        {/* 1. Marketplace Operations Section */}
        <div className="bg-white dark:bg-[#090F1D] rounded-3xl border border-slate-200 dark:border-slate-800/90 p-6 shadow-xl space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Marketplace Operations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure search distance boundaries and live product expiration lifecycles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Search Radius */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-500" />
                  <span>Default Search Radius</span>
                </label>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {settings.defaultSearchRadius} km
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Initial geographical radius used to discover local neighborhood shops for new buyers.
              </p>
              <select
                value={settings.defaultSearchRadius}
                onChange={(e) => setSettings({ ...settings, defaultSearchRadius: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="2">2 km (Ultra-local)</option>
                <option value="5">5 km (Standard Neighborhood - Recommended)</option>
                <option value="10">10 km (City Wide)</option>
                <option value="15">15 km (Extended Region)</option>
                <option value="25">25 km (Metro Area)</option>
              </select>
            </div>

            {/* Inventory Expiry TTL */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Inventory Expiry (TTL)</span>
                </label>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {settings.inventoryTtlHours} hours
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hours an item stays live before being marked &quot;stale&quot; if the shopkeeper doesn&apos;t re-confirm stock.
              </p>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={1}
                  max={168}
                  value={settings.inventoryTtlHours}
                  onChange={(e) => setSettings({ ...settings, inventoryTtlHours: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-3.5 pr-14 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors font-mono"
                />
                <span className="absolute right-3 text-xs font-bold text-slate-400">hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. AI & Quality Controls Section */}
        <div className="bg-white dark:bg-[#090F1D] rounded-3xl border border-slate-200 dark:border-slate-800/90 p-6 shadow-xl space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                AI & Quality Controls
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Set minimum freshness standards and strictness for AI vision & voice extraction pipelines.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Minimum AI Freshness Threshold Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                    Minimum AI Freshness Threshold
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Items scoring below this threshold are automatically hidden from customer search results.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 shrink-0">
                  {settings.minFreshnessThreshold}%
                </span>
              </div>

              <div className="space-y-1 pt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={settings.minFreshnessThreshold}
                  onChange={(e) => setSettings({ ...settings, minFreshnessThreshold: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
                />
                <div className="flex justify-between text-[10px] font-mono font-semibold text-slate-400">
                  <span>0% (Permissive)</span>
                  <span>40% (Recommended)</span>
                  <span>100% (Strict)</span>
                </div>
              </div>
            </div>

            {/* Strict OCR Validation Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                  Strict OCR & Vision Validation
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Require manual admin review if the AI confidence score for a WhatsApp receipt or shelf photo falls below 85%.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, strictOcrValidation: !settings.strictOcrValidation })}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 cursor-pointer ${
                  settings.strictOcrValidation ? 'bg-purple-600 dark:bg-purple-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.strictOcrValidation ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Shopkeeper Onboarding & Communications Section */}
        <div className="bg-white dark:bg-[#090F1D] rounded-3xl border border-slate-200 dark:border-slate-800/90 p-6 shadow-xl space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Shopkeeper Onboarding & Alerts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Control vendor registration workflows and automated WhatsApp low-stock triggers.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Auto-Approve New Shops Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                  Auto-Approve New Shop Registrations
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Automatically approve new shopkeeper registrations immediately versus routing them to the &quot;Pending Review&quot; queue.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, autoApproveShops: !settings.autoApproveShops })}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 cursor-pointer ${
                  settings.autoApproveShops ? 'bg-purple-600 dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.autoApproveShops ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* WhatsApp Low-Stock Alerts Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp Low-Stock Alerts</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Send automated WhatsApp reminder messages to shopkeepers when their popular items run out of stock.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, whatsappLowStockAlerts: !settings.whatsappLowStockAlerts })}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 cursor-pointer ${
                  settings.whatsappLowStockAlerts ? 'bg-purple-600 dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.whatsappLowStockAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
