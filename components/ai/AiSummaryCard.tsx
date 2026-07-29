'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Store, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AiConfidenceBadge } from './AiConfidenceBadge';

interface AiSummaryCardProps {
  query?: string;
  shopsCount?: number;
  lowestPrice?: string;
  bestShopName?: string;
  highestFreshness?: number;
  confidenceScore?: number;
  aiExplanation?: string;
}

export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({
  query = 'Fresh Produce',
  shopsCount = 4,
  lowestPrice = '$1.99/lb',
  bestShopName = 'Green Earth Organics',
  highestFreshness = 99,
  confidenceScore = 96,
  aiExplanation,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-500/25 shadow-sm text-slate-900 dark:text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              AI Market Summary
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {confidenceScore}% Match
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {aiExplanation || `Found ${shopsCount} shops near you with up to ${highestFreshness}% freshness.`}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <Store className="w-3.5 h-3.5 text-emerald-500" />
          <span>{shopsCount} Shops</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <Tag className="w-3.5 h-3.5 text-amber-500" />
          <span>From {lowestPrice}</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{highestFreshness}% Fresh</span>
        </div>
      </div>
    </motion.div>
  );
};
