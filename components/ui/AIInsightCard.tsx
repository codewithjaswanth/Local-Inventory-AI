'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Bot, ArrowRight } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  source: string;
  timestamp: string;
  confidenceScore: number | string;
  extractedItem: string;
  suggestedPrice: string;
  suggestedQty: number | string;
  audioSnippet?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  source,
  timestamp,
  confidenceScore,
  extractedItem,
  suggestedPrice,
  suggestedQty,
  audioSnippet,
  onApprove,
  onReject,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-[#091122]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 shadow-md dark:shadow-2xl space-y-4 relative overflow-hidden group"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{source}</h4>
            <span className="text-[10px] text-slate-500">{timestamp}</span>
          </div>
        </div>

        {/* Confidence Score Pill */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/80 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{confidenceScore}% Confidence</span>
        </div>
      </div>

      {/* Voice Snippet Box */}
      {audioSnippet && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-300/90 flex items-center space-x-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
          <span className="truncate">{audioSnippet}</span>
        </div>
      )}

      {/* Extracted Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800/80">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{extractedItem}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Suggested Price: <strong className="text-emerald-600 dark:text-emerald-400">{suggestedPrice}</strong> • Stock Qty: <strong className="text-slate-900 dark:text-white">{suggestedQty}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {onReject && (
            <button
              type="button"
              onClick={onReject}
              className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
            >
              Reject
            </button>
          )}

          {onApprove && (
            <button
              type="button"
              onClick={onApprove}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve & Publish</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
