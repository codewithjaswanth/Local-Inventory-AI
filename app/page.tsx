'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FloatingSearchButton } from '@/components/ui/FloatingSearchButton';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/Hero';
import { PopularCategories } from '@/components/PopularCategories';
import { NearbyShops } from '@/components/NearbyShops';
import { Footer } from '@/components/Footer';
import { Shop } from '@/types';

const ShopModal = dynamic(() => import('@/components/ShopModal').then((m) => m.ShopModal), {
  ssr: false,
});

const SearchModal = dynamic(() => import('@/components/SearchModal').then((m) => m.SearchModal), {
  ssr: false,
});

export default function Home() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleHeroSearch = () => {
    setIsSearchOpen(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative transition-colors duration-200">
      {/* Responsive Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Section with Minimalist Search */}
      <Hero onSearchSubmit={handleHeroSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Streamlined Categories */}
        <PopularCategories onCategorySelect={(category) => {
          if (category && category.id) {
            window.location.href = `/categories/${category.id}`;
          } else {
            window.location.href = '/categories';
          }
        }} />

        {/* Nearby Shops - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <NearbyShops onSelectShop={(shop) => setSelectedShop(shop)} />
        </div>
      </div>

      {/* Minimal SaaS Footer */}
      <Footer />

      {/* Modals */}
      <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectShop={(shop) => {
          setIsSearchOpen(false);
          setSelectedShop(shop);
        }}
      />

      {/* Floating Search FAB */}
      <FloatingSearchButton onClick={() => setIsSearchOpen(true)} />
    </main>
  );
}
