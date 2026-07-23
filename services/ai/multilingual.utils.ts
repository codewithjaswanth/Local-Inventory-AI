export const MULTILINGUAL_DICTIONARY: Record<string, string> = {
  // Telugu
  టమాటోలు: 'tomatoes',
  టమాటా: 'tomatoes',
  tamatalu: 'tomatoes',
  అలసందలు: 'beans',
  మామిడి: 'mangoes',
  బంగాళాదుంప: 'potatoes',
  పాలు: 'milk',
  పాలకూర: 'spinach',

  // Hindi
  टमाटर: 'tomatoes',
  tamatar: 'tomatoes',
  आलू: 'potatoes',
  aalu: 'potatoes',
  दूध: 'milk',
  doodh: 'milk',
  पालक: 'spinach',
  palak: 'spinach',
  आम: 'mangoes',
  aam: 'mangoes',

  // Common Misspellings & Plurals
  tomatose: 'tomatoes',
  tomatos: 'tomatoes',
  potatose: 'potatoes',
  potatos: 'potatoes',
  avocados: 'avocado',
  avocadoses: 'avocado',
  croisants: 'croissants',
  crosants: 'croissants',
};

export function normalizeMultilingualQuery(query: string): { normalizedQuery: string; originalLanguage: string } {
  let text = query.trim().toLowerCase();
  let detectedLang = 'English';

  // Check for Telugu characters
  if (/[\u0C00-\u0C7F]/.test(text)) {
    detectedLang = 'Telugu (తెలుగు)';
  } else if (/[\u0900-\u097F]/.test(text)) {
    detectedLang = 'Hindi (हिंदी)';
  }

  // Replace multilingual words using dictionary
  Object.keys(MULTILINGUAL_DICTIONARY).forEach((word) => {
    if (text.includes(word)) {
      text = text.replace(new RegExp(word, 'g'), MULTILINGUAL_DICTIONARY[word]);
    }
  });

  return {
    normalizedQuery: text,
    originalLanguage: detectedLang,
  };
}
