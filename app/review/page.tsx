'use client';

import React, { useState } from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { AI_REVIEW_QUEUE, AiReviewItem } from '@/data/shopPortalData';
import { CheckSquare, Mic, Camera, CheckCircle2, XCircle, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AiReviewPage() {
  const [queue, setQueue] = useState<AiReviewItem[]>(AI_REVIEW_QUEUE);

  const handleApprove = (id: string) => {
    setQueue(queue.filter(i => i.id !== id));
    alert('Extraction approved & published!');
  };

  const handleReject = (id: string) => {
    setQueue(queue.filter(i => i.id !== id));
    alert('Extraction rejected.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/review" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">AI Extractions Review Queue</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
              APPROVAL QUEUE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
              <CheckSquare className="w-7 h-7 text-amber-400 mr-2" />
              AI Review Queue ({queue.length})
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Review and validate WhatsApp voice note transcriptions & OCR scans before publishing to live stock.
            </p>
          </div>

          <div className="space-y-4">
            {queue.map((item) => (
              <div key={item.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                    {item.source}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.timestamp}</span>
                </div>

                {item.audioSnippet && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 text-xs font-mono text-slate-200 border border-slate-800">
                    {item.audioSnippet}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.extractedItem}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Category: <strong className="text-slate-200">{item.category}</strong> • Price: <strong className="text-emerald-400">{item.suggestedPrice}</strong> • Qty: {item.suggestedQty} • Confidence: <span className="text-emerald-400 font-mono">{item.confidenceScore}%</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button onClick={() => handleReject(item.id)} variant="outline" size="sm">
                      Reject
                    </Button>
                    <Button onClick={() => handleApprove(item.id)} variant="primary" size="sm" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                      Approve & Publish
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
