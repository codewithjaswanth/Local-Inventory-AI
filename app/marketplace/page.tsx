'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HyperlocalProductCard } from '@/components/cards/HyperlocalProductCard';
import { HyperlocalMapView } from '@/components/maps/HyperlocalMapView';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { DETAILED_SHOPS } from '@/data/mockData';
import {
  ShoppingBag,
  Store,
  Sparkles,
  ArrowUpDown,
  Search,
  Filter,
  Grid,
  List,
  Map,
  MapPin,
  Star,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'freshness' | 'rating'>('freshness');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Groceries'];

  const processedProducts = useMemo(() => {
    let result = SEARCH_PRODUCTS.filter((product) => {
      const q = searchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchShop = product.shopName.toLowerCase().includes(q);
      const matchesSearch = !q || matchName || matchCategory || matchShop;

      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

      let productStatus = 'In Stock';
      if (product.availableQty <= 0) productStatus = 'Out of Stock';
      else if (product.availableQty <= 10) productStatus = 'Low Stock';

      const matchesAvailability =
        availabilityFilter === 'All' || productStatus === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    result.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortBy === 'distance') {
        valA = a.distance;
        valB = b.distance;
      } else if (sortBy === 'price') {
        valA = a.price;
        valB = b.price;
      } else if (sortBy === 'freshness') {
        valA = a.freshnessScore;
        valB = b.freshnessScore;
      } else if (sortBy === 'rating') {
        valA = a.shopRating;
        valB = b.shopRating;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, categoryFilter, availabilityFilter, sortBy, sortOrder]);

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-[#040810] text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500/30">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 dark:bg-[#090F1D] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-emerald-500" />
              <span>Stock Market & Local Marketplace</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Compare live store inventory, prices, distance, and AI freshness scores across nearby neighborhood shops.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold flex items-center shadow-glow-emerald">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>{processedProducts.length} Items Live</span>
            </span>
          </div>
        </div>

        {/* Filter & Sort Controls Panel */}
        <div className="bg-white/90 dark:bg-[#090F1D] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl p-5 space-y-5 select-none">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search products, category, or shop name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-mono text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                >
                  <option value="freshness">AI Freshness Score</option>
                  <option value="price">Price (Lowest)</option>
                  <option value="distance">Distance (Nearest)</option>
                  <option value="rating">Shop Rating</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-500"
                  title="Toggle Sort Direction"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                      : 'text-slate-400'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'list'
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                      : 'text-slate-400'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'map'
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                      : 'text-slate-400'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category & Availability Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-slate-500">Status:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Area */}
        {viewMode === 'map' ? (
          <HyperlocalMapView products={processedProducts} maxDistanceRadius={10.0} />
        ) : processedProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white/90 dark:bg-[#090F1D] rounded-3xl border border-slate-200 dark:border-slate-800">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No products found in Marketplace</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your category filter, availability status, or search terms.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'list'
                ? 'space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            }
          >
            {processedProducts.map((product) => (
              <HyperlocalProductCard
                key={product.id}
                product={product}
                viewMode={viewMode === 'list' ? 'list' : 'grid'}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
