'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Map,
  Sparkles,
  DollarSign,
  MapPin,
  RotateCcw,
  X,
  Check
} from 'lucide-react';

interface HyperlocalSearchFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxDistance: number;
  onMaxDistanceChange: (dist: number) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  minFreshness: number;
  onMinFreshnessChange: (freshness: number) => void;
  isOpenNowOnly: boolean;
  onIsOpenNowOnlyChange: (val: boolean) => void;
  isAiVerifiedOnly: boolean;
  onIsAiVerifiedOnlyChange: (val: boolean) => void;
  sortBy: string;
  onSortByChange: (sort: 'relevance' | 'distance' | 'price-asc' | 'price-desc' | 'freshness' | 'rating') => void;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const HyperlocalSearchFilter: React.FC<HyperlocalSearchFilterProps> = ({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  maxDistance,
  onMaxDistanceChange,
  maxPrice,
  onMaxPriceChange,
  minFreshness,
  onMinFreshnessChange,
  isOpenNowOnly,
  onIsOpenNowOnlyChange,
  isAiVerifiedOnly,
  onIsAiVerifiedOnlyChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalResultsCount
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Groceries'];

  const activeFiltersCount =
    (isOpenNowOnly ? 1 : 0) +
    (isAiVerifiedOnly ? 1 : 0) +
    (maxPrice < 500 ? 1 : 0) +
    (maxDistance < 15 ? 1 : 0) +
    (minFreshness > 85 ? 1 : 0);

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 shadow-2xl p-4 sm:p-5 space-y-4 select-none">
      {/* Top Search Input, Sort Dropdown & Filter Drawer Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search fresh produce or shops..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
          />
        </div>

        {/* Action Controls Group */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Filter Drawer Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all border ${
              activeFiltersCount > 0
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort By Select Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-2xl px-3 py-2.5 outline-none focus:border-emerald-500 cursor-pointer appearance-none pr-7 transition-colors"
            >
              <option value="relevance">✨ Best Match</option>
              <option value="distance">📍 Nearest First</option>
              <option value="price-asc">💰 Price: Low to High</option>
              <option value="price-desc">🏷️ Price: High to Low</option>
              <option value="freshness">🍃 Highest Freshness</option>
              <option value="rating">⭐ Top Rated</option>
            </select>
            <div className="absolute right-2.5 top-3 pointer-events-none text-slate-400 text-[10px]">▼</div>
          </div>

          {/* View Mode Switcher */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-xl text-xs transition-all ${
                viewMode === 'grid' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-xl text-xs transition-all ${
                viewMode === 'list' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar (Horizontal Scroll) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 select-none [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900/90 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Slide-Out Filter Drawer Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
            />

            {/* Modal Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed inset-x-4 top-20 max-w-lg mx-auto bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl z-50 p-6 space-y-6 text-white overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-extrabold text-lg">Filter Produce</h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Max Price Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Max Price Range</span>
                    </span>
                    <span className="text-emerald-400 text-sm font-extrabold">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={maxPrice > 5000 ? 1000 : maxPrice}
                    onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Max Distance Radius Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>Max Distance Radius</span>
                    </span>
                    <span className="text-emerald-400 text-sm font-extrabold">{maxDistance} km</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={30}
                    step={0.5}
                    value={maxDistance}
                    onChange={(e) => onMaxDistanceChange(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Min Freshness Score Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Min Freshness Score</span>
                    </span>
                    <span className="text-emerald-400 text-sm font-extrabold">{minFreshness}%</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={100}
                    step={1}
                    value={minFreshness}
                    onChange={(e) => onMinFreshnessChange(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-300 font-bold">
                    <input
                      type="checkbox"
                      checked={isOpenNowOnly}
                      onChange={(e) => onIsOpenNowOnlyChange(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-800 accent-emerald-500 w-4 h-4"
                    />
                    <span>Stores Open Now</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-300 font-bold">
                    <input
                      type="checkbox"
                      checked={isAiVerifiedOnly}
                      onChange={(e) => onIsAiVerifiedOnlyChange(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-800 accent-emerald-500 w-4 h-4"
                    />
                    <span>AI Verified Stock</span>
                  </label>
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 transition-colors shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
