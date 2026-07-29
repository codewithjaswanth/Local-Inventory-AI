'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Map,
  Sparkles,
  DollarSign,
  MapPin,
  Clock,
  ShieldCheck,
  RotateCcw
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
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalResultsCount
}) => {
  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Groceries'];

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 shadow-2xl p-5 space-y-5 select-none">
      {/* Top Search Input & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search produce name, category, or shop name..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
          />
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              viewMode === 'list'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              viewMode === 'map'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider mr-1 shrink-0 font-bold">
          Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Sliders & Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-3 border-t border-slate-800/80">
        {/* Max Price Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Max Price</span>
            </span>
            <span className="font-bold text-white">₹{maxPrice}</span>
          </div>
          <input
            type="range"
            min={10}
            max={1000}
            step={10}
            value={maxPrice > 5000 ? 1000 : maxPrice}
            onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Max Distance Radius Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Max Distance</span>
            </span>
            <span className="font-bold text-white">{maxDistance} km</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={30}
            step={0.5}
            value={maxDistance}
            onChange={(e) => onMaxDistanceChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Min Freshness Score Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Min Freshness</span>
            </span>
            <span className="font-bold text-emerald-400">{minFreshness}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={100}
            step={1}
            value={minFreshness}
            onChange={(e) => onMinFreshnessChange(parseInt(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Toggles: Open Now & AI Verified */}
        <div className="flex items-center space-x-3 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={isOpenNowOnly}
              onChange={(e) => onIsOpenNowOnlyChange(e.target.checked)}
              className="rounded bg-slate-900 border-slate-800 accent-emerald-500 w-4 h-4"
            />
            <span>Open Now</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={isAiVerifiedOnly}
              onChange={(e) => onIsAiVerifiedOnlyChange(e.target.checked)}
              className="rounded bg-slate-900 border-slate-800 accent-emerald-500 w-4 h-4"
            />
            <span>AI Verified</span>
          </label>
        </div>

        {/* Reset Filters & Results Count */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2">
          <span className="text-xs text-slate-400 font-bold">
            {totalResultsCount} Items
          </span>

          <button
            type="button"
            onClick={onResetFilters}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
