'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '@/data/mockData';
import { Camera, Mic, Cpu, Search, Navigation, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      case 'Mic':
        return <Mic className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Navigation':
        return <Navigation className="w-5 h-5" />;
      case 'Star':
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <span>SEAMLESS WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Local Inventory AI Works
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            From shelf picture to customer pickup in 6 simple automated steps.
          </p>
        </div>

        {/* Desktop & Mobile Timeline Container */}
        <div className="relative">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-emerald-200/70 -translate-x-1/2 z-0" />

          <div className="space-y-8 lg:space-y-12 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Info Card */}
                  <div className="w-full lg:w-[45%]">
                    <div
                      className={`p-6 sm:p-8 rounded-3xl bg-white border transition-all duration-300 shadow-sm hover:shadow-soft-xl ${
                        activeStep === step.stepNumber
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'border-slate-200/80 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                          {step.roleLabel}
                        </span>

                        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                          Step {step.stepNumber} of 6
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {/* Interactive Visual Output Snippet */}
                      {step.previewSnippet && (
                        <div className="mt-4 p-3.5 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono border border-slate-800 shadow-inner">
                          {step.previewSnippet.content}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central Node Badge Icon */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-lg transition-transform duration-300 ${
                        step.role === 'shopkeeper'
                          ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                          : step.role === 'ai'
                          ? 'bg-slate-900 text-emerald-400 shadow-slate-900/40 ring-4 ring-emerald-400/20'
                          : 'bg-amber-500 text-white shadow-amber-500/30'
                      }`}
                    >
                      {renderIcon(step.icon)}
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className="hidden lg:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
