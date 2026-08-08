'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Store, Plus, Minus } from 'lucide-react';
import { SearchProduct } from '@/data/searchProducts';

import { useCart } from '@/context/CartContext';

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
  const { cartItems, addToCart, updateQuantity } = useCart();
  const existingCartItem = cartItems.find((i) => i.id === product.id);
  const addedQty = existingCartItem ? existingCartItem.quantity : 0;

  const rawUnit = product.unit || 'kg';
  let displayUnit = rawUnit.replace(/^per\s+/i, '').trim();
  if (displayUnit.toLowerCase() === 'each') displayUnit = 'pc';

  const shopHref = `/shop/${product.shopId || 'shop-1'}`;

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

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
        className="group bg-white dark:bg-[#090F1D] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between h-full hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-2xl relative overflow-hidden block cursor-pointer"
      >
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Product Image & Badges Overlay */}
            <div className="relative w-full h-48 sm:h-52 rounded-[22px] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-[#090F1D]/80 pointer-events-none" />

              {/* Top Left Badge: AI Freshness Percentage */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[10px] sm:text-xs font-extrabold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{product.freshnessScore}% Fresh</span>
                </span>
              </div>

              {/* Top Right Badge: Distance */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-100 border border-slate-700/60 text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-md">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{product.distance} km</span>
                </span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-3 space-y-1">
              {/* Product Title: Allowed to wrap up to 2 lines (line-clamp-2) */}
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {product.name}
              </h3>

              {/* Shop Name */}
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 pt-0.5 font-medium">
                <Store className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-slate-500 mr-1" />
                <span className="truncate group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  {product.shopName}
                </span>
              </div>
            </div>
          </div>

          {/* Action Area: Distinct flex container at bottom */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 mt-3 flex items-center justify-between gap-2">
            {/* Price on Left */}
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none flex items-baseline gap-1 tracking-tight">
                <span>₹{typeof product.price === 'number' ? (product.price % 1 === 0 ? product.price : product.price.toFixed(2)) : product.price}</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">/ {displayUnit}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                {product.availableQty > 0 ? `${product.availableQty} in stock` : <span className="text-rose-500">Out of stock</span>}
              </p>
            </div>

            {/* Vibrant Primary Action Button "+ ADD" on Right */}
            {addedQty === 0 ? (
              <button
                type="button"
                onClick={handleAddClick}
                className="h-9 px-3.5 sm:px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all shrink-0 cursor-pointer"
                title="Add to Cart"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ ADD</span>
              </button>
            ) : (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="h-9 px-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 shrink-0"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, addedQty - 1);
                  }}
                  className="p-1 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
                  title="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
                <span className="font-black text-xs min-w-[14px] text-center">{addedQty}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, addedQty + 1);
                  }}
                  className="p-1 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
                  title="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
};
