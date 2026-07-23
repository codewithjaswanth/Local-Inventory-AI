'use client';

import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface FreshnessBadgeProps {
  score: number; // e.g. 98
  className?: string;
  showIcon?: boolean;
}

export const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({
  score,
  className = '',
  showIcon = true,
}) => {
  const getColors = (s: number) => {
    if (s >= 95) {
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    }
    if (s >= 85) {
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
    }
    return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30';
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${getColors(
        score
      )} ${className}`}
    >
      {showIcon && <Sparkles className="w-3 h-3 mr-1 text-emerald-500 flex-shrink-0 animate-pulse" />}
      <span>{score}% AI Fresh</span>
    </span>
  );
};
