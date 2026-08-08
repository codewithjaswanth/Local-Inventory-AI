'use client';

import React from 'react';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <div className="flex items-center space-x-4">
          <Logo size="sm" />
          <span className="text-zinc-500" suppressHydrationWarning>
            © {new Date().getFullYear()} Inventra.AI. All rights reserved.
          </span>
        </div>

        <div className="flex items-center space-x-6 text-zinc-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>API Status</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
