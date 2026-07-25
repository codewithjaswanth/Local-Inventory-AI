'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-lg font-extrabold text-white">{title}</h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>

      {action && <div className="pt-2">{action}</div>}

      {!action && actionLabel && onAction && (
        <div className="pt-2">
          <AnimatedButton onClick={onAction} variant="primary" size="sm">
            {actionLabel}
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};
