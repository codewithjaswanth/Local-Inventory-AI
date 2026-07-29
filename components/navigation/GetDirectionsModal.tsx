'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  MapPin,
  Car,
  Bike,
  Footprints,
  Clock,
  ExternalLink,
  X,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Compass
} from 'lucide-react';
import {
  getUserLocation,
  calculateHaversineDistance,
  calculateTravelTime,
  generateGoogleMapsUrl,
  getEffectiveShopCoordinates,
  getCityOrVillageFromCoords,
  TravelMode,
  UserCoordinates
} from '@/utils/geolocation';

export interface GetDirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopName: string;
  shopAddress: string;
  nearbyLandmark?: string;
  shopLatitude?: number | null;
  shopLongitude?: number | null;
  fallbackDistanceKm?: number;
}

export const GetDirectionsModal: React.FC<GetDirectionsModalProps> = ({
  isOpen,
  onClose,
  shopName,
  shopAddress,
  nearbyLandmark,
  shopLatitude,
  shopLongitude,
  fallbackDistanceKm = 1.2,
}) => {
  const [userLocation, setUserLocation] = useState<UserCoordinates | null>(null);
  const [userLocationName, setUserLocationName] = useState<string | null>(null);
  const [isLoadingGps, setIsLoadingGps] = useState<boolean>(true);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<TravelMode>('driving');

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoadingGps(true);
    setGpsError(null);
    setPermissionDenied(false);

    getUserLocation(8000).then(async (res) => {
      if (!isMounted) return;

      setIsLoadingGps(false);
      if (res.coordinates) {
        setUserLocation(res.coordinates);
        const name = await getCityOrVillageFromCoords(res.coordinates.latitude, res.coordinates.longitude);
        if (isMounted) setUserLocationName(name);
      } else {
        setGpsError(res.error);
        setPermissionDenied(res.permissionDenied);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const effectiveShopCoords = getEffectiveShopCoordinates(
    userLocation,
    shopLatitude,
    shopLongitude,
    fallbackDistanceKm
  );

  // Calculate actual GPS distance if coordinates available, otherwise use fallback
  const computedDistanceKm =
    userLocation && effectiveShopCoords
      ? calculateHaversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          effectiveShopCoords.latitude,
          effectiveShopCoords.longitude
        )
      : fallbackDistanceKm;

  const travelTimeEstimate = calculateTravelTime(computedDistanceKm, selectedMode);

  const googleMapsUrl = generateGoogleMapsUrl({
    origin: userLocation,
    destinationLat: effectiveShopCoords?.latitude ?? shopLatitude,
    destinationLng: effectiveShopCoords?.longitude ?? shopLongitude,
    destinationAddress: shopAddress,
    travelMode: selectedMode,
  });

  const handleLaunchGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const modeButtons: { mode: TravelMode; label: string; icon: any }[] = [
    { mode: 'driving', label: 'Driving', icon: Car },
    { mode: 'two-wheeler', label: 'Two-Wheeler', icon: Compass },
    { mode: 'bicycling', label: 'Cycling', icon: Bike },
    { mode: 'walking', label: 'Walking', icon: Footprints },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-lg bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-6 overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close directions modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-start space-x-3 pr-8">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Navigate to {shopName}
              </h2>
              <div className="space-y-0.5 mt-0.5">
                <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{shopAddress}</span>
                </p>
                {nearbyLandmark && (
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span>📍</span>
                    <span>{nearbyLandmark}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Location to Shop Location Route Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                Customer Location:
              </span>
              <span className="text-white font-extrabold">
                {userLocationName
                  ? userLocationName
                  : userLocation
                  ? 'GPS Acquired'
                  : isLoadingGps
                  ? 'Detecting Location...'
                  : 'Location Permission Needed'}
              </span>
            </div>

            <div className="w-full h-px bg-slate-800" />

            <div className="flex items-center justify-between font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
                Near Shop Location:
              </span>
              <span className="text-white font-extrabold truncate max-w-[240px]">
                {shopName} {nearbyLandmark ? `(${nearbyLandmark})` : ''}
              </span>
            </div>
          </div>

          {/* Travel Mode Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select Travel Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modeButtons.map(({ mode, label, icon: Icon }) => {
                const isSelected = selectedMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-glow-emerald scale-[1.02]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance & Travel Time Estimates Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 flex items-center justify-around text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Calculated Distance
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {computedDistanceKm} <span className="text-xs font-normal text-slate-400">km</span>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-800" />

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Estimated Time
              </span>
              <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{travelTimeEstimate}</span>
              </div>
            </div>
          </div>

          {/* Permission Denied / Error Alert Notice */}
          {permissionDenied && (
            <p className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
              📍 GPS location was not granted. Opening Google Maps will use {shopName}&apos;s direct coordinates/address as the destination.
            </p>
          )}

          {/* Main Action Button */}
          <button
            type="button"
            onClick={handleLaunchGoogleMaps}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-glow-emerald transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
