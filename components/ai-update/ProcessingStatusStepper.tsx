'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, Eye, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingStatusStepperProps {
  currentStep: number; // 1 to 5
}

export const ProcessingStatusStepper: React.FC<ProcessingStatusStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'Asset Storage', subtitle: 'Uploading Media', icon: Upload },
    { id: 2, title: 'Whisper STT', subtitle: 'Speech Transcription', icon: Mic },
    { id: 3, title: 'Vision OCR', subtitle: 'Crate Object Detection', icon: Eye },
    { id: 4, title: 'LLM Extraction', subtitle: 'Structuring Inventory', icon: Sparkles },
    { id: 5, title: 'Review Stage', subtitle: 'Awaiting Confirmation', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 p-5 shadow-xl select-none space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          AI Pipeline Execution Status
        </span>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Step {Math.min(currentStep, 5)} of 5
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                isCurrent
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-emerald'
                  : isDone
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : 'bg-slate-950/40 border-slate-900 opacity-50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-2 rounded-xl border ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {isCurrent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                </div>

                <span className="text-[10px] font-bold">
                  {isDone ? 'DONE' : isCurrent ? 'RUNNING' : 'PENDING'}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white truncate">{step.title}</h4>
                <p className="text-[10px] text-slate-400 truncate font-medium">{step.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
