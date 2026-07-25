'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shop } from '@/types';
import { X, MapPin, Star, Phone, Clock, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ShopModalProps {
  shop: Shop | null;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ shop, onClose }) => {
  if (!shop) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-100"
        >
          {/* Header Image Header */}
          <div className="relative h-48 sm:h-56 w-full bg-slate-100">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 transition-colors shadow-lg backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between flex-wrap gap-2 text-white">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm shadow-md mb-2">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {shop.freshnessBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                  {shop.name}
                </h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${shop.isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'}`}>
                {shop.isOpen ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Meta bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Distance</span>
                <span className="font-semibold text-slate-900 flex items-center mt-1">
                  <MapPin className="w-4 h-4 text-emerald-600 mr-1" />
                  {shop.distance}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Rating</span>
                <span className="font-semibold text-slate-900 flex items-center mt-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                  {shop.rating} <span className="text-slate-400 font-normal text-xs ml-1">({shop.reviewsCount})</span>
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Freshness Score</span>
                <span className="font-semibold text-emerald-600 flex items-center mt-1">
                  <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" />
                  {shop.freshnessScore}/100
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Hours</span>
                <span className="font-semibold text-slate-900 flex items-center mt-1 text-xs">
                  <Clock className="w-4 h-4 text-slate-400 mr-1" />
                  {shop.openTime}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 border-b border-slate-100 pb-4">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 mr-1.5 flex-shrink-0" />
                {shop.address}
              </span>
              <span className="flex items-center font-medium text-emerald-600 hover:underline cursor-pointer">
                <Phone className="w-3.5 h-3.5 mr-1" />
                {shop.phone}
              </span>
            </div>

            {/* Live Verified Inventory List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Sparkles className="w-4 h-4 text-emerald-500 mr-2" />
                  Live AI Verified Inventory
                </h3>
                <span className="text-xs text-slate-500 font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                  {shop.inventoryCount} items in stock
                </span>
              </div>

              <div className="space-y-3">
                {shop.verifiedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 bg-white hover:bg-emerald-50/20 transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-700 font-bold text-xs">
                        {item.category.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900 text-sm">{item.name}</h4>
                          {item.verifiedByAi && (
                            <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              <CheckCircle2 className="w-3 h-3 mr-0.5" /> AI Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Freshness: <span className="font-medium text-emerald-600">{item.freshnessScore}%</span> • Updated {item.lastUpdated}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-slate-900">{item.price}</div>
                      <div className="text-[11px] text-slate-500">{item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200/60 text-sm transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`, '_blank');
              }}
              className="px-6 py-2.5 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 text-sm transition-all flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
