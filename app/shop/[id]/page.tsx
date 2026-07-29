'use client';

import React, { useState, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/SearchModal';
import { InventoryCard } from '@/components/cards/InventoryCard';
import { DETAILED_SHOPS, DetailedShop } from '@/data/mockData';
import { SEARCH_PRODUCTS } from '@/data/searchProducts';
import { GetDirectionsButton } from '@/components/navigation/GetDirectionsButton';
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Sparkles,
  Navigation,
  ArrowLeft,
  Share2,
  MessageSquare
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ShopDetailsPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const shopId = unwrappedParams.id;

  const shop: DetailedShop = DETAILED_SHOPS.find((s) => s.id === shopId) || DETAILED_SHOPS[0];

  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(shop.reviews || []);

  const relatedProducts = SEARCH_PRODUCTS.filter((p) => p.shopId !== shop.id).slice(0, 4);

  const [notice, setNotice] = useState<string | null>(null);

  const handleCallStore = () => {
    window.location.href = `tel:${shop.phone}`;
  };

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`, '_blank');
  };

  const handleShareShop = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setNotice('Shop link copied to clipboard!');
    setTimeout(() => setNotice(null), 3000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev = {
      id: `r-${Date.now()}`,
      author: 'You (Verified Local Shopper)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Just now',
      comment: newReviewComment,
      verifiedPurchase: true,
      itemPurchased: shop.verifiedItems[0]?.name || 'Produce Purchase'
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewComment('');
    setNotice('Thank you for confirming freshness! Your review was submitted.');
    setTimeout(() => setNotice(null), 3000);
  };

  const filteredItems = activeCategoryFilter === 'All'
    ? shop.verifiedItems
    : shop.verifiedItems.filter(item => item.category === activeCategoryFilter);

  const inventoryCategories = ['All', ...Array.from(new Set(shop.verifiedItems.map(i => i.category)))];

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 sm:pb-0 relative transition-colors">
      <Navbar onOpenSearch={() => setIsSearchOverlayOpen(true)} />

      {/* Hero Cover Banner */}
      <div className="relative pt-20">
        <div className="relative h-64 sm:h-96 w-full bg-slate-900 overflow-hidden">
          <img
            src={shop.coverImage || shop.image}
            alt={shop.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-24 left-4 right-4 sm:left-8 sm:right-8 max-w-7xl mx-auto flex items-center justify-between z-10">
            <a
              href="/#shops"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-800 dark:text-slate-200 font-semibold text-xs backdrop-blur-md shadow-md transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shops</span>
            </a>

            <button
              onClick={handleShareShop}
              className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-md transition-all"
              aria-label="Share shop"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 max-w-7xl mx-auto text-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    {shop.freshnessBadge}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${shop.isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                    {shop.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm">
                  {shop.name}
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                  {shop.description}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 text-xs">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{shop.rating}</span>
                  <span className="text-slate-400 font-normal ml-1">({shop.reviewsCount})</span>
                </div>
                <div className="w-px h-4 bg-slate-700" />
                <div className="flex items-center text-slate-200 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400 mr-1" />
                  <span>{shop.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-2 font-bold text-slate-200">
                <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  Your Location
                </span>
                <span className="text-slate-500">➔</span>
                <span className="text-slate-300 font-bold">
                  {shop.name} ({shop.distance} away)
                </span>
                {shop.nearbyLandmark && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    📍 {shop.nearbyLandmark}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Hours: <strong className="text-slate-800 dark:text-slate-200">{shop.openingHours || shop.openTime}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCallStore}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Call {shop.phone}</span>
              </button>

              <GetDirectionsButton
                shopName={shop.name}
                shopAddress={shop.address}
                nearbyLandmark={shop.nearbyLandmark}
                shopLatitude={shop.latitude}
                shopLongitude={shop.longitude}
                distanceKm={typeof shop.distance === 'number' ? shop.distance : parseFloat(String(shop.distance)) || 1.0}
                variant="primary"
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Live Inventory & Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                LIVE AI VERIFIED STOCK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Store Live Inventory
              </h2>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
              {inventoryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <InventoryCard
                key={item.id}
                item={item}
                shopName={shop.name}
                onReserve={() => {
                  setNotice(`Reserved 1 ${item.name} at ${shop.name}!`);
                  setTimeout(() => setNotice(null), 3000);
                }}
              />
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
                <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-2" />
                Customer Verified Reviews ({reviewsList.length})
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Real feedback from community shoppers who visited this store.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/60 px-4 py-2 rounded-2xl border border-amber-200/60 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{shop.rating} out of 5.0</span>
            </div>
          </div>

          <form onSubmit={handleAddReview} className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Visited {shop.name}? Confirm Freshness & Earn FreshTokens
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Write a quick comment e.g. 'Tomatoes were super fresh!'"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs"
              >
                Submit Review
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
                        {rev.author}
                        {rev.verifiedPurchase && (
                          <span className="ml-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                            ✓ Verified Buyer
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-400">Purchased: {rev.itemPurchased} • {rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400 text-xs font-bold">
                    {'★'.repeat(Math.floor(rev.rating))}
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed pl-13">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      <SearchModal
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
        onSelectShop={(s) => {
          setIsSearchOverlayOpen(false);
          window.location.href = `/shop/${s.id}`;
        }}
      />
    </main>
  );
}
