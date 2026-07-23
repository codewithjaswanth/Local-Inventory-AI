'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AiFeature } from '@/types';
import { Mic, MessageSquare, Sparkles, TrendingUp, CheckCircle2, Scan, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface FeatureCardProps {
  feature: AiFeature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Scan':
      default:
        return <Scan className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="p-8 flex flex-col justify-between h-full bg-slate-900/90 text-white border-slate-800">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              {renderIcon(feature.icon)}
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-full border border-slate-700">
              {feature.tag}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {feature.title}
          </h3>

          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>{feature.highlight}</span>
          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
        </div>
      </Card>
    </motion.div>
  );
};
