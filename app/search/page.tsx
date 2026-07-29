'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HyperlocalSearchFilter } from '@/components/search/HyperlocalSearchFilter';
import { HyperlocalProductCard } from '@/components/cards/HyperlocalProductCard';
import { HyperlocalMapView } from '@/components/maps/HyperlocalMapView';
import { Pagination } from '@/components/search/Pagination';
import { LocationSelector } from '@/components/search/LocationSelector';
import { SkeletonShopCard } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchProduct, SEARCH_PRODUCTS } from '@/data/searchProducts';
import { DEFAULT_LOCATIONS, APP_CONFIG } from '@/constants';
import { semanticSearchService } from '@/services/ai/semanticSearch.service';
import { Sparkles, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxDistance, setMaxDistance] = useState(15.0);
  const [maxPrice, setMaxPrice] = useState(500.0);
  const [minFreshness, setMinFreshness] = useState(85);
  const [isOpenNowOnly, setIsOpenNowOnly] = useState(false);
  const [isAiVerifiedOnly, setIsAiVerifiedOnly] = useState(false);

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchResults, setSearchResults] = useState<SearchProduct[]>(SEARCH_PRODUCTS);
  const [aiExplanationText, setAiExplanationText] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(() => {
      semanticSearchService
        .executeSemanticSearch(query, {
          category: selectedCategory,
          maxDistance,
          maxPrice,
          minFreshness,
          openNowOnly: isOpenNowOnly,
          aiVerifiedOnly: isAiVerifiedOnly,
        })
        .then((res) => {
          if (isMounted) {
            setSearchResults(res.products);
            setAiExplanationText(res.aiExplanation);
            setIsLoading(false);
          }
        });
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query, selectedCategory, maxDistance, maxPrice, minFreshness, isOpenNowOnly, isAiVerifiedOnly]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage) || 1;
  const paginatedProducts = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('All');
    setMaxDistance(15.0);
    setMaxPrice(40.0);
    setMinFreshness(80);
    setIsOpenNowOnly(false);
    setIsAiVerifiedOnly(false);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-[#040810] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Banner & Location Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 dark:bg-[#090F1D] p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
              <span>Hyperlocal Produce Search</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live GPS radar & AI freshness validation connecting neighborhood markets.
            </p>
          </div>

          <LocationSelector
            currentLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />
        </div>

        {/* Search Controls & Filters Panel */}
        <HyperlocalSearchFilter
          query={query}
          onQueryChange={(q) => {
            setQuery(q);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          maxDistance={maxDistance}
          onMaxDistanceChange={(d) => {
            setMaxDistance(d);
            setCurrentPage(1);
          }}
          maxPrice={maxPrice}
          onMaxPriceChange={(p) => {
            setMaxPrice(p);
            setCurrentPage(1);
          }}
          minFreshness={minFreshness}
          onMinFreshnessChange={(f) => {
            setMinFreshness(f);
            setCurrentPage(1);
          }}
          isOpenNowOnly={isOpenNowOnly}
          onIsOpenNowOnlyChange={(val) => {
            setIsOpenNowOnly(val);
            setCurrentPage(1);
          }}
          isAiVerifiedOnly={isAiVerifiedOnly}
          onIsAiVerifiedOnlyChange={(val) => {
            setIsAiVerifiedOnly(val);
            setCurrentPage(1);
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          totalResultsCount={searchResults.length}
        />

        {/* AI Insight Explanation Banner */}
        {aiExplanationText && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center space-x-2">
            <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
            <span>{aiExplanationText}</span>
          </div>
        )}

        {/* Results Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <SkeletonShopCard key={n} />
            ))}
          </div>
        ) : viewMode === 'map' ? (
          /* Interactive Map View */
          <HyperlocalMapView products={searchResults} maxDistanceRadius={maxDistance} />
        ) : searchResults.length === 0 ? (
          /* Empty State */
          <EmptyState
            title="No matching produce found"
            description="Try adjusting your max distance, price range, or category filter."
            actionLabel="Reset Filters"
            onAction={handleResetFilters}
          />
        ) : (
          /* Grid or List Product Cards */
          <div
            className={
              viewMode === 'list'
                ? 'space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            }
          >
            {paginatedProducts.map((product) => (
              <HyperlocalProductCard
                key={product.id}
                product={product}
                viewMode={viewMode === 'list' ? 'list' : 'grid'}
              />
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        {!isLoading && searchResults.length > 0 && viewMode !== 'map' && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-mono text-xs">
          ⚡ Loading Hyperlocal Produce Search Engine...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
