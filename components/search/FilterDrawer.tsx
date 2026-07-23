'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, Sparkles, Star, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { CATEGORIES_LIST } from '@/constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxDistance: number;
  onDistanceChange: (dist: number) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  minFreshness: number;
  onFreshnessChange: (freshness: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  isOpenNowOnly: boolean;
  onOpenNowToggle: (val: boolean) => void;
  isAiVerifiedOnly: boolean;
  onAiVerifiedToggle: (val: boolean) => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  maxDistance,
  onDistanceChange,
  maxPrice,
  onPriceChange,
  minFreshness,
  onFreshnessChange,
  minRating,
  onRatingChange,
  isOpenNowOnly,
  onOpenNowToggle,
  isAiVerifiedOnly,
  onAiVerifiedToggle,
  onResetFilters,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl z-10 flex flex-col justify-between text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-lg">Search Filters</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Category */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider text-[11px]">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Max Distance</span>
                  <span className="text-emerald-500 font-mono">{maxDistance} mi</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5.0}
                  step={0.5}
                  value={maxDistance}
                  onChange={(e) => onDistanceChange(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Max Price</span>
                  <span className="text-emerald-500 font-mono">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={15.0}
                  step={0.5}
                  value={maxPrice}
                  onChange={(e) => onPriceChange(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Freshness Score */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Min Freshness Score</span>
                  <span className="text-emerald-500 font-mono">{minFreshness}%</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={99}
                  step={1}
                  value={minFreshness}
                  onChange={(e) => onFreshnessChange(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider text-[11px]">
                  Store Rating
                </label>
                <div className="flex space-x-2">
                  {[0, 4.0, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => onRatingChange(r)}
                      className={`flex-1 py-2 rounded-xl font-bold border transition-all flex items-center justify-center space-x-1 ${
                        minRating === r
                          ? 'bg-slate-900 text-white dark:bg-emerald-500 border-transparent shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{r === 0 ? 'Any' : `${r}+`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Open Now Only</span>
                  <input
                    type="checkbox"
                    checked={isOpenNowOnly}
                    onChange={(e) => onOpenNowToggle(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                    AI Verified Freshness Only
                  </span>
                  <input
                    type="checkbox"
                    checked={isAiVerifiedOnly}
                    onChange={(e) => onAiVerifiedToggle(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-3">
              <Button onClick={onResetFilters} variant="secondary" size="md" className="flex-1">
                Reset
              </Button>
              <Button onClick={onClose} variant="primary" size="md" className="flex-1">
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
