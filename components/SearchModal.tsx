'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Sparkles, ArrowRight, ShieldCheck, Star, Store } from 'lucide-react';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { Shop } from '@/types';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShop: (shop: Shop) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectShop }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  // Search Algorithm: 1. Related Products First -> 2. Lowest Distance -> 3. Top Rating
  const getMatchTier = (item: SearchProduct, q: string) => {
    if (!q) return 1;

    const name = item.name.toLowerCase();
    const cat = item.category.toLowerCase();
    const subcat = (item.subcategory || '').toLowerCase();
    const shop = item.shopName.toLowerCase();

    if (name === q) return 100;
    if (name.startsWith(q)) return 80;
    if (name.includes(q)) return 60;
    if (subcat.includes(q)) return 40;
    if (cat.includes(q)) return 30;
    if (shop.includes(q)) return 20;

    return 0; // Non-matching
  };

  const q = query.trim().toLowerCase();

  const filteredItems = SEARCH_PRODUCTS
    .map((item) => ({ item, matchScore: getMatchTier(item, q) }))
    .filter(({ matchScore }) => matchScore > 0)
    .sort((a, b) => {
      // Tier 1: Related Products First (Match Relevance)
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      // Tier 2: Lowest Distance First
      if (a.item.distance !== b.item.distance) {
        return a.item.distance - b.item.distance;
      }
      // Tier 3: Highest Merchant Rating First
      return (b.item.shopRating || 0) - (a.item.shopRating || 0);
    })
    .slice(0, 12)
    .map(({ item }) => item);

  const handleProductClick = (item: SearchProduct) => {
    onClose();
    router.push(`/product/${item.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Search Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#091122] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-800"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center space-x-3">
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. 'fresh milk', 'chicken', 'shampoo', 'biscuits'..."
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium text-base sm:text-lg focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Preset Prompts */}
            <div className="px-6 py-3 bg-white dark:bg-[#060D1A] border-b border-slate-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Try asking:</span>
              {['Milk', 'Chicken Breast', 'Almonds', 'Ketchup', 'Dark Chocolate', 'Face Wash', 'Shampoo'].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setQuery(prompt)}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium whitespace-nowrap transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Results List Header */}
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 px-2">
                <span>{query ? `Nearest & Top-Rated Matches for "${query}"` : '📍 Nearest & Top Rated Products Nearby'}</span>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Distance & Rating Algorithmic Order
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No matching items found nearby</p>
                  <p className="text-xs">Try searching for groceries, produce, personal care, or shop names.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleProductClick(item)}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-emerald-500/5 dark:hover:bg-emerald-950/20 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5 sm:space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                        <img
                          src={item.image || item.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                            {item.name}
                          </h4>
                          {item.verifiedByAi && (
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full flex items-center border border-emerald-500/20">
                              <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-500" />
                              {item.freshnessScore}% Fresh
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2.5 font-medium flex-wrap">
                          <span className="flex items-center text-slate-700 dark:text-slate-300 font-semibold">
                            <Store className="w-3 h-3 text-emerald-500 mr-1" />
                            {item.shopName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                            <MapPin className="w-3 h-3 text-emerald-500 mr-0.5" />
                            {item.distance} km away
                          </span>
                          <span>•</span>
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-0.5" />
                            {item.shopRating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 pl-2">
                      <div className="text-right">
                        <div className="font-extrabold text-slate-900 dark:text-white text-base">₹{item.price}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{item.unit}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-between px-6">
              <span>Sorted by: <strong>Nearest Distance + Merchant Rating</strong></span>
              <span className="text-emerald-500">⚡ Hyperlocal Instant Inventory</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
