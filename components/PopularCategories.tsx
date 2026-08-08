'use client';

import React, { useState } from 'react';
import { POPULAR_CATEGORIES } from '@/data/mockData';
import { Category } from '@/types';
import { Layers, ShoppingBasket, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamlinedCategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onSelect: (category: Category) => void;
}

export const StreamlinedCategoryCard: React.FC<StreamlinedCategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect(category)}
      className={`group cursor-pointer rounded-2xl border p-2 bg-zinc-900 transition-all duration-200 flex flex-col items-center select-none ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-zinc-850 shadow-lg'
          : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
      }`}
    >
      {/* Category Image */}
      <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-zinc-800 relative">
        {category.image && !imageError ? (
          <img
            src={category.image}
            alt={category.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <ShoppingBasket className="w-8 h-8 text-emerald-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Category Name at the Bottom */}
      <div className="pt-2.5 pb-1 px-1 text-center w-full">
        <h3
          className={`text-xs font-extrabold truncate transition-colors ${
            isSelected ? 'text-emerald-400' : 'text-zinc-200 group-hover:text-emerald-400'
          }`}
        >
          {category.name}
        </h3>
        <p className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
          {category.itemCount.toLocaleString()} items
        </p>
      </div>
    </div>
  );
};

export const CategoryItem = StreamlinedCategoryCard;

interface PopularCategoriesProps {
  selectedCategoryName?: string;
  onCategorySelect: (category: Category) => void;
  initialLimit?: number;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategoryName,
  onCategorySelect,
  initialLimit = 10,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCategories = isExpanded
    ? POPULAR_CATEGORIES
    : POPULAR_CATEGORIES.slice(0, initialLimit);

  return (
    <section id="categories" aria-label="Categories Navigation" className="py-4 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Header with View All toggle */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Store Categories
            </h2>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
          >
            <span>{isExpanded ? 'Show Less' : `View All (${POPULAR_CATEGORIES.length})`}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>

        {/* Category Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
        >
          <AnimatePresence>
            {visibleCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <StreamlinedCategoryCard
                  category={cat}
                  isSelected={selectedCategoryName === cat.name}
                  onSelect={onCategorySelect}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Expand Button when collapsed */}
        {!isExpanded && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-xs font-extrabold text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <span>View All {POPULAR_CATEGORIES.length} Categories</span>
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
