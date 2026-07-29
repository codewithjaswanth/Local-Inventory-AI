'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { RECENT_AI_ACTIVITIES, ActivityFeedItem } from '@/data/shopPortalData';
import {
  History,
  Mic,
  Camera,
  FileText,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Package,
  Bot,
  Clock,
  ShieldCheck,
  Eye,
  X,
  Plus,
  Boxes,
} from 'lucide-react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function InventoryHistoryPage() {
  return (
    <RoleGuard allowedRoles={['shopkeeper', 'admin']}>
      <InventoryHistoryPageContent />
    </RoleGuard>
  );
}

// Expanded Mock Inventory Logs for rich audit trail simulation
const EXPANDED_INVENTORY_LOGS: (ActivityFeedItem & { channel: string; impact: string; price: string })[] = [
  {
    id: 'act-1',
    timestamp: 'Just now (12:04 PM)',
    type: 'Auto-Published',
    description: 'WhatsApp Bot published 50kg Vine Tomatoes at $2.49/lb',
    itemCount: 50,
    confidence: 99.5,
    channel: 'WhatsApp Voice Note',
    impact: '+50 kg',
    price: '$2.49/lb',
  },
  {
    id: 'act-2',
    timestamp: '15 mins ago (11:49 AM)',
    type: 'Shelf Photo Scanned',
    description: 'OCR parsed 30 Hass Avocados & tagged Freshness 98%',
    itemCount: 30,
    confidence: 98.2,
    channel: 'WhatsApp Photo OCR',
    impact: '+30 units',
    price: '$1.99/ea',
  },
  {
    id: 'act-3',
    timestamp: '45 mins ago (11:19 AM)',
    type: 'Voice Note Processed',
    description: 'Dictation transcribed: 18 Sourdough Bread Loaves at $6.50',
    itemCount: 18,
    confidence: 99.0,
    channel: 'Voice Note Dictation',
    impact: '+18 loaves',
    price: '$6.50/ea',
  },
  {
    id: 'act-4',
    timestamp: '2 hours ago (10:04 AM)',
    type: 'Price Rule Applied',
    description: 'Evening end-of-day 10% freshness discount applied to berries',
    itemCount: 12,
    confidence: 100.0,
    channel: 'Automated Pricing Engine',
    impact: 'Price Adj',
    price: '$3.60/pack',
  },
  {
    id: 'act-5',
    timestamp: '3 hours ago (09:12 AM)',
    type: 'Shelf Photo Scanned',
    description: 'OCR Vision detected 25 packs Farm Fresh Spinach at $2.49',
    itemCount: 25,
    confidence: 96.8,
    channel: 'WhatsApp Photo OCR',
    impact: '+25 packs',
    price: '$2.49/pack',
  },
  {
    id: 'act-6',
    timestamp: 'Yesterday (04:30 PM)',
    type: 'Voice Note Processed',
    description: 'Voice update: 15 bottles Grass-Fed Milk at $4.20',
    itemCount: 15,
    confidence: 98.9,
    channel: 'WhatsApp Voice Note',
    impact: '+15 bottles',
    price: '$4.20/ea',
  },
];

function InventoryHistoryPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Voice' | 'Photo' | 'Price'>('All');
  const [activeLogModal, setActiveLogModal] = useState<typeof EXPANDED_INVENTORY_LOGS[0] | null>(null);

  const filteredLogs = EXPANDED_INVENTORY_LOGS.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.channel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All' ||
      (selectedFilter === 'Voice' && log.channel.includes('Voice')) ||
      (selectedFilter === 'Photo' && log.channel.includes('Photo')) ||
      (selectedFilter === 'Price' && log.type.includes('Price'));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 flex overflow-hidden selection:bg-emerald-500/30 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <ShopPortalSidebar activePath="/history" />

      {/* Main SaaS Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Top Header Bar */}
        <header className="h-16 bg-white/90 dark:bg-[#040810]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">Local Inventory Audit Trail</span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Listener Active</span>
            </div>

            <a href="/dashboard">
              <AnimatedButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Log Quick Stock
              </AnimatedButton>
            </a>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Title Section */}
          <SectionHeader
            title="Local Inventory Audit Trail"
            description="Time-stamped log of all automated WhatsApp voice notes, OCR shelf photo extractions, and AI stock syncs."
            icon={History}
            badgeText="AUTOMATED AUDIT LOG"
          />

          {/* Metric Cards Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total Stock Updates"
              value="1,482"
              change="+24% this week"
              isPositive={true}
              icon={Boxes}
              badgeText="Audit Active"
              accentColor="emerald"
            />
            <MetricCard
              title="Voice Note Dictations"
              value="892"
              change="99.4% accuracy"
              isPositive={true}
              icon={Mic}
              badgeText="WhatsApp Bot"
              accentColor="blue"
            />
            <MetricCard
              title="OCR Shelf Scans"
              value="590"
              change="Vision NLP Active"
              isPositive={true}
              icon={Camera}
              badgeText="Receipt Vision"
              accentColor="purple"
            />
            <MetricCard
              title="Sync Latency"
              value="< 1.2s"
              change="Realtime push"
              isPositive={true}
              icon={Clock}
              badgeText="Live Stream"
              accentColor="amber"
            />
          </div>

          {/* Main Log Table Area */}
          <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-6 shadow-2xl">
            {/* Filter and Search Controls Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center">
                  <History className="w-5 h-5 text-emerald-400 mr-2" />
                  Inventory Event Trail ({filteredLogs.length} Records)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Filter by update type, voice note input, or search produce names.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Filter Tabs */}
                <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  {(['All', 'Voice', 'Photo', 'Price'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        selectedFilter === filter
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Audit Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Timestamp</th>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5">Event Description</th>
                    <th className="p-3.5">Stock Impact</th>
                    <th className="p-3.5">Unit Price</th>
                    <th className="p-3.5">AI Confidence</th>
                    <th className="p-3.5 rounded-r-xl text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <AnimatePresence mode="popLayout">
                    {filteredLogs.map((log) => {
                      const isVoice = log.channel.includes('Voice');
                      const isPhoto = log.channel.includes('Photo');

                      return (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="hover:bg-slate-900/60 transition-colors"
                        >
                          <td className="p-3.5 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                isVoice
                                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                  : isPhoto
                                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              }`}
                            >
                              {isVoice ? (
                                <Mic className="w-3 h-3" />
                              ) : isPhoto ? (
                                <Camera className="w-3 h-3" />
                              ) : (
                                <Sparkles className="w-3 h-3" />
                              )}
                              <span>{log.channel}</span>
                            </span>
                          </td>
                          <td className="p-3.5 font-sans font-medium text-slate-200 max-w-sm truncate">
                            {log.description}
                          </td>
                          <td className="p-3.5 text-emerald-400 font-bold">{log.impact}</td>
                          <td className="p-3.5 text-white font-bold">{log.price}</td>
                          <td className="p-3.5">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-emerald-400 h-1.5 rounded-full"
                                  style={{ width: `${log.confidence}%` }}
                                />
                              </div>
                              <span className="text-emerald-400 font-bold">{log.confidence}%</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => setActiveLogModal(log)}
                              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 transition-all inline-flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3 mr-1 text-emerald-400" />
                              <span>View Payload</span>
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Log Details Overlay Modal */}
      {activeLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#091122] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative"
          >
            <button
              onClick={() => setActiveLogModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Audit Extraction Payload</h3>
                <span className="text-xs font-mono text-slate-400">Log ID: {activeLogModal.id}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Input Audio / OCR Summary</span>
                <p className="text-emerald-300 font-sans font-medium text-sm">{activeLogModal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Channel</span>
                  <span className="text-white font-bold">{activeLogModal.channel}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Timestamp</span>
                  <span className="text-white font-bold">{activeLogModal.timestamp}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Stock Impact</span>
                  <span className="text-emerald-400 font-bold">{activeLogModal.impact}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">AI Confidence Score</span>
                  <span className="text-emerald-400 font-bold">{activeLogModal.confidence}%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLogModal(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Close Audit Inspection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

