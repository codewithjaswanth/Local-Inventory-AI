'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  AlertTriangle,
  PackageX,
  Users,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  accent: 'emerald' | 'amber' | 'rose' | 'teal' | 'indigo' | 'purple';
  badgeText: string;
}

interface DashboardMetricCardsProps {
  totalProducts?: number;
  lowStockCount?: number;
  outOfStockCount?: number;
  todayVisitors?: number;
  freshnessScore?: number;
  accuracyScore?: number;
}

export const DashboardMetricCards: React.FC<DashboardMetricCardsProps> = ({
  totalProducts = 348,
  lowStockCount = 12,
  outOfStockCount = 3,
  todayVisitors = 1420,
  freshnessScore = 98.6,
  accuracyScore = 99.4
}) => {
  const metrics: MetricData[] = [
    {
      id: 'total-products',
      title: 'Total Products',
      value: totalProducts.toLocaleString(),
      change: '+14% this week',
      isPositive: true,
      icon: Boxes,
      accent: 'emerald',
      badgeText: '320 Verified'
    },
    {
      id: 'low-stock',
      title: 'Low Stock Items',
      value: lowStockCount.toString(),
      change: '-4 since yesterday',
      isPositive: false,
      icon: AlertTriangle,
      accent: 'amber',
      badgeText: 'Action Needed'
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: outOfStockCount.toString(),
      change: 'Needs restock',
      isPositive: false,
      icon: PackageX,
      accent: 'rose',
      badgeText: 'Critical'
    },
    {
      id: 'today-visitors',
      title: "Today's Visitors",
      value: todayVisitors.toLocaleString(),
      change: '+28% vs average',
      isPositive: true,
      icon: Users,
      accent: 'teal',
      badgeText: 'Live Stream'
    },
    {
      id: 'freshness-score',
      title: 'AI Freshness Score',
      value: `${freshnessScore}%`,
      change: '+2.1% quality',
      isPositive: true,
      icon: Sparkles,
      accent: 'indigo',
      badgeText: 'Vision AI'
    },
    {
      id: 'inventory-accuracy',
      title: 'Inventory Accuracy',
      value: `${accuracyScore}%`,
      change: '99% SLA match',
      isPositive: true,
      icon: ShieldCheck,
      accent: 'purple',
      badgeText: 'Synced'
    }
  ];

  const accentStyles = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
    rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400',
    teal: 'from-teal-500/20 to-teal-500/5 border-teal-500/30 text-teal-400',
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`p-4 rounded-3xl bg-gradient-to-b ${accentStyles[item.accent]} border backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {item.title}
              </span>
              <div className="p-2 rounded-2xl bg-slate-900/80 border border-slate-800 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">{item.value}</div>
              <div className="flex items-center space-x-1.5 mt-1">
                {item.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span className={`text-[11px] font-medium ${item.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {item.change}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.badgeText}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-ping" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
