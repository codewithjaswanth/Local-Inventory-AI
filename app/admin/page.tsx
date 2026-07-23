'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ADMIN_STATS,
  MOST_SEARCHED_PRODUCTS,
  RECENT_AI_LOGS,
  INVENTORY_ACTIVITY_HOURLY,
  AiLogEntry,
  SearchedProduct
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
  Menu,
  X,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Bell,
  ChevronRight,
  ShieldCheck,
  Mic,
  Camera,
  FileText,
  UserCheck,
  MapPin
} from 'lucide-react';

interface NavItem {
  id: 'dashboard' | 'shops' | 'inventory' | 'analytics' | 'ai-logs' | 'settings';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shops' | 'inventory' | 'analytics' | 'ai-logs' | 'settings'>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState<'today' | '7days' | '30days'>('today');

  // Helper to render icon for KPI cards
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-5 h-5 text-emerald-600" />;
      case 'Package':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'AlertTriangle':
      default:
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    }
  };

  // Helper for input modality icons
  const renderLogModalityIcon = (type: string) => {
    switch (type) {
      case 'Voice Note':
        return <Mic className="w-4 h-4 text-emerald-500" />;
      case 'WhatsApp Photo':
        return <Camera className="w-4 h-4 text-blue-500" />;
      case 'Receipt OCR':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'Community Check-in':
      default:
        return <UserCheck className="w-4 h-4 text-amber-500" />;
    }
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shops', label: 'Shops', icon: Store, badge: '142' },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: '6.8k' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-logs', label: 'AI Logs', icon: Cpu, badge: 'LIVE' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0">
        {/* Sidebar Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-white tracking-tight leading-none">
                Local Inventory<span className="text-emerald-500">.AI</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 mt-0.5">
                ADMIN CONSOLE v2.4
              </span>
            </div>
          </a>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badge === 'LIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Admin User Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Admin avatar"
              className="w-9 h-9 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-200">Sarah Jenkins</span>
              <span className="text-[10px] text-slate-400">Chief Operations Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-100 capitalize">{activeTab}</span>
            </div>
          </div>

          {/* Top Bar Actions & Status */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>System Status: 100% Operational</span>
            </div>

            <button
              onClick={() => alert('Add New Shop Modal')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New Shop</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Workspace Area */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD MAIN OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top Welcome Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Marketplace Control Center
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Real-time metrics, live AI processing streams, and stock freshness tracking across 142 local vendors.
                  </p>
                </div>
              </div>

              {/* 4 Key Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {ADMIN_STATS.map((stat) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">{stat.title}</span>
                      <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                        {renderKpiIcon(stat.iconName)}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-black text-white tracking-tight">{stat.value}</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inventory Activity Graph (Left 7 cols) */}
                <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                        Live Inventory Activity Graph
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Hourly vendor updates vs customer stock searches today.
                      </p>
                    </div>

                    {/* Chart timeframe filter */}
                    <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-xl text-xs">
                      <button
                        onClick={() => setChartTimeframe('today')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${chartTimeframe === 'today' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                      >
                        Today
                      </button>
                      <button
                        onClick={() => setChartTimeframe('7days')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${chartTimeframe === '7days' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                      >
                        7 Days
                      </button>
                    </div>
                  </div>

                  {/* SVG Bar / Activity Visual */}
                  <div className="h-64 flex items-end justify-between gap-2 pt-6 px-2">
                    {INVENTORY_ACTIVITY_HOURLY.map((pt, i) => {
                      const updateHeightPercent = (pt.updates / 400) * 100;
                      const scanHeightPercent = (pt.scans / 800) * 100;

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <div className="w-full flex items-end justify-center gap-1 h-48">
                            {/* Updates Bar */}
                            <div
                              style={{ height: `${updateHeightPercent}%` }}
                              className="w-1/2 bg-emerald-500/80 group-hover:bg-emerald-400 rounded-t-md transition-all relative"
                              title={`${pt.updates} updates at ${pt.time}`}
                            />
                            {/* Scans Bar */}
                            <div
                              style={{ height: `${scanHeightPercent}%` }}
                              className="w-1/2 bg-blue-500/60 group-hover:bg-blue-400 rounded-t-md transition-all relative"
                              title={`${pt.scans} customer scans at ${pt.time}`}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{pt.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Graph Legend */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-center space-x-6 text-xs text-slate-400">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-sm bg-emerald-500 mr-2" /> Vendor Updates
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-sm bg-blue-500/60 mr-2" /> Customer Scans
                    </span>
                  </div>
                </div>

                {/* Most Searched Products Widget (Right 5 cols) */}
                <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Search className="w-5 h-5 text-amber-400 mr-2" />
                      Most Searched Products
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Live Rank</span>
                  </div>

                  <div className="space-y-3">
                    {MOST_SEARCHED_PRODUCTS.map((prod, idx) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl bg-slate-800/60 border border-slate-800 flex items-center justify-between hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-700 font-mono text-xs font-bold text-emerald-400 flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-100 text-xs sm:text-sm">{prod.term}</h4>
                            <span className="text-[10px] font-mono text-slate-400">{prod.category}</span>
                          </div>
                        </div>

                        <div className="text-right text-xs">
                          <div className="font-bold text-white">{prod.searchVolume.toLocaleString()} searches</div>
                          <div className="text-[10px] text-emerald-400 font-medium">
                            {prod.fulfillmentRate}% fulfilled
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent AI Updates Feed Table */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Cpu className="w-5 h-5 text-emerald-400 mr-2 animate-pulse" />
                      Recent Multi-Modal AI Processing Logs
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Sub-second vision OCR, voice transcriptions, and community validation events.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('ai-logs')}
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    View All Logs →
                  </button>
                </div>

                {/* Logs Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="text-[11px] font-mono text-slate-400 uppercase bg-slate-800/60 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Shop Name</th>
                        <th className="p-3">Modality</th>
                        <th className="p-3">AI Extracted Summary</th>
                        <th className="p-3">Confidence</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {RECENT_AI_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-bold text-slate-100">{log.shopName}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                              {renderLogModalityIcon(log.inputType)}
                              <span>{log.inputType}</span>
                            </span>
                          </td>
                          <td className="p-3 font-mono text-emerald-300">{log.extractedSummary}</td>
                          <td className="p-3 font-bold text-slate-100">{log.confidenceScore}%</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${log.status === 'Validated'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                }`}
                            >
                              {log.status}
                            </span>
                          </td>
                          <td className="p-3 text-right text-slate-400 font-mono">{log.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SHOPS MANAGEMENT */}
          {activeTab === 'shops' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-white">Registered Shops (142)</h2>
                <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs">+ Register New Vendor</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DETAILED_SHOPS.map((shop) => (
                  <div key={shop.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <img src={shop.image} alt={shop.name} className="w-full h-36 object-cover rounded-xl" />
                    <div>
                      <h3 className="font-bold text-white text-base">{shop.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{shop.address}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400">
                        <span>{shop.inventoryCount} items live</span>
                        <span>Rating: {shop.rating} ★</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY TABLE */}
          {activeTab === 'inventory' && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-2xl font-extrabold text-white">All Live Inventory Items (6,840)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800 text-slate-400 font-mono">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Shop</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Qty</th>
                      <th className="p-3">Freshness</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {SEARCH_PRODUCTS.slice(0, 8).map((prod) => (
                      <tr key={prod.id}>
                        <td className="p-3 font-bold text-white">{prod.name}</td>
                        <td className="p-3">{prod.shopName}</td>
                        <td className="p-3 font-mono text-emerald-400">${prod.price.toFixed(2)}</td>
                        <td className="p-3">{prod.availableQty} units</td>
                        <td className="p-3 font-bold text-emerald-400">{prod.freshnessScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AI LOGS INSPECTOR */}
          {activeTab === 'ai-logs' && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <h2 className="text-2xl font-extrabold text-white flex items-center">
                <Cpu className="w-6 h-6 text-emerald-400 mr-2" />
                Full AI Processing Inspector Log Stream
              </h2>

              <div className="space-y-4 font-mono text-xs">
                {RECENT_AI_LOGS.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Log ID: {log.id}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <p className="text-emerald-400 font-bold">{log.shopName} — {log.inputType}</p>
                    <p className="text-slate-200">{log.extractedSummary}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Confidence Score: {log.confidenceScore}%</span>
                      <span className="text-emerald-400">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5 & 6: ANALYTICS & SETTINGS PLACEHOLDERS */}
          {(activeTab === 'analytics' || activeTab === 'settings') && (
            <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab} Management Panel</h2>
              <p className="text-slate-400 text-sm">System controls and global telemetry settings for Local Inventory AI.</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between z-10"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Admin Console</span>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-xs ${activeTab === item.id ? 'bg-emerald-500 text-white' : 'text-slate-400'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
