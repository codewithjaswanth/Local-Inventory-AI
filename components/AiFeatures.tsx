'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AI_FEATURES } from '@/data/mockData';
import { Mic, MessageSquare, Sparkles, TrendingUp, CheckCircle2, Scan, Cpu, ArrowUpRight } from 'lucide-react';

export const AiFeatures: React.FC = () => {
  const coreFeatures = [
    {
      title: 'Computer Vision OCR',
      desc: 'Parses produce ripeness, arrival times, and vendor restock logs directly from shelf images.',
      icon: <Scan className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: 'Shelf Vision',
    },
    {
      title: 'WhatsApp Voice Updates',
      desc: 'Shopkeepers speak stock notes in local languages; AI transcribes prices and quantities in 0.4s.',
      icon: <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: 'Voice Engine',
    },
    {
      title: 'Semantic Item Search',
      desc: 'Shoppers type natural queries like "ripe hass avocados near me" to instantly match live stock.',
      icon: <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: 'Natural Search',
    },
    {
      title: 'Crowdsourced Verification',
      desc: 'Community shopper checks verify shelf stock with micro-rewards for 99.2% inventory accuracy.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: 'Verified Stock',
    },
  ];

  return (
    <section id="features" className="py-20 bg-transparent text-slate-900 dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI MULTI-MODAL ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Smart AI Features
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Bridging local brick-and-mortar stores with instant digital discovery.
          </p>
        </div>

        {/* 4 Core Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-[#091122]/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h3>

                <p className="mt-2 text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
