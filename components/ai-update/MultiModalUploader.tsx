'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Upload, Image as ImageIcon, Sparkles, Volume2, X, CheckCircle2 } from 'lucide-react';

interface MultiModalUploaderProps {
  onProcess: (params: { audioFile?: File | Blob; imageFile?: File | Blob | string }) => void;
  isProcessing: boolean;
}

export const MultiModalUploader: React.FC<MultiModalUploaderProps> = ({
  onProcess,
  isProcessing
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'voice' | 'image'>('both');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Start Mic Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioBlob(audioBlob);
        setAudioFileName('voice_recording.webm');
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access permission denied or unsupported in this browser environment.');
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  // Handle Audio File Selection
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecordedAudioBlob(file);
      setAudioFileName(file.name);
    }
  };

  // Handle Image File Selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleClearAudio = () => {
    setRecordedAudioBlob(null);
    setAudioFileName(null);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleSubmit = () => {
    onProcess({
      audioFile: recordedAudioBlob || undefined,
      imageFile: imageFile || imagePreviewUrl || undefined
    });
  };

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 shadow-2xl p-6 space-y-6 select-none">
      {/* Top Mode Selector Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>AI Multi-Modal Upload Portal</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Voice dictate stock, upload crate photos, or process both together for 99%+ accuracy.
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'both' ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400'
            }`}
          >
            Voice + Image
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'voice' ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400'
            }`}
          >
            Voice Only
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'image' ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400'
            }`}
          >
            Image Only
          </button>
        </div>
      </div>

      {/* Input Dropzones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Voice Input Section */}
        {(activeTab === 'both' || activeTab === 'voice') && (
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Voice Audio Memo</span>
              </div>
              {recordedAudioBlob && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Audio Ready
                </span>
              )}
            </div>

            {/* Mic Record Button & File Uploader */}
            <div className="py-4 flex flex-col items-center justify-center space-y-3">
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg scale-110'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>

              <div className="text-center">
                <span className="text-xs font-bold text-white block">
                  {isRecording ? 'Listening & Recording...' : 'Tap to Voice Dictate Stock'}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {isRecording ? 'Click to finish audio memo' : 'e.g., "Received 40 lbs of vine tomatoes at $2.49"'}
                </span>
              </div>

              {audioFileName && (
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[160px]">{audioFileName}</span>
                  <button type="button" onClick={handleClearAudio} className="text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Or File Upload Button */}
            <label className="block text-center cursor-pointer">
              <span className="text-[11px] font-medium text-slate-400 hover:text-emerald-400 underline">
                Or upload audio file (.mp3, .wav, .m4a)
              </span>
              <input type="file" accept="audio/*" onChange={handleAudioFileChange} className="hidden" />
            </label>
          </div>
        )}

        {/* Image Input Section */}
        {(activeTab === 'both' || activeTab === 'image') && (
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Crate / Receipt Photo</span>
              </div>
              {imagePreviewUrl && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Image Ready
                </span>
              )}
            </div>

            {/* Dropzone / Preview */}
            <div className="py-2 flex flex-col items-center justify-center space-y-3">
              {imagePreviewUrl ? (
                <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-slate-800 group">
                  <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 p-1.5 rounded-xl bg-slate-950/80 text-rose-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-32 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-500 mb-1" />
                  <span className="text-xs font-bold text-slate-300">Upload Crate Photo or Invoice</span>
                  <span className="text-[10px] text-slate-500 font-medium">PNG, JPG, WEBP up to 10MB</span>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-500 font-medium">
              Florence-2 Computer Vision extracts product tags & receipt lines.
            </div>
          </div>
        )}
      </div>

      {/* Submit Trigger Action */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400 font-medium">
          Selected Mode:{' '}
          <strong className="text-emerald-400 font-bold uppercase">
            {activeTab === 'both' ? 'Voice + Vision Combined' : activeTab}
          </strong>
        </div>

        <button
          type="button"
          disabled={isProcessing || (!recordedAudioBlob && !imagePreviewUrl && !imageFile)}
          onClick={handleSubmit}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-glow-emerald transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isProcessing ? 'AI Processing Pipeline...' : 'Process with AI Assistant'}</span>
        </button>
      </div>
    </div>
  );
};
