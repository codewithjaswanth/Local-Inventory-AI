'use client';

import React, { useState } from 'react';
import { ExtractedInventoryItem } from '@/services/mockAI';
import { Sparkles, Edit3, Trash2, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface InventoryTableProps {
  initialItems: ExtractedInventoryItem[];
  onApprove: (finalItems: ExtractedInventoryItem[]) => void;
  onReject: () => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  initialItems,
  onApprove,
  onReject,
}) => {
  const [items, setItems] = useState<ExtractedInventoryItem[]>(initialItems);

  const handleUpdateField = (id: string, field: keyof ExtractedInventoryItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-white max-w-4xl mx-auto shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            STEP 4 & 5: REVIEW & EDIT EXTRACTION
          </span>
          <h2 className="text-2xl font-extrabold text-white pt-1">
            AI Extracted Inventory ({items.length} Items)
          </h2>
          <p className="text-xs text-slate-400">
            Modify any values inline before confirming publish to live store catalog.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800 text-emerald-400 font-bold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Average Confidence: 94.6%</span>
        </div>
      </div>

      {/* Editable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] font-mono text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price ($)</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Freshness</th>
              <th className="p-3">Confidence</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-medium">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateField(item.id, 'name', e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 font-bold text-white text-xs focus:outline-none focus:border-emerald-500 w-full"
                  />
                </td>
                <td className="p-3 w-24">
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleUpdateField(item.id, 'price', parseFloat(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 font-mono text-emerald-400 font-bold text-xs focus:outline-none focus:border-emerald-500 w-full"
                  />
                </td>
                <td className="p-3 w-24">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleUpdateField(item.id, 'unit', e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-300 text-xs focus:outline-none focus:border-emerald-500 w-full"
                  />
                </td>
                <td className="p-3 w-24">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateField(item.id, 'quantity', parseInt(e.target.value, 10))}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 font-bold text-white text-xs focus:outline-none focus:border-emerald-500 w-full"
                  />
                </td>
                <td className="p-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {item.freshnessScore}% Fresh
                  </span>
                </td>
                <td className="p-3 font-mono text-slate-400">
                  {item.confidence}% AI
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step 5 Approval Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <Button onClick={onReject} variant="outline" size="md" leftIcon={<XCircle className="w-4 h-4" />}>
          Reject & Discard
        </Button>

        <Button
          onClick={() => onApprove(items)}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto shadow-lg shadow-emerald-500/25"
          leftIcon={<CheckCircle2 className="w-5 h-5" />}
        >
          Approve & Publish to Marketplace
        </Button>
      </div>
    </div>
  );
};
