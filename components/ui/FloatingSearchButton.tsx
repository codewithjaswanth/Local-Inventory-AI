'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine } from 'lucide-react';

interface FloatingSearchButtonProps {
  onClick: () => void;
}

export const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      onClick={onClick}
      className="fixed bottom-6 right-4 sm:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_10px_35px_rgba(16,185,129,0.5)] hover:shadow-[0_15px_45px_rgba(16,185,129,0.75)] border border-emerald-300/50 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer select-none pointer-events-auto group"
      title="Scan & Quick Search (⌘K)"
      aria-label="Scan & Quick Search"
    >
      {/* Pinging Outer Scanner Pulse */}
      <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />

      {/* Center Scanner Symbol Icon Only */}
      <div className="relative z-10 flex items-center justify-center">
        <ScanLine className="w-6.5 h-6.5 text-slate-950 group-hover:scale-110 transition-transform duration-200" />
      </div>
    </motion.button>
  );
};
