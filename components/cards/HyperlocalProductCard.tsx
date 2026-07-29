'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Star, ShieldCheck, Clock, ArrowRight, Store } from 'lucide-react';
import { SearchProduct } from '@/data/searchProducts';
import { GetDirectionsButton } from '../navigation/GetDirectionsButton';

interface HyperlocalProductCardProps {
  product: SearchProduct;
  viewMode?: 'grid' | 'list';
}

export const HyperlocalProductCard: React.FC<HyperlocalProductCardProps> = ({
  product,
  viewMode = 'grid'
}) => {
  const isListView = viewMode === 'list';
  const isOpen = product.isOpen !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <div className="group bg-[#090F1D] border border-slate-800/80 rounded-3xl p-4 sm:p-5 flex flex-col justify-between h-full hover:border-slate-700 transition-all shadow-xl relative overflow-hidden">
        <div>
          {/* Product Image & Badges */}
          <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090F1D] via-transparent to-transparent opacity-80" />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-slate-950 text-[10px] font-extrabold flex items-center shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                {product.freshnessScore}% Fresh
              </span>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold backdrop-blur-md ${
                  isOpen
                    ? 'bg-slate-900/80 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-700'
                }`}
              >
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-bold">
                {product.category}
              </span>
              {product.verifiedByAi && (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> AI Verified
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-white text-base truncate group-hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>

            {/* Shop Information Bar */}
            <a
              href={`/shop/${product.shopId || 'shop-1'}`}
              className="flex items-center justify-between pt-1 group/shop"
            >
              <div className="flex items-center space-x-1.5 truncate">
                <Store className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover/shop:text-emerald-400 transition-colors" />
                <span className="text-xs font-bold text-slate-300 truncate group-hover/shop:text-white transition-colors">
                  {product.shopName}
                </span>
              </div>

              <div className="flex items-center space-x-2 shrink-0 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-current mr-0.5" />
                  {product.shopRating}
                </span>
                <span>•</span>
                <span className="flex items-center text-slate-400">
                  <MapPin className="w-3 h-3 mr-0.5 text-emerald-400" />
                  {product.distance} km
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Price & Stock & Action Footer */}
        <div className="pt-3.5 border-t border-slate-800/80 mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-extrabold text-emerald-400 leading-none">
              ₹{typeof product.price === 'number' ? (product.price % 1 === 0 ? product.price : product.price.toFixed(2)) : product.price}
              <span className="text-xs font-normal text-slate-400 font-sans"> / {product.unit}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Stock: <strong className="text-white font-bold">{product.availableQty} {product.unit}s</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`/shop/${product.shopId || 'shop-1'}`}
              className="px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center space-x-1 transition-all"
            >
              <span>View Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <GetDirectionsButton
              shopName={product.shopName}
              shopAddress={product.shopAddress}
              nearbyLandmark={product.nearbyLandmark}
              shopLatitude={product.shopLatitude}
              shopLongitude={product.shopLongitude}
              distanceKm={product.distance}
              variant="compact"
              label="Directions"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
