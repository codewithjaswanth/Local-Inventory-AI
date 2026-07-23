'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search } from 'lucide-react';

interface FloatingSearchButtonProps {
  onClick: () => void;
}

export const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-2xl shadow-emerald-500/40 border border-emerald-400/40 flex items-center space-x-2 backdrop-blur-md"
      aria-label="Open AI Search"
    >
      <Sparkles className="w-4 h-4 text-white animate-pulse" />
      <span className="hidden sm:inline">AI Quick Search</span>
      <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-emerald-700/60 rounded text-[10px] font-mono text-emerald-100 border border-emerald-400/30">
        ⌘K
      </kbd>
    </motion.button>
  );
};
