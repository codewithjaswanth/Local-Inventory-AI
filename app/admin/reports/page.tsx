'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BarChart3, FileText, Download, TrendingUp, Search, Boxes } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminReportsPageContent />
    </RoleGuard>
  );
}

function AdminReportsPageContent() {
  return (
    <main className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090F1D] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-emerald-400" />
              <span>Platform System Reports & Exports</span>
            </h1>
            <p className="text-xs text-slate-400">
              Generate and export comprehensive reports on inventory volume, search query analytics, and platform growth metrics.
            </p>
          </div>
        </div>

        {/* Report Export Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#090F1D] border border-slate-800 space-y-4 shadow-xl">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Live Inventory Report</h3>
              <p className="text-xs text-slate-400 mt-1">Full breakdown of produce stock across all registered shops.</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Exporting Inventory Report (CSV)...')}
              className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-xs font-bold text-emerald-400 flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#090F1D] border border-slate-800 space-y-4 shadow-xl">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 w-fit">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Search Analytics Report</h3>
              <p className="text-xs text-slate-400 mt-1">Neighborhood search volume trends and fulfillment rates.</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Exporting Search Analytics (CSV)...')}
              className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs font-bold text-purple-400 flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#090F1D] border border-slate-800 space-y-4 shadow-xl">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Platform Performance Report</h3>
              <p className="text-xs text-slate-400 mt-1">User growth, shop onboarding velocity, and AI accuracy audit.</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Exporting Performance Report (PDF)...')}
              className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-xs font-bold text-teal-400 flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
