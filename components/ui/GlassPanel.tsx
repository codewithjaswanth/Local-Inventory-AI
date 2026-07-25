'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'emerald' | 'blue' | 'amber' | 'purple';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'emerald',
}) => {
  const glowMap = {
    emerald: 'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
    blue: 'hover:shadow-blue-500/10 hover:border-blue-500/30',
    amber: 'hover:shadow-amber-500/10 hover:border-amber-500/30',
    purple: 'hover:shadow-purple-500/10 hover:border-purple-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { y: -3 } : undefined}
      className={`bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
        hoverEffect ? glowMap[glowColor] : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
