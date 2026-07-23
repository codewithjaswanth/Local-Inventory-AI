'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Store, Package, Sparkles, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  iconName: string;
  isPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  iconName,
  isPositive = true,
}) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Store':
        return <Store className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Package':
        return <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'AlertTriangle':
      default:
        return <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400" />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            {renderIcon(iconName)}
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
          <span className={`text-xs font-semibold flex items-center ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            {change}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
