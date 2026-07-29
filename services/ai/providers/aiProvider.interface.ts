export interface ExtractedAiItem {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy' | 'Bakery' | 'Groceries';
  price: number;
  quantity: number;
  unit: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  freshnessScore: number;
  confidence: number; // 0 - 100
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MultiModalExtractionParams {
  audio?: File | Blob | string;
  image?: File | Blob | string;
  shopId?: string;
  providerName?: 'Whisper+Vision' | 'Gemini-1.5' | 'OpenAI-Vision' | 'Groq-Llama';
}

export interface AiExtractionResponse {
  inputType: 'voice' | 'image' | 'voice_and_image';
  audioUrl?: string | null;
  imageUrl?: string | null;
  transcript: string;
  detectedVisionObjects: string[];
  extractedItems: ExtractedAiItem[];
  overallConfidence: number;
  overallFreshness: number;
  provider: string;
  timeProcessedMs: number;
}

export interface IAiProviderAdapter {
  providerName: string;
  processMultiModalInventory(params: MultiModalExtractionParams): Promise<AiExtractionResponse>;
}
