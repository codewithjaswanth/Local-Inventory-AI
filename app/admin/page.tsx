'use client';

import React, { useState } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ADMIN_STATS,
  MOST_SEARCHED_PRODUCTS,
  RECENT_AI_LOGS,
  INVENTORY_ACTIVITY_HOURLY,
  AiLogEntry,
} from '@/data/adminData';
import { DETAILED_SHOPS } from '@/data/mockData';
import { SEARCH_PRODUCTS } from '@/data/searchProducts';
import Link from 'next/link';
import {
  LayoutDashboard,
  Store,
  Package,
  Cpu,
  Sparkles,
  Search,
  Plus,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Activity,
  ArrowUpRight,
  X,
  ExternalLink,
  CheckCircle2,
  Home,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/ui/MetricCard';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSearchParams } from 'next/navigation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { toNominativeCase } from '@/utils';

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <React.Suspense fallback={<div className="min-h-screen bg-[#040810] flex items-center justify-center text-xs font-mono text-slate-400">Loading Admin Console...</div>}>
        <AdminDashboardPageContent />
      </React.Suspense>
    </RoleGuard>
  );
}

function AdminDashboardPageContent() {
  console.log('[PAGE] Rendering Admin Dashboard');
  const { profile } = useAuth();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shops' | 'inventory' | 'ai-logs' | 'keywords'>('dashboard');

  React.useEffect(() => {
    if (tabParam === 'keywords' || tabParam === 'shops' || tabParam === 'inventory' || tabParam === 'ai-logs') {
      setActiveTab(tabParam);
    } else {
      setActiveTab('dashboard');
    }
  }, [tabParam]);
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState<'All' | 'Validated' | 'Flagged Review'>('All');
  const [aiLogs, setAiLogs] = useState<AiLogEntry[]>(RECENT_AI_LOGS);

  const formatPriceUnit = (unit: string) => {
    let clean = (unit || 'kg').replace(/^per\s+/i, '').trim();
    if (clean.toLowerCase() === 'each') return 'unit';
    return clean;
  };

  const formatQtyUnit = (unit: string, qty: number) => {
    let clean = (unit || 'kg').replace(/^per\s+/i, '').trim().toLowerCase();
    if (clean === 'each') return 'units';
    if (clean === 'kg') return 'kg';
    if (clean === 'pack') return qty === 1 ? 'pack' : 'packs';
    if (clean === 'box') return qty === 1 ? 'box' : 'boxes';
    return clean;
  };

  const renderInputTypeBadge = (inputType: string) => {
    const typeLower = inputType.toLowerCase();
    let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    let dotClass = 'bg-slate-400';

    if (typeLower.includes('voice')) {
      bgClass = 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
      dotClass = 'bg-purple-500';
    } else if (typeLower.includes('photo') || typeLower.includes('ocr') || typeLower.includes('vision')) {
      bgClass = 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30';
      dotClass = 'bg-sky-500';
    } else if (typeLower.includes('receipt')) {
      bgClass = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      dotClass = 'bg-emerald-500';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border whitespace-nowrap ${bgClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span>{inputType}</span>
      </span>
    );
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'Flagged Review' || status === 'Flagged/Review') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-xs whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Flagged / Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shadow-xs whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Validated</span>
      </span>
    );
  };

  const tabTitles: Record<string, string> = {
    dashboard: 'System Overview',
    shops: 'Registered Shops',
    inventory: 'Global Stock Catalog',
    'ai-logs': 'AI Extraction Stream',
    keywords: 'Search Trends',
  };

  const adminName = toNominativeCase(profile?.name);

  const tabDescriptions: Record<string, string> = {
    dashboard: `Welcome back, ${adminName}. Here is your real-time platform health, store inventory, and AI throughput.`,
    shops: 'Manage registered store credentials, locations, and verification status across the marketplace.',
    inventory: 'Inspect live produce items, available stock quantities, prices, and AI freshness verification status.',
    'ai-logs': 'Real-time multi-modal AI stream inspector for WhatsApp voice notes, OCR shelf photos, and receipt parsing.',
    keywords: 'Track hyperlocal search terms, monthly search volume, and neighborhood store fulfillment rates.',
  };

  const filteredLogs = aiLogs.filter((log) => {
    const matchesSearch =
      log.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.extractedSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.inputType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = logFilter === 'All' || log.status === logFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredShops = DETAILED_SHOPS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = SEARCH_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Sticky Top Header Bar */}
        <header className="h-16 bg-white/90 dark:bg-[#040810]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/admin"
              className="font-extrabold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center space-x-2"
            >
              <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm tracking-tight">Inventra.AI</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href="/admin"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            {activeTab !== 'dashboard' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="capitalize text-purple-600 dark:text-purple-400 font-semibold">{tabTitles[activeTab]}</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Status: 100% Operational</span>
            </div>

            <a href="/shop/create">
              <AnimatedButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Register Shop
              </AnimatedButton>
            </a>

          </div>
        </header>

        {/* Dashboard Work Area */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Single Clean Page Title Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {tabTitles[activeTab]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {tabDescriptions[activeTab]}
            </p>
          </div>

          {/* Animated Tab Content Container */}
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="tab-dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Sleek KPI Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <MetricCard
                    title="Active Registered Stores"
                    value="142"
                    change="+12% this month"
                    isPositive={true}
                    icon={Store}
                    badgeText="100% Online"
                    accentColor="emerald"
                  />
                  <MetricCard
                    title="Global Produce Items"
                    value="6,840"
                    change="+18.4% this week"
                    isPositive={true}
                    icon={Package}
                    badgeText="Sync Active"
                    accentColor="blue"
                  />
                  <MetricCard
                    title="AI Extractions Today"
                    value="1,280"
                    change="+34% vs yesterday"
                    isPositive={true}
                    icon={Sparkles}
                    badgeText="Vision & Voice"
                    accentColor="amber"
                  />
                  <MetricCard
                    title="System Health Score"
                    value="99.99%"
                    change="0 outages"
                    isPositive={true}
                    icon={ShieldCheck}
                    badgeText="Operational"
                    accentColor="purple"
                  />
                </div>

                {/* Main Visuals Grid: Hourly Chart & Top Keywords */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left 7 Cols: Hourly AI Extraction Activity Chart */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#091122] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
                          <Activity className="w-5 h-5 text-emerald-500 mr-2" />
                          Hourly AI Extraction Throughput
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Voice notes vs receipt OCR photo scans across all neighborhood stores.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                        Live 24h Feed
                      </span>
                    </div>

                    {/* Bar Chart Visualizer */}
                    <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
                      {INVENTORY_ACTIVITY_HOURLY.map((pt, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <div className="w-full flex items-end justify-center gap-1.5 h-40">
                            {/* Updates Bar */}
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(pt.updates / 400) * 100}%` }}
                              transition={{ duration: 0.6, delay: idx * 0.05 }}
                              className="w-1/2 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md group-hover:brightness-125 transition-all"
                              title={`${pt.updates} WhatsApp Voice Updates`}
                            />
                            {/* Scans Bar */}
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(pt.scans / 800) * 100}%` }}
                              transition={{ duration: 0.6, delay: idx * 0.05 + 0.1 }}
                              className="w-1/2 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-md group-hover:brightness-125 transition-all"
                              title={`${pt.scans} OCR Photo Scans`}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">{pt.time}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center space-x-6 text-xs font-mono pt-2 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-md bg-emerald-500" />
                        <span className="text-slate-600 dark:text-slate-300">Voice Note Extractions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-md bg-purple-500" />
                        <span className="text-slate-600 dark:text-slate-300">WhatsApp OCR Photo Scans</span>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: Top Search Keywords */}
                  <div className="lg:col-span-5 bg-white dark:bg-[#091122] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
                        Trending Search Keywords
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('keywords')}
                        className="text-xs font-mono text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        View All →
                      </button>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {MOST_SEARCHED_PRODUCTS.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between hover:border-purple-500/40 transition-colors"
                        >
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-sans">{item.term}</h4>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {item.category} • {item.searchVolume.toLocaleString()} searches
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{item.fulfillmentRate}%</span>
                            <span className="text-[9px] text-slate-400">In Stock Rate</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time AI Extraction Stream Table */}
                <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
                        <Cpu className="w-5 h-5 text-purple-500 mr-2" />
                        Real-Time Multi-Modal AI Extraction Stream
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Live stream of WhatsApp voice notes, OCR shelf photos, and receipt parsing.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('ai-logs')}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-xs border border-purple-500/30 transition-all"
                    >
                      Open Log Inspector
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                      <thead className="bg-slate-100 dark:bg-[#050A14] text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-4 rounded-l-xl whitespace-nowrap">Log ID</th>
                          <th className="px-5 py-4 whitespace-nowrap">Timestamp</th>
                          <th className="px-5 py-4 whitespace-nowrap">Store Name</th>
                          <th className="px-5 py-4 whitespace-nowrap">Input Type</th>
                          <th className="px-5 py-4 whitespace-nowrap">Extracted Summary</th>
                          <th className="px-5 py-4 whitespace-nowrap">Confidence</th>
                          <th className="px-5 py-4 rounded-r-xl whitespace-nowrap">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                        {aiLogs.slice(0, 5).map((log) => (
                          <tr
                            key={log.id}
                            className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                          >
                            <td className="px-5 py-4 font-mono text-purple-600 dark:text-purple-400 font-bold whitespace-nowrap">
                              #LOG-{log.id.toUpperCase().replace('LOG-', '').padStart(4, '0')}
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                            <td className="px-5 py-4 font-bold text-slate-900 dark:text-white font-sans whitespace-nowrap">{log.shopName}</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {renderInputTypeBadge(log.inputType)}
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-300 max-w-xs sm:max-w-md truncate">
                              {log.extractedSummary}
                            </td>
                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{log.confidenceScore}%</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {renderStatusBadge(log.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Registered Shops Tab */}
            {activeTab === 'shops' && (
              <motion.div
                key="tab-shops"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Store Listings</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                        {filteredShops.length} stores
                      </span>
                    </div>

                    <div className="relative max-w-xs w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search stores or owners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                      <thead className="bg-slate-100 dark:bg-[#050A14] text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-4 rounded-l-xl whitespace-nowrap">Shop Name</th>
                          <th className="px-5 py-4 whitespace-nowrap">Address</th>
                          <th className="px-5 py-4 whitespace-nowrap">Category</th>
                          <th className="px-5 py-4 whitespace-nowrap">Phone</th>
                          <th className="px-5 py-4 whitespace-nowrap">Rating</th>
                          <th className="px-5 py-4 rounded-r-xl text-right whitespace-nowrap">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                        {filteredShops.map((s) => (
                          <tr
                            key={s.id}
                            className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                          >
                            <td className="px-5 py-4 font-bold text-slate-900 dark:text-white flex items-center space-x-3 whitespace-nowrap">
                              <img src={s.image} alt={s.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" />
                              <span className="truncate">{s.name}</span>
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-500 dark:text-slate-400 truncate max-w-xs">{s.address}</td>
                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{s.category}</td>
                            <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">{s.phone}</td>
                            <td className="px-5 py-4 font-mono text-amber-500 dark:text-amber-400 font-bold whitespace-nowrap">★ {s.rating}</td>
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <a
                                href={`/shop/${s.id}`}
                                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-500/20 text-slate-500 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all inline-flex items-center justify-center shadow-xs cursor-pointer"
                                title={`View ${s.name}`}
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Global Stock Catalog Tab */}
            {activeTab === 'inventory' && (
              <motion.div
                key="tab-inventory"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Catalog Items</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                        {filteredInventory.length} items
                      </span>
                    </div>

                    <div className="relative max-w-xs w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search produce or shop..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                      <thead className="bg-slate-100 dark:bg-[#050A14] text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-4 rounded-l-xl whitespace-nowrap">Produce Name</th>
                          <th className="px-5 py-4 whitespace-nowrap">Store</th>
                          <th className="px-5 py-4 whitespace-nowrap">Price</th>
                          <th className="px-5 py-4 whitespace-nowrap">Stock Qty</th>
                          <th className="px-5 py-4 whitespace-nowrap">Freshness Score</th>
                          <th className="px-5 py-4 rounded-r-xl whitespace-nowrap text-center">AI Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                        {filteredInventory.map((item) => (
                          <tr key={item.id} className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50">
                            <td className="px-5 py-4 font-bold text-slate-900 dark:text-white flex items-center space-x-3 whitespace-nowrap">
                              <img src={item.image} alt={item.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" />
                              <span className="truncate">{item.name}</span>
                            </td>
                            <td className="px-5 py-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">{item.shopName}</td>
                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">₹{item.price} / {formatPriceUnit(item.unit)}</td>
                            <td className="px-5 py-4 font-mono text-slate-900 dark:text-white font-semibold whitespace-nowrap">{item.availableQty} {formatQtyUnit(item.unit, item.availableQty)}</td>
                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{item.freshnessScore}%</td>
                            <td className="px-5 py-4 whitespace-nowrap text-center">
                              <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" title="AI Verified">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Vision & NLP Logs Tab */}
            {activeTab === 'ai-logs' && (
              <motion.div
                key="tab-ai-logs"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
                        <Cpu className="w-5 h-5 text-purple-500 mr-2" />
                        Extraction Stream
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Detailed transcriptions, OCR confidence, and validation status.</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono">
                        {(['All', 'Validated', 'Flagged Review'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setLogFilter(st)}
                            className={`px-3 py-1 rounded-lg transition-all ${
                              logFilter === st ? 'bg-purple-500 text-white font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="relative max-w-xs w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Search logs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                      <thead className="bg-slate-100 dark:bg-[#050A14] text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-4 rounded-l-xl whitespace-nowrap">Log ID</th>
                          <th className="px-5 py-4 whitespace-nowrap">Timestamp</th>
                          <th className="px-5 py-4 whitespace-nowrap">Store Name</th>
                          <th className="px-5 py-4 whitespace-nowrap">Input Type</th>
                          <th className="px-5 py-4 whitespace-nowrap">Extracted Summary</th>
                          <th className="px-5 py-4 whitespace-nowrap">Confidence</th>
                          <th className="px-5 py-4 rounded-r-xl whitespace-nowrap">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                        {filteredLogs.map((log) => (
                          <tr
                            key={log.id}
                            className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                          >
                            <td className="px-5 py-4 font-mono text-purple-600 dark:text-purple-400 font-bold whitespace-nowrap">
                              #LOG-{log.id.toUpperCase().replace('LOG-', '').padStart(4, '0')}
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                            <td className="px-5 py-4 font-bold text-slate-900 dark:text-white font-sans whitespace-nowrap">{log.shopName}</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {renderInputTypeBadge(log.inputType)}
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-300 max-w-xs sm:max-w-md truncate">
                              {log.extractedSummary}
                            </td>
                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{log.confidenceScore}%</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {renderStatusBadge(log.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Marketplace Search Trends Tab */}
            {activeTab === 'keywords' && (
              <motion.div
                key="tab-keywords"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
                        Search Keywords
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {MOST_SEARCHED_PRODUCTS.length} terms
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                      <thead className="bg-slate-100 dark:bg-[#050A14] text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-4 rounded-l-xl whitespace-nowrap">Search Term</th>
                          <th className="px-5 py-4 whitespace-nowrap">Category</th>
                          <th className="px-5 py-4 whitespace-nowrap text-right">Monthly Volume</th>
                          <th className="px-5 py-4 whitespace-nowrap">Fulfillment Rate</th>
                          <th className="px-5 py-4 rounded-r-xl whitespace-nowrap">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 font-mono">
                        {MOST_SEARCHED_PRODUCTS.map((kw) => (
                          <tr key={kw.id} className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50">
                            <td className="px-5 py-4 font-bold text-slate-900 dark:text-white font-sans whitespace-nowrap">{kw.term}</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 whitespace-nowrap">
                                {kw.category}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-900 dark:text-white font-bold whitespace-nowrap text-right">{kw.searchVolume.toLocaleString()}</td>
                            <td className="px-5 py-4 text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{kw.fulfillmentRate}%</td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {kw.trend === 'up' && (
                                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                  <span>Up</span>
                                </span>
                              )}
                              {kw.trend === 'stable' && (
                                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                  <Minus className="w-3.5 h-3.5" />
                                  <span>Stable</span>
                                </span>
                              )}
                              {kw.trend === 'down' && (
                                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
                                  <TrendingDown className="w-3.5 h-3.5" />
                                  <span>Down</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
    </>
  );
}
