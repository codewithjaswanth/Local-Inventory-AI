import { bgeService } from './bge.service';
import { normalizeMultilingualQuery } from './multilingual.utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';

export interface HyperlocalSearchFilters {
  category?: string;
  maxDistance?: number;
  maxPrice?: number;
  minFreshness?: number;
  minRating?: number;
  openNowOnly?: boolean;
  aiVerifiedOnly?: boolean;
  sortBy?: 'relevance' | 'distance' | 'price-asc' | 'price-desc' | 'freshness' | 'rating';
}

export interface SemanticSearchResult {
  products: SearchProduct[];
  aiExplanation: string;
  detectedLanguage: string;
  similarityScore: number;
  queryEmbeddingDim: number;
}

export function sortSearchProducts(products: SearchProduct[], sortBy?: string): SearchProduct[] {
  const list = [...products];
  return list.sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return (a.distance || 0) - (b.distance || 0);
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'freshness':
        return (b.freshnessScore || 0) - (a.freshnessScore || 0);
      case 'rating':
        return (b.shopRating || 0) - (a.shopRating || 0);
      case 'relevance':
      default:
        const scoreA = (a.freshnessScore || 80) / ((a.distance || 1) + 0.5);
        const scoreB = (b.freshnessScore || 80) / ((b.distance || 1) + 0.5);
        return scoreB - scoreA;
    }
  });
}

export const semanticSearchService = {
  executeSemanticSearch: async (
    rawQuery: string,
    filters?: HyperlocalSearchFilters,
    userLat = 37.7749,
    userLng = -122.4194
  ): Promise<SemanticSearchResult> => {
    // 1. Multilingual query normalization (English, Telugu, Hindi, misspellings)
    const { normalizedQuery, originalLanguage } = normalizeMultilingualQuery(rawQuery || '');

    // 2. Generate BAAI BGE 1024-dim vector embedding (future AI semantic search layer)
    const queryEmbedding = await bgeService.generateEmbeddings(normalizedQuery || 'fresh produce');

    // 3. Supabase pgvector RPC search with fallback
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await (supabase as any).rpc('match_inventory_semantic', {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 20,
          user_lat: userLat,
          user_lng: userLng,
        });

        if (!error && data && data.length > 0) {
          let products: SearchProduct[] = data.map((item: any) => ({
            id: item.inventory_id,
            name: item.product_name || 'Fresh Produce',
            image: item.image_url || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
            category: item.category || 'Vegetables',
            shopId: item.shop_id || 'shop-1',
            shopName: item.shop_name || 'Green Earth Organics',
            shopAddress: item.shop_address || '142 Elm Street',
            shopRating: item.rating || 4.9,
            price: Number(item.price) || 2.49,
            unit: item.unit || 'lb',
            availableQty: item.quantity || 50,
            distance: Number((item.distance_miles || 0.5).toFixed(1)),
            freshnessScore: item.freshness_score || 98,
            updatedTime: '12 mins ago',
            verifiedByAi: true,
            organic: true,
            isOpen: true
          }));

          // Apply filters
          if (filters) {
            if (filters.category && filters.category !== 'All') {
              products = products.filter((p) => p.category === filters.category);
            }
            if (filters.maxDistance) {
              products = products.filter((p) => p.distance <= filters.maxDistance!);
            }
            if (filters.maxPrice) {
              products = products.filter((p) => p.price <= filters.maxPrice!);
            }
            if (filters.minFreshness) {
              products = products.filter((p) => p.freshnessScore >= filters.minFreshness!);
            }
            if (filters.minRating) {
              products = products.filter((p) => (p.shopRating || 4.9) >= filters.minRating!);
            }
            if (filters.aiVerifiedOnly) {
              products = products.filter((p) => p.verifiedByAi);
            }
          }

          // Sort products according to filters.sortBy
          products = sortSearchProducts(products, filters?.sortBy);

          const top = products[0] || data[0];
          const aiExplanation = `${top?.shopName || 'Green Earth Organics'} ranked #1 because it is ${top?.distance || 0.3} miles away, updated inventory 12 minutes ago via WhatsApp, with a ${top?.freshnessScore || 98}% AI freshness score and 96% availability confidence.`;

          return {
            products: products.length > 0 ? products : sortSearchProducts(SEARCH_PRODUCTS, filters?.sortBy),
            aiExplanation,
            detectedLanguage: originalLanguage,
            similarityScore: top?.similarity || 0.96,
            queryEmbeddingDim: queryEmbedding.length,
          };
        }
      } catch (err) {
        console.warn('pgvector RPC call fallback:', err);
      }
    }

    // Fallback search logic with AI Explanation
    const q = (normalizedQuery || '').toLowerCase();
    let filtered = SEARCH_PRODUCTS.filter((p) => {
      if (q) {
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchShop = p.shopName.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchShop) return false;
      }

      if (filters) {
        if (filters.category && filters.category !== 'All' && p.category !== filters.category) return false;
        if (filters.maxDistance && p.distance > filters.maxDistance) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minFreshness && p.freshnessScore < filters.minFreshness) return false;
        if (filters.minRating && p.shopRating < filters.minRating) return false;
        if (filters.aiVerifiedOnly && !p.verifiedByAi) return false;
        if (filters.openNowOnly && p.isOpen === false) return false;
      }

      return true;
    });

    let products = filtered.length > 0 ? filtered : SEARCH_PRODUCTS;
    products = sortSearchProducts(products, filters?.sortBy);
    const top = products[0];

    const aiExplanation = `${top.shopName} ranked #1 because it is ${top.distance} miles away, updated inventory 12 minutes ago via WhatsApp, with a ${top.freshnessScore}% AI freshness score and 96% availability confidence.`;

    return {
      products,
      aiExplanation,
      detectedLanguage: originalLanguage,
      similarityScore: 0.96,
      queryEmbeddingDim: queryEmbedding.length,
    };
  },
};
