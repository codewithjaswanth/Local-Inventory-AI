'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AI_FEATURES } from '@/data/mockData';
import { Mic, MessageSquare, Sparkles, TrendingUp, CheckCircle2, Scan, Cpu, ArrowUpRight } from 'lucide-react';

export const AiFeatures: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-emerald-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'Scan':
      default:
        return <Scan className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>PROPRIETARY MULTI-MODAL ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            AI Technology That Power Hyperlocal Freshness
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Bridging brick-and-mortar neighborhood stores with instant digital discovery using vision, voice, and natural language.
          </p>
        </div>

        {/* 6 AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/80 hover:border-emerald-500/50 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tag & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-700/80 text-emerald-400 px-2.5 py-1 rounded-full border border-slate-600">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-400">
                <span>{feature.highlight}</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
