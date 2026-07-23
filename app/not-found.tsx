'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-3xl font-black font-mono">
          404
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Produce Page Not Found
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          The hyperlocal page or store listing you are looking for might have been moved or is currently offline.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-3">
          <a href="/">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </a>
          <a href="/search">
            <Button variant="secondary" size="md" leftIcon={<Search className="w-4 h-4" />}>
              Search Marketplace
            </Button>
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
