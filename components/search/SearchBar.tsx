'use client';

import React from 'react';
import { Search, Navigation, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { DEFAULT_LOCATIONS } from '@/constants';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
  location?: string;
  onLocationChange?: (loc: string) => void;
  onDetectLocation?: () => void;
  isLocating?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  location = DEFAULT_LOCATIONS[0],
  onLocationChange,
  onDetectLocation,
  isLocating = false,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700 p-2 sm:p-2.5 shadow-sm hover:border-emerald-400 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-3 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search organic vine tomatoes, avocados, croissants, farm milk..."
          className="w-full bg-transparent px-3 text-slate-900 dark:text-white placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
          aria-label="Search produce"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Button onClick={onSearch} variant="primary" size="md">
          Search
        </Button>
      </div>

      {onLocationChange && (
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <Navigation className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>Location:</span>
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            aria-label="Select search location"
          >
            {DEFAULT_LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="dark:bg-slate-900">
                {loc}
              </option>
            ))}
          </select>
          {onDetectLocation && (
            <button
              onClick={onDetectLocation}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
            >
              Detect
            </button>
          )}
        </div>
      )}
    </div>
  );
};
