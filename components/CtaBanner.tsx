'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, ArrowRight, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  onOpenSearch: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenSearch }) => {
  return (
    <section className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-8 sm:p-14 lg:p-16 text-white shadow-glow-emerald overflow-hidden"
        >
          {/* Background Ambient Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/20 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Top Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>JOIN 10,000+ NEIGHBORHOOD SHOPPERS</span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Ready to find fresh groceries nearby?
            </h2>

            {/* Subtext */}
            <p className="text-emerald-50 text-base sm:text-xl max-w-2xl mx-auto font-normal">
              Experience live, AI-verified inventory from your local vendors right now with zero wait time.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenSearch}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-base shadow-xl hover:bg-slate-50 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center space-x-2.5"
              >
                <Search className="w-5 h-5 text-emerald-600" />
                <span>Search Now</span>
                <ArrowRight className="w-5 h-5 text-slate-900" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-700/50 hover:bg-emerald-700/80 text-white font-bold text-base border border-white/20 transition-all text-center"
              >
                Learn How It Works
              </a>
            </div>

            {/* Guarantee note */}
            <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-emerald-100 font-medium">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-amber-300" /> 100% Free for Shoppers
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
