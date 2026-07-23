'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Clock, ShieldCheck, Store, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface SuccessCardProps {
  productsCount: number;
  freshnessScore: number;
  confidenceScore: number;
  timeProcessedMs: number;
  onReset: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  productsCount,
  freshnessScore,
  confidenceScore,
  timeProcessedMs,
  onReset,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-emerald-500/40 text-white max-w-xl mx-auto shadow-2xl space-y-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          STEP 6: INVENTORY LIVE
        </span>
        <h2 className="text-3xl font-extrabold text-white pt-2">
          Inventory Updated Successfully!
        </h2>
        <p className="text-xs text-slate-400">
          Extracted items have been published to your store catalog and are now searchable by local shoppers.
        </p>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">Products</span>
          <span className="text-xl font-bold text-white">{productsCount}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">Freshness</span>
          <span className="text-xl font-bold text-emerald-400">{freshnessScore}%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">Confidence</span>
          <span className="text-xl font-bold text-emerald-400">{confidenceScore}%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">Latency</span>
          <span className="text-xl font-bold text-white">{timeProcessedMs}ms</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="/shop/shop-1" className="w-full sm:w-auto">
          <Button variant="secondary" size="md" className="w-full" leftIcon={<Store className="w-4 h-4" />}>
            View Live Store Catalog
          </Button>
        </a>

        <Button onClick={onReset} variant="primary" size="md" className="w-full sm:w-auto" leftIcon={<RefreshCw className="w-4 h-4" />}>
          Update Another Stock Item
        </Button>
      </div>
    </motion.div>
  );
};
