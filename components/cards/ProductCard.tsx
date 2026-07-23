'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ShieldCheck, Star, MapPin, PackageCheck, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AiConfidenceBadge } from '../ai/AiConfidenceBadge';

interface ProductCardProps {
  product: Product;
  onSelectShop?: (shopId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectShop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="group overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <AiConfidenceBadge score={product.freshnessScore} label="AI Verified" variant="dark" />
              {product.organic && <Badge variant="slate">🌿 Organic</Badge>}
            </div>
          </div>

          <div className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                {product.availableQty} available
              </span>
            </div>

            <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                {product.shopName}
              </span>
              <span className="flex items-center text-amber-600 dark:text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                {product.shopRating}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-1">
                  / {product.unit}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center">
                <MapPin className="w-3 h-3 mr-0.5" />
                {product.distance} mi
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0">
          <a href={`/shop/${product.shopId}`} className="w-full block">
            <Button
              onClick={() => onSelectShop?.(product.shopId)}
              variant="secondary"
              size="sm"
              className="w-full"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Shop & Buy
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};
