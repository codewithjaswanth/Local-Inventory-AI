'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, Sparkles } from 'lucide-react';

interface ProcessingTimelineProps {
  onComplete: () => void;
}

export const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const timelineSteps = [
    'Upload received',
    'Transcribing voice dictation...',
    'Detecting product items...',
    'Reading prices & units...',
    'Estimating freshness score...',
    'Generating live inventory table...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < timelineSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(() => onComplete(), 600);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-white max-w-xl mx-auto shadow-2xl">
      <div className="text-center space-y-2 border-b border-slate-800 pb-4">
        <div className="inline-flex items-center space-x-2 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 text-xs font-mono text-emerald-400 font-bold">
          <Cpu className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          <span>CHATGPT AI REASONING PIPELINE</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          Processing WhatsApp Data
        </h2>
        <p className="text-xs text-slate-400">
          Synthesizing audio dictation & shelf photo vision extractions into live stock tables...
        </p>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {timelineSteps.map((stepLabel, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <motion.div
              key={stepLabel}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: idx <= currentStepIndex ? 1 : 0.3, x: 0 }}
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold shadow-md'
                  : isDone
                  ? 'bg-slate-950 border-slate-800/80 text-slate-300'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400 animate-pulse'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-[10px]">{idx + 1}</span>
                  )}
                </div>
                <span>{stepLabel}</span>
              </div>

              {isCurrent && (
                <span className="text-[10px] text-emerald-400 animate-pulse font-mono">
                  Processing...
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
