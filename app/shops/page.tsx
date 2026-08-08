'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { NearbyShops } from '@/components/NearbyShops';
import { Footer } from '@/components/Footer';
import { Shop } from '@/types';
import { Store, MapPin } from 'lucide-react';

const ShopModal = dynamic(() => import('@/components/ShopModal').then((m) => m.ShopModal), {
  ssr: false,
});

export default function ShopsPage() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  return (
    <main className="min-h-screen bg-zinc-950 text-white transition-colors">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>HYPERLOCAL STORE DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center">
            <Store className="w-8 h-8 text-emerald-400 mr-3" />
            Nearby Stores &amp; Live Stock
          </h1>

          <p className="text-zinc-400 text-sm max-w-2xl">
            Inspect real-time inventory, operating hours, distance, and AI freshness verification scores for verified local shops in your neighborhood.
          </p>
        </div>

        {/* Full Nearby Shops Grid */}
        <NearbyShops
          initialLimit={100}
          onSelectShop={(shop) => setSelectedShop(shop)}
        />
      </div>

      <Footer />

      {/* Interactive Shop Details Modal */}
      <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
    </main>
  );
}
