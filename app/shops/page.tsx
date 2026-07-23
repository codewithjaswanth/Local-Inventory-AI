'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShopCard } from '@/components/cards/ShopCard';
import { MapPlaceholder } from '@/components/maps/MapPlaceholder';
import { DETAILED_SHOPS } from '@/data/mockData';
import { Store, MapPin, Filter, Sparkles } from 'lucide-react';

export default function NearbyShopsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openOnly, setOpenOnly] = useState<boolean>(false);

  const filteredShops = DETAILED_SHOPS.filter((shop) => {
    if (selectedCategory !== 'All' && !shop.category.includes(selectedCategory)) return false;
    if (openOnly && !shop.isOpen) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            HYPERLOCAL STORES RADAR
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 flex items-center">
            <Store className="w-8 h-8 text-emerald-500 mr-3" />
            Nearby Produce & Grocery Shops
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Browse verified local markets within your 2.0 mile radius with real-time stock updates.
          </p>
        </div>

        {/* Interactive Map Visual */}
        <MapPlaceholder />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
            {['All', 'Organics', 'Fresh Fruits', 'Bakery', 'Groceries'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded"
            />
            <span>Open Now Only</span>
          </label>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} onSelect={() => {}} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
