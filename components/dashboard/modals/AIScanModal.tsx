'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Scan, Sparkles, CheckCircle2, FileText } from 'lucide-react';

interface AIScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (resultText: string) => void;
}

export const AIScanModal: React.FC<AIScanModalProps> = ({
  isOpen,
  onClose,
  onScanComplete
}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setScanning(false);
      setScannedResult('Detected: 60 lbs Organic Bananas ($1.99/lb) • Freshness Score: 99.2%');
    }, 2200);
  };

  const handleConfirm = () => {
    if (scannedResult) {
      onScanComplete(scannedResult);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-lg bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-5 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Scan className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-extrabold text-white">AI Vision & OCR Shelf Audit</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:text-white text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="h-44 rounded-2xl bg-slate-900 border border-dashed border-indigo-500/40 flex flex-col items-center justify-center p-4 relative overflow-hidden text-center space-y-2">
              {scanning && (
                <div className="absolute inset-0 bg-indigo-500/10 animate-pulse flex items-center justify-center">
                  <div className="w-full h-1 bg-indigo-400 shadow-glow-emerald animate-bounce" />
                </div>
              )}
              <Camera className="w-10 h-10 text-indigo-400" />
              <p className="text-xs text-slate-300 font-medium">Upload shelf crate photo or receipt scan</p>
              <span className="text-[10px] font-mono text-slate-500">Supports JPG, PNG, WEBP up to 10MB</span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={scanning}
                className="px-5 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>{scanning ? 'Analyzing Vision Model...' : 'Run Vision Audit'}</span>
              </button>
            </div>

            {scannedResult && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>OCR Extraction Complete</span>
                </div>
                <p>{scannedResult}</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold"
            >
              Cancel
            </button>
            {scannedResult && (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Sync to Inventory
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
