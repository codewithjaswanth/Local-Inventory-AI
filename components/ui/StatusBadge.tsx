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
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 dot-bg-emerald-400',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 dot-bg-amber-400',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/30 dot-bg-rose-400',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/30 dot-bg-blue-400',
  };

  const dotColors = {
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-rose-400',
    info: 'bg-blue-400',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold shadow-xs ${styles[type]} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[type]} animate-pulse`} />
      <span>{label}</span>
    </span>
  );
};
