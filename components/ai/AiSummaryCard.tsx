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
  query = 'Fresh Tomatoes',
  shopsCount = 4,
  lowestPrice = '$1.99/lb',
  bestShopName = 'Green Earth Organics',
  highestFreshness = 99,
  confidenceScore = 96,
  aiExplanation,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-6 rounded-3xl border border-emerald-500/30 text-white shadow-xl space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center">
              AI Market Synthesis
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">
              Live Hyperlocal Stock Insight
            </span>
          </div>
        </div>

        <AiConfidenceBadge score={confidenceScore} label="Verified by AI" />
      </div>

      {/* 3 AI Insight Statements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Store Availability</span>
          </div>
          <p className="text-xs font-bold text-white leading-tight">
            {query} available in <strong className="text-emerald-400">{shopsCount} nearby shops</strong> within 0.9 mi.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Lowest Neighborhood Price</span>
          </div>
          <p className="text-xs font-bold text-white leading-tight">
            Lowest price: <strong className="text-amber-400">{lowestPrice}</strong> at {bestShopName}.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Peak Freshness Score</span>
          </div>
          <p className="text-xs font-bold text-white leading-tight">
            Highest freshness score: <strong className="text-emerald-400">{highestFreshness}% AI Verified</strong>.
          </p>
        </div>
      </div>

      {/* AI Explanation Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-start space-x-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">AI Ranking Explanation:</span>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            {aiExplanation || `${bestShopName} ranked #1 because it is 0.3 miles away, updated inventory 12 minutes ago via WhatsApp, with a ${highestFreshness}% AI freshness score and ${confidenceScore}% availability confidence.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
