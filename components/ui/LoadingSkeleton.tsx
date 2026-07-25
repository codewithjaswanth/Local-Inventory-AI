'use client';

import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = 'h-6 w-full' }) => {
  return (
    <div
      className={`bg-slate-800/60 rounded-2xl animate-pulse border border-slate-700/40 ${className}`}
    />
  );
};
