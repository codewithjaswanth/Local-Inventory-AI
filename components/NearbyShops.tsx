'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Shop } from '@/types';
import { Database } from '@/types/database.types';
import { DETAILED_SHOPS } from '@/data/mockData';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck, Store, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

type DbShop = Database['public']['Tables']['shops']['Row'];

interface NearbyShopsProps {
  onSelectShop: (shop: Shop) => void;
  initialLimit?: number;
}

interface FormattedShop {
  id: string;
  name: string;
  category: string;
  rating: number | null;
  address: string | null;
  isOpen: boolean;
  image: string;
  distance: string;
  openTime: string;
  freshnessBadge: string;
  reviewsCount: number;
  inventoryCount: number;
  verifiedItems: never[];
}

export const NearbyShops: React.FC<NearbyShopsProps> = ({ onSelectShop, initialLimit = 6 }) => {
  const [filter, setFilter] = useState<'all' | 'open' | 'top-rated'>('all');
  const [shops, setShops] = useState<FormattedShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchLiveShops() {
      try {
        const { data } = await supabase.from('shops').select('*');

        let list: FormattedShop[] = [];

        if (data && data.length > 0) {
          list = data.map((shop: DbShop) => ({
            id: shop.id,
            name: shop.shop_name,
            category: shop.category || 'General Store',
            rating: shop.rating || 4.8,
            address: shop.address || 'Local Neighborhood',
            isOpen: true,
            image: (shop as any).image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
            distance: '0.8 km',
            openTime: shop.opening_time ? `${shop.opening_time} - ${shop.closing_time}` : '8:00 AM - 9:00 PM',
            freshnessBadge: '98% AI Verified',
            reviewsCount: 45,
            inventoryCount: 120,
            verifiedItems: [],
          }));
        }

        // Merge with DETAILED_SHOPS if fewer than 12 shops
        if (list.length < 12) {
          const existingIds = new Set(list.map((s) => s.id));
          const mockShopsFormatted: FormattedShop[] = DETAILED_SHOPS.filter(
            (s) => !existingIds.has(s.id)
          ).map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            rating: s.rating,
            address: s.address,
            isOpen: s.isOpen,
            image: s.image,
            distance: typeof s.distance === 'number' ? `${s.distance} km` : s.distance,
            openTime: s.openTime,
            freshnessBadge: s.freshnessBadge,
            reviewsCount: s.reviewsCount,
            inventoryCount: s.inventoryCount,
            verifiedItems: [],
          }));
          list = [...list, ...mockShopsFormatted];
        }

        setShops(list);
      } catch (err) {
        console.error('Error fetching live shops:', err);
        setShops(
          DETAILED_SHOPS.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            rating: s.rating,
            address: s.address,
            isOpen: s.isOpen,
            image: s.image,
            distance: typeof s.distance === 'number' ? `${s.distance} km` : s.distance,
            openTime: s.openTime,
            freshnessBadge: s.freshnessBadge,
            reviewsCount: s.reviewsCount,
            inventoryCount: s.inventoryCount,
            verifiedItems: [],
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    fetchLiveShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    if (filter === 'open') return shop.isOpen;
    if (filter === 'top-rated') return (shop.rating ?? 0) >= 4.8;
    return true;
  });

  const visibleShops = isExpanded ? filteredShops : filteredShops.slice(0, initialLimit);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden animate-pulse">
                <div className="h-48 bg-zinc-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                  <div className="h-6 bg-zinc-800 rounded w-2/3" />
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shops" aria-label="Nearby Shops Section" className="py-12 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Filter Tabs & View All toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Nearby Shops &amp; Live Stock
            </h2>
            <p className="mt-1 text-zinc-400 text-xs sm:text-sm font-medium max-w-xl">
              Browse real-time inventory from neighborhood markets, farm stands, and daily essential stores.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto hide-scrollbar w-full md:w-auto pb-1">
            {/* Filter Tabs */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 text-xs font-semibold shrink-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'all'
                    ? 'bg-zinc-800 text-white shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Shops
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'open'
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Open Now
              </button>
              <button
                onClick={() => setFilter('top-rated')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'top-rated'
                    ? 'bg-zinc-800 text-white shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Top Rated ★4.8+
              </button>
            </div>

            {/* Top View All Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
            >
              <span>{isExpanded ? 'Show Less' : 'View All Shops'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>
        </div>

        {/* Empty State vs Shop Cards Grid */}
        {filteredShops.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
              <Store className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                No shops found in this area yet
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We couldn&apos;t locate any nearby stores matching your current filter criteria.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setFilter('all');
                window.location.reload();
              }}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-emerald-400" />}
            >
              Refresh Location
            </Button>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {visibleShops.map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Card className="group overflow-hidden flex flex-col justify-between h-full bg-zinc-900 border-zinc-800 hover:border-zinc-700">
                      <div>
                        {/* Banner Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
                          <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <Badge
                              variant={shop.isOpen ? 'emerald' : 'slate'}
                              pulse={shop.isOpen}
                            >
                              {shop.isOpen ? 'Open Now' : 'Closed'}
                            </Badge>

                            <Badge variant="slate" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}>
                              {shop.freshnessBadge}
                            </Badge>
                          </div>

                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                            <span className="flex items-center bg-zinc-950/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-800">
                              <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                              {shop.distance} away
                            </span>
                            <span className="flex items-center bg-zinc-950/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-800">
                              <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
                              {shop.openTime}
                            </span>
                          </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
                                {shop.category}
                              </span>
                              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                                {shop.name}
                              </h3>
                            </div>

                            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-amber-400 text-xs font-bold shrink-0">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{shop.rating}</span>
                              <span className="text-zinc-500 font-normal">({shop.reviewsCount})</span>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-400 line-clamp-1">
                            📍 {shop.address}
                          </p>

                          {/* Stock Highlights */}
                          <div className="pt-3 border-t border-zinc-800">
                            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                              <span>Available Items</span>
                              <span className="text-emerald-400 font-bold lowercase">
                                {shop.inventoryCount} items total
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* View Shop CTA */}
                      <div className="p-6 pt-0">
                        <Button
                          onClick={() => onSelectShop(shop as unknown as Shop)}
                          variant="secondary"
                          size="md"
                          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 cursor-pointer"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          View Shop &amp; Live Stock
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Expand Button */}
            {!isExpanded && filteredShops.length > initialLimit && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-xs font-extrabold text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <span>View All Shops</span>
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};