'use client';

import React from 'react';

interface StatusBadgeProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  label: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type = 'success',
  label,
  className = '',
}) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
    info: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
  };

  const dotColors = {
    success: 'bg-emerald-500 dark:bg-emerald-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
    error: 'bg-rose-500 dark:bg-rose-400',
    info: 'bg-blue-500 dark:bg-blue-400',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-semibold shadow-xs ${styles[type]} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[type]} animate-pulse`} />
      <span>{label}</span>
    </span>
  );
};
