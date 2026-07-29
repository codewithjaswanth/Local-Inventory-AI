'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Star, ShieldCheck, Store, ArrowRight } from 'lucide-react';
import { SearchProduct } from '@/data/searchProducts';

interface HyperlocalProductCardProps {
  product: SearchProduct;
  viewMode?: 'grid' | 'list';
  isTopMatch?: boolean;
}

export const HyperlocalProductCard: React.FC<HyperlocalProductCardProps> = ({
  product,
  viewMode = 'grid',
  isTopMatch = false,
}) => {
  const isOpen = product.isOpen !== false;
  const rawUnit = product.unit || 'each';
  const cleanUnit = rawUnit.toLowerCase().endsWith('s') && rawUnit.toLowerCase() !== 'glass' ? rawUnit.slice(0, -1) : rawUnit;
  const shopHref = `/shop/${product.shopId || 'shop-1'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <a
        href={shopHref}
        className="group bg-[#090F1D] border border-slate-800/80 rounded-3xl p-3 sm:p-4 flex flex-col justify-between h-full hover:border-emerald-500/40 transition-all shadow-xl relative overflow-hidden block cursor-pointer"
      >
        <div>
          {/* Product Image & Badges Overlay */}
          <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090F1D]/80 via-transparent to-transparent" />

            {/* AI Top Match Badge */}
            {isTopMatch && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 text-slate-950 font-extrabold text-[10px] sm:text-xs shadow-lg flex items-center gap-1 animate-pulse">
                  <span>✨ AI Top Match</span>
                </span>
              </div>
            )}

            {/* Freshness Badge */}
            {!isTopMatch && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-slate-950 text-[10px] font-extrabold flex items-center shadow-md">
                  <Sparkles className="w-2.5 h-2.5 mr-1" />
                  {product.freshnessScore}% Fresh
                </span>
              </div>
            )}

            {/* Status / Verified Badge */}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
              {product.verifiedByAi && (
                <span className="p-1 rounded-full bg-emerald-500/90 text-slate-950 shadow-md" title="AI Verified">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          {/* Product Meta */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-current" />
                {product.shopRating}
              </span>
            </div>

            <h3 className="font-extrabold text-white text-sm sm:text-base truncate group-hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>

            {/* Shop Name & Distance */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
              <span className="truncate max-w-[120px] sm:max-w-[160px] font-medium group-hover:text-slate-200 transition-colors flex items-center gap-1">
                <Store className="w-3 h-3 shrink-0 text-slate-500" />
                <span className="truncate">{product.shopName}</span>
              </span>
              <span className="shrink-0 text-[11px] font-semibold text-slate-400 flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {product.distance} km
              </span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-400 leading-none">
              ₹{typeof product.price === 'number' ? (product.price % 1 === 0 ? product.price : product.price.toFixed(2)) : product.price}
              <span className="text-[11px] font-normal text-slate-400 font-sans"> / {cleanUnit}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
              {product.availableQty} in stock
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-emerald-500 text-slate-400 group-hover:text-slate-950 border border-slate-800 group-hover:border-emerald-400 flex items-center justify-center transition-all shadow-md">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};
