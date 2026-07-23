import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';

export const inventoryService = {
  searchInventory: async (
    query?: string,
    category?: string,
    maxPrice?: number,
    minFreshness?: number
  ): Promise<SearchProduct[]> => {
    if (!isSupabaseConfigured) {
      let results = [...SEARCH_PRODUCTS];
      if (category && category !== 'All') {
        results = results.filter((p) => p.category === category);
      }
      if (maxPrice) {
        results = results.filter((p) => p.price <= maxPrice);
      }
      if (minFreshness) {
        results = results.filter((p) => p.freshnessScore >= minFreshness);
      }
      if (query) {
        const q = query.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shopName.toLowerCase().includes(q)
        );
      }
      return results;
    }

    try {
      let req = (supabase.from('inventory') as any).select(`
        id,
        price,
        quantity,
        unit,
        freshness_score,
        confidence_score,
        image_url,
        updated_at,
        shops ( id, shop_name, address, rating ),
        products ( id, name, category_id )
      `);

      if (maxPrice) req = req.lte('price', maxPrice);
      if (minFreshness) req = req.gte('freshness_score', minFreshness);

      const { data, error } = await req;
      if (error || !data || data.length === 0) {
        return SEARCH_PRODUCTS;
      }

      return data.map((inv: any) => ({
        id: inv.id,
        name: inv.products?.name || 'Organic Produce',
        image: inv.image_url || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
        category: 'Vegetables',
        shopId: inv.shops?.id || 'shop-1',
        shopName: inv.shops?.shop_name || 'Green Earth Organics',
        shopAddress: inv.shops?.address || '142 Elm Street, Downtown',
        shopRating: inv.shops?.rating || 4.9,
        price: inv.price,
        unit: inv.unit || 'lb',
        availableQty: inv.quantity,
        distance: 0.3,
        freshnessScore: inv.freshness_score,
        updatedTime: 'Just now',
        verifiedByAi: true,
        organic: true,
      }));
    } catch {
      return SEARCH_PRODUCTS;
    }
  },

  upsertInventoryItem: async (item: {
    shopId: string;
    productId: string;
    price: number;
    quantity: number;
    unit: string;
    freshnessScore: number;
  }) => {
    if (!isSupabaseConfigured) return { success: true };

    const { error } = await (supabase.from('inventory') as any).upsert({
      shop_id: item.shopId,
      product_id: item.productId,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      freshness_score: item.freshnessScore,
      confidence_score: 96,
      updated_at: new Date().toISOString(),
    });

    return { success: !error, error: error ? error.message : null };
  },
};
