'use client';

import React from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { FileSpreadsheet, Table, LineChart, Download, BarChart3 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminReportsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminReportsPageContent />
    </RoleGuard>
  );
}

function AdminReportsPageContent() {
  return (
    <>
      {/* Sticky Header Bar */}
      <AdminHeader currentSection="System Reports" />

      {/* Workspace Canvas */}
      <main className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Main Title Banner */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              <span>Platform System Reports & Exports</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Generate and export comprehensive reports on inventory volume, search query analytics, and platform growth metrics.
            </p>
          </div>

          {/* Report Export Cards - Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Live Inventory Report */}
            <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Live Inventory Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Full breakdown of produce stock, pricing details, and freshness scores across all registered shops.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Exporting Live Inventory Report (CSV)...')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Card 2: Search Analytics Report */}
            <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Table className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Search Analytics Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Neighborhood search query trends, keyword volume, and local store inventory fulfillment rates.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Exporting Search Analytics Report (CSV)...')}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Card 3: Platform Performance Report */}
            <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
                  <LineChart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Platform Performance Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    User growth, shop onboarding velocity, system uptime health, and AI extraction accuracy audit.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Exporting Platform Performance Report (PDF)...')}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-500/30 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </main>
    </>
  );
}
