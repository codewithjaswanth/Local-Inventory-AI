'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      {/* Background ambient lighting */}
      <div className="absolute w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
          <ShieldAlert className="w-8 h-8 text-rose-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your current account role does not have authorization to view this page or perform this action.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-1 font-mono text-slate-400">
          <p className="text-slate-300 font-bold">🔒 Authorization Policy Enforced</p>
          <p className="text-[11px] text-slate-500">If you believe this is an error, please log out and sign in with the appropriate account.</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </a>
          <a
            href="/login"
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Switch Account</span>
          </a>
        </div>
      </div>
    </main>
  );
}
