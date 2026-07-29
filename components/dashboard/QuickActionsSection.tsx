'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PlusCircle,
  Mic,
  Camera,
  Scan,
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';

interface QuickActionsSectionProps {
  onAddProduct: () => void;
  onVoiceUpdate: () => void;
  onUploadImage: () => void;
  onAIScan: () => void;
  onGenerateReport: () => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  onAddProduct,
  onVoiceUpdate,
  onUploadImage,
  onAIScan,
  onGenerateReport
}) => {
  const actions = [
    {
      id: 'add-product',
      label: 'Add Product',
      description: 'Manually add new item to live catalog',
      icon: PlusCircle,
      gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400 hover:border-emerald-400',
      onClick: onAddProduct
    },
    {
      id: 'voice-update',
      label: 'Voice Inventory Update',
      description: 'Speak stock updates in any language',
      icon: Mic,
      gradient: 'from-teal-500/20 to-cyan-500/20 border-teal-500/40 text-teal-400 hover:border-teal-400',
      onClick: onVoiceUpdate
    },
    {
      id: 'upload-image',
      label: 'Upload Product Image',
      description: 'Vision OCR receipt & shelf scanning',
      icon: Camera,
      gradient: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-indigo-400 hover:border-indigo-400',
      onClick: onUploadImage
    },
    {
      id: 'ai-scan',
      label: 'AI Scan',
      description: 'Run instant catalog audit & sync',
      icon: Scan,
      gradient: 'from-amber-500/20 to-emerald-500/20 border-amber-500/40 text-amber-400 hover:border-amber-400',
      onClick: onAIScan
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      description: 'Export stock CSV & freshness insights',
      icon: FileSpreadsheet,
      gradient: 'from-slate-800 to-slate-900 border-slate-700 text-slate-200 hover:border-slate-500',
      onClick: onGenerateReport
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Quick Actions</span>
        </h2>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Multi-Modal AI Controls</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={act.id}
              type="button"
              onClick={act.onClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className={`p-4 rounded-3xl bg-gradient-to-br ${act.gradient} border text-left flex flex-col justify-between space-y-3 shadow-lg backdrop-blur-xl transition-all group`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="w-2 h-2 rounded-full bg-current opacity-60" />
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {act.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {act.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
