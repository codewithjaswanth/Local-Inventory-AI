import { bgeService } from './ai/bge.service';
import { normalizeMultilingualQuery } from './ai/multilingual.utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface GenerateEmbeddingResponse {
  embedding: number[];
  normalizedName: string;
  detectedLanguage: string;
  dimension: number;
}

export const embeddingService = {
  generateEmbedding: async (productName: string): Promise<GenerateEmbeddingResponse> => {
    // Normalize multilingual query (English, Telugu, Hindi, misspellings, plurals)
    const { normalizedQuery, originalLanguage } = normalizeMultilingualQuery(productName);

    // Call BAAI BGE 1024-dim embedding model
    const vector = await bgeService.generateEmbeddings(normalizedQuery);

    return {
      embedding: vector,
      normalizedName: normalizedQuery,
      detectedLanguage: originalLanguage,
      dimension: vector.length,
    };
  },

  storeEmbedding: async (
    targetId: string,
    embedding: number[],
    targetTable: 'inventory' | 'products' = 'inventory'
  ): Promise<{ success: boolean; error: string | null }> => {
    if (!isSupabaseConfigured) {
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase.from(targetTable) as any)
        .update({ embedding })
        .eq('id', targetId);

      return {
        success: !error,
        error: error ? error.message : null,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Failed to store vector embedding',
      };
    }
  },
};
