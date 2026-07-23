'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, Sparkles, CheckCircle2 } from 'lucide-react';

interface AiThinkingLoaderProps {
  query?: string;
  onComplete?: () => void;
}

export const AiThinkingLoader: React.FC<AiThinkingLoaderProps> = ({ query, onComplete }) => {
  const [step, setStep] = useState(0);

  const thinkingSteps = [
    { label: 'Scanning local shop inventory nodes...', icon: Cpu },
    { label: `Matching semantic embeddings for "${query || 'fresh produce'}"...`, icon: Search },
    { label: 'Ranking nearby shops by freshness score & distance...', icon: Sparkles },
    { label: 'Synthesizing AI Summary & live stock availability...', icon: CheckCircle2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < thinkingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        onComplete?.();
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl my-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            LocalInventory AI Reasoning Engine
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Sub-second Vector Search</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {thinkingSteps.map((s, idx) => {
          const Icon = s.icon;
          const isDone = idx < step;
          const isCurrent = idx === step;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: idx <= step ? 1 : 0.4, x: 0 }}
              className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                  : isDone
                  ? 'bg-slate-950 border-slate-800/80 text-slate-400'
                  : 'border-transparent text-slate-600'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isCurrent
                    ? 'text-emerald-400 animate-spin'
                    : isDone
                    ? 'text-emerald-500'
                    : 'text-slate-600'
                }`}
              />
              <span className="truncate">{s.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
