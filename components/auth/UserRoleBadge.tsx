'use client';

import React from 'react';
import { UserRole } from '@/services/auth.service';
import { User, Store, ShieldCheck } from 'lucide-react';

interface UserRoleBadgeProps {
  role: UserRole | null;
  showWorkspaceTitle?: boolean;
  className?: string;
}

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({
  role = 'customer',
  showWorkspaceTitle = false,
  className = '',
}) => {
  const roleConfig = {
    customer: {
      label: 'Customer',
      workspace: 'Customer Workspace',
      badgeStyle: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
      icon: User,
    },
    shopkeeper: {
      label: 'Shopkeeper',
      workspace: 'Shopkeeper Portal',
      badgeStyle: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      icon: Store,
    },
    admin: {
      label: 'Administrator',
      workspace: 'Admin Control Center',
      badgeStyle: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
      icon: ShieldCheck,
    },
  };

  const currentConfig = roleConfig[role || 'customer'];
  const Icon = currentConfig.icon;

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <span
        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-bold shadow-sm ${currentConfig.badgeStyle}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{currentConfig.label}</span>
      </span>

      {showWorkspaceTitle && (
        <span className="text-xs font-semibold text-slate-400 font-mono hidden sm:inline-block">
          ({currentConfig.workspace})
        </span>
      )}
    </div>
  );
};
