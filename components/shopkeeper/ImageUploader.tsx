'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ImageUploaderProps {
  onImageSelected: (file: File | string) => void;
  onSkip?: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onSkip }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultSampleImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelected(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelected(url);
    }
  };

  const handleUseSample = () => {
    setPreviewUrl(defaultSampleImage);
    onImageSelected(defaultSampleImage);
  };

  return (
    <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-white max-w-xl mx-auto">
      <div className="text-center space-y-1">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          STEP 1: PRODUCT SHELF PHOTO
        </span>
        <h2 className="text-2xl font-extrabold text-white pt-1">
          Upload Store Crate Photo
        </h2>
        <p className="text-xs text-slate-400">
          Snap a photo of your fresh vegetable or fruit crate for AI vision extraction.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpg, image/png, image/jpeg"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/40">
          <img src={previewUrl} alt="Preview shelf crate" className="w-full h-full object-cover" />
          <button
            onClick={() => setPreviewUrl(null)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Image Loaded Ready for Vision OCR
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-64 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-700 bg-slate-950 hover:border-emerald-500/50 hover:bg-slate-900'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-3">
            <Upload className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-sm text-white">Drag & drop crate image here</h4>
          <p className="text-xs text-slate-400 mt-1">Supported: .jpg, .png, .jpeg</p>

          <div className="mt-4 flex items-center space-x-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUseSample();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono border border-slate-700"
            >
              Use Sample Produce Crate
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 pt-2">
        {onSkip && (
          <Button onClick={onSkip} variant="outline" size="md" className="w-1/2">
            Skip Image
          </Button>
        )}
        <Button
          onClick={() => onImageSelected(previewUrl || defaultSampleImage)}
          variant="primary"
          size="md"
          className={onSkip ? 'w-1/2' : 'w-full'}
        >
          Continue to Step 2 →
        </Button>
      </div>
    </div>
  );
};
