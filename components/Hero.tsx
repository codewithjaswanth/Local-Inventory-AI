'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { AiSearchAssistant } from './ai/AiSearchAssistant';
import { AiConfidenceBadge } from './ai/AiConfidenceBadge';
import { Search, MapPin, Sparkles, Navigation, ShieldCheck, ArrowRight, Camera, Mic, CheckCircle2, Loader2 } from 'lucide-react';
import { getUserLocation, UserCoordinates, getCityOrVillageFromCoords } from '@/utils/geolocation';

interface HeroProps {
  onSearchSubmit: (term: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const [userLocation, setUserLocation] = useState<UserCoordinates | null>(null);
  const [locationLabel, setLocationLabel] = useState<string>('Location Detected');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  useEffect(() => {
    handleDetectLocation();
  }, []);

  const handleDetectLocation = () => {
    setIsLocating(true);
    getUserLocation(8000).then(async (res) => {
      setIsLocating(false);
      if (res.coordinates) {
        setUserLocation(res.coordinates);
        const name = await getCityOrVillageFromCoords(res.coordinates.latitude, res.coordinates.longitude);
        setLocationLabel(name);
      } else {
        setLocationLabel('Guntur / Vijayawada Region');
      }
    });
  };

  return (
    <section id="hero" className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-hero-pattern overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tagline Badge & Customer Location Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>AI-Powered Hyperlocal Live Marketplace</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold">
                LIVE
              </span>
            </motion.div>

            {/* Customer Delivery Location Pill */}
            <motion.button
              type="button"
              onClick={handleDetectLocation}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/30 text-xs sm:text-sm font-semibold text-slate-200 shadow-lg backdrop-blur-md transition-all group cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-400 font-medium">Delivering to:</span>
              <span className="text-emerald-400 font-bold max-w-[180px] sm:max-w-[260px] truncate">{locationLabel}</span>
              {isLocating ? (
                <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin ml-1" />
              ) : (
                <span className="text-slate-400 group-hover:text-emerald-400 transition-colors ml-0.5 font-bold text-xs">⌵</span>
              )}
            </motion.button>
          </div>

          {/* Large Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]"
          >
            Find Fresh Products <br className="hidden sm:inline" />
            <span className="text-gradient-emerald">Near You</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Search nearby vegetable and fruit shops with live inventory powered by AI.
          </motion.p>

          {/* Main Search Bar & Location Component */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 max-w-2xl mx-auto"
          >
            <AiSearchAssistant
              onSearch={(query) => {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
