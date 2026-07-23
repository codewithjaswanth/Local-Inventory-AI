'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <WifiOff className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          You Are Currently Offline
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Please check your network connection to query live store inventory and AI freshness scores.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-3">
          <Button onClick={() => window.location.reload()} variant="primary" size="md" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry Connection
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
