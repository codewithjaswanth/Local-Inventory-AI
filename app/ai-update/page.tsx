'use client';

import React, { useState } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { ShopOwnershipGuard } from '@/components/auth/ShopOwnershipGuard';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { MultiModalUploader } from '@/components/ai-update/MultiModalUploader';
import { ProcessingStatusStepper } from '@/components/ai-update/ProcessingStatusStepper';
import { InventoryReviewTable } from '@/components/ai-update/InventoryReviewTable';
import { AiHistoryLog } from '@/components/ai-update/AiHistoryLog';
import { aiAdapterService } from '@/services/ai/providers/aiAdapter.service';
import { AiExtractionResponse, ExtractedAiItem } from '@/services/ai/providers/aiProvider.interface';
import { inventoryService } from '@/services/inventory.service';
import { inventoryHistoryService } from '@/services/inventoryHistory.service';
import { useAuth } from '@/hooks/useAuth';
import { useShopkeeperShops } from '@/hooks/useShopkeeperShops';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiUpdatePage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <AiUpdatePageContent />
    </RoleGuard>
  );
}

function AiUpdatePageContent() {
  const { profile } = useAuth();
  const { selectedShop } = useShopkeeperShops();
  const shopId = selectedShop?.id || 'shop-1';

  // State Pipeline
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractionResult, setExtractionResult] = useState<AiExtractionResponse | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Process Multi-modal Upload Pipeline
  const handleProcessUpload = async (params: { audioFile?: File | Blob; imageFile?: File | Blob | string }) => {
    setIsProcessing(true);
    setCurrentStep(1);

    // Step 1: Upload Assets
    await new Promise((r) => setTimeout(r, 400));
    setCurrentStep(2);

    // Step 2: Whisper STT
    await new Promise((r) => setTimeout(r, 500));
    setCurrentStep(3);

    // Step 3: Vision OCR
    await new Promise((r) => setTimeout(r, 500));
    setCurrentStep(4);

    // Step 4: AI Extraction
    const res = await aiAdapterService.processMultiModalInventory({
      audio: params.audioFile,
      image: params.imageFile,
      shopId
    });

    setCurrentStep(5);
    setExtractionResult(res);
    setIsProcessing(false);
    showToast('AI pipeline finished! Review extracted items below.');
  };

  // Confirm and Save Accepted Items to Supabase DB & History Log
  const handleSaveConfirmedItems = async (acceptedItems: ExtractedAiItem[]) => {
    if (!extractionResult) return;

    // 1. Save items to Supabase Inventory Table
    for (const item of acceptedItems) {
      await inventoryService.createInventoryItem({
        shop_id: shopId,
        name: item.name,
        category: item.category,
        price: item.price,
        unit: item.unit,
        stock_quantity: item.quantity,
        availability: item.availability,
        image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
        freshness_score: item.freshnessScore
      });
    }

    // 2. Log Operation to Supabase inventory_history Table
    await inventoryHistoryService.logOperation({
      shopId,
      inputType: extractionResult.inputType,
      audioUrl: extractionResult.audioUrl,
      imageUrl: extractionResult.imageUrl,
      rawTranscript: extractionResult.transcript,
      extractedJson: acceptedItems,
      confirmedItemsCount: acceptedItems.length,
      overallConfidence: extractionResult.overallConfidence,
      provider: extractionResult.provider
    });

    showToast(`Successfully saved ${acceptedItems.length} confirmed items to Supabase!`);
    setExtractionResult(null);
    setCurrentStep(1);
  };

  return (
    <ShopOwnershipGuard targetShopId={shopId}>
      <div className="min-h-screen bg-[#040810] text-slate-100 flex overflow-hidden font-sans selection:bg-emerald-500/30">
        {/* Sidebar Navigation */}
        <ShopPortalSidebar activePath="/ai-update" />

        {/* Main Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <DashboardNavbar
            shopName={selectedShop?.name || (profile?.name ? `${profile.name}'s Fresh Market` : 'GreenLeaf Fresh Market')}
            freshnessScore={98.6}
          />

          {/* Workspace Content */}
          <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full flex-1">
            {/* Header Title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <span>AI Inventory Assistant</span>
              </h1>
              <p className="text-xs text-slate-400">
                Voice dictate stock or upload crate photos. Review extracted quantities before saving to Supabase database.
              </p>
            </div>

            {/* Stepper Status Progress */}
            {(isProcessing || extractionResult) && (
              <ProcessingStatusStepper currentStep={currentStep} />
            )}

            {/* Multi-modal Upload Section */}
            <MultiModalUploader onProcess={handleProcessUpload} isProcessing={isProcessing} />

            {/* Review Screen Panel */}
            {extractionResult && (
              <InventoryReviewTable
                items={extractionResult.extractedItems}
                overallConfidence={extractionResult.overallConfidence}
                overallFreshness={extractionResult.overallFreshness}
                transcript={extractionResult.transcript}
                providerName={extractionResult.provider}
                onSaveConfirmed={handleSaveConfirmedItems}
                onReset={() => {
                  setExtractionResult(null);
                  setCurrentStep(1);
                }}
              />
            )}

            {/* History Operations Log */}
            <AiHistoryLog shopId={shopId} />
          </main>
        </div>
      </div>
    </ShopOwnershipGuard>
  );
}
