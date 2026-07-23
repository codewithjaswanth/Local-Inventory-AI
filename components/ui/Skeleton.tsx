'use client';

import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl ${className}`} />
);

export const SkeletonShopCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm">
    <Skeleton className="h-48 w-full rounded-2xl" />
    <div className="space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-10 w-full rounded-xl" />
  </div>
);

export const SkeletonInventoryCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-8 w-24 rounded-xl" />
    </div>
  </div>
);
