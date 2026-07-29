import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DETAILED_SHOPS, DetailedShop } from '@/data/mockData';

export interface CreateShopInput {
  owner_id: string;
  shop_name: string;
  owner_name: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  opening_time?: string;
  closing_time?: string;
  category?: 'Vegetables' | 'Fruits' | 'Both';
}

export const shopService = {
  getShops: async (): Promise<DetailedShop[]> => {
    if (!isSupabaseConfigured) {
      return DETAILED_SHOPS;
    }

    try {
      const { data, error } = await (supabase.from('shops') as any).select('*');
      if (error || !data || data.length === 0) {
        return DETAILED_SHOPS;
      }

      return data.map((s: any) => ({
        id: s.id,
        name: s.shop_name,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80',
        distance: 0.3,
        rating: s.rating || 4.9,
        reviewsCount: 184,
        freshnessBadge: '99% AI Verified',
        freshnessScore: 99,
        isOpen: true,
        openTime: `${s.opening_time || '7:00 AM'} - ${s.closing_time || '9:00 PM'}`,
        openingHours: `${s.opening_time || '7:00 AM'} - ${s.closing_time || '9:00 PM'}`,
        address: s.address,
        category: s.category || 'Both',
        phone: s.phone || '+1 (555) 234-5678',
        inventoryCount: 320,
        description: 'Family-owned market with live AI inventory updates.',
        verifiedItems: DETAILED_SHOPS[0].verifiedItems,
        reviews: DETAILED_SHOPS[0].reviews,
      }));
    } catch {
      return DETAILED_SHOPS;
    }
  },

  getShopById: async (id: string): Promise<DetailedShop | undefined> => {
    if (!isSupabaseConfigured) {
      return DETAILED_SHOPS.find((s) => s.id === id) || DETAILED_SHOPS[0];
    }

    try {
      const { data, error } = await (supabase.from('shops') as any).select('*').eq('id', id).single();
      if (error || !data) {
        return DETAILED_SHOPS.find((s) => s.id === id) || DETAILED_SHOPS[0];
      }

      return {
        id: data.id,
        name: data.shop_name,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80',
        distance: 0.3,
        rating: data.rating || 4.9,
        reviewsCount: 184,
        freshnessBadge: '99% AI Verified',
        freshnessScore: 99,
        isOpen: true,
        openTime: `${data.opening_time || '7:00 AM'} - ${data.closing_time || '9:00 PM'}`,
        openingHours: `${data.opening_time || '7:00 AM'} - ${data.closing_time || '9:00 PM'}`,
        address: data.address,
        category: data.category || 'Both',
        phone: data.phone || '+1 (555) 234-5678',
        inventoryCount: 320,
        description: 'Family-owned market with live AI inventory updates.',
        verifiedItems: DETAILED_SHOPS[0].verifiedItems,
        reviews: DETAILED_SHOPS[0].reviews,
      };
    } catch {
      return DETAILED_SHOPS.find((s) => s.id === id) || DETAILED_SHOPS[0];
    }
  },

  getShopByOwnerId: async (ownerId: string) => {
    if (!isSupabaseConfigured) {
      return DETAILED_SHOPS[0];
    }

    try {
      const { data, error } = await (supabase.from('shops') as any)
        .select('*')
        .eq('owner_id', ownerId)
        .maybeSingle();

      if (error || !data) {
        return DETAILED_SHOPS[0];
      }
      return data;
    } catch {
      return DETAILED_SHOPS[0];
    }
  },

  getShopsByOwnerId: async (ownerId: string): Promise<DetailedShop[]> => {
    if (!isSupabaseConfigured) {
      return [DETAILED_SHOPS[0]];
    }

    try {
      const { data, error } = await (supabase.from('shops') as any)
        .select('*')
        .eq('owner_id', ownerId);

      if (error || !data || data.length === 0) {
        return [DETAILED_SHOPS[0]];
      }

      return data.map((s: any) => ({
        id: s.id,
        name: s.shop_name,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80',
        distance: 0.3,
        rating: s.rating || 4.9,
        reviewsCount: 184,
        freshnessBadge: '99% AI Verified',
        freshnessScore: 99,
        isOpen: true,
        openTime: `${s.opening_time || '7:00 AM'} - ${s.closing_time || '9:00 PM'}`,
        openingHours: `${s.opening_time || '7:00 AM'} - ${s.closing_time || '9:00 PM'}`,
        address: s.address,
        category: s.category || 'Both',
        phone: s.phone || '+1 (555) 234-5678',
        inventoryCount: 320,
        description: 'Family-owned market with live AI inventory updates.',
        verifiedItems: DETAILED_SHOPS[0].verifiedItems,
        reviews: DETAILED_SHOPS[0].reviews,
      }));
    } catch {
      return [DETAILED_SHOPS[0]];
    }
  },

  isShopOwnedBy: async (shopId: string, ownerId: string): Promise<boolean> => {
    if (!isSupabaseConfigured) return true;
    try {
      const { data } = await (supabase.from('shops') as any)
        .select('id')
        .eq('id', shopId)
        .eq('owner_id', ownerId)
        .maybeSingle();

      return !!data;
    } catch {
      return false;
    }
  },

  updateShopProfile: async (shopId: string, ownerId: string, updates: Partial<CreateShopInput>) => {
    if (!isSupabaseConfigured) return { success: true, error: null };

    try {
      const { data, error } = await (supabase.from('shops') as any)
        .update({
          shop_name: updates.shop_name,
          phone: updates.phone,
          address: updates.address,
          opening_time: updates.opening_time,
          closing_time: updates.closing_time,
          category: updates.category
        })
        .eq('id', shopId)
        .eq('owner_id', ownerId)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update shop profile' };
    }
  },

  createShop: async (input: CreateShopInput): Promise<{ shop: any | null; error: string | null }> => {
    try {
      // Validate role on server-side/API level
      const { data: profile } = await (supabase.from('profiles') as any)
        .select('role')
        .eq('id', input.owner_id)
        .maybeSingle();

      const userRole = profile?.role;
      if (userRole && userRole !== 'shopkeeper' && userRole !== 'admin') {
        return { shop: null, error: 'Unauthorized: Only shopkeepers and admins can create a shop.' };
      }

      const { data, error } = await (supabase.from('shops') as any).insert({
        owner_id: input.owner_id,
        shop_name: input.shop_name,
        owner_name: input.owner_name,
        phone: input.phone,
        address: input.address,
        latitude: input.latitude || 37.7749,
        longitude: input.longitude || -122.4194,
        opening_time: input.opening_time || '07:00 AM',
        closing_time: input.closing_time || '09:00 PM',
        category: input.category || 'Both',
        rating: 4.9,
      }).select().single();

      if (error) return { shop: null, error: error.message };
      return { shop: data, error: null };
    } catch (err: any) {
      return { shop: null, error: err.message || 'Failed to create shop registration' };
    }
  },
};
