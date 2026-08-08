'use client';

import React from 'react';
import { ArrowRight, Printer, Pill, Dog, Baby, Sparkles } from 'lucide-react';

interface QuickCommerceBannersProps {
  onShopNowClick?: () => void;
  onOrderNowClick?: (promoTitle: string) => void;
}

export const HeroPromotionalBanner: React.FC<{ onShopNowClick?: () => void }> = ({ onShopNowClick }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl">
      {/* Subtle Radial Emerald Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/40 via-zinc-900 to-zinc-900 pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPRESS 10-MINUTE DELIVERY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Stock up on daily essentials
          </h1>

          <p className="text-xs sm:text-base text-zinc-400 font-medium max-w-xl leading-relaxed">
            Get farm-fresh goodness &amp; a range of exotic fruits, vegetables, eggs &amp; more.
          </p>
        </div>

        <button
          onClick={onShopNowClick}
          className="inline-flex items-center space-x-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
        >
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export const MiniPromoRow: React.FC<{ onOrderNowClick?: (title: string) => void }> = ({ onOrderNowClick }) => {
  const promos = [
    {
      id: 'printouts',
      title: 'Get printouts delivered',
      subtitle: 'Documents & photos at your door',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: Printer,
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy at your doorstep!',
      subtitle: 'Essential medicines & health supplies',
      badgeClass: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      icon: Pill,
    },
    {
      id: 'petcare',
      title: 'Pet care supplies at your door',
      subtitle: 'Food, treats & grooming essentials',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: Dog,
    },
    {
      id: 'diapers',
      title: 'No time for a diaper run?',
      subtitle: 'Diapers & baby wipes delivered fast',
      badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      icon: Baby,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {promos.map((promo) => {
        const IconComponent = promo.icon;
        return (
          <div
            key={promo.id}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all duration-200 group"
          >
            <div className="space-y-2">
              <div className={`p-2.5 rounded-xl border w-fit ${promo.badgeClass}`}>
                <IconComponent className="w-4 h-4" />
              </div>

              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug group-hover:text-emerald-400 transition-colors">
                {promo.title}
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium leading-normal line-clamp-2">
                {promo.subtitle}
              </p>
            </div>

            <button
              onClick={() => onOrderNowClick?.(promo.title)}
              className="px-3.5 py-2 rounded-xl text-[11px] font-extrabold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors shadow-xs w-fit flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
