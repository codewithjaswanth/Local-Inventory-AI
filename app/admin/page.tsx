'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ADMIN_STATS, RECENT_AI_LOGS } from '@/data/adminData';
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
  UserCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shops' | 'inventory' | 'ai-logs'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100 flex overflow-hidden selection:bg-emerald-500/30">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#060B14] border-r border-slate-800/80 flex-shrink-0 min-h-screen">
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-white tracking-tight leading-none">
                Admin Control<span className="text-emerald-400">.AI</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 mt-1 uppercase font-bold">
                ENTERPRISE OPERATIONAL PORTAL
              </span>
            </div>
          </a>
        </div>

        <nav className="p-4 space-y-1.5 flex-1">
          {[
            { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
            { id: 'shops', label: 'Registered Shops', icon: Store, badge: '48 Active' },
            { id: 'inventory', label: 'Global Stock Items', icon: Package },
            { id: 'ai-logs', label: 'AI Extraction Logs', icon: Cpu, badge: 'Realtime' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-400">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-[#060B14]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-400">
            <span>Admin Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>System Status: 100% Operational</span>
            </div>

            <a href="/shop/create">
              <AnimatedButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Add New Shop
              </AnimatedButton>
            </a>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <SectionHeader
            title={`Welcome back, ${profile?.name || 'Administrator'} — Administrator`}
            description="Global marketplace monitoring, shopkeeper verification status, and real-time AI vision throughput."
            icon={Cpu}
            badgeText="ADMIN CONTROL CENTER"
          />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Active Shops"
              value="48"
              change="+6 this month"
              isPositive={true}
              icon={Store}
              badgeText="100% Online"
              accentColor="emerald"
            />
            <MetricCard
              title="Total Global Stock"
              value="14,920"
              change="+1,240 items"
              isPositive={true}
              icon={Package}
              badgeText="Sync Active"
              accentColor="blue"
            />
            <MetricCard
              title="AI Vision Extraction"
              value="99.6%"
              change="9,481 processed"
              isPositive={true}
              icon={Sparkles}
              badgeText="Vision NLP"
              accentColor="amber"
            />
            <MetricCard
              title="System Uptime"
              value="99.99%"
              change="0 outages"
              isPositive={true}
              icon={ShieldCheck}
              badgeText="Operational"
              accentColor="purple"
            />
          </div>

          {/* Shops Table */}
          <div className="bg-[#111827] rounded-3xl border border-slate-800/80 p-6 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-white">Registered Marketplace Stores</h3>
                <p className="text-xs text-slate-400">Manage owner credentials, address locations, and status.</p>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search stores or owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0F172A] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Shop Name</th>
                    <th className="p-3.5">Address</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {DETAILED_SHOPS.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-white flex items-center space-x-2">
                        <img src={s.image} alt={s.name} className="w-7 h-7 rounded-lg object-cover" />
                        <span>{s.name}</span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-400">{s.address}</td>
                      <td className="p-3.5 font-mono text-emerald-400">{s.category}</td>
                      <td className="p-3.5 font-mono text-white">{s.phone}</td>
                      <td className="p-3.5">
                        <StatusBadge type="success" label="Active Verified" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
