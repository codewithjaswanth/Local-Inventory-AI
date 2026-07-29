'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  PackageCheck,
  Zap,
  BarChart2,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AIInsightsPanel: React.FC = () => {
  const restockingSuggestions = [
    { id: '1', name: 'Organic Hass Avocados', currentStock: 4, recommended: 50, priority: 'High', price: '₹159' },
    { id: '2', name: 'Baby Spinach Bags 200g', currentStock: 8, recommended: 35, priority: 'Medium', price: '₹239' },
    { id: '3', name: 'Alphonso Mangoes', currentStock: 0, recommended: 60, priority: 'Critical', price: '₹349' }
  ];

  const fastSellingProducts = [
    { id: '1', name: 'Fresh Vine Tomatoes', unitsSoldToday: 142, revenueToday: '₹28,280', trend: '+34%' },
    { id: '2', name: 'Sweet Honeycrisp Apples', unitsSoldToday: 98, revenueToday: '₹24,300', trend: '+19%' },
    { id: '3', name: 'Organic Bananas Bunch', unitsSoldToday: 85, revenueToday: '₹13,530', trend: '+25%' }
  ];

  const freshnessAlerts = [
    { id: '1', batch: 'Spinach Batch #409', issue: 'Nearing optimal shelf freshness (48h remaining)', score: 88, status: 'Inspect Soon' },
    { id: '2', batch: 'Strawberries Tray #12', issue: 'AI Vision detected 2 bruised berries', score: 82, status: 'Discounting Suggested' }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">AI Insights & Predictive Engine</h2>
            <p className="text-xs text-slate-400">Real-time demand forecasting and shelf quality monitoring.</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
          99.4% Precision
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Restocking Suggestions (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#090F1D] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <PackageCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Restock Suggestions</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Auto-calculated</span>
          </div>

          <div className="space-y-3">
            {restockingSuggestions.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between">
                  <span className="font-extrabold text-white text-xs">{item.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.priority === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.priority === 'High'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Current: <strong className="text-white font-bold">{item.currentStock} units</strong></span>
                  <span>Order +{item.recommended} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast-Selling Products (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#090F1D] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-teal-400" />
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Fast-Selling Items</h3>
            </div>
            <span className="text-[10px] text-teal-400 font-bold">+28% Velocity</span>
          </div>

          <div className="space-y-3">
            {fastSellingProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-white text-xs">{p.name}</h4>
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">
                    {p.unitsSoldToday} sold today ({p.revenueToday})
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold">
                  {p.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Freshness Alerts & Weekly Trend Summary (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Freshness Alerts */}
          <div className="p-5 rounded-3xl bg-[#090F1D] border border-slate-800/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Freshness Alerts</h3>
              </div>
              <span className="text-[10px] text-amber-400 font-bold">2 Warnings</span>
            </div>

            <div className="space-y-2.5">
              {freshnessAlerts.map((fa) => (
                <div
                  key={fa.id}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{fa.batch}</span>
                    <span className="text-amber-400 font-bold">{fa.score}% Fresh</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{fa.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Trend Summary Widget */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Weekly Trend Summary
              </span>
              <h4 className="text-sm font-extrabold text-white">Stock Turnover: 94.2%</h4>
              <p className="text-[11px] text-slate-400 font-medium">Waste reduced by 42% using AI Vision validation.</p>
            </div>
            <BarChart2 className="w-8 h-8 text-emerald-400 shrink-0 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
