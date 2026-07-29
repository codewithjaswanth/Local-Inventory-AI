'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />

      {/* Floating Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/15 to-transparent blur-3xl dark:from-emerald-600/25 dark:via-teal-500/20"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl dark:from-indigo-600/20 dark:via-purple-600/15"
      />

      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-amber-500/10 via-emerald-400/10 to-transparent blur-3xl dark:from-emerald-500/15 dark:via-cyan-600/15"
      />

      {/* Top Subtle Light Vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/50 dark:from-[#040810]/80 to-transparent" />
    </div>
  );
};
