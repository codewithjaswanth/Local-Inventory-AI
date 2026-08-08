'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Package,
  Cpu,
  TrendingUp,
  Users,
  FileText,
  ShieldCheck,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toNominativeCase } from '@/utils';

export function AdminSidebar() {
  return (
    <React.Suspense fallback={<aside className="hidden lg:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060D1A] min-h-screen" />}>
      <AdminSidebarContent />
    </React.Suspense>
  );
}

function AdminSidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('tab');
  const { profile, signOut } = useAuth();
  const adminName = toNominativeCase(profile?.name);

  const navSections = [
    {
      title: 'Platform Overview',
      items: [
        { href: '/admin', label: 'System Overview', icon: LayoutDashboard },
        { href: '/admin?tab=keywords', label: 'Search Trends', icon: TrendingUp },
      ],
    },
    {
      title: 'Management',
      items: [
        { href: '/admin/shops', label: 'Registered Shops', icon: Store },
        { href: '/admin?tab=inventory', label: 'Global Stock Catalog', icon: Package },
        { href: '/admin/users', label: 'User Management', icon: Users },
      ],
    },
    {
      title: 'System & Configuration',
      items: [
        { href: '/admin/ai-monitor', label: 'AI Extraction Stream', icon: Cpu, badge: 'Live' },
        { href: '/admin/reports', label: 'Reports & Exports', icon: FileText },
        { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-[#060D1A] border-r border-slate-200 dark:border-slate-800/80 flex-shrink-0 min-h-screen select-none transition-colors">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800/80">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight leading-none">
              Inventra.AI
            </span>
            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold mt-1">
              Admin Console
            </span>
          </div>
        </Link>
      </div>

      {/* Unified Navigation List */}
      <nav className="p-4 space-y-6 flex-1 overflow-y-auto" aria-label="Admin Navigation">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              let isActive = false;

              if (item.href.includes('?tab=')) {
                const targetTab = item.href.split('?tab=')[1];
                isActive = pathname === '/admin' && currentTab === targetTab;
              } else if (item.href === '/admin') {
                isActive = pathname === '/admin' && (!currentTab || currentTab === 'dashboard');
              } else {
                isActive = pathname === item.href;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 font-medium text-xs transition-all relative ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 font-extrabold border-l-4 border-purple-500 rounded-r-2xl rounded-l-sm shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-2xl'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Admin Profile & Logout Button */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-xs">
              {adminName.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex flex-col text-xs truncate max-w-[110px]">
              <span className="font-extrabold text-slate-900 dark:text-white truncate">{adminName}</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Super Admin</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOut()}
            className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer shrink-0"
            title="Sign Out of Admin Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
