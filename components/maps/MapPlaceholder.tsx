'use client';

import React from 'react';
import { MapPin, Navigation, Sparkles, ShieldCheck } from 'lucide-react';
import { NEARBY_SHOPS } from '@/data/mockData';

export const MapPlaceholder: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl p-6 text-white flex flex-col justify-between">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Radar Sweep Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-emerald-500/20 rounded-full pointer-events-none flex items-center justify-center animate-pulse">
        <div className="w-64 h-64 border border-emerald-500/30 rounded-full" />
      </div>

      {/* Top Map Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>Hyperlocal Live Radar: Downtown (3.0 km radius)</span>
        </div>

        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center">
          <Sparkles className="w-3 h-3 mr-1" /> 6 Active Shops Pins
        </span>
      </div>

      {/* Pins Layout Visual */}
      <div className="relative z-10 grid grid-cols-3 gap-4 my-auto">
        {NEARBY_SHOPS.slice(0, 3).map((shop, idx) => (
          <div
            key={shop.id}
            className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 backdrop-blur-md hover:border-emerald-500/50 transition-all cursor-pointer shadow-md space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="truncate max-w-[100px]">{shop.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono">{shop.distance}</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">📍 {shop.address}</p>
            <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
              {shop.freshnessScore}% Fresh
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Map Note */}
      <div className="relative z-10 text-center text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        Interactive Map Discovery Engine — Real-time GPS & Store Restock Nodes
      </div>
    </div>
  );
};
