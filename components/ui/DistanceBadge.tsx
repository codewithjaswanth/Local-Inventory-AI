'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface DistanceBadgeProps {
  distance: number | string;
  className?: string;
}

export const DistanceBadge: React.FC<DistanceBadgeProps> = ({ distance, className = '' }) => {
  const formatted = typeof distance === 'number' ? `${distance.toFixed(1)} mi away` : distance;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 ${className}`}
    >
      <MapPin className="w-3 h-3 text-emerald-500 mr-1 flex-shrink-0" />
      <span>{formatted}</span>
    </span>
  );
};
