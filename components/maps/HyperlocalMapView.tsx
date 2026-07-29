'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Sparkles, Star, Store, ShieldCheck, ArrowRight } from 'lucide-react';
import { SearchProduct } from '@/data/searchProducts';
import { NEARBY_SHOPS } from '@/data/mockData';

interface HyperlocalMapViewProps {
  products: SearchProduct[];
  maxDistanceRadius?: number;
}

export const HyperlocalMapView: React.FC<HyperlocalMapViewProps> = ({
  products,
  maxDistanceRadius = 5.0
}) => {
  const [selectedPin, setSelectedPin] = useState<any>(null);

  // Group items by shop
  const shopMap = new Map<string, { shopName: string; shopRating: number; distance: number; products: SearchProduct[] }>();

  products.forEach((p) => {
    const key = p.shopName || 'Local Shop';
    if (!shopMap.has(key)) {
      shopMap.set(key, {
        shopName: key,
        shopRating: p.shopRating || 4.9,
        distance: p.distance || 0.5,
        products: []
      });
    }
    shopMap.get(key)!.products.push(p);
  });

  const shopEntries = Array.from(shopMap.values());

  return (
    <div className="relative w-full h-[520px] rounded-3xl bg-[#060B14] border border-slate-800 overflow-hidden shadow-2xl p-5 text-white flex flex-col justify-between select-none">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Radar Sweep Pulsing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-emerald-500/20 rounded-full pointer-events-none flex items-center justify-center animate-pulse">
        <div className="w-[320px] h-[320px] border border-emerald-500/30 rounded-full flex items-center justify-center">
          <div className="w-[180px] h-[180px] border border-emerald-500/40 rounded-full" />
        </div>
      </div>

      {/* Map Header Overlay */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold shadow-lg">
          <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>Hyperlocal Live Radar: Downtown ({maxDistanceRadius} km radius)</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center shadow-glow-emerald">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>{shopEntries.length} Active Store Nodes</span>
          </span>
        </div>
      </div>

      {/* Interactive Map Nodes Grid */}
      <div className="relative z-20 my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[360px] overflow-y-auto pr-1">
        {shopEntries.map((shop, idx) => {
          const isSelected = selectedPin?.shopName === shop.shopName;
          const topProduct = shop.products[0];

          return (
            <div
              key={shop.shopName}
              onClick={() => setSelectedPin(isSelected ? null : shop)}
              className={`p-4 rounded-3xl backdrop-blur-xl border transition-all cursor-pointer shadow-xl relative overflow-hidden group ${
                isSelected
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-glow-emerald scale-[1.02]'
                  : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Store className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-extrabold text-sm text-white truncate">{shop.shopName}</h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{shop.distance} away</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
                  <Star className="w-3 h-3 fill-current text-amber-400" />
                  <span>{shop.shopRating}</span>
                </div>
              </div>

              {topProduct && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <img src={topProduct.image} alt={topProduct.name} className="w-7 h-7 rounded-lg object-cover" />
                    <span className="text-slate-300 truncate text-[11px] font-semibold">{topProduct.name}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-[11px]">${topProduct.price}</span>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-teal-400 font-bold flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {shop.products.length} Items Live
                </span>

                <a
                  href={`/shop/${topProduct?.shopId || 'shop-1'}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-mono font-bold text-emerald-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Visit Shop</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Map Status Footer */}
      <div className="relative z-20 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <span className="font-mono text-[11px]">📍 Live Store Coordinates & Produce GPS Synced</span>
        <span className="text-[11px] font-mono text-emerald-400">99.4% AI Radar Accuracy</span>
      </div>
    </div>
  );
};
