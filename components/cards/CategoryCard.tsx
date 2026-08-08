'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Category } from '@/types';
import { Card } from '../ui/Card';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Card
        onClick={() => onSelect(category)}
        className="group cursor-pointer p-3 bg-zinc-900 border-zinc-800 hover:border-zinc-700 h-full flex flex-col justify-between"
      >
        <div>
          {/* Category Image */}
          <div className="w-full h-36 rounded-2xl overflow-hidden bg-zinc-800 relative mb-3">
            {category.image && !imageError ? (
              <img
                src={category.image}
                alt={category.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-emerald-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Category Name at Bottom of Image */}
          <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
            {category.name}
          </h3>

          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
            {category.itemCount.toLocaleString()} live items
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {category.popularItems.slice(0, 2).map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-emerald-400">
          <span>Browse Category</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  );
};
