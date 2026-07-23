import { withRetry } from './utils';

export interface N8nWebhookPayload {
  shopId: string;
  itemsCount: number;
  overallFreshness: number;
  overallConfidence: number;
  timestamp: string;
}

export const n8nService = {
  triggerWebhook: async (payload: N8nWebhookPayload): Promise<{ success: boolean }> => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('[n8n Webhook] N8N_WEBHOOK_URL missing, skipping external automation trigger.');
      return { success: true };
    }

    try {
      return await withRetry(async () => {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        return { success: response.ok };
      });
    } catch {
      return { success: false };
    }
  },
};
