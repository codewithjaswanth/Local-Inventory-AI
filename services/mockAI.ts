import { whisperService } from './ai/whisper.service';
import { florenceService } from './ai/florence.service';
import { groqService } from './ai/groq.service';
import { aiPipelineService } from './ai/pipeline.service';

export interface ExtractedInventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  freshnessScore: number;
  confidence: number;
}

export const mockAiService = {
  transcribeAudio: async (audioFile?: File | string): Promise<string> => {
    return whisperService.transcribeAudio(audioFile || 'sample_audio');
  },

  detectProducts: async (imageUrl?: string): Promise<string[]> => {
    const vision = await florenceService.detectProducts(
      imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e'
    );
    return vision.detectedObjects;
  },

  extractInventory: async (transcript: string, products: string[]): Promise<ExtractedInventoryItem[]> => {
    const items = await groqService.extractStructuredInventory(transcript, products);
    return items.map((item, idx) => ({
      id: `ext-${idx + 1}`,
      name: item.name,
      category: item.category,
      price: item.price,
      unit: item.unit,
      quantity: item.quantity,
      freshnessScore: item.freshnessScore,
      confidence: item.confidence,
    }));
  },

  calculateFreshness: async (items: ExtractedInventoryItem[]): Promise<number> => {
    if (items.length === 0) return 98;
    const total = items.reduce((acc, item) => acc + item.freshnessScore, 0);
    return Math.round(total / items.length);
  },

  generateConfidence: async (items: ExtractedInventoryItem[]): Promise<number> => {
    if (items.length === 0) return 96;
    const total = items.reduce((acc, item) => acc + item.confidence, 0);
    return Math.round(total / items.length);
  },

  executePipeline: async (imageFile?: File | string, audioFile?: File | string) => {
    return aiPipelineService.executeInventoryUpdatePipeline(imageFile, audioFile);
  },
};
