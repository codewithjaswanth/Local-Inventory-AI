import { storageService } from '../storage.service';
import { whisperService } from './whisper.service';
import { florenceService } from './florence.service';
import { groqService, ExtractedProductJSON } from './groq.service';
import { bgeService } from './bge.service';
import { n8nService } from './n8n.service';
import { inventoryService } from '../inventory.service';

export interface PipelineExecutionResult {
  imageUrl: string | null;
  audioUrl: string | null;
  transcript: string;
  detectedVisionObjects: string[];
  extractedItems: ExtractedProductJSON[];
  embeddingsDim: number;
  overallFreshness: number;
  overallConfidence: number;
  n8nWebhookTriggered: boolean;
  timeProcessedMs: number;
}

export const aiPipelineService = {
  executeInventoryUpdatePipeline: async (
    imageFile?: File | Blob | string,
    audioFile?: File | Blob | string,
    shopId = 'shop-1'
  ): Promise<PipelineExecutionResult> => {
    const startTime = Date.now();

    // Step 1 & 2: Store Image & Audio in Supabase Storage
    let imageUrl: string | null = null;
    let audioUrl: string | null = null;

    if (imageFile && typeof imageFile !== 'string') {
      const res = await storageService.uploadProductImage(imageFile, 'crate_photo.jpg');
      imageUrl = res.publicUrl;
    } else if (typeof imageFile === 'string') {
      imageUrl = imageFile;
    }

    if (audioFile && typeof audioFile !== 'string') {
      const res = await storageService.uploadAudioMemo(audioFile, 'voice_memo.m4a');
      audioUrl = res.publicUrl;
    }

    // Step 3: Transcribe Audio via Whisper
    const transcript = await whisperService.transcribeAudio(audioFile || 'sample_audio');

    // Step 4: Detect Products via Florence-2 Vision
    const visionResult = await florenceService.detectProducts(
      imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e'
    );

    // Step 5: Extract Structured Inventory via Groq LLM
    const extractedItems = await groqService.extractStructuredInventory(
      transcript,
      visionResult.detectedObjects
    );

    // Step 6: Generate Embeddings via BAAI BGE
    const embeddings = await bgeService.generateEmbeddings(
      extractedItems.map((i) => i.name).join(', ')
    );

    // Step 7: Save Inventory to Supabase DB & Update Freshness
    for (const item of extractedItems) {
      await inventoryService.upsertInventoryItem({
        shopId,
        productId: `prod-${Date.now()}`,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        freshnessScore: item.freshnessScore,
      });
    }

    // Step 8: Trigger n8n Webhook & Return JSON
    const overallFreshness = Math.round(
      extractedItems.reduce((acc, i) => acc + i.freshnessScore, 0) / extractedItems.length
    );
    const overallConfidence = Math.round(
      extractedItems.reduce((acc, i) => acc + i.confidence, 0) / extractedItems.length
    );

    const n8nResult = await n8nService.triggerWebhook({
      shopId,
      itemsCount: extractedItems.length,
      overallFreshness,
      overallConfidence,
      timestamp: new Date().toISOString(),
    });

    const timeProcessedMs = Date.now() - startTime;

    return {
      imageUrl,
      audioUrl,
      transcript,
      detectedVisionObjects: visionResult.detectedObjects,
      extractedItems,
      embeddingsDim: embeddings.length,
      overallFreshness,
      overallConfidence,
      n8nWebhookTriggered: n8nResult.success,
      timeProcessedMs,
    };
  },
};
