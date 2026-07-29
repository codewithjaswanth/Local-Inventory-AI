'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { adminService, AdminShopRecord } from '@/services/admin.service';
import { Store, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminShopsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminShopsPageContent />
    </RoleGuard>
  );
}

function AdminShopsPageContent() {
  const [shops, setShops] = useState<AdminShopRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchShops = async () => {
    setIsLoading(true);
    const data = await adminService.getShopsList();
    setShops(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleUpdateStatus = async (shop: AdminShopRecord, newStatus: 'Approved' | 'Pending Review' | 'Suspended') => {
    const res = await adminService.updateShopStatus(shop.id, newStatus);
    if (res.success) {
      setShops((prev) =>
        prev.map((s) => (s.id === shop.id ? { ...s, status: newStatus } : s))
      );
      showToast(`Shop "${shop.name}" status updated to ${newStatus}`);
    }
  };

  const filteredShops = shops.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30">
      <Navbar />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090F1D] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Store className="w-6 h-6 text-emerald-400" />
              <span>Shop Management & Approvals</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Approve or reject store onboarding applications, suspend policy violations, and view store details.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchShops}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search shop name, owner, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs shrink-0 font-medium">
            <span className="text-slate-400">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Shops Table */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 shadow-2xl overflow-x-auto select-none">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Store Details</th>
                <th className="p-3.5">Owner Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Approval Status</th>
                <th className="p-3.5 rounded-r-2xl text-right">Actions (Approve / Suspend)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredShops.map((shop) => {
                return (
                  <tr key={shop.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5">
                      <div>
                        <span className="font-bold text-white text-sm block">{shop.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">📍 {shop.address}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-slate-200">{shop.ownerName}</td>

                    <td className="p-3.5 text-xs font-bold text-emerald-400">{shop.category}</td>

                    <td className="p-3.5 text-xs">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          shop.status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : shop.status === 'Pending Review'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {shop.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {shop.status !== 'Approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(shop, 'Approved')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs flex items-center space-x-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {shop.status !== 'Suspended' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(shop, 'Suspended')}
                            className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-mono font-bold text-xs flex items-center space-x-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Suspend</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </main>
  );
}
