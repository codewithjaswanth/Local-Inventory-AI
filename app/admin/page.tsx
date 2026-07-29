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
import {
  LayoutDashboard,
  Store,
  Package,
  BarChart3,
  Cpu,
  Settings,
  Sparkles,
  CheckCircle2,
  Search,
  Plus,
  Bell,
  ChevronRight,
  ShieldCheck,
  Mic,
  Camera,
  FileText,
  TrendingUp,
  AlertTriangle,
  Eye,
  RefreshCw,
  Activity,
  ArrowUpRight,
  Check,
  X,
  Filter,
  CheckSquare,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminDashboardPageContent />
    </RoleGuard>
  );
}

function AdminDashboardPageContent() {
  console.log('[PAGE] Rendering Admin Dashboard');
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shops' | 'inventory' | 'ai-logs' | 'keywords'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState<'All' | 'Validated' | 'Flagged Review'>('All');
  const [aiLogs, setAiLogs] = useState<AiLogEntry[]>(RECENT_AI_LOGS);

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 flex overflow-hidden selection:bg-emerald-500/30 font-sans transition-colors duration-200">
      {/* Sleek Enterprise Admin Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-[#060D1A] border-r border-slate-200 dark:border-slate-800/80 flex-shrink-0 min-h-screen select-none transition-colors">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight leading-none">
                Admin Control<span className="text-purple-600 dark:text-purple-400">.AI</span>
              </span>
              <span className="text-[9px] text-purple-600 dark:text-purple-400 mt-1 uppercase font-bold tracking-wider">
                ENTERPRISE OPERATIONAL PORTAL
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Item Tabs */}
        <nav className="p-4 space-y-1.5 flex-1" aria-label="Admin Navigation">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            System Control Modules
          </div>

          {[
            { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
            { id: 'shops', label: 'Registered Shops', icon: Store, badge: `${DETAILED_SHOPS.length} Stores` },
            { id: 'inventory', label: 'Global Stock Catalog', icon: Package },
            { id: 'ai-logs', label: 'AI Vision & NLP Logs', icon: Cpu, badge: 'Live Stream' },
            { id: 'keywords', label: 'Marketplace Search Trends', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all relative ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold shadow-md shadow-purple-950/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800/80 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Link & Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
          <a
            href="/dashboard"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-all"
          >
            <div className="flex items-center space-x-2">
              <Store className="w-3.5 h-3.5" />
              <span>Shopkeeper Portal</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center space-x-3 pt-1">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="flex flex-col text-xs truncate">
              <span className="font-bold text-white truncate">{profile?.name || 'Administrator'}</span>
              <span className="text-[10px] text-purple-400 font-medium">Super Admin Permission</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Header Bar */}
        <header className="h-16 bg-white/90 dark:bg-[#040810]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Admin Console</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold capitalize">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Status: 100% Operational</span>
            </div>

            <a href="/shop/create">
              <AnimatedButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Register New Shop
              </AnimatedButton>
            </a>
          </div>
        </header>

        {/* Dashboard Work Area */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Title Banner */}
          <SectionHeader
            title={`Enterprise System Control — ${profile?.name || 'Administrator'}`}
            description="Real-time multi-modal AI extraction tracking, shopkeeper verification status, and global inventory analytics."
            icon={ShieldCheck}
            badgeText="ADMIN CONTROL CENTER"
          />

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
                {/* 4 Metric Cards Grid */}
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
                  <div className="lg:col-span-7 bg-[#091122] p-6 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center">
                          <Activity className="w-5 h-5 text-emerald-400 mr-2" />
                          Hourly AI Extraction Throughput
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Voice notes vs receipt OCR photo scans across all neighborhood stores.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
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

                    <div className="flex items-center justify-center space-x-6 text-xs font-mono pt-2 border-t border-slate-800/60">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-md bg-emerald-400" />
                        <span className="text-slate-300">Voice Note Extractions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-md bg-purple-400" />
                        <span className="text-slate-300">WhatsApp OCR Photo Scans</span>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: Top Search Keywords */}
                  <div className="lg:col-span-5 bg-[#091122] p-6 rounded-3xl border border-slate-800/80 shadow-2xl space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-amber-400 mr-2" />
                        Trending Local Search Keywords
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('keywords')}
                        className="text-xs font-mono text-purple-400 hover:underline"
                      >
                        View All →
                      </button>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {MOST_SEARCHED_PRODUCTS.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-purple-500/40 transition-colors"
                        >
                          <div>
                            <h4 className="font-bold text-white text-xs font-sans">{item.term}</h4>
                            <span className="text-[10px] text-slate-400">
                              {item.category} • {item.searchVolume.toLocaleString()} searches
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-emerald-400 block">{item.fulfillmentRate}%</span>
                            <span className="text-[9px] text-slate-500">In Stock Rate</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time AI Extraction Stream */}
                <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center">
                        <Cpu className="w-5 h-5 text-purple-400 mr-2" />
                        Real-Time Multi-Modal AI Extraction Stream
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Live stream of WhatsApp voice notes, OCR shelf photos, and receipt parsing.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('ai-logs')}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30 transition-all"
                    >
                      Open Full Log Inspector
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 rounded-l-xl">Timestamp</th>
                          <th className="p-3.5">Store Name</th>
                          <th className="p-3.5">Input Type</th>
                          <th className="p-3.5">AI Summary</th>
                          <th className="p-3.5">Confidence</th>
                          <th className="p-3.5 rounded-r-xl">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {aiLogs.slice(0, 4).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3.5 font-mono text-slate-400">{log.timestamp}</td>
                            <td className="p-3.5 font-bold text-white">{log.shopName}</td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-purple-300 border border-slate-700">
                                {log.inputType}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-300 max-w-xs truncate">
                              {log.extractedSummary}
                            </td>
                            <td className="p-3.5 font-mono text-emerald-400 font-bold">{log.confidenceScore}%</td>
                            <td className="p-3.5">
                              <StatusBadge
                                type={log.status === 'Flagged Review' ? 'warning' : 'success'}
                                label={log.status}
                              />
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
                <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Registered Marketplace Stores ({filteredShops.length})</h3>
                      <p className="text-xs text-slate-400">Manage owner credentials, address locations, and verification status.</p>
                    </div>

                    <div className="relative max-w-xs w-full">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search stores or owners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 rounded-l-xl">Shop Name</th>
                          <th className="p-3.5">Address</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Phone</th>
                          <th className="p-3.5">Rating</th>
                          <th className="p-3.5 rounded-r-xl text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredShops.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3.5 font-bold text-white flex items-center space-x-3">
                              <img src={s.image} alt={s.name} className="w-8 h-8 rounded-xl object-cover border border-slate-700" />
                              <span>{s.name}</span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-400">{s.address}</td>
                            <td className="p-3.5 font-mono text-emerald-400 font-bold">{s.category}</td>
                            <td className="p-3.5 font-mono text-slate-300">{s.phone}</td>
                            <td className="p-3.5 font-mono text-amber-400 font-bold">★ {s.rating}</td>
                            <td className="p-3.5 text-right">
                              <a
                                href={`/shop/${s.id}`}
                                className="px-3 py-1 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-[11px] border border-purple-500/30 transition-all inline-flex items-center space-x-1"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                <span>View Store</span>
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
                <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Global Produce Inventory ({filteredInventory.length})</h3>
                      <p className="text-xs text-slate-400">All live produce items across neighborhood stores.</p>
                    </div>

                    <div className="relative max-w-xs w-full">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search produce or shop..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 rounded-l-xl">Produce Name</th>
                          <th className="p-3.5">Store</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5">Stock Qty</th>
                          <th className="p-3.5">Freshness Score</th>
                          <th className="p-3.5 rounded-r-xl">AI Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredInventory.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3.5 font-bold text-white flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-8 h-8 rounded-xl object-cover border border-slate-700" />
                              <span>{item.name}</span>
                            </td>
                            <td className="p-3.5 font-medium text-slate-300">{item.shopName}</td>
                            <td className="p-3.5 font-mono text-emerald-400 font-bold">${item.price} / {item.unit}</td>
                            <td className="p-3.5 font-mono text-white">{item.availableQty} {item.unit}s</td>
                            <td className="p-3.5 font-mono text-emerald-400 font-bold">{item.freshnessScore}%</td>
                            <td className="p-3.5">
                              <StatusBadge type="success" label="AI Verified" />
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
                <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-white flex items-center">
                        <Cpu className="w-5 h-5 text-purple-400 mr-2" />
                        AI Extraction Log Inspector
                      </h3>
                      <p className="text-xs text-slate-400">Detailed transcriptions, OCR confidence, and validation status.</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                        {(['All', 'Validated', 'Flagged Review'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setLogFilter(st)}
                            className={`px-3 py-1 rounded-lg transition-all ${
                              logFilter === st ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="relative max-w-xs w-full">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Search logs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 rounded-l-xl">Log ID</th>
                          <th className="p-3.5">Store Name</th>
                          <th className="p-3.5">Input Type</th>
                          <th className="p-3.5">Extracted Summary</th>
                          <th className="p-3.5">Confidence</th>
                          <th className="p-3.5 rounded-r-xl">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3.5 text-slate-500">{log.id}</td>
                            <td className="p-3.5 font-bold text-white font-sans">{log.shopName}</td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-purple-300 border border-slate-700">
                                {log.inputType}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-200">{log.extractedSummary}</td>
                            <td className="p-3.5 text-emerald-400 font-bold">{log.confidenceScore}%</td>
                            <td className="p-3.5">
                              <StatusBadge
                                type={log.status === 'Flagged Review' ? 'warning' : 'success'}
                                label={log.status}
                              />
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
                <div className="bg-[#091122] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-amber-400 mr-2" />
                        Hyperlocal Demand & Search Keyword Volume
                      </h3>
                      <p className="text-xs text-slate-400">Search volume vs local store inventory fulfillment rate.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#050A14] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 rounded-l-xl">Search Term</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Monthly Volume</th>
                          <th className="p-3.5">Fulfillment Rate</th>
                          <th className="p-3.5 rounded-r-xl">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {MOST_SEARCHED_PRODUCTS.map((kw) => (
                          <tr key={kw.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3.5 font-bold text-white font-sans">{kw.term}</td>
                            <td className="p-3.5 text-emerald-400">{kw.category}</td>
                            <td className="p-3.5 text-white">{kw.searchVolume.toLocaleString()} searches</td>
                            <td className="p-3.5 text-emerald-400 font-bold">{kw.fulfillmentRate}%</td>
                            <td className="p-3.5 font-bold uppercase text-emerald-400">🔥 {kw.trend}</td>
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
      </div>
    </div>
  );
}

