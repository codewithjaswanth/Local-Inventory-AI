'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, AlertTriangle, PackageX, DollarSign, TrendingUp } from 'lucide-react';

interface InventoryStatsHeaderProps {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValue: number;
}

export const InventoryStatsHeader: React.FC<InventoryStatsHeaderProps> = ({
  totalProducts,
  lowStockCount,
  outOfStockCount,
  totalValue
}) => {
  const stats = [
    {
      id: 'total-products',
      title: 'Total Inventory Items',
      value: totalProducts.toLocaleString(),
      subtitle: 'Live catalog count',
      icon: Boxes,
      accent: 'emerald',
      badge: 'Active'
    },
    {
      id: 'low-stock',
      title: 'Low Stock Items',
      value: lowStockCount.toString(),
      subtitle: 'Stock <= 10 units',
      icon: AlertTriangle,
      accent: 'amber',
      badge: lowStockCount > 0 ? 'Warning' : 'Good'
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: outOfStockCount.toString(),
      subtitle: '0 units remaining',
      icon: PackageX,
      accent: 'rose',
      badge: outOfStockCount > 0 ? 'Action Needed' : 'Clean'
    },
    {
      id: 'total-value',
      title: 'Total Stock Valuation',
      value: `₹${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Est. retail value',
      icon: DollarSign,
      accent: 'indigo',
      badge: 'Real-time'
    }
  ];

  const accentStyles = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
    rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400',
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`p-4 rounded-3xl bg-gradient-to-b ${accentStyles[item.accent as keyof typeof accentStyles]} border backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-3 relative overflow-hidden`}
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
              <div className="text-[11px] text-slate-400 mt-1 font-medium">{item.subtitle}</div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-pulse" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
