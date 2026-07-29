import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';

export interface InventoryItemModel {
  id: string;
  name: string;
  category: string;
  price: string | number;
  unit: string;
  stock_quantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  status?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image_url: string;
  shop_id: string;
  freshness_score?: number;
  created_at: string;
  updated_at: string;
}

export const MOCK_INVENTORY_ITEMS: InventoryItemModel[] = [
  {
    id: 'inv-1',
    name: 'Organic Hass Avocados',
    category: 'Fruits',
    price: 1.99,
    unit: 'pcs',
    stock_quantity: 45,
    availability: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 99.4,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 'inv-2',
    name: 'Fresh Vine Tomatoes',
    category: 'Vegetables',
    price: 2.49,
    unit: 'lbs',
    stock_quantity: 80,
    availability: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 98.8,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1500000).toISOString()
  },
  {
    id: 'inv-3',
    name: 'Sweet Honeycrisp Apples',
    category: 'Fruits',
    price: 3.10,
    unit: 'lbs',
    stock_quantity: 120,
    availability: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 99.1,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'inv-4',
    name: 'Baby Spinach Bags 200g',
    category: 'Vegetables',
    price: 2.99,
    unit: 'bags',
    stock_quantity: 8,
    availability: 'Low Stock',
    image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 97.5,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'inv-5',
    name: 'Whole Organic Milk 1L',
    category: 'Dairy',
    price: 3.89,
    unit: 'bottles',
    stock_quantity: 24,
    availability: 'In Stock',
    image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 99.0,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 'inv-6',
    name: 'Alphonso Mangoes',
    category: 'Fruits',
    price: 4.50,
    unit: 'lbs',
    stock_quantity: 0,
    availability: 'Out of Stock',
    image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80',
    shop_id: 'shop-1',
    freshness_score: 95.0,
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    updated_at: new Date(Date.now() - 18000000).toISOString()
  }
];

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

  getInventoryByShopId: async (shopId: string): Promise<InventoryItemModel[]> => {
    if (!isSupabaseConfigured) {
      return MOCK_INVENTORY_ITEMS;
    }

    try {
      const { data, error } = await (supabase.from('inventory') as any)
        .select('*')
        .eq('shop_id', shopId)
        .order('updated_at', { ascending: false });

      if (error || !data) {
        console.warn('[INVENTORY_SERVICE] Error fetching inventory from Supabase:', error?.message);
        return MOCK_INVENTORY_ITEMS;
      }

      return data.map((item: any) => ({
        id: item.id,
        name: item.name || 'Produce Item',
        category: item.category || 'Vegetables',
        price: item.price,
        unit: item.unit || 'lbs',
        stock_quantity: item.quantity ?? item.stock_quantity ?? 0,
        availability:
          item.availability ||
          ((item.quantity ?? item.stock_quantity ?? 0) <= 0
            ? 'Out of Stock'
            : (item.quantity ?? item.stock_quantity ?? 0) <= 10
            ? 'Low Stock'
            : 'In Stock'),
        image_url:
          item.image_url ||
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
        shop_id: item.shop_id,
        freshness_score: item.freshness_score || 98,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));
    } catch (err) {
      console.error('[INVENTORY_SERVICE] Exception in getInventoryByShopId:', err);
      return MOCK_INVENTORY_ITEMS;
    }
  },

  createInventoryItem: async (
    item: Omit<InventoryItemModel, 'id' | 'created_at' | 'updated_at'>
  ): Promise<{ data: InventoryItemModel | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      const mockNewItem: InventoryItemModel = {
        ...item,
        id: `inv-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return { data: mockNewItem, error: null };
    }

    try {
      const payload = {
        shop_id: item.shop_id,
        name: item.name,
        category: item.category,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0 : item.price,
        quantity: item.stock_quantity,
        unit: item.unit,
        availability: item.availability,
        image_url: item.image_url,
        freshness_score: item.freshness_score || 99,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await (supabase.from('inventory') as any)
        .insert([payload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      return {
        data: {
          id: data.id,
          name: data.name || item.name,
          category: data.category || item.category,
          price: data.price,
          unit: data.unit,
          stock_quantity: data.quantity,
          availability: data.availability || item.availability,
          image_url: data.image_url || item.image_url,
          shop_id: data.shop_id,
          freshness_score: data.freshness_score,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        },
        error: null
      };
    } catch (err: any) {
      return { data: null, error: err.message || 'Error creating inventory item' };
    }
  },

  updateInventoryItem: async (
    id: string,
    updates: Partial<Omit<InventoryItemModel, 'id' | 'created_at'>>
  ): Promise<{ data: InventoryItemModel | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      const mockUpdated: InventoryItemModel = {
        id,
        name: updates.name || 'Updated Product',
        category: updates.category || 'Vegetables',
        price: updates.price || 2.99,
        unit: updates.unit || 'lbs',
        stock_quantity: updates.stock_quantity ?? 10,
        availability: updates.availability || 'In Stock',
        image_url: updates.image_url || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
        shop_id: updates.shop_id || 'shop-1',
        freshness_score: updates.freshness_score || 98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return { data: mockUpdated, error: null };
    }

    try {
      const payload: any = {
        updated_at: new Date().toISOString()
      };
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.price !== undefined) {
        payload.price = typeof updates.price === 'string' ? parseFloat(updates.price.replace(/[^0-9.]/g, '')) || 0 : updates.price;
      }
      if (updates.stock_quantity !== undefined) payload.quantity = updates.stock_quantity;
      if (updates.unit !== undefined) payload.unit = updates.unit;
      if (updates.availability !== undefined) payload.availability = updates.availability;
      if (updates.image_url !== undefined) payload.image_url = updates.image_url;
      if (updates.freshness_score !== undefined) payload.freshness_score = updates.freshness_score;

      const { data, error } = await (supabase.from('inventory') as any)
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      return {
        data: {
          id: data.id,
          name: data.name || updates.name || 'Product',
          category: data.category || updates.category || 'Vegetables',
          price: data.price,
          unit: data.unit,
          stock_quantity: data.quantity,
          availability: data.availability || updates.availability || 'In Stock',
          image_url: data.image_url || updates.image_url || '',
          shop_id: data.shop_id,
          freshness_score: data.freshness_score,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        },
        error: null
      };
    } catch (err: any) {
      return { data: null, error: err.message || 'Error updating inventory item' };
    }
  },

  deleteInventoryItem: async (id: string): Promise<{ success: boolean; error: string | null }> => {
    if (!isSupabaseConfigured) {
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase.from('inventory') as any)
        .delete()
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error deleting inventory item' };
    }
  },

  getShopInventoryStats: async (shopId: string) => {
    const items = await inventoryService.getInventoryByShopId(shopId);
    const totalProducts = items.length;
    const lowStockCount = items.filter((i) => i.availability === 'Low Stock' || (i.stock_quantity > 0 && i.stock_quantity <= 10)).length;
    const outOfStockCount = items.filter((i) => i.availability === 'Out of Stock' || i.stock_quantity <= 0).length;
    const totalValue = items.reduce((acc, curr) => {
      const numPrice = typeof curr.price === 'string' ? parseFloat(curr.price.replace(/[^0-9.]/g, '')) || 0 : curr.price;
      return acc + numPrice * curr.stock_quantity;
    }, 0);

    return {
      totalProducts,
      lowStockCount,
      outOfStockCount,
      totalValue
    };
  },

  upsertInventoryItem: async (item: {
    shopId: string;
    productId: string;
    price: number;
    quantity: number;
    unit: string;
    freshnessScore: number;
  }) => {
    return inventoryService.createInventoryItem({
      shop_id: item.shopId,
      name: 'Produce Product',
      category: 'Vegetables',
      price: item.price,
      unit: item.unit,
      stock_quantity: item.quantity,
      availability: item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 10 ? 'Low Stock' : 'In Stock',
      image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      freshness_score: item.freshnessScore
    });
  }
};
