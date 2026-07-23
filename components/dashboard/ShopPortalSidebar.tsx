'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Store,
  History,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  Sparkles,
  PhoneCall,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { APP_CONFIG } from '@/constants';

interface ShopPortalSidebarProps {
  activePath: string;
}

export const ShopPortalSidebar: React.FC<ShopPortalSidebarProps> = ({ activePath }) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: Store },
    { name: 'Inventory History', href: '/history', icon: History, badge: 'WhatsApp Log' },
    { name: 'AI Review Queue', href: '/review', icon: CheckSquare, badge: '3 Pending', isAlert: true },
    { name: 'Customer Feedback', href: '/feedback', icon: MessageSquare, badge: '4.9 ★' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0 min-h-screen text-slate-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-tight leading-none">
              Shop Management<span className="text-emerald-500">.AI</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 mt-0.5">
              WHATSAPP AUTOMATED PORTAL
            </span>
          </div>
        </a>
      </div>

      {/* WhatsApp Automated Banner Note */}
      <div className="mx-4 my-4 p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 space-y-1 text-xs">
        <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
          <span className="flex items-center">
            <PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-400 animate-pulse" />
            WhatsApp Live Sync
          </span>
          <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-mono">
            ACTIVE
          </span>
        </div>
        <p className="text-slate-300 text-[11px] leading-tight">
          Send voice notes & photos to <strong>+1 (555) 839-2041</strong> for automated stock updates.
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-1.5 flex-1" aria-label="Portal Navigation">
        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Management & Analytics
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href || activePath.startsWith(`${item.href}/`);

          return (
            <a
              key={item.name}
              href={item.href}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>

              {item.badge && (
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

      {/* Shopkeeper Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
            alt="Green Earth Organics"
            className="w-9 h-9 rounded-xl object-cover border border-emerald-500/40"
          />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-slate-200 truncate max-w-[120px]">Green Earth Organics</span>
            <span className="text-[10px] text-slate-400">Vendor ID #SH-4819</span>
          </div>
        </div>

        <a href="/" className="p-2 rounded-lg text-slate-400 hover:text-rose-400 transition-colors" title="Exit to Marketplace">
          <LogOut className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
