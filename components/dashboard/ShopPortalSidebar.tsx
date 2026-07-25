'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Store,
  Boxes,
  CheckSquare,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  ChevronsUpDown,
  Home,
  Search,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  Package
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { UserRoleBadge } from '../auth/UserRoleBadge';

interface ShopPortalSidebarProps {
  activePath: string;
}

interface SidebarNavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  isAlert?: boolean;
}

export const ShopPortalSidebar: React.FC<ShopPortalSidebarProps> = ({ activePath }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { profile, signOut } = useAuth();
  const { role, isCustomer, isShopkeeper, isAdmin } = useRole();

  let navItems: SidebarNavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', href: '/dashboard#inventory', icon: Boxes },
    { name: 'AI Review Queue', href: '/review', icon: CheckSquare, badge: '3', isAlert: true },
    { name: 'Analytics', href: '/dashboard#analytics', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: Store },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  if (isAdmin) {
    navItems = [
      { name: 'System Overview', href: '/admin', icon: LayoutDashboard },
      { name: 'Registered Shops', href: '/admin#shops', icon: Store, badge: '48 Active' },
      { name: 'Global Stock', href: '/admin#inventory', icon: Package },
      { name: 'AI Extraction Logs', href: '/admin#ai-logs', icon: Cpu, badge: 'Realtime' },
      { name: 'Profile', href: '/profile', icon: Store },
      { name: 'Settings', href: '/settings', icon: Settings },
    ];
  } else if (isCustomer) {
    navItems = [
      { name: 'Marketplace Home', href: '/', icon: Home },
      { name: 'Search Produce', href: '/search', icon: Search },
      { name: 'Nearby Shops', href: '/shops', icon: Store },
      { name: 'My Orders', href: '/orders', icon: ShoppingBag },
      { name: 'Profile', href: '/profile', icon: Store },
      { name: 'Settings', href: '/settings', icon: Settings },
    ];
  }

  const workspaceTitle = isAdmin
    ? 'Admin Control Center'
    : isShopkeeper
    ? 'Shopkeeper Portal'
    : 'Customer Workspace';

  return (
    <aside
      className={`hidden lg:flex flex-col bg-[#060B14] border-r border-slate-800/80 flex-shrink-0 min-h-screen text-slate-300 transition-all duration-300 relative select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-7 z-50 w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Brand & Workspace Header */}
      <div className="p-4 border-b border-slate-800/80">
        <a href="/" className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col truncate"
            >
              <span className="font-extrabold text-sm text-white tracking-tight leading-none">
                Local Inventory<span className="text-emerald-400">.AI</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400/90 mt-1 uppercase tracking-wider font-semibold">
                {workspaceTitle}
              </span>
            </motion.div>
          )}
        </a>
      </div>

      {/* Workspace Switcher & Role Badge */}
      {!collapsed && (
        <div className="mx-3 my-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <UserRoleBadge role={role} />
          </div>
          <span className="text-[10px] font-mono text-slate-400 truncate">
            {profile?.name || 'Active User Session'}
          </span>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="p-3 space-y-1.5 flex-1" aria-label="Sidebar Navigation">
        {!collapsed && (
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Authorised Navigation
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href || (item.href !== '/' && activePath.startsWith(`${item.href}`));

          return (
            <a
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30 shadow-inner'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    item.isAlert
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* User Profile & Sign Out Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
            alt={profile?.name || 'User Profile'}
            className="w-9 h-9 rounded-xl object-cover border border-emerald-500/40 shrink-0"
          />
          {!collapsed && (
            <div className="flex flex-col text-xs truncate">
              <span className="font-bold text-white truncate">{profile?.name || 'Active User'}</span>
              <span className="text-[10px] text-slate-400 font-mono capitalize">{role || 'Customer'}</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={() => signOut()}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
