import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ExtractedAiItem } from './ai/providers/aiProvider.interface';

export interface InventoryHistoryRecord {
  id?: string;
  shopId: string;
  inputType: 'voice' | 'image' | 'voice_and_image';
  audioUrl?: string | null;
  imageUrl?: string | null;
  rawTranscript?: string;
  extractedJson: ExtractedAiItem[];
  confirmedItemsCount: number;
  overallConfidence: number;
  provider: string;
  createdAt?: string;
}

export const MOCK_HISTORY_RECORDS: InventoryHistoryRecord[] = [
  {
    id: 'hist-1',
    shopId: 'shop-1',
    inputType: 'voice_and_image',
    audioUrl: 'https://example.com/memo.m4a',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
    rawTranscript: 'Updated 45 avocados and 80 lbs of vine tomatoes received today.',
    extractedJson: [
      {
        id: '1',
        name: 'Hass Avocados',
        category: 'Fruits',
        price: 1.99,
        quantity: 45,
        unit: 'pcs',
        availability: 'In Stock',
        freshnessScore: 99,
        confidence: 98,
        status: 'accepted'
      }
    ],
    confirmedItemsCount: 2,
    overallConfidence: 98,
    provider: 'Whisper + Vision AI Adapter',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

export const inventoryHistoryService = {
  logOperation: async (
    record: InventoryHistoryRecord
  ): Promise<{ success: boolean; error: string | null }> => {
    if (!isSupabaseConfigured) {
      MOCK_HISTORY_RECORDS.unshift({
        ...record,
        id: `hist-${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      return { success: true, error: null };
    }

    try {
      const payload = {
        shop_id: record.shopId,
        input_type: record.inputType,
        audio_url: record.audioUrl,
        image_url: record.imageUrl,
        raw_transcript: record.rawTranscript,
        extracted_json: record.extractedJson,
        confirmed_items_count: record.confirmedItemsCount,
        overall_confidence: record.overallConfidence,
        provider: record.provider,
        created_at: new Date().toISOString()
      };

      const { error } = await (supabase.from('inventory_history') as any).insert([payload]);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to log inventory history' };
    }
  },

  getHistoryByShopId: async (shopId: string): Promise<InventoryHistoryRecord[]> => {
    if (!isSupabaseConfigured) {
      return MOCK_HISTORY_RECORDS;
    }

    try {
      const { data, error } = await (supabase.from('inventory_history') as any)
        .select('*')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_HISTORY_RECORDS;
      }

      return data.map((item: any) => ({
        id: item.id,
        shopId: item.shop_id,
        inputType: item.input_type,
        audioUrl: item.audio_url,
        imageUrl: item.image_url,
        rawTranscript: item.raw_transcript,
        extractedJson: item.extracted_json || [],
        confirmedItemsCount: item.confirmed_items_count || 0,
        overallConfidence: item.overall_confidence || 95,
        provider: item.provider || 'AI Adapter',
        createdAt: item.created_at
      }));
    } catch {
      return MOCK_HISTORY_RECORDS;
    }
  }
};
