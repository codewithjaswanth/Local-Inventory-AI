'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badgeText?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon: Icon,
  badgeText,
  action,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
      <div className="space-y-1">
        {badgeText && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 dark:border-emerald-800/80">
            {badgeText}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center mt-1">
          {Icon && <Icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400 mr-2.5 shrink-0" />}
          <span>{title}</span>
        </h2>
        {description && <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
