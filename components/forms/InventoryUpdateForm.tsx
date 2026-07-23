'use client';

import React, { useState } from 'react';
import { Camera, Mic, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface InventoryUpdateFormProps {
  onSuccess?: () => void;
}

export const InventoryUpdateForm: React.FC<InventoryUpdateFormProps> = ({ onSuccess }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [voiceMemoText, setVoiceMemoText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setIsParsing(true);
      setTimeout(() => {
        setIsParsing(false);
        setProductName('Organic Hass Avocados');
        setPrice('1.99');
        setQuantity('40');
        setVoiceMemoText('🎙️ Transcribed: "Just restocked 40 organic avocados at $1.99 each"');
      }, 600);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !price) return;
    alert(`Successfully published ${productName} ($${price}) to live inventory!`);
    setProductName('');
    setPrice('');
    setQuantity('');
    setVoiceMemoText('');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-white space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-bold text-base flex items-center">
          <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
          AI Quick Stock Update
        </h3>
        <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
          Vision & Voice NLP
        </span>
      </div>

      {/* Voice & Photo Instant Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSimulateVoice}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
            isRecording
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 animate-pulse'
              : 'bg-slate-800 border-slate-700 hover:border-emerald-500 text-slate-200'
          }`}
        >
          <Mic className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setProductName('Vine Tomatoes 50kg');
            setPrice('2.49');
            setQuantity('50');
            alert('Photo analyzed by AI Vision! Form pre-filled.');
          }}
          className="p-3 rounded-2xl bg-slate-800 border border-slate-700 hover:border-emerald-500 text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Camera className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-bold">Snap Shelf Photo</span>
        </button>
      </div>

      {voiceMemoText && (
        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          {voiceMemoText}
        </div>
      )}

      {/* Manual Input Fields */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">Item Name</label>
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Organic Hass Avocados"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1.99"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Available Qty</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="40"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
        Publish Live Inventory
      </Button>
    </form>
  );
};
