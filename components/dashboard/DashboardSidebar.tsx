'use client';

import React from 'react';
import { Sparkles, LayoutDashboard, Store, Package, BarChart3, Cpu, Settings, LogOut } from 'lucide-react';
import { APP_CONFIG } from '@/constants';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  items?: SidebarItem[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onTabChange,
  items,
}) => {
  const defaultItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Overview', href: '#', icon: LayoutDashboard },
    { id: 'shops', label: 'Shops Management', href: '#', icon: Store, badge: '142' },
    { id: 'inventory', label: 'Live Stock', href: '#', icon: Package, badge: '6.8k' },
    { id: 'analytics', label: 'Analytics', href: '#', icon: BarChart3 },
    { id: 'ai-logs', label: 'AI Processing Logs', href: '#', icon: Cpu, badge: 'LIVE' },
    { id: 'settings', label: 'Settings', href: '#', icon: Settings },
  ];

  const sidebarItems = items || defaultItems;

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0 min-h-screen text-slate-300">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-tight leading-none">
              Local Inventory<span className="text-emerald-500">.AI</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 mt-0.5">
              MANAGEMENT PORTAL v{APP_CONFIG.version}
            </span>
          </div>
        </a>
      </div>

      {/* Nav List */}
      <nav className="p-4 space-y-1.5 flex-1" aria-label="Dashboard Navigation">
        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Management Controls
        </div>

        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    item.badge === 'LIVE'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border border-emerald-500/40"
          />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-slate-200">Alex Rivera</span>
            <span className="text-[10px] text-slate-400">Shopkeeper Admin</span>
          </div>
        </div>

        <a href="/" className="p-2 rounded-lg text-slate-400 hover:text-rose-400 transition-colors" title="Log Out">
          <LogOut className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
