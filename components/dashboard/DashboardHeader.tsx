'use client';

import React from 'react';
import { Menu, ChevronRight, Plus, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  onActionClick?: () => void;
  actionLabel?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
  onActionClick,
  actionLabel = 'Add New Item',
}) => {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 text-white">
      <div className="flex items-center space-x-4">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
          <span>Portal</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-100">{title}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Sync Active</span>
        </div>

        {onActionClick && (
          <Button onClick={onActionClick} variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            {actionLabel}
          </Button>
        )}
      </div>
    </header>
  );
};
