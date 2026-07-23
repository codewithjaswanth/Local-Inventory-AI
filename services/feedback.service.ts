import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const feedbackService = {
  submitFeedback: async (shopId: string, productId: string | null, available: boolean) => {
    if (!isSupabaseConfigured) return { success: true };

    const { error } = await (supabase.from('feedback') as any).insert({
      shop_id: shopId,
      product_id: productId,
      available,
      created_at: new Date().toISOString(),
    });

    return { success: !error, error: error ? error.message : null };
  },
};
