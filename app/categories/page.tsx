'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { POPULAR_CATEGORIES } from '@/data/mockData';
import { Grid, Sparkles } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            EXPLORE MARKETPLACE DEPARTMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 flex items-center">
            <Grid className="w-8 h-8 text-emerald-500 mr-3" />
            Produce & Grocery Categories
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Browse through AI-monitored categories to find live stock in nearby stores.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {POPULAR_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={(cat) => {
                window.location.href = `/search?category=${encodeURIComponent(cat.name)}`;
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
