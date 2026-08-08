'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, ArrowRight, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  onOpenSearch: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenSearch }) => {
  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 sm:p-14 lg:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Subtle Radial Emerald Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/25 via-zinc-900/50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Top Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>JOIN 10,000+ NEIGHBORHOOD SHOPPERS</span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Ready to find fresh groceries nearby?
            </h2>

            {/* Subtext */}
            <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto font-normal">
              Experience live, AI-verified inventory from your local vendors right now with zero wait time.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenSearch}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-base shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Search className="w-5 h-5 text-white" />
                <span>Search Now</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-base border border-zinc-700 transition-all duration-200 text-center"
              >
                Learn How It Works
              </a>
            </div>

            {/* Guarantee note */}
            <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-zinc-400 font-medium">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" /> 100% Free for Shoppers
              </span>
              <span>•</span>
              <span>No App Download Required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
