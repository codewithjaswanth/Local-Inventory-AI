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
    <section id="categories" aria-label="Popular Fresh Categories" className="py-20 bg-transparent border-y border-slate-200/60 dark:border-slate-800/60 relative transition-colors">
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

        {/* Horizontal Scrollable Touch Carousel */}
        <div className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 select-none [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {POPULAR_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="snap-start shrink-0 w-[200px] sm:w-[220px]"
            >
              <div
                onClick={() => onCategorySelect(cat)}
                className="group cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#090F1D] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all h-full flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${cat.accentBg} dark:bg-slate-800/90 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300`}>
                    {renderCategoryIcon(cat.icon)}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    {cat.itemCount.toLocaleString()} live items
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {cat.popularItems.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[10px] font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
