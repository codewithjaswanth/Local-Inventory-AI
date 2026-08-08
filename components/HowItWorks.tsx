'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Navigation } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Snap or Voice Input',
      desc: 'Shopkeepers post shelf photos or speak voice notes on WhatsApp to report new stock instantly.',
      icon: <Camera className="w-6 h-6 text-emerald-500" />,
      tag: 'Shopkeeper',
    },
    {
      num: '02',
      title: 'AI Vision & Freshness Sync',
      desc: 'Multi-modal AI parses images and audio in <0.4s to detect item names, prices, and freshness scores.',
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      tag: 'AI Engine',
    },
    {
      num: '03',
      title: 'Instant Local Discovery',
      desc: 'Shoppers search nearby live stock in real-time, view verified prices, and visit the store for pickup.',
      icon: <Navigation className="w-6 h-6 text-amber-500" />,
      tag: 'Shopper',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20 dark:border-emerald-800/80">
            <span>3 SIMPLE STEPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Inventra Works
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Connecting neighborhood stores with local shoppers in 3 automated steps.
          </p>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#091122]/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-700">
                    {step.num}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-2">
                  {step.tag}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
