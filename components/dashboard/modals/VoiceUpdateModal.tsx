'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Square, Sparkles, CheckCircle2 } from 'lucide-react';

interface VoiceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceSuccess: (extractedText: string) => void;
}

export const VoiceUpdateModal: React.FC<VoiceUpdateModalProps> = ({
  isOpen,
  onClose,
  onVoiceSuccess
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setTimeout(() => {
      setTranscript('Added 40 lbs of Fresh Vine Tomatoes at $2.49 per lb');
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onVoiceSuccess(transcript || 'Added 40 lbs of Fresh Vine Tomatoes at $2.49 per lb');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl p-6 text-center space-y-5 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-extrabold text-white">Voice Inventory Update</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:text-white text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-6 flex flex-col items-center space-y-4">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-400 border-2 border-rose-500 animate-pulse scale-110 shadow-glow-amber'
                  : 'bg-teal-500/20 text-teal-400 border-2 border-teal-500/50 hover:scale-105 shadow-glow-emerald'
              }`}
            >
              {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
            </button>

            <p className="text-xs font-mono text-slate-400">
              {isRecording
                ? 'Listening... Speak inventory update now.'
                : processing
                ? 'Processing audio with Whisper AI...'
                : 'Click microphone to start voice recording.'}
            </p>

            {transcript && (
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 max-w-xs leading-relaxed">
                "{transcript}"
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
