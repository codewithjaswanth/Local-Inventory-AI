'use client';

import React from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { CUSTOMER_FEEDBACK_DATA } from '@/data/shopPortalData';
import { MessageSquare, Star, ShieldCheck, Award, ChevronRight } from 'lucide-react';

export default function CustomerFeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/feedback" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Customer Verified Feedback</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              COMMUNITY STOCK VERIFICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
              <MessageSquare className="w-7 h-7 text-emerald-400 mr-2" />
              Customer Stock Accuracy Feedback
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Feedback submitted by shoppers who visited Green Earth Organics and confirmed live stock accuracy.
            </p>
          </div>

          <div className="space-y-4">
            {CUSTOMER_FEEDBACK_DATA.map((fb) => (
              <div key={fb.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={fb.avatar} alt={fb.author} className="w-10 h-10 rounded-full object-cover border border-emerald-500" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{fb.author}</h4>
                      <p className="text-[11px] text-slate-400">Verified item: <strong className="text-emerald-400">{fb.itemVerified}</strong> • {fb.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-xs font-bold text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{fb.rating}.0 Rating</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm italic bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  "{fb.comment}"
                </p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-400 font-semibold flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" /> Stock Accuracy Confirmed: {fb.accuracyScore}%
                  </span>
                  <span className="text-amber-400 font-mono flex items-center">
                    <Award className="w-3.5 h-3.5 mr-1" /> +{fb.earnedTokens} FreshTokens Awarded
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
