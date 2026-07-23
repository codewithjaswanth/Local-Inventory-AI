'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/cards/ProductCard';
import { ShopCard } from '@/components/cards/ShopCard';
import { SEARCH_PRODUCTS } from '@/data/searchProducts';
import { DETAILED_SHOPS } from '@/data/mockData';
import { Heart, Sparkles } from 'lucide-react';

export default function FavoritesPage() {
  const favoriteProducts = SEARCH_PRODUCTS.slice(0, 3);
  const favoriteShops = DETAILED_SHOPS.slice(0, 2);

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-50 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-800">
            SAVED ITEMS & STORES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 flex items-center">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mr-3" />
            Your Favorites
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Quick access to your saved favorite items and neighborhood shops.
          </p>
        </div>

        {/* Favorite Products */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Favorite Produce ({favoriteProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Favorite Shops */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Saved Stores ({favoriteShops.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteShops.map((s) => (
              <ShopCard key={s.id} shop={s} onSelect={() => {}} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
