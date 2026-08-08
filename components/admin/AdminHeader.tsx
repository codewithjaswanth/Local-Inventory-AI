'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Settings, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { toNominativeCase } from '@/utils';

interface AdminHeaderProps {
  currentSection?: string;
}

export function AdminHeader({ currentSection }: AdminHeaderProps) {
  const { profile, signOut } = useAuth();
  const adminName = toNominativeCase(profile?.name);

  return (
    <header className="h-16 bg-white/90 dark:bg-[#040810]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Left: Brand Logo & Breadcrumb Navigation */}
      <div className="flex items-center space-x-3 text-xs font-semibold">
        <Link
          href="/admin"
          className="flex items-center space-x-2 text-slate-900 dark:text-white font-extrabold hover:text-purple-600 dark:hover:text-purple-400 transition-colors shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm tracking-tight">Inventra.AI</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
            Admin
          </span>
        </Link>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

        <Link
          href="/admin"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Dashboard
        </Link>

        {currentSection && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold truncate">
              {currentSection}
            </span>
          </>
        )}
      </div>

      {/* Right: Actions, Settings, Super Admin Profile & Sign Out */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status: 100% Operational</span>
        </div>

        {/* Super Admin Badge Pill */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-extrabold">
          <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
            {adminName.slice(0, 1).toUpperCase()}
          </div>
          <span>{adminName}</span>
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 font-mono">
            Super Admin
          </span>
        </div>

        <Link
          href="/admin/settings"
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Platform Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        <ThemeToggle />

        <button
          type="button"
          onClick={() => signOut()}
          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Sign Out of Admin Console"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
