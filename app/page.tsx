'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Toast, ToastMessage } from '@/components/ui/Toast';
import { FloatingSearchButton } from '@/components/ui/FloatingSearchButton';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/Hero';
import { PopularCategories } from '@/components/PopularCategories';
import { NearbyShops } from '@/components/NearbyShops';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { Shop, Category } from '@/types';

// Lazy load heavy components for performance optimization & smaller bundle sizes
const AiFeatures = dynamic(() => import('@/components/AiFeatures').then((m) => m.AiFeatures), {
  loading: () => (
    <div className="py-24 bg-slate-900 text-center text-slate-500 font-mono text-xs">
      ⚡ Loading AI Multi-Modal Engine Features...
    </div>
  ),
});

const HowItWorks = dynamic(() => import('@/components/HowItWorks').then((m) => m.HowItWorks), {
  loading: () => (
    <div className="py-24 bg-slate-50 dark:bg-slate-900 text-center text-slate-400 font-mono text-xs">
      ⚡ Loading How It Works Visual Timeline...
    </div>
  ),
});

const ShopModal = dynamic(() => import('@/components/ShopModal').then((m) => m.ShopModal), {
  ssr: false,
});

const SearchModal = dynamic(() => import('@/components/SearchModal').then((m) => m.SearchModal), {
  ssr: false,
});

export default function Home() {
  console.log('[PAGE] Rendering Home Page');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const handleCategorySelect = (category: any) => {
    const shopsElement = document.getElementById('shops');
    if (shopsElement) {
      shopsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (term: string) => {
    setIsSearchOpen(true);
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 relative transition-colors duration-200">
      {/* 1. Responsive Navbar with Dark Mode Toggle */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 2. Hero Section */}
      <Hero onSearchSubmit={handleHeroSearch} />

      {/* 3. Popular Categories */}
      <PopularCategories onCategorySelect={handleCategorySelect} />

      {/* 4. Nearby Shops Section */}
      <NearbyShops onSelectShop={(shop) => setSelectedShop(shop)} />

      {/* 5. AI Features Section (Lazy Loaded) */}
      <AiFeatures />

      {/* 6. How It Works Timeline (Lazy Loaded) */}
      <HowItWorks />

      {/* 7. CTA Banner */}
      <CtaBanner onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 8. Footer */}
      <Footer />

      {/* Modals */}
      <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectShop={(shop) => { setIsSearchOpen(false); setSelectedShop(shop); }} />

      {/* Floating AI Search FAB Button */}
      <FloatingSearchButton onClick={() => setIsSearchOpen(true)} />

      {/* Toast Notification */}
      <Toast toast={activeToast} onClose={() => setActiveToast(null)} />
    </main>
  );
}
