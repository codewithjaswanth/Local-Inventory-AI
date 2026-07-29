'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Edit3, Trash2, Save, Sparkles, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { ExtractedAiItem } from '@/services/ai/providers/aiProvider.interface';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface InventoryReviewTableProps {
  items: ExtractedAiItem[];
  overallConfidence: number;
  overallFreshness: number;
  transcript?: string;
  providerName: string;
  onSaveConfirmed: (acceptedItems: ExtractedAiItem[]) => Promise<void>;
  onReset: () => void;
}

export const InventoryReviewTable: React.FC<InventoryReviewTableProps> = ({
  items: initialItems,
  overallConfidence,
  overallFreshness,
  transcript,
  providerName,
  onSaveConfirmed,
  onReset
}) => {
  const [items, setItems] = useState<ExtractedAiItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Edit item field locally
  const handleItemChange = (id: string, field: keyof ExtractedAiItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity') {
            const num = Number(value);
            updated.availability = num <= 0 ? 'Out of Stock' : num <= 10 ? 'Low Stock' : 'In Stock';
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleToggleAccept = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'accepted' ? 'pending' : 'accepted'
          };
        }
        return item;
      })
    );
  };

  const handleReject = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const acceptedItems = items.filter((i) => i.status === 'accepted' || i.status === 'pending');

  const handleConfirmBatchSave = async () => {
    if (acceptedItems.length === 0) {
      alert('No items accepted for saving.');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveConfirmed(acceptedItems);
    } catch (err: any) {
      alert(err?.message || 'Error saving confirmed inventory items.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 shadow-2xl p-6 space-y-6 select-none">
      {/* Header & Confidence Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>AI Extracted Review Screen</span>
            <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {items.length} Extracted
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Review and edit AI extracted quantities before committing updates to live Supabase database.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{overallConfidence}% Confidence</span>
          </div>

          <div className="px-3 py-1.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>{overallFreshness}% Freshness</span>
          </div>
        </div>
      </div>

      {/* Transcript Info Banner */}
      {transcript && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
          <span className="text-emerald-400 font-bold uppercase mr-2">Raw Voice Transcript:</span>
          "{transcript}"
        </div>
      )}

      {/* Review Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80">
            <tr>
              <th className="p-3.5 rounded-l-2xl">Product Item</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Quantity</th>
              <th className="p-3.5">Unit</th>
              <th className="p-3.5">Availability</th>
              <th className="p-3.5">AI Confidence</th>
              <th className="p-3.5 rounded-r-2xl text-right">Actions (Accept / Edit / Reject)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {items.map((item) => {
              const isEditing = editingId === item.id;
              const isAccepted = item.status === 'accepted';

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isAccepted ? 'bg-emerald-950/20 hover:bg-emerald-900/30' : 'hover:bg-slate-900/70'
                  }`}
                >
                  {/* Product Name */}
                  <td className="p-3.5 font-bold text-white">
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                        className="bg-slate-950 border border-emerald-500 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
                      />
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="p-3.5 font-medium text-slate-300">
                    {isEditing ? (
                      <select
                        value={item.category}
                        onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                        className="bg-slate-950 border border-emerald-500 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
                      >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Groceries">Groceries</option>
                      </select>
                    ) : (
                      <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
                        {item.category}
                      </span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="p-3.5 font-bold text-emerald-400">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                        className="bg-slate-950 border border-emerald-500 rounded-xl px-2 py-1 text-xs text-white focus:outline-none w-20"
                      />
                    ) : (
                      `₹${Number(item.price).toFixed(2)}`
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="p-3.5 font-bold text-white">
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                        className="bg-slate-950 border border-emerald-500 rounded-xl px-2 py-1 text-xs text-white focus:outline-none w-20"
                      />
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </td>

                  {/* Unit */}
                  <td className="p-3.5 font-medium text-slate-400">
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                        className="bg-slate-950 border border-emerald-500 rounded-xl px-2 py-1 text-xs text-white focus:outline-none w-16"
                      />
                    ) : (
                      <span>{item.unit}</span>
                    )}
                  </td>

                  {/* Availability */}
                  <td className="p-3.5">
                    <StatusBadge
                      type={
                        item.availability === 'Out of Stock'
                          ? 'error'
                          : item.availability === 'Low Stock'
                          ? 'warning'
                          : 'success'
                      }
                      label={item.availability}
                    />
                  </td>

                  {/* AI Confidence */}
                  <td className="p-3.5 text-xs font-bold text-teal-400">
                    {item.confidence}%
                  </td>

                  {/* Action Buttons */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* Accept Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleAccept(item.id)}
                        className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1 transition-all ${
                          isAccepted
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400'
                        }`}
                        title="Accept / Confirm Item"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isAccepted ? 'Accepted' : 'Accept'}</span>
                      </button>

                      {/* Edit Toggle */}
                      <button
                        type="button"
                        onClick={() => setEditingId(isEditing ? null : item.id)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          isEditing
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                        title="Edit Item Fields"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Reject Item */}
                      <button
                        type="button"
                        onClick={() => handleReject(item.id)}
                        className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                        title="Reject / Discard Item"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-300"
        >
          Cancel & Reset
        </button>

        <button
          type="button"
          disabled={isSaving || acceptedItems.length === 0}
          onClick={handleConfirmBatchSave}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-glow-emerald transition-all active:scale-95 cursor-pointer"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving to Supabase DB...' : `Save ${acceptedItems.length} Confirmed Items`}</span>
        </button>
      </div>
    </div>
  );
};
