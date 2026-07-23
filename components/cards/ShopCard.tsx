'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shop } from '@/types';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ShopCardProps {
  shop: Shop;
  onSelect: (shop: Shop) => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="group overflow-hidden flex flex-col justify-between h-full">
        <div>
          {/* Cover Photo */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <Badge
                variant={shop.isOpen ? 'emerald' : 'slate'}
                pulse={shop.isOpen}
              >
                {shop.isOpen ? 'Open Now' : 'Closed'}
              </Badge>

              <Badge variant="slate" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}>
                {shop.freshnessBadge}
              </Badge>
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
              <span className="flex items-center bg-slate-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                {shop.distance} mi away
              </span>
              <span className="flex items-center bg-slate-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
                {shop.openTime}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {shop.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-0.5">
                  {shop.name}
                </h3>
              </div>

              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{shop.rating}</span>
                <span className="text-slate-400 font-normal">({shop.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
              📍 {shop.address}
            </p>

            {/* Top Verified Stock Items */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Verified Produce</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium lowercase">
                  {shop.inventoryCount} in stock
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {shop.verifiedItems.slice(0, 3).map((item) => (
                  <span
                    key={item.id}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center space-x-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.price}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Shop CTA */}
        <div className="p-6 pt-0">
          <a href={`/shop/${shop.id}`} className="w-full block">
            <Button
              onClick={() => onSelect(shop)}
              variant="secondary"
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Shop & Live Stock
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};
