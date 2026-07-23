import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const storageService = {
  uploadProductImage: async (file: File | Blob, fileName: string): Promise<{ publicUrl: string | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      return {
        publicUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        error: null,
      };
    }

    try {
      const filePath = `product-images/${Date.now()}_${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from('inventory-assets')
        .upload(filePath, file);

      if (uploadError) return { publicUrl: null, error: uploadError.message };

      const { data } = supabase.storage.from('inventory-assets').getPublicUrl(filePath);
      return { publicUrl: data.publicUrl, error: null };
    } catch (err: any) {
      return { publicUrl: null, error: err.message || 'Storage upload error' };
    }
  },

  uploadAudioMemo: async (file: File | Blob, fileName: string): Promise<{ publicUrl: string | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      return {
        publicUrl: 'https://example.com/audio.m4a',
        error: null,
      };
    }

    try {
      const filePath = `audio-memos/${Date.now()}_${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from('inventory-assets')
        .upload(filePath, file);

      if (uploadError) return { publicUrl: null, error: uploadError.message };

      const { data } = supabase.storage.from('inventory-assets').getPublicUrl(filePath);
      return { publicUrl: data.publicUrl, error: null };
    } catch (err: any) {
      return { publicUrl: null, error: err.message || 'Storage upload error' };
    }
  },
};
