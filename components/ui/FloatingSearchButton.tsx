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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.5 }}
      onClick={onClick}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.55)] border border-emerald-300/40 flex items-center justify-center backdrop-blur-md transition-shadow duration-300 cursor-pointer select-none pointer-events-auto active:scale-95 group"
      title="Quick Search"
      aria-label="Quick Search"
    >
      {/* Glow ring */}
      <span className="absolute inset-0 rounded-full animate-gentle-glow pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center">
        <ScanLine className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 group-hover:scale-110 transition-transform duration-200" />
      </div>
    </motion.button>
  );
};
