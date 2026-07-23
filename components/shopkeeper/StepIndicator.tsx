'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number; // 1 to 6
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    'Upload Image',
    'Record Voice',
    'AI Reasoning',
    'Review Table',
    'Approve',
    'Success',
  ];

  return (
    <div className="w-full py-4 border-b border-slate-800 mb-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto px-2">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={label} className="flex items-center space-x-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 animate-pulse'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`hidden md:inline text-xs font-semibold ${
                  isCurrent ? 'text-white' : isDone ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
              {stepNum < steps.length && (
                <div className="hidden sm:block w-4 lg:w-8 h-px bg-slate-800 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
