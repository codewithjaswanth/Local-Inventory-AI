'use client';

import React, { useState } from 'react';
import { Navigation, MapPin, Check } from 'lucide-react';
import { DEFAULT_LOCATIONS } from '@/constants';

interface LocationSelectorProps {
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentLocation,
  onSelectLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      onSelectLocation('Current Location (Detected via GPS)');
      setIsOpen(false);
    }, 800);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200/80 dark:border-slate-700/60"
        aria-label="Select Location"
      >
        <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span className="truncate max-w-[160px]">{currentLocation}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-2 space-y-1">
          <button
            onClick={handleDetect}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>{isDetecting ? 'Detecting GPS Location...' : 'Use Current GPS Location'}</span>
            </div>
          </button>

          <div className="pt-1 pb-1 px-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Popular Hyperlocal Zones
          </div>

          {DEFAULT_LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                onSelectLocation(loc);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors ${
                currentLocation === loc
                  ? 'bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>{loc}</span>
              {currentLocation === loc && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
