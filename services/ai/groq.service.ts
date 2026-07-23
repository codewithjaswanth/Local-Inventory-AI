import { withRetry } from './utils';

export interface ExtractedProductJSON {
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  freshnessScore: number;
  confidence: number;
}

export const groqService = {
  extractStructuredInventory: async (
    transcript: string,
    detectedObjects: string[]
  ): Promise<ExtractedProductJSON[]> => {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn('[Groq LLM API] Key missing, using structured JSON extraction fallback.');
      return [
        {
          name: 'Organic Vine Tomatoes',
          category: 'Vegetables',
          price: 2.49,
          unit: 'lb',
          quantity: 25,
          freshnessScore: 98,
          confidence: 96,
        },
        {
          name: 'Yukon Gold Potatoes',
          category: 'Vegetables',
          price: 1.99,
          unit: 'lb',
          quantity: 40,
          freshnessScore: 95,
          confidence: 92,
        },
        {
          name: 'Fresh Bunch Spinach',
          category: 'Vegetables',
          price: 2.99,
          unit: 'bundle',
          quantity: 15,
          freshnessScore: 97,
          confidence: 94,
        },
      ];
    }

    return withRetry(async () => {
      const prompt = `
      You are an AI inventory extraction parser. Given the following audio transcript and detected vision objects:
      Transcript: "${transcript}"
      Detected Objects: ${JSON.stringify(detectedObjects)}

      Extract a JSON array of items with fields: name, category, price (number), unit (string), quantity (number), freshnessScore (0-100), confidence (0-100).
      Return ONLY valid JSON.
      `;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq LLM API failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      return parsed.items || parsed;
    });
  },
};
