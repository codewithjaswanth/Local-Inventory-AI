'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiSearchAssistant } from './ai/AiSearchAssistant';
import { MapPin, Loader2, ChevronDown, Sparkles } from 'lucide-react';
import { getUserLocation, getCityOrVillageFromCoords } from '@/utils/geolocation';
import { LocationModal } from './LocationModal';

interface HeroProps {
  onSearchSubmit: (term: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const [locationLabel, setLocationLabel] = useState<string>('Tadikonda, Andhra Pradesh');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('inventra_user_location');
    if (saved) {
      setLocationLabel(saved);
    } else {
      handleAutoDetect();
    }
  }, []);

  const handleAutoDetect = async () => {
    setIsLocating(true);
    try {
      const res = await getUserLocation(8000);
      if (res.coordinates) {
        const name = await getCityOrVillageFromCoords(res.coordinates.latitude, res.coordinates.longitude);
        setLocationLabel(name);
        localStorage.setItem('inventra_user_location', name);
      } else {
        setLocationLabel('Tadikonda, Andhra Pradesh');
      }
    } catch {
      setLocationLabel('Tadikonda, Andhra Pradesh');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSelectLocation = (newLoc: string) => {
    setLocationLabel(newLoc);
    localStorage.setItem('inventra_user_location', newLoc);
  };

  return (
    <section id="hero" className="relative pt-16 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16 bg-zinc-950 overflow-hidden">
      {/* Ambient Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Top Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* AI Search Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-[11px] sm:text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>AI-Powered Local Search</span>
            </div>

            {/* Location Delivery Selector Pill */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs font-medium text-zinc-300 hover:border-zinc-700 transition-colors cursor-pointer active:scale-95"
              title="Click to change delivery location"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-zinc-400">Delivering to:</span>
              <span className="text-emerald-400 font-bold max-w-[140px] sm:max-w-[240px] truncate">
                {locationLabel}
              </span>
              {isLocating ? (
                <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin ml-0.5 shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-0.5 shrink-0" />
              )}
            </button>
          </div>

          {/* Location Selection Modal */}
          <LocationModal
            isOpen={isLocationModalOpen}
            onClose={() => setIsLocationModalOpen(false)}
            currentLocation={locationLabel}
            onSelectLocation={handleSelectLocation}
          />

          {/* Hero Header */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12]">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Find It{' '}
            </span>
            <span className="text-white">Near You.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base md:text-lg text-zinc-400 font-normal max-w-xl mx-auto leading-relaxed px-2">
            See which shop near you has what you need — right now.
          </p>

          {/* Single Sleek Search Bar */}
          <div className="pt-1 sm:pt-2 max-w-2xl mx-auto">
            <AiSearchAssistant
              onSearch={(query) => {
                onSearchSubmit(query);
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
