'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Shop } from '@/types';
import { Database } from '@/types/database.types';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck, Store, RotateCcw } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

type DbShop = Database['public']['Tables']['shops']['Row'];

interface NearbyShopsProps {
  onSelectShop: (shop: Shop | any) => void;
}

export const NearbyShops: React.FC<NearbyShopsProps> = ({ onSelectShop }) => {
  const [filter, setFilter] = useState<'all' | 'open' | 'top-rated'>('all');
  
  // 4. Add state for our real data and loading status
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 5. Fetch real data from Supabase on mount
  useEffect(() => {
    async function fetchLiveShops() {
      const { data, error } = await supabase
        .from('shops')
        .select('*');

      if (error) {
        console.error('Error fetching shops:', error.message);
        setLoading(false);
        return;
      }

      if (data) {
        // Map the database row to match your UI's expected shape
        const formattedShops = data.map((shop: DbShop) => ({
          id: shop.id,
          name: shop.shop_name,
          category: shop.category || 'General',
          rating: shop.rating,
          address: shop.address,
          // Temporary UI fallbacks for fields not yet in DB
          isOpen: true, 
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800', // Placeholder
          distance: '1.2m',
          openTime: shop.opening_time ? `${shop.opening_time} - ${shop.closing_time}` : '9:00 AM - 9:00 PM',
          freshnessBadge: 'High Freshness',
          reviewsCount: 12,
          inventoryCount: 24,
          verifiedItems: []
        }));
        
        setShops(formattedShops);
      }
      setLoading(false);
    }

    fetchLiveShops();
  }, []);

  // 6. Update the filter to use our new `shops` state instead of `NEARBY_SHOPS`
  const filteredShops = shops.filter((shop) => {
    if (filter === 'open') return shop.isOpen;
    if (filter === 'top-rated') return shop.rating >= 4.8;
    return true;
  });

  // Optional: Add a loading state to your UI before the return statement
  if (loading) {
    return <div className="py-24 text-center">Loading live local inventory...</div>;
  }

  return (
    <section id="shops" aria-label="Nearby Shops Section" className="py-24 bg-transparent relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200/50 dark:border-emerald-800/50">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>HYPERLOCAL RADIUS: 2 MILES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nearby Shops & Live Stock
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Inspect real-time inventory from neighborhood vegetable markets, fruit stands, and bakeries.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Shops ({shops.length})
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'open'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Open Now
            </button>
            <button
              onClick={() => setFilter('top-rated')}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === 'top-rated'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Top Rated ★4.8+
            </button>
          </div>
        </div>

        {/* Empty State vs Shop Cards Grid */}
        {filteredShops.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white/50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
              <Store className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No shops found in this area yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We couldn't locate any nearby stores matching your current filter criteria. Try changing your filters or refreshing your location.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setFilter('all');
                window.location.reload();
              }}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-emerald-500" />}
            >
              Refresh Location
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group overflow-hidden flex flex-col justify-between h-full">
                <div>
                  {/* Banner Image */}
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
                        {shop.distance} away
                      </span>
                      <span className="flex items-center bg-slate-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
                        {shop.openTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
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

                    {/* Stock Highlights */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Top Verified Items</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium lowercase">
                          {shop.inventoryCount} items total
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {shop.verifiedItems?.slice(0, 3).map((item: any) => (
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
                  <Button
                    onClick={() => onSelectShop(shop)}
                    variant="secondary"
                    size="md"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Shop & Live Stock
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};