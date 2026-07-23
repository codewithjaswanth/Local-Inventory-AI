import { withRetry } from './utils';

export const bgeService = {
  generateEmbeddings: async (text: string): Promise<number[]> => {
    const endpoint =
      process.env.BGE_EMBEDDINGS_ENDPOINT ||
      'https://api-inference.huggingface.co/models/BAAI/bge-large-en-v1.5';
    const hfToken = process.env.HUGGINGFACE_API_KEY;

    if (!hfToken) {
      console.warn('[BAAI BGE Embeddings API] HuggingFace token missing, generating 1024-dim fallback vector.');
      return Array.from({ length: 1024 }, () => Math.random());
    }

    return withRetry(async () => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        throw new Error(`BAAI BGE Embeddings API failed with status ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data[0]) ? data[0] : data;
    });
  },
};
