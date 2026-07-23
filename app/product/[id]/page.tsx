'use client';

import React, { useState, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { DETAILED_SHOPS } from '@/data/mockData';
import { FreshnessBadge } from '@/components/ui/FreshnessBadge';
import { DistanceBadge } from '@/components/ui/DistanceBadge';
import { InventoryStatusBadge } from '@/components/ui/InventoryStatusBadge';
import { ProductCard } from '@/components/cards/ProductCard';
import {
  Sparkles,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Heart,
  ArrowLeft,
  Store,
  Phone,
  PackageCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const product: SearchProduct = SEARCH_PRODUCTS.find((p) => p.id === productId) || SEARCH_PRODUCTS[0];
  const shop = DETAILED_SHOPS.find((s) => s.id === product.shopId) || DETAILED_SHOPS[0];

  const [isFavorite, setIsFavorite] = useState(false);
  const [reserved, setReserved] = useState(false);

  const relatedProducts = SEARCH_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleReserve = () => {
    setReserved(true);
    alert(`Reserved 1 ${product.name} at ${product.shopName}! Pickup ready in 15 mins.`);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Back */}
        <div>
          <a
            href="/search"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search Results</span>
          </a>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          {/* Left 6 Cols: Large Product Photo */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <FreshnessBadge score={product.freshnessScore} />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                    isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                  aria-label="Add to favorites"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4">
                <DistanceBadge distance={product.distance} />
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Product Metadata & Buy Action */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                {product.organic && (
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    🌿 100% Organic
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  / {product.unit}
                </span>
              </div>

              {/* Availability & AI Updated Time */}
              <div className="grid grid-cols-2 gap-4 text-xs font-medium bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <div>
                  <span className="text-slate-400 block mb-0.5">Availability</span>
                  <InventoryStatusBadge inStock={true} availableQty={product.availableQty} />
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">AI Last Verified</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center">
                    <Clock className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                    {product.updatedTime}
                  </span>
                </div>
              </div>

              {/* Shop Metadata Card */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Store className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {product.shopName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.shopRating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">📍 {product.shopAddress}</p>

                <div className="pt-2 flex items-center space-x-2">
                  <a
                    href={`/shop/${product.shopId}`}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
                  >
                    View Store Inventory & Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                onClick={handleReserve}
                disabled={reserved}
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-emerald-500/25"
                leftIcon={<CheckCircle2 className="w-5 h-5" />}
              >
                {reserved ? 'Item Reserved for Pickup!' : 'Reserve Item for 15-Min Pickup'}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Produce Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Similar Fresh Produce Nearby
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
