'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Mic, Image as ImageIcon, Sparkles, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import { inventoryHistoryService, InventoryHistoryRecord } from '@/services/inventoryHistory.service';

interface AiHistoryLogProps {
  shopId?: string;
}

export const AiHistoryLog: React.FC<AiHistoryLogProps> = ({ shopId = 'shop-1' }) => {
  const [history, setHistory] = useState<InventoryHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    const records = await inventoryHistoryService.getHistoryByShopId(shopId);
    setHistory(records);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [shopId]);

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 p-6 shadow-2xl space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
            <History className="w-5 h-5 text-emerald-400" />
            <span>AI Operation History Log</span>
            <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {history.length} Saved
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every voice memo and crate scan is logged to the Supabase <code className="text-emerald-400 font-semibold">inventory_history</code> table.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHistory}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Refresh History Logs"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2 py-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 font-medium">
          No AI operations logged yet. Perform a voice or image update above.
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {history.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2 font-medium">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase text-[10px]">
                    {record.inputType.replace('_', ' + ')}
                  </span>
                  <span className="text-slate-400 text-[11px]">{record.provider}</span>
                  <span className="text-slate-500 text-[10px]">
                    {record.createdAt ? new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </span>
                </div>

                {record.rawTranscript && (
                  <p className="text-slate-300 font-sans text-xs italic">
                    "{record.rawTranscript}"
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 shrink-0 font-medium">
                <div className="text-right">
                  <div className="font-bold text-white">
                    {record.confirmedItemsCount} Items Updated
                  </div>
                  <div className="text-[10px] text-teal-400">
                    {record.overallConfidence}% Confidence
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
