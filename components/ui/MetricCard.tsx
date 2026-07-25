'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  badgeText?: string;
  sparklineData?: number[];
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  badgeText,
  sparklineData = [35, 42, 38, 55, 62, 70, 85],
  accentColor = 'emerald',
}) => {
  const accentStyles = {
    emerald: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      stroke: '#10B981',
      fill: 'rgba(16, 185, 129, 0.15)',
    },
    blue: {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      stroke: '#3B82F6',
      fill: 'rgba(59, 130, 246, 0.15)',
    },
    amber: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      stroke: '#F59E0B',
      fill: 'rgba(245, 158, 11, 0.15)',
    },
    purple: {
      bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      stroke: '#A855F7',
      fill: 'rgba(168, 85, 247, 0.15)',
    },
  };

  const currentAccent = accentStyles[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl overflow-hidden hover:border-slate-700/80 transition-all group"
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/20 rounded-full blur-2xl pointer-events-none group-hover:bg-slate-700/30 transition-all" />

      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-lg ${currentAccent.bg}`}>
          <Icon className="w-5.5 h-5.5" />
        </div>

        {badgeText && (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${currentAccent.badge}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase font-mono">{title}</span>
        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-extrabold text-white tracking-tight font-sans">{value}</h3>
          
          {change && (
            <div className={`flex items-center space-x-1 text-xs font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini Sparkline SVG Chart */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-500">Live 24h Trend</span>
        <svg className="w-24 h-7" viewBox="0 0 100 30" fill="none">
          <path
            d="M 0,25 Q 15,15 30,20 T 60,10 T 100,5 L 100,30 L 0,30 Z"
            fill={currentAccent.fill}
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            d="M 0,25 Q 15,15 30,20 T 60,10 T 100,5"
            stroke={currentAccent.stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
};
