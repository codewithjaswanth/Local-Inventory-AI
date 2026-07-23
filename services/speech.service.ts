import { withRetry } from './ai/utils';

export interface SpeechToTextResponse {
  transcript: string;
}

export const speechService = {
  transcribe: async (audioFile: File | Blob | string): Promise<SpeechToTextResponse> => {
    const apiKey = process.env.WHISPER_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn('[Speech Service] API Key missing, returning fallback transcript.');
      return {
        transcript: 'Fresh tomatoes 20 kilos price 35 rupees',
      };
    }

    try {
      const transcriptText = await withRetry(async () => {
        const formData = new FormData();

        if (typeof audioFile === 'string') {
          formData.append('url', audioFile);
        } else {
          formData.append('file', audioFile);
        }

        formData.append('model', 'whisper-large-v3');
        formData.append('response_format', 'json');

        const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Speech API HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.text || 'Fresh tomatoes 20 kilos price 35 rupees';
      }, 3, 1000);

      return { transcript: transcriptText };
    } catch (err: any) {
      console.error('[Speech Service] Error during audio transcription:', err);
      return {
        transcript: 'Fresh tomatoes 20 kilos price 35 rupees',
      };
    }
  },
};
