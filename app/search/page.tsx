'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AiSearchAssistant } from '@/components/ai/AiSearchAssistant';
import { AiThinkingLoader } from '@/components/ai/AiThinkingLoader';
import { AiSummaryCard } from '@/components/ai/AiSummaryCard';
import { AiConfidenceBadge } from '@/components/ai/AiConfidenceBadge';
import { Pagination } from '@/components/search/Pagination';
import { FilterDrawer } from '@/components/search/FilterDrawer';
import { LocationSelector } from '@/components/search/LocationSelector';
import { ProductCard } from '@/components/cards/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonShopCard } from '@/components/ui/Skeleton';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { DEFAULT_LOCATIONS, APP_CONFIG } from '@/constants';
import { SlidersHorizontal, Grid, List, Sparkles } from 'lucide-react';

import { semanticSearchService } from '@/services/ai/semanticSearch.service';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxDistance, setMaxDistance] = useState(3.0);
  const [maxPrice, setMaxPrice] = useState(12.0);
  const [minFreshness, setMinFreshness] = useState(90);
  const [minRating, setMinRating] = useState(0);
  const [isOpenNowOnly, setIsOpenNowOnly] = useState(false);
  const [isAiVerifiedOnly, setIsAiVerifiedOnly] = useState(false);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [semanticResults, setSemanticResults] = useState<SearchProduct[]>(SEARCH_PRODUCTS);
  const [aiExplanationText, setAiExplanationText] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    semanticSearchService.executeSemanticSearch(query || 'Fresh Tomatoes').then((res) => {
      if (isMounted) {
        setSemanticResults(res.products);
        setAiExplanationText(res.aiExplanation);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query, selectedCategory, maxDistance, maxPrice, minFreshness, minRating, isOpenNowOnly, isAiVerifiedOnly]);

  const filteredProducts = SEARCH_PRODUCTS.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (product.distance > maxDistance) return false;
    if (product.price > maxPrice) return false;
    if (product.freshnessScore < minFreshness) return false;
    if (minRating > 0 && product.shopRating < minRating) return false;
    if (isAiVerifiedOnly && !product.verifiedByAi) return false;
    if (query) {
      const q = query.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchShop = product.shopName.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchShop) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / APP_CONFIG.itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * APP_CONFIG.itemsPerPage,
    currentPage * APP_CONFIG.itemsPerPage
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxDistance(5.0);
    setMaxPrice(15.0);
    setMinFreshness(80);
    setMinRating(0);
    setIsOpenNowOnly(false);
    setIsAiVerifiedOnly(false);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* AI Search Assistant & Location Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <LocationSelector
              currentLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
            />

            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter Results</span>
            </button>
          </div>

          <AiSearchAssistant
            onSearch={(q) => {
              setQuery(q);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* AI Summary Card */}
        <AiSummaryCard
          query={query || 'Fresh Produce'}
          shopsCount={filteredProducts.length > 0 ? 4 : 0}
          lowestPrice={filteredProducts[0] ? `$${filteredProducts[0].price.toFixed(2)}/${filteredProducts[0].unit}` : '$1.99/lb'}
          bestShopName={filteredProducts[0] ? filteredProducts[0].shopName : 'Green Earth Organics'}
          highestFreshness={filteredProducts[0] ? filteredProducts[0].freshnessScore : 99}
          confidenceScore={96}
          aiExplanation={aiExplanationText}
        />

        {/* Results Info & View Toggle */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
            Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> live items near{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedLocation}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl border ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white dark:bg-emerald-500 border-transparent shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl border ${
                viewMode === 'list'
                  ? 'bg-slate-900 text-white dark:bg-emerald-500 border-transparent shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonShopCard />
            <SkeletonShopCard />
            <SkeletonShopCard />
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No Fresh Items Match Your Filters"
            description="Try increasing your search radius, adjusting max price, or selecting another category."
            actionLabel="Reset Search Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Footer />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        maxDistance={maxDistance}
        onDistanceChange={setMaxDistance}
        maxPrice={maxPrice}
        onPriceChange={setMaxPrice}
        minFreshness={minFreshness}
        onFreshnessChange={setMinFreshness}
        minRating={minRating}
        onRatingChange={setMinRating}
        isOpenNowOnly={isOpenNowOnly}
        onOpenNowToggle={setIsOpenNowOnly}
        isAiVerifiedOnly={isAiVerifiedOnly}
        onAiVerifiedToggle={setIsAiVerifiedOnly}
        onResetFilters={handleResetFilters}
      />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
