'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Salad, Apple, Milk, Wheat, ShoppingBag, ArrowRight } from 'lucide-react';
import { Category } from '@/types';
import { Card } from '../ui/Card';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const renderIcon = (iconName: string) => {
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
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        onClick={() => onSelect(category)}
        className="group cursor-pointer p-6 h-full flex flex-col justify-between"
      >
        <div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border border-emerald-500/20 shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            {renderIcon(category.icon)}
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {category.name}
          </h3>

          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 font-semibold">
            {category.itemCount.toLocaleString()} live items
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {category.popularItems.slice(0, 2).map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-[11px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          <span>Browse Category</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  );
};
