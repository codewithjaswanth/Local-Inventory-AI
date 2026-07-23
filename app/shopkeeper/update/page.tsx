'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { StepIndicator } from '@/components/shopkeeper/StepIndicator';
import { ImageUploader } from '@/components/shopkeeper/ImageUploader';
import { AudioUploader } from '@/components/shopkeeper/AudioUploader';
import { ProcessingTimeline } from '@/components/shopkeeper/ProcessingTimeline';
import { InventoryTable } from '@/components/shopkeeper/InventoryTable';
import { SuccessCard } from '@/components/shopkeeper/SuccessCard';
import { mockAiService, ExtractedInventoryItem } from '@/services/mockAI';
import { Sparkles, PhoneCall, ChevronRight } from 'lucide-react';

export default function ShopkeeperUpdatePage() {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState<string | null>(null);
  const [extractedItems, setExtractedItems] = useState<ExtractedInventoryItem[]>([]);
  const [overallFreshness, setOverallFreshness] = useState(97);
  const [overallConfidence, setOverallConfidence] = useState(94);
  const [timeProcessedMs, setTimeProcessedMs] = useState(1240);

  // Step 1: Image Uploaded
  const handleImageSelected = (img: string | File) => {
    setSelectedImage(typeof img === 'string' ? img : URL.createObjectURL(img));
    setStep(2);
  };

  // Step 2: Audio Selected
  const handleAudioSelected = (transcript: string) => {
    setVoiceText(transcript);
    setStep(3);
  };

  // Step 3: AI Processing Complete
  const handleAiProcessingComplete = async () => {
    const transcript = await mockAiService.transcribeAudio();
    const products = await mockAiService.detectProducts();
    const items = await mockAiService.extractInventory(transcript, products);
    const freshness = await mockAiService.calculateFreshness(items);
    const confidence = await mockAiService.generateConfidence(items);

    setExtractedItems(items);
    setOverallFreshness(freshness);
    setOverallConfidence(confidence);
    setTimeProcessedMs(1240);
    setStep(4);
  };

  // Step 5: Approve
  const handleApproveInventory = (finalItems: ExtractedInventoryItem[]) => {
    setExtractedItems(finalItems);
    setStep(6);
  };

  // Reject
  const handleReject = () => {
    setStep(1);
    setSelectedImage(null);
    setVoiceText(null);
    setExtractedItems([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/history" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Simulated WhatsApp AI Inventory Update</span>
          </div>
        </header>

        <main className="p-4 sm:p-8 space-y-6 max-w-6xl mx-auto w-full">
          {/* Header Title */}
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              SIMULATED WHATSAPP BOT WORKFLOW
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pt-1">
              AI Inventory Update Simulation
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Simulates receiving voice notes & shelf photos via WhatsApp and parsing them into live store inventory.
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={step} />

          {/* Dynamic Animated Step View */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <ImageUploader onImageSelected={handleImageSelected} onSkip={() => setStep(2)} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <AudioUploader onAudioSelected={handleAudioSelected} onSkip={() => setStep(3)} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <ProcessingTimeline onComplete={handleAiProcessingComplete} />
              </motion.div>
            )}

            {(step === 4 || step === 5) && (
              <motion.div key="step4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <InventoryTable
                  initialItems={extractedItems}
                  onApprove={handleApproveInventory}
                  onReject={handleReject}
                />
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <SuccessCard
                  productsCount={extractedItems.length}
                  freshnessScore={overallFreshness}
                  confidenceScore={overallConfidence}
                  timeProcessedMs={timeProcessedMs}
                  onReset={handleReject}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
