'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles, TrendingUp, History, X, ArrowRight } from 'lucide-react';

interface AiSearchAssistantProps {
  onSearch: (query: string) => void;
  className?: string;
}

const ROTATING_PROMPTS = [
  'Find organic vine tomatoes under $2.50 near me',
  'Tree-ripened Hass avocados with 95%+ freshness score',
  'French sourdough croissants baked this morning',
  'Grass-fed organic milk within 1 mile',
];

export const AiSearchAssistant: React.FC<AiSearchAssistantProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Vine-Ripened Organic Tomatoes',
    'Tree-Ripened Hass Avocados',
    'Grass-Fed Glass Milk',
  ]);

  // Rotate example prompts when query is empty
  useEffect(() => {
    if (query !== '') return;
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [query]);

  const examplePrompts = [
    'Find fresh tomatoes under $2.50 near me',
    'Organic avocados with 95%+ freshness score',
    'French croissants baked this morning',
    'Grass-fed milk within 1 mile',
  ];

  const trendingSearches = [
    'Organic Vine Tomatoes',
    'Tree-Ripened Hass Avocados',
    'French Butter Croissants',
    'Raw Himalayan Honey',
    'Fresh Blueberries',
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const simulatedVoiceResult = ROTATING_PROMPTS[promptIndex];
      setQuery(simulatedVoiceResult);
      onSearch(simulatedVoiceResult);
    }, 1600);
  };

  const handleExecuteSearch = (q: string) => {
    const finalQuery = q || ROTATING_PROMPTS[promptIndex];
    setQuery(finalQuery);
    if (finalQuery && !searchHistory.includes(finalQuery)) {
      setSearchHistory([finalQuery, ...searchHistory.slice(0, 4)]);
    }
    onSearch(finalQuery);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Outer Glowing Gradient Container */}
      <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-indigo-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] focus-within:shadow-[0_0_45px_rgba(16,185,129,0.4)] transition-all duration-300">
        <div className="relative flex items-center bg-[#070D1B]/95 backdrop-blur-2xl rounded-[22px] p-2 sm:p-2.5 space-x-2 sm:space-x-3 border border-emerald-500/20 text-white select-none">
          {/* Sparkles Icon */}
          <div className="pl-2 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>

          {/* Text Input Container with Rotating Placeholder */}
          <div className="relative flex-1 min-w-0 flex items-center h-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExecuteSearch(query);
              }}
              className="w-full h-full bg-transparent px-1 text-sm sm:text-base text-white font-semibold focus:outline-none z-10"
            />

            {/* Rotating Placeholder Overlay */}
            {query === '' && (
              <div className="absolute inset-0 pointer-events-none flex items-center pl-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={promptIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-slate-400 font-medium text-xs sm:text-sm truncate"
                  >
                    Try AI prompt e.g. "{ROTATING_PROMPTS[promptIndex]}"
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-2xl transition-all flex items-center justify-center relative z-10 ${
                isListening
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 hover:border-emerald-500/40'
              }`}
              title="Voice Dictation AI Search"
              aria-label="Voice Dictation AI Search"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
            </motion.button>
          </div>

          {/* AI Search Action Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExecuteSearch(query)}
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-emerald-500/30 flex items-center space-x-2 transition-all cursor-pointer shrink-0"
          >
            <span>AI Search</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
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
            className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center justify-between shadow-xl backdrop-blur-md"
          >
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <Mic className="w-4 h-4 text-rose-400" />
              <span>Listening to voice dictation... Speak produce query now...</span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
              NLP Active
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested AI Prompts, Trending, and History Chips */}
      <div className="space-y-4 pt-1 text-xs select-none">
        {/* Suggested AI Prompts */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Suggested AI Searches</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p) => (
              <motion.button
                key={p}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleExecuteSearch(p)}
                className="px-3.5 py-1.5 rounded-full bg-[#091122]/90 hover:bg-[#0E1A33] text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 font-semibold text-xs transition-all shadow-xs"
              >
                "{p}"
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Trending Local Searches</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleExecuteSearch(t)}
                className="px-3.5 py-1.5 rounded-full bg-[#091122]/90 hover:bg-[#0E1A33] text-slate-300 hover:text-amber-300 font-semibold text-xs border border-slate-800 hover:border-amber-500/30 transition-all shadow-xs"
              >
                🔥 {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center space-x-1.5">
                <History className="w-3.5 h-3.5 text-indigo-400" />
                <span>Recent Search History</span>
              </span>
              <button
                type="button"
                onClick={() => setSearchHistory([])}
                className="text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((h) => (
                <motion.button
                  key={h}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleExecuteSearch(h)}
                  className="px-3 py-1.5 rounded-full bg-[#091122]/70 hover:bg-[#0E1A33] text-slate-400 hover:text-slate-200 border border-slate-800 font-medium text-xs transition-all shadow-xs"
                >
                  {h}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
