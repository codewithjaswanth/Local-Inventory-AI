'use client';

import React from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { RECENT_AI_ACTIVITIES } from '@/data/shopPortalData';
import { History, Mic, Camera, FileText, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function InventoryHistoryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/history" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Inventory History Log</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              WHATSAPP AUDIT TRAIL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
              <History className="w-7 h-7 text-emerald-400 mr-2" />
              Automated Inventory History
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Time log of all automated WhatsApp voice notes, shelf photos, and OCR vision extractions.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[11px] font-mono text-slate-400 uppercase bg-slate-800/60 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Update Type</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Items Extracted</th>
                    <th className="p-3">AI Confidence</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {RECENT_AI_ACTIVITIES.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{act.timestamp}</td>
                      <td className="p-3 font-bold text-white">{act.type}</td>
                      <td className="p-3 font-mono text-emerald-300">{act.description}</td>
                      <td className="p-3">{act.itemCount} items</td>
                      <td className="p-3 font-bold text-emerald-400">{act.confidence}%</td>
                      <td className="p-3 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Auto-Synced
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
