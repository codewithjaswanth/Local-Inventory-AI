'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shop } from '@/types';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { GetDirectionsButton } from '../navigation/GetDirectionsButton';

interface ShopCardProps {
  shop: Shop;
  onSelect: (shop: Shop) => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', damping: 26, stiffness: 340 }}
    >
      <Card className="group overflow-hidden flex flex-col justify-between h-full">
        <div>
          {/* Cover Photo */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
              }}
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
              <span className="flex items-center bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 font-bold border border-emerald-500/30">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" />
                <span>{shop.distance} from your location</span>
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
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/20 dark:border-emerald-800/80 uppercase tracking-wider">
                  {shop.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-2">
                  {shop.name}
                </h3>
              </div>

              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-950/60 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{shop.rating}</span>
                <span className="text-slate-400 font-normal">({shop.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-1">
              📍 {shop.address}
            </p>
            {shop.nearbyLandmark && (
              <div className="mt-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold inline-flex items-center gap-1">
                <span>📍</span>
                <span>Landmark: {shop.nearbyLandmark}</span>
              </div>
            )}

            {/* Top Verified Stock Items */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Verified Produce</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold lowercase">
                  {shop.inventoryCount} in stock
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {shop.verifiedItems.slice(0, 3).map((item) => (
                  <span
                    key={item.id}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.price}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Shop & Directions CTAs */}
        <div className="p-6 pt-0 grid grid-cols-2 gap-2">
          <a href={`/shop/${shop.id}`} className="block">
            <Button
              onClick={() => onSelect(shop)}
              variant="secondary"
              size="md"
              className="w-full text-xs"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Shop
            </Button>
          </a>
          <GetDirectionsButton
            shopName={shop.name}
            shopAddress={shop.address}
            nearbyLandmark={shop.nearbyLandmark}
            shopLatitude={shop.latitude}
            shopLongitude={shop.longitude}
            distanceKm={typeof shop.distance === 'number' ? shop.distance : parseFloat(String(shop.distance)) || 1.0}
            variant="primary"
          />
        </div>
      </Card>
    </motion.div>
  );
};
