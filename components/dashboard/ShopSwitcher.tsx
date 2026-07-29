'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ChevronDown, Check, Sparkles } from 'lucide-react';
import { DetailedShop } from '@/data/mockData';

interface ShopSwitcherProps {
  ownedShops: DetailedShop[];
  selectedShop: DetailedShop | null;
  onSelectShop: (shopId: string) => void;
}

export const ShopSwitcher: React.FC<ShopSwitcherProps> = ({
  ownedShops,
  selectedShop,
  onSelectShop
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedShop) return null;

  // Single Shop: Hide switcher dropdown, display single store name
  if (ownedShops.length <= 1) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-white shadow-sm">
        <Store className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="truncate max-w-[180px]">{selectedShop.name}</span>
      </div>
    );
  }

  // Multiple Shops: Display interactive dropdown switcher
  return (
    <div className="relative select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
      >
        <Store className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="truncate max-w-[160px]">{selectedShop.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute left-0 top-full mt-2 w-64 bg-[#090F1D] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/80">
              Select Owned Store ({ownedShops.length})
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto">
              {ownedShops.map((shop) => {
                const isSelected = shop.id === selectedShop.id;
                return (
                  <button
                    key={shop.id}
                    type="button"
                    onClick={() => {
                      onSelectShop(shop.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="truncate">
                      <div className="truncate font-semibold">{shop.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{shop.address}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
