'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Cpu, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
          <Cpu className="w-10 h-10 animate-spin" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          SYSTEM MAINTENANCE MODE
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Upgrading AI Vision Models
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          We are currently deploying sub-second vector search & WhatsApp OCR engine upgrades. LocalInventory AI will be back online in ~15 minutes.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-3">
          <Button onClick={() => window.location.reload()} variant="primary" size="md" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Check Connection
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
