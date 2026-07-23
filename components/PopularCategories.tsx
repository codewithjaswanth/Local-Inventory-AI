'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { POPULAR_CATEGORIES } from '@/data/mockData';
import { Salad, Apple, Milk, Wheat, ShoppingBag, ArrowRight } from 'lucide-react';
import { Category } from '@/types';
import { Card } from './ui/Card';

interface PopularCategoriesProps {
  onCategorySelect: (category: Category) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({ onCategorySelect }) => {
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Salad':
        return <Salad className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />;
      case 'Apple':
        return <Apple className="w-7 h-7 text-amber-500 dark:text-amber-400" />;
      case 'Milk':
        return <Milk className="w-7 h-7 text-blue-500 dark:text-blue-400" />;
      case 'Wheat':
        return <Wheat className="w-7 h-7 text-amber-700 dark:text-amber-300" />;
      case 'ShoppingBag':
      default:
        return <ShoppingBag className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <section id="categories" aria-label="Popular Fresh Categories" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200/50 dark:border-emerald-800/50">
              <span>EXPLORE HYPERLOCAL MARKET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Fresh Categories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Browse live inventory across local stores categorized by fresh food types.
            </p>
          </div>

          <a
            href="#shops"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 group"
          >
            <span>View all items</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {POPULAR_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card
                onClick={() => onCategorySelect(cat)}
                className="group cursor-pointer p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${cat.accentBg} dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {renderCategoryIcon(cat.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {cat.itemCount.toLocaleString()} live items
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.popularItems.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
