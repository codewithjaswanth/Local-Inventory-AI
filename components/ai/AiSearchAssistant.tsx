'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles, TrendingUp, History, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface AiSearchAssistantProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const AiSearchAssistant: React.FC<AiSearchAssistantProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Vine-Ripened Organic Tomatoes',
    'Tree-Ripened Hass Avocados',
    'Grass-Fed Glass Milk',
  ]);

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
      const simulatedVoiceResult = 'Find organic vine tomatoes under $2.50 near me';
      setQuery(simulatedVoiceResult);
      onSearch(simulatedVoiceResult);
    }, 1500);
  };

  const handleExecuteSearch = (q: string) => {
    setQuery(q);
    if (q && !searchHistory.includes(q)) {
      setSearchHistory([q, ...searchHistory.slice(0, 4)]);
    }
    onSearch(q);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input Bar with Mic */}
      <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-3xl p-2 sm:p-3 shadow-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all text-white">
        <Sparkles className="w-5 h-5 text-emerald-400 ml-3 flex-shrink-0 animate-pulse" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleExecuteSearch(query);
          }}
          placeholder='Try AI prompt e.g. "Find fresh tomatoes under $2.50 near me"...'
          className="w-full bg-transparent px-3 py-1 text-sm sm:text-base text-white placeholder-slate-400 font-medium focus:outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-full text-slate-400 hover:text-white mr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Voice Search Button */}
        <button
          onClick={handleVoiceSearch}
          className={`p-2.5 rounded-2xl mr-2 transition-all flex items-center justify-center ${
            isListening
              ? 'bg-rose-500 text-white animate-bounce shadow-lg shadow-rose-500/50'
              : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700'
          }`}
          title="Voice Search AI Dictation"
          aria-label="Voice Search AI Dictation"
        >
          <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
        </button>

        <Button
          onClick={() => handleExecuteSearch(query)}
          variant="primary"
          size="md"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          AI Search
        </Button>
      </div>

      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-xs font-mono text-rose-300 flex items-center justify-between"
        >
          <span className="flex items-center">
            <Mic className="w-4 h-4 mr-2 animate-bounce text-rose-400" />
            Listening to voice prompt... Speak produce query now...
          </span>
          <span className="font-bold uppercase tracking-wider text-[10px]">NLP Dictation Active</span>
        </motion.div>
      )}

      {/* Prompts, Trending, History Chips */}
      <div className="space-y-3 pt-2 text-xs">
        {/* Example Natural Language Prompts */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center">
            <Sparkles className="w-3 h-3 text-emerald-400 mr-1" />
            AI Example Prompts (1-Click)
          </span>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleExecuteSearch(p)}
                className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 font-mono text-[11px] transition-all hover:scale-105"
              >
                ✨ "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center">
            <TrendingUp className="w-3 h-3 text-amber-400 mr-1" />
            Trending Local Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((t) => (
              <button
                key={t}
                onClick={() => handleExecuteSearch(t)}
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition-all"
              >
                🔥 {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <History className="w-3 h-3 text-blue-400 mr-1" />
                Recent Search History
              </span>
              <button
                onClick={() => setSearchHistory([])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((h) => (
                <button
                  key={h}
                  onClick={() => handleExecuteSearch(h)}
                  className="px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-medium text-[11px] transition-all"
                >
                  🕒 {h}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
