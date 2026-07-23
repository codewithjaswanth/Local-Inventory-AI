'use client';

import React, { useState, useRef } from 'react';
import { Mic, Upload, Volume2, CheckCircle2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AudioUploaderProps {
  onAudioSelected: (audioText: string) => void;
  onSkip?: () => void;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioSelected, onSkip }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioName, setAudioName] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultVoiceTranscript = '🎙️ Transcribed: "Just received a fresh crate of 25kg Organic Vine Tomatoes at $2.49 per lb, 40kg Yukon Potatoes at $1.99 per lb, and 15 bundles of Fresh Spinach at $2.99 each."';

  const handleRecordSimulate = () => {
    setIsRecording(true);
    setAudioName(null);
    setTranscript(null);

    setTimeout(() => {
      setIsRecording(false);
      setAudioName('WhatsApp_Voice_Memo_0723.m4a');
      setTranscript(defaultVoiceTranscript);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAudioName(file.name);
      setTranscript(defaultVoiceTranscript);
    }
  };

  return (
    <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-white max-w-xl mx-auto">
      <div className="text-center space-y-1">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          STEP 2: VOICE MEMO DICTATION
        </span>
        <h2 className="text-2xl font-extrabold text-white pt-1">
          Record or Upload Voice Note
        </h2>
        <p className="text-xs text-slate-400">
          Dictate your stock prices and quantities out loud, or upload a WhatsApp voice memo (.mp3, .wav, .m4a).
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/mp3, audio/wav, audio/m4a"
        className="hidden"
      />

      {/* Record Mic Button */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
        <button
          onClick={handleRecordSimulate}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isRecording
              ? 'bg-rose-500 text-white animate-bounce shadow-xl shadow-rose-500/50'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 hover:scale-105'
          }`}
        >
          <Mic className={`w-8 h-8 ${isRecording ? 'animate-pulse' : ''}`} />
        </button>

        <span className="text-xs font-bold text-slate-300">
          {isRecording ? 'Listening... Speak items out loud now' : 'Click Mic to Record Voice Dictation'}
        </span>
      </div>

      {/* Or File Upload Button */}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-xs text-slate-500">or</span>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center space-x-2"
        >
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Upload Audio File (.mp3, .wav, .m4a)</span>
        </button>
      </div>

      {audioName && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
            <span className="flex items-center">
              <Volume2 className="w-4 h-4 mr-1 text-emerald-400 animate-pulse" />
              {audioName}
            </span>
            <span>Recorded</span>
          </div>

          {transcript && (
            <p className="text-xs font-mono text-slate-200 bg-slate-900 p-3 rounded-xl border border-slate-800">
              {transcript}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center space-x-3 pt-2">
        {onSkip && (
          <Button onClick={onSkip} variant="outline" size="md" className="w-1/2">
            Skip Voice
          </Button>
        )}
        <Button
          onClick={() => onAudioSelected(transcript || defaultVoiceTranscript)}
          variant="primary"
          size="md"
          className={onSkip ? 'w-1/2' : 'w-full'}
        >
          Run AI Processing →
        </Button>
      </div>
    </div>
  );
};
