'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles, TrendingUp, History, X, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface AiSearchAssistantProps {
  onSearch: (query: string) => void;
  className?: string;
}

const ROTATING_PROMPTS = [
  'Fresh organic tomatoes',
  'Tree-ripened Hass avocados with 95%+ freshness score',
  'French sourdough bread baked this morning',
  'Grass-fed organic milk within 1 mile',
];

export const AiSearchAssistant: React.FC<AiSearchAssistantProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Slim Fit Cotton Shirt',
    'Tree-Ripened Hass Avocados',
    'Grass-Fed Glass Milk',
  ]);

  // Rotate example prompts when query is empty
  useEffect(() => {
    if (query !== '') return;
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [query]);

  const examplePrompts = [
    'Find slim-fit cotton shirts under ₹1,499 near me',
    'Organic avocados with 95%+ freshness score',
    'French croissants baked this morning',
    'Grass-fed milk within 1 mile',
  ];

  const trendingSearches = [
    'Slim Fit Cotton Shirts',
    'Tree-Ripened Hass Avocados',
    'French Butter Croissants',
    'Raw Himalayan Honey',
    'Fresh Blueberries',
  ];

  const handleExecuteSearch = useCallback((q: string) => {
    const finalQuery = q || ROTATING_PROMPTS[promptIndex];
    setQuery(finalQuery);
    if (finalQuery && !searchHistory.includes(finalQuery)) {
      setSearchHistory((prev) => [finalQuery, ...prev.slice(0, 4)]);
    }
    onSearch(finalQuery);
  }, [promptIndex, searchHistory, onSearch]);

  const handleVoiceSearch = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        setIsListening(true);

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');

          setQuery(transcript);

          if (event.results[0].isFinal) {
            setIsListening(false);
            if (transcript.trim()) {
              handleExecuteSearch(transcript);
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'no-speech' || event.error === 'network') {
            const fallback = ROTATING_PROMPTS[promptIndex];
            setQuery(fallback);
            handleExecuteSearch(fallback);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Failed to start speech recognition:', err);
      }
    }

    // Fallback for browsers without Web Speech API support
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const simulatedVoiceResult = ROTATING_PROMPTS[promptIndex];
      setQuery(simulatedVoiceResult);
      handleExecuteSearch(simulatedVoiceResult);
    }, 2000);
  }, [promptIndex, handleExecuteSearch]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Outer Glowing Gradient Container */}
      <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-indigo-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] focus-within:shadow-[0_0_45px_rgba(16,185,129,0.4)] transition-all duration-300">
        <div className="relative flex items-center bg-[#070D1B]/95 backdrop-blur-2xl rounded-[22px] p-2 sm:p-2.5 space-x-2 sm:space-x-3 border border-emerald-500/20 text-white select-none">
          {/* Search Bar Symbol */}
          <div className="pl-3 shrink-0 flex items-center">
            <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          {/* Text Input Container with Rotating Placeholder */}
          <div className="relative flex-1 min-w-0 flex items-center h-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExecuteSearch(query);
              }}
              placeholder="Search products, shops, or categories..."
              className="w-full h-full bg-transparent px-2 text-sm sm:text-base text-white font-semibold placeholder-slate-400 focus:outline-none z-10"
            />
          </div>

          {/* Clear Query Button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Dictation Button */}
          <div className="relative shrink-0">
            {isListening && (
              <span className="absolute inset-0 rounded-2xl bg-rose-500/50 animate-ping" />
            )}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-2xl transition-all duration-200 flex items-center justify-center relative z-10 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 ring-2 ring-rose-400'
                  : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 hover:border-emerald-500/40'
              }`}
              title="Voice Dictation AI Search"
              aria-label="Voice Dictation AI Search"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-white' : 'text-emerald-400'}`} />
            </motion.button>
          </div>

          {/* Search Action Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExecuteSearch(query)}
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-emerald-500/30 flex items-center space-x-2 transition-all duration-200 cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4 text-slate-950 font-bold" />
            <span>Search</span>
          </motion.button>
        </div>
      </div>

      {/* Voice Dictation Listening Notice Banner */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center justify-between shadow-xl backdrop-blur-md"
          >
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>Listening to voice dictation... Speak your product or shop name now...</span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
              Mic Active
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested AI Prompts, Trending, and History */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 pt-1 text-xs select-none overflow-hidden"
          >
            {/* Suggested AI Prompts */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Suggested AI Searches</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleExecuteSearch(prompt)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-emerald-500/50 transition-all text-xs font-medium cursor-pointer"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Local Searches */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Trending Local Searches</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleExecuteSearch(term)}
                    className="px-3 py-1 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <span className="text-amber-400">🔥</span>
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Search History */}
            {searchHistory.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold flex items-center space-x-1.5">
                    <History className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Recent Search History</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchHistory([])}
                    className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleExecuteSearch(item)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
