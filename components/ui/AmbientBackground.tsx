'use client';

import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-15" />

      {/* GPU-accelerated CSS-only ambient orbs (no JS re-renders) */}
      <div
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/15 via-teal-400/10 to-transparent blur-3xl dark:from-emerald-600/20 dark:via-teal-500/15 animate-ambient-1"
      />

      <div
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-indigo-500/10 via-purple-500/8 to-transparent blur-3xl dark:from-indigo-600/15 dark:via-purple-600/10 animate-ambient-2"
      />

      <div
        className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-amber-500/8 via-emerald-400/8 to-transparent blur-3xl dark:from-emerald-500/12 dark:via-cyan-600/10 animate-ambient-3"
      />

      {/* Top light vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/50 dark:from-[#040810]/80 to-transparent" />
    </div>
  );
};
