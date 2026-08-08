'use client';

import React, { useState, use } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/Footer';
import { POPULAR_CATEGORIES } from '@/data/mockData';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { useCart } from '@/context/CartContext';
import { Shop } from '@/types';
import {
  Grid,
  ShoppingBag,
  Sparkles,
  MapPin,
  Star,
  Check,
  Plus,
  ArrowLeft,
  Filter,
  ShieldCheck,
  Store,
} from 'lucide-react';
import Link from 'next/link';

const ShopModal = dynamic(() => import('@/components/ShopModal').then((m) => m.ShopModal), {
  ssr: false,
});

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;

  // Find matching category object
  const category = POPULAR_CATEGORIES.find(
    (c) =>
      c.id === rawId ||
      c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === rawId.toLowerCase()
  ) || {
    id: rawId,
    name: rawId
      .replace(/-/g, ' ')
      .replace(/\band\b/g, '&')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    itemCount: 1420,
    popularItems: [
      'Bathing Soaps',
      'Shower Gels & Scrubs',
      'Oral Care',
      'Handwash',
      'Fragrance & Talc',
      'Bath Accessories',
      'Shampoo',
      'Conditioner',
      'Face Cleaning',
      'Body Lotions & Oils',
      'Body Treatment & Roll On',
      'Bath & Beauty Gifts',
    ],
    subcategories: [
      'Bathing Soaps',
      'Shower Gels & Scrubs',
      'Oral Care',
      'Handwash',
      'Fragrance & Talc',
      'Bath Accessories',
      'Shampoo',
      'Conditioner',
      'Face Cleaning',
      'Body Lotions & Oils',
      'Body Treatment & Roll On',
      'Bath & Beauty Gifts',
    ],
    gradient: 'from-purple-400 to-indigo-500',
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-600',
    description: 'Explore live stock and fresh inventory from verified local shops near you.',
  };

  const { addToCart } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  // Subcategories list
  const subcategoriesList = ['All', ...(category.subcategories || category.popularItems)];

  // Filter products by category & subcategory
  const categoryProducts = SEARCH_PRODUCTS.filter((product) => {
    const matchesCat =
      product.category.toLowerCase().includes(category.name.toLowerCase()) ||
      category.name.toLowerCase().includes(product.category.toLowerCase()) ||
      category.id === 'bath-body';

    if (!matchesCat) return false;

    if (selectedSubcategory !== 'All') {
      if (product.subcategory) {
        return product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();
      }
      const subLower = selectedSubcategory.toLowerCase();
      const nameLower = product.name.toLowerCase();
      return nameLower.includes(subLower);
    }
    return true;
  });

  const handleAddToCart = (product: SearchProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      shopId: product.shopId,
      shopName: product.shopName,
      freshnessScore: product.freshnessScore,
      organic: product.organic,
      unit: product.unit,
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white transition-colors">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/categories"
          className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE HYPERLOCAL INVENTORY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {category.name}
            </h1>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {category.description ||
                'Browse real-time items verified by AI across nearby daily essential and specialty shops.'}
            </p>

            <div className="flex items-center space-x-4 text-xs font-semibold text-zinc-300 pt-1">
              <span className="flex items-center text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 mr-1" />
                98% AI Freshness Score
              </span>
              <span>•</span>
              <span className="text-zinc-400">{categoryProducts.length} Items Available Nearby</span>
            </div>
          </div>

          {/* Banner Hero Image */}
          {category.image && (
            <div className="w-full md:w-64 h-40 md:h-44 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/60 shadow-xl relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        {/* Subcategories Filter Chips Bar */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Filter Subcategories ({subcategoriesList.length - 1})</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 pt-1">
            {subcategoriesList.map((subCat) => {
              const isActive = selectedSubcategory === subCat;
              return (
                <button
                  key={subCat}
                  onClick={() => setSelectedSubcategory(subCat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {subCat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-between">
            <span>
              Products in {selectedSubcategory === 'All' ? category.name : selectedSubcategory}
            </span>
            <span className="text-xs font-normal text-zinc-400">
              Showing {categoryProducts.length} verified products
            </span>
          </h2>

          {categoryProducts.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No products found in this subcategory</h3>
              <p className="text-xs text-zinc-400">
                Try selecting &quot;All&quot; or another subcategory filter to inspect nearby inventory.
              </p>
              <button
                onClick={() => setSelectedSubcategory('All')}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl overflow-hidden flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative h-44 w-full bg-zinc-800 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-black backdrop-blur-xs">
                          {product.freshnessScore}% AI Verified
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-zinc-950/80 text-zinc-300 text-[10px] font-bold border border-zinc-800 backdrop-blur-xs">
                          {product.distance} km away
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Store Info */}
                      <div className="pt-2 border-t border-zinc-800/80 space-y-1">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                          <span className="font-semibold text-zinc-200 flex items-center">
                            <Store className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                            {product.shopName}
                          </span>
                          <span className="flex items-center text-amber-400 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                            {product.shopRating}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 flex items-center">
                          <MapPin className="w-3 h-3 text-zinc-400 mr-1 shrink-0" />
                          {product.shopAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-zinc-400 font-medium">Price</span>
                      <div className="text-lg font-black text-white">
                        ₹{product.price}
                        <span className="text-xs text-zinc-400 font-normal ml-1">/{product.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                        addedItems[product.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-zinc-800 hover:bg-emerald-500 text-white hover:text-slate-950 border border-zinc-700 hover:border-emerald-400'
                      }`}
                    >
                      {addedItems[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Shop Details Modal */}
      <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
    </main>
  );
}
