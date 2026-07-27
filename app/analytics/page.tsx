'use client';

import React, { useState } from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { BarChart3, TrendingUp, Search, Eye, Users, ChevronRight } from 'lucide-react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { StatCard } from '@/components/cards/StatCard';

export default function AnalyticsPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <AnalyticsPageContent />
    </RoleGuard>
  );
}

function AnalyticsPageContent() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/analytics" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Market Analytics</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                HYPERLOCAL INTELLIGENCE
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
                <BarChart3 className="w-7 h-7 text-emerald-400 mr-2" />
                Store Analytics & Search Trends
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Deep insights into neighborhood search demand, foot traffic conversion, and product freshness performance.
              </p>
            </div>

            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    timeframe === t ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard title="Store Profile Views" value="4,820" change="+28% this week" iconName="Store" />
            <StatCard title="Search Impressions" value="18,940" change="+34% nearby" iconName="Package" />
            <StatCard title="In-Store Pickups" value="642" change="+19% conversion" iconName="Sparkles" />
            <StatCard title="Freshness Accuracy" value="99.4%" change="Top 1% in city" iconName="Sparkles" />
          </div>

          {/* Analytics Visual Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center">
                <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                Neighborhood Customer Traffic vs Stock Availability
              </h3>

              {/* Bar Visual */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 px-2">
                {[
                  { day: 'Mon', demand: 320, stock: 450 },
                  { day: 'Tue', demand: 410, stock: 520 },
                  { day: 'Wed', demand: 590, stock: 680 },
                  { day: 'Thu', demand: 480, stock: 610 },
                  { day: 'Fri', demand: 720, stock: 850 },
                  { day: 'Sat', demand: 940, stock: 990 },
                  { day: 'Sun', demand: 810, stock: 920 },
                ].map((d, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-48">
                      <div style={{ height: `${(d.demand / 1000) * 100}%` }} className="w-1/2 bg-emerald-500 rounded-t-md" />
                      <div style={{ height: `${(d.stock / 1000) * 100}%` }} className="w-1/2 bg-blue-500/60 rounded-t-md" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Search className="w-5 h-5 text-amber-400 mr-2" />
                Top Local Search Keywords
              </h3>

              <div className="space-y-3 text-xs font-mono">
                {[
                  { term: 'Organic Tomatoes', count: '1,420 searches', share: '32%' },
                  { term: 'Hass Avocados', count: '1,190 searches', share: '27%' },
                  { term: 'Fresh Sourdough Bread', count: '890 searches', share: '20%' },
                  { term: 'Farm Glass Bottle Milk', count: '640 searches', share: '14%' },
                ].map((kw, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">{kw.term}</h4>
                      <span className="text-[10px] text-slate-400">{kw.count}</span>
                    </div>
                    <span className="font-bold text-emerald-400">{kw.share}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
