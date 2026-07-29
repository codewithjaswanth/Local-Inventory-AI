'use client';

import React from 'react';
import { UserRole } from '@/services/auth.service';
import { User, Store, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

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
      badgeStyle: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/15',
      icon: User,
      iconColor: 'text-blue-500',
    },
    shopkeeper: {
      label: 'Shopkeeper',
      workspace: 'Shopkeeper Portal',
      badgeStyle: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15',
      icon: Store,
      iconColor: 'text-emerald-500',
    },
    admin: {
      label: 'Administrator',
      workspace: 'Admin Control Center',
      badgeStyle: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15',
      icon: ShieldCheck,
      iconColor: 'text-indigo-500',
    },
  };

  const currentConfig = roleConfig[role || 'customer'];
  const Icon = currentConfig.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center space-x-2 ${className}`}
    >
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-tight shadow-2xs backdrop-blur-md transition-all cursor-default ${currentConfig.badgeStyle}`}
      >
        <Icon className={`w-3.5 h-3.5 ${currentConfig.iconColor}`} />
        <span>{currentConfig.label}</span>
      </span>

      {showWorkspaceTitle && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block">
          ({currentConfig.workspace})
        </span>
      )}
    </motion.div>
  );
};
