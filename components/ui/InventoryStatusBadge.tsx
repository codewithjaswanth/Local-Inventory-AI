'use client';

import React from 'react';
import { PackageCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface InventoryStatusBadgeProps {
  inStock: boolean;
  availableQty?: number;
  lastUpdated?: string;
  className?: string;
}

export const InventoryStatusBadge: React.FC<InventoryStatusBadgeProps> = ({
  inStock,
  availableQty,
  lastUpdated,
  className = '',
}) => {
  if (!inStock || (availableQty !== undefined && availableQty <= 0)) {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 ${className}`}>
        <AlertTriangle className="w-3 h-3 mr-1 text-rose-500" />
        <span>Out of Stock</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 ${className}`}>
      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
      <span>{availableQty !== undefined ? `${availableQty} in stock` : 'Verified In Stock'}</span>
    </span>
  );
};
