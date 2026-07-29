'use client';

import React, { useState } from 'react';
import { Navigation } from 'lucide-react';
import { GetDirectionsModal } from './GetDirectionsModal';

export interface GetDirectionsButtonProps {
  shopName: string;
  shopAddress: string;
  nearbyLandmark?: string;
  shopLatitude?: number | null;
  shopLongitude?: number | null;
  distanceKm?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'compact';
  className?: string;
  label?: string;
}

export const GetDirectionsButton: React.FC<GetDirectionsButtonProps> = ({
  shopName,
  shopAddress,
  nearbyLandmark,
  shopLatitude,
  shopLongitude,
  distanceKm,
  variant = 'primary',
  className = '',
  label = 'Get Directions',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const variantStyles = {
    primary:
      'px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-emerald transition-all active:scale-95',
    secondary:
      'px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors',
    outline:
      'px-3.5 py-2 rounded-xl border border-slate-700/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all',
    compact:
      'px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center space-x-1 border border-emerald-500/30 transition-all',
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`${variantStyles[variant]} ${className}`}
      >
        <Navigation className="w-3.5 h-3.5 shrink-0" />
        <span>{label}</span>
      </button>

      <GetDirectionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shopName={shopName}
        shopAddress={shopAddress}
        nearbyLandmark={nearbyLandmark}
        shopLatitude={shopLatitude}
        shopLongitude={shopLongitude}
        fallbackDistanceKm={distanceKm}
      />
    </>
  );
};
