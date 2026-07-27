'use client';

import React, { useState } from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { AI_REVIEW_QUEUE, AiReviewItem } from '@/data/shopPortalData';
import { CheckSquare, ChevronRight, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AIInsightCard } from '@/components/ui/AIInsightCard';
import { RoleGuard } from '@/components/auth/RoleGuard';

export default function AiReviewPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <AiReviewPageContent />
    </RoleGuard>
  );
}

function AiReviewPageContent() {
  console.log('[PAGE] Rendering AI Review Page');
  const [queue, setQueue] = useState<AiReviewItem[]>(AI_REVIEW_QUEUE);

  const handleApprove = (id: string) => {
    setQueue(queue.filter((i) => i.id !== id));
  };

  const handleReject = (id: string) => {
    setQueue(queue.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100 flex overflow-hidden selection:bg-emerald-500/30">
      <ShopPortalSidebar activePath="/review" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-[#060B14]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">AI Extractions Review Queue</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <SectionHeader
            title={`AI Review Queue (${queue.length})`}
            description="Review and validate WhatsApp voice note transcriptions & OCR scans before publishing to live stock."
            icon={CheckSquare}
            badgeText="APPROVAL QUEUE"
          />

          {queue.length === 0 ? (
            <div className="bg-[#111827] p-12 rounded-3xl border border-slate-800 text-center space-y-3 max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-extrabold text-white">All Extractions Approved!</h3>
              <p className="text-xs text-slate-400">No pending WhatsApp voice or photo extractions in queue.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {queue.map((item) => (
                <AIInsightCard
                  key={item.id}
                  title={item.source}
                  source={item.source}
                  timestamp={item.timestamp}
                  confidenceScore={item.confidenceScore}
                  extractedItem={item.extractedItem}
                  suggestedPrice={item.suggestedPrice}
                  suggestedQty={item.suggestedQty}
                  audioSnippet={item.audioSnippet}
                  onApprove={() => handleApprove(item.id)}
                  onReject={() => handleReject(item.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
