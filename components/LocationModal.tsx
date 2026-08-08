'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, Check, Search, Sparkles, Building2, Map, CheckCircle2, Loader2 } from 'lucide-react';
import { getUserLocation, getCityOrVillageFromCoords, geocodeCityNameToCoords, PRESET_CITY_COORDS } from '@/utils/geolocation';
import { InteractiveLocationPickerMap } from './maps/InteractiveLocationPickerMap';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (locationName: string) => void;
}

export const POPULAR_LOCATIONS = [
  'Tadikonda, Andhra Pradesh',
  'Guntur Main City, AP',
  'Vijayawada Central, AP',
  'Mangalagiri, AP',
  'Tenali Town, AP',
  'Amaravati Capital Region, AP',
  'Hyderabad, Telangana',
  'Visakhapatnam, AP',
  'Bengaluru, Karnataka',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isResolvingName, setIsResolvingName] = useState(false);
  
  // Center coordinates state
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 16.426,
    lng: 80.448,
  });
  
  // Resolved precise village or city name
  const [resolvedName, setResolvedName] = useState<string>(currentLocation || 'Tadikonda, Andhra Pradesh');

  // Sync initial location when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setSearchInput('');
    setResolvedName(currentLocation || 'Tadikonda, Andhra Pradesh');

    // Attempt to geocode current location name to set initial map center
    const syncCoords = async () => {
      const found = await geocodeCityNameToCoords(currentLocation || 'Tadikonda, Andhra Pradesh');
      if (found) {
        setCoords({ lat: found.latitude, lng: found.longitude });
      }
    };
    syncCoords();
  }, [isOpen, currentLocation]);

  // Handle marker drag/click on map
  const handleMapMarkerMove = useCallback(async (lat: number, lng: number) => {
    setCoords({ lat, lng });
    setIsResolvingName(true);
    try {
      const name = await getCityOrVillageFromCoords(lat, lng);
      setResolvedName(name);
    } catch {
      setResolvedName(`${lat.toFixed(3)}, ${lng.toFixed(3)}`);
    } finally {
      setIsResolvingName(false);
    }
  }, []);

  // Handle GPS Auto-Detect
  const handleGPSDetect = async () => {
    setIsDetecting(true);
    try {
      const res = await getUserLocation(8000);
      if (res.coordinates) {
        const { latitude, longitude } = res.coordinates;
        setCoords({ lat: latitude, lng: longitude });
        setIsResolvingName(true);
        const name = await getCityOrVillageFromCoords(latitude, longitude);
        setResolvedName(name);
      } else {
        setResolvedName('Guntur / Vijayawada Region');
      }
    } catch {
      setResolvedName('Guntur / Vijayawada Region');
    } finally {
      setIsDetecting(false);
      setIsResolvingName(false);
    }
  };

  // Handle Search submit
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsResolvingName(true);
    const foundCoords = await geocodeCityNameToCoords(searchInput.trim());
    if (foundCoords) {
      setCoords({ lat: foundCoords.latitude, lng: foundCoords.longitude });
      const name = await getCityOrVillageFromCoords(foundCoords.latitude, foundCoords.longitude);
      setResolvedName(name.length > 0 ? name : searchInput.trim());
    } else {
      setResolvedName(searchInput.trim());
    }
    setIsResolvingName(false);
  };

  // Select Preset city
  const handleSelectPreset = async (locName: string) => {
    setResolvedName(locName);
    if (PRESET_CITY_COORDS[locName]) {
      setCoords(PRESET_CITY_COORDS[locName]);
    } else {
      const found = await geocodeCityNameToCoords(locName);
      if (found) {
        setCoords({ lat: found.latitude, lng: found.longitude });
      }
    }
  };

  // Confirm selection
  const handleConfirmLocation = () => {
    onSelectLocation(resolvedName);
    onClose();
  };

  const filteredLocations = searchInput.trim() === ''
    ? POPULAR_LOCATIONS
    : POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#091122] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3.5 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    Interactive Map Location Picker
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Click map or drag pin to select your precise village or city
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              {/* Search Bar & GPS Button Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <form onSubmit={handleSearchSubmit} className="relative sm:col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search village, city, or area..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-20 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                  />
                  {searchInput.trim() && (
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-xs"
                    >
                      Find
                    </button>
                  )}
                </form>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGPSDetect}
                  disabled={isDetecting}
                  className="px-3 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
                  <span>{isDetecting ? 'Locating...' : 'Locate Me (GPS)'}</span>
                </motion.button>
              </div>

              {/* Interactive Map */}
              <InteractiveLocationPickerMap
                lat={coords.lat}
                lng={coords.lng}
                onMarkerMove={handleMapMarkerMove}
                locationName={resolvedName}
              />

              {/* Precise Resolved Village / City Indicator Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span>Pinpointed Location</span>
                      {isResolvingName && <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />}
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                      {resolvedName}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 font-medium">
                  {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
                </div>
              </div>

              {/* Popular Village & City Quick Presets */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Quick Presets</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {filteredLocations.map((loc) => {
                    const isSelected = resolvedName.toLowerCase() === loc.toLowerCase();
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleSelectPreset(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer Confirm Button */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={handleConfirmLocation}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Confirm Delivery Location: {resolvedName}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
