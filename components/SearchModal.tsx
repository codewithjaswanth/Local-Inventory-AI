'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { NEARBY_SHOPS } from '@/data/mockData';
import { Shop } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShop: (shop: Shop) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectShop }) => {
  const [query, setQuery] = useState('');

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

  // Flatten all inventory items with their shop info
  const allItems = NEARBY_SHOPS.flatMap(shop =>
    shop.verifiedItems.map(item => ({
      ...item,
      shop
    }))
  );

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 4)
    : allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.shop.name.toLowerCase().includes(query.toLowerCase())
      );

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
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
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
                placeholder="Search e.g. 'fresh tomatoes', 'organic milk', 'whole wheat bread'..."
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
              {['Basmati Rice', 'Desi Ghee', 'Full Cream Milk', 'Toor Dal', 'Sunflower Oil', 'Fresh Tomatoes'].map((prompt) => (
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

            {/* Results List */}
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 px-2">
                <span>{query ? `Results for "${query}"` : 'Popular Live Items'}</span>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  AI Semantic Search Active
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No matching items found nearby</p>
                  <p className="text-xs">Try searching for produce, groceries, bakery, or shop names.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={`${item.shop.id}-${item.id}`}
                    onClick={() => {
                      onClose();
                      onSelectShop(item.shop);
                    }}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5 sm:space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                        <img
                          src={item.image || item.shop?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full flex items-center border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-500" />
                            {item.freshnessScore}% Fresh
                          </span>
                        </div>

                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2 font-medium">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{item.shop.name}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 text-slate-400 mr-0.5" />
                            {item.shop.distance}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                      <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-white text-base">{item.price}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.unit}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              Powered by Inventra Semantic Vision Engine
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
