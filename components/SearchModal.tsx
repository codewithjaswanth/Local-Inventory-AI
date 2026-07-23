'use client';

import React, { useState } from 'react';
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

  if (!isOpen) return null;

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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Search Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-3">
            <Search className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. 'organic ripe avocados', 'fresh sourdough', 'milk'..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-base sm:text-lg focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
            >
              ESC
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Try asking:</span>
            {['Organic Tomatoes', 'Fresh Croissants', 'Hass Avocados', 'Greek Yogurt'].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setQuery(prompt)}
                className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium whitespace-nowrap transition-colors"
              >
                ✨ {prompt}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>{query ? `Results for "${query}"` : 'Popular Fresh Live Items'}</span>
              <span className="flex items-center text-emerald-600 font-medium lowercase">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                AI semantic search active
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">No matching items found nearby</p>
                <p className="text-xs">Try searching for vegetables, fruits, dairy, or shop names.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={`${item.shop.id}-${item.id}`}
                  onClick={() => {
                    onClose();
                    onSelectShop(item.shop);
                  }}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 bg-white hover:bg-emerald-50/30 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/60">
                      <img src={item.shop.image} alt={item.shop.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center">
                          <ShieldCheck className="w-3 h-3 mr-0.5" />
                          {item.freshnessScore}% Fresh
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
                        <span className="font-medium text-slate-700">{item.shop.name}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 text-slate-400 mr-0.5" />
                          {item.shop.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900">{item.price}</div>
                      <div className="text-[11px] text-slate-400">{item.unit}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            Powered by Local Inventory AI Semantic Vision Engine
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
