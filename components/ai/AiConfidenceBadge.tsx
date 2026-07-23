'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

interface AiConfidenceBadgeProps {
  score?: number; // e.g. 96
  label?: string; // e.g. "Verified by AI"
  variant?: 'emerald' | 'amber' | 'blue' | 'dark';
  className?: string;
}

export const AiConfidenceBadge: React.FC<AiConfidenceBadgeProps> = ({
  score = 96,
  label = 'Verified by AI',
  variant = 'emerald',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'amber':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'blue':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'dark':
        return 'bg-slate-900 text-emerald-400 border-slate-700';
      case 'emerald':
      default:
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${getVariantStyles()} ${className}`}
    >
      <Sparkles className="w-3 h-3 mr-1 text-emerald-500 flex-shrink-0 animate-pulse" />
      <span>{label}</span>
      {score && (
        <>
          <span className="mx-1 text-slate-400">•</span>
          <span className="font-extrabold">{score}% Confidence</span>
        </>
      )}
    </span>
  );
};
