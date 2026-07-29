'use client';

import React, { useState } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Settings, ShieldCheck, Cpu, Sliders, Bell, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettingsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminSettingsPageContent />
    </RoleGuard>
  );
}

function AdminSettingsPageContent() {
  const [featureFlags, setFeatureFlags] = useState({
    aiVisionOcrV2: true,
    whisperMultiLingual: true,
    vectorPgvectorSearch: true,
    n8nWebhookAutomation: true,
    announcementBanner: false
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast(`Updated feature flag "${key}" to ${next[key] ? 'ENABLED' : 'DISABLED'}`);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30">
      <Navbar />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090F1D] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Settings className="w-6 h-6 text-emerald-400" />
              <span>System Settings & Feature Flags</span>
            </h1>
            <p className="text-xs text-slate-400">
              Configure global platform categories, enable/disable experimental AI features, and publish announcements.
            </p>
          </div>
        </div>

        {/* Feature Flags Configuration Grid */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-6 select-none">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>Global AI & Search Feature Flags</span>
          </h3>

          <div className="space-y-4">
            {[
              {
                key: 'aiVisionOcrV2',
                label: 'Florence-2 Vision OCR v2 Engine',
                description: 'Enables high-resolution produce crate audit and receipt line extraction.'
              },
              {
                key: 'whisperMultiLingual',
                label: 'Whisper Multilingual Voice Parser',
                description: 'Support voice updates in Telugu, Hindi, English, and local dialects.'
              },
              {
                key: 'vectorPgvectorSearch',
                label: 'BAAI BGE 1024-dim Vector Semantic Search',
                description: 'Enables vector similarity search across Supabase pgvector extension.'
              },
              {
                key: 'n8nWebhookAutomation',
                label: 'n8n Webhook Inventory Dispatch',
                description: 'Triggers background n8n workflows upon AI stock confirmation.'
              },
              {
                key: 'announcementBanner',
                label: 'Platform-wide Maintenance Announcement',
                description: 'Displays global notification banner to customers and shopkeepers.'
              }
            ].map((flag) => {
              const isEnabled = featureFlags[flag.key as keyof typeof featureFlags];
              return (
                <div
                  key={flag.key}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-sm">{flag.label}</h4>
                    <p className="text-xs text-slate-400">{flag.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleFlag(flag.key as any)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${
                      isEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
