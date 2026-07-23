'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { AiSearchAssistant } from './ai/AiSearchAssistant';
import { AiConfidenceBadge } from './ai/AiConfidenceBadge';
import { Search, MapPin, Sparkles, Navigation, ShieldCheck, ArrowRight, Camera, Mic, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (term: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('Current Location (Detected)');
  const [isLocating, setIsLocating] = useState(false);

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Downtown, 94103 (0.3 mi radius)');
      setIsLocating(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero-pattern overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>AI-Powered Hyperlocal Live Marketplace</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
              LIVE
            </span>
          </motion.div>

          {/* Large Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
          >
            Find Fresh Products <br className="hidden sm:inline" />
            <span className="text-gradient-emerald">Near You</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
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

        {/* Hero Visual / Interactive Mockup Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl bg-slate-900 p-4 sm:p-6 shadow-2xl border border-slate-800 text-white overflow-hidden">
            {/* Top Bar Mockup Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
                  live-inventory-stream.ai/v1/nearby
                </span>
              </div>
              <div className="flex items-center space-x-2 font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI Vision Sync Active</span>
              </div>
            </div>

            {/* Content Grid Inside Hero Visual */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Vendor Photo & Voice Scan Card */}
              <div className="md:col-span-5 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center">
                    <Camera className="w-4 h-4 text-emerald-400 mr-1.5" />
                    Vendor Shelf Input
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    WhatsApp Bot
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden h-36 bg-slate-950 group">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    alt="Produce photo"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* AI Vision Overlay Scan Grid */}
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-400/60 rounded-xl m-2 pointer-events-none flex items-center justify-center">
                    <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md backdrop-blur-xs flex items-center">
                      <Sparkles className="w-3 h-3 mr-1 animate-spin" /> Analyzing Freshness 99%
                    </span>
                  </div>
                </div>

                {/* Voice Note Pill */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-200 font-medium">"50kg vine tomatoes arrived at $2.49"</p>
                    <p className="text-[10px] text-slate-400">Voice Note Transcribed in 0.4s</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Live Inventory Grid */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" />
                    Live Hyperlocal Inventory Stream
                  </span>
                  <span className="text-[11px] text-slate-400">Updated 2 seconds ago</span>
                </div>

                {/* Stream Item Cards */}
                {[
                  { name: 'Organic Vine Tomatoes', shop: 'Green Earth Organics', price: '$2.49/lb', dist: '0.3 mi', score: 99, status: 'In Stock' },
                  { name: 'Fresh Hass Avocados', shop: 'Sunshine Fruit Depot', price: '$1.99/ea', dist: '0.6 mi', score: 98, status: 'High Stock' },
                  { name: 'Farm Milk Glass Bottle', shop: 'Artisan Bakery & Dairy', price: '$4.20', dist: '0.9 mi', score: 97, status: 'Just Restocked' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                      <div>
                        <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded">
                            {item.score}% Fresh
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {item.shop} • <span className="text-slate-300">{item.dist}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-emerald-400 text-sm">{item.price}</div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-end">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-0.5" />
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
