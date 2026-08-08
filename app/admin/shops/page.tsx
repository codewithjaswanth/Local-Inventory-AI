'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { adminService, AdminShopRecord } from '@/services/admin.service';
import { Store, ShieldCheck, Ban, Check, Eye, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminShopsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminShopsPageContent />
    </RoleGuard>
  );
}

function AdminShopsPageContent() {
  const { profile } = useAuth();
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
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header Bar */}
      <AdminHeader currentSection="Shop Approvals" />

        {/* Workspace Canvas */}
        <main className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Consolidated Single Container */}
          <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-6 shadow-xl">
            {/* Header & Filter Controls - Same Horizontal Plane */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Shop Management & Approvals</h1>
                    <button
                      type="button"
                      onClick={fetchShops}
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Refresh Shops List"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Approve or reject store onboarding applications, suspend policy violations, and view store details.
                  </p>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search shop name, owner, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-sans text-xs">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 font-medium"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shops Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                <thead className="bg-slate-100 dark:bg-[#050A14] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-4 rounded-l-xl text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Store Details</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Owner Name</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Category</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Approval Status</th>
                    <th className="px-5 py-4 rounded-r-xl text-right text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 font-sans">
                  {filteredShops.map((shop) => {
                    return (
                      <tr
                        key={shop.id}
                        className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center justify-center text-xs shrink-0 border border-emerald-500/20">
                              <Store className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white text-sm block">{shop.name}</span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">📍 {shop.address}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-200 whitespace-nowrap">{shop.ownerName}</td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 whitespace-nowrap">
                            {shop.category}
                          </span>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
                              shop.status === 'Approved'
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                                : shop.status === 'Pending Review'
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                                : 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                shop.status === 'Approved'
                                  ? 'bg-emerald-500 animate-pulse'
                                  : shop.status === 'Pending Review'
                                  ? 'bg-amber-500 animate-pulse'
                                  : 'bg-rose-500'
                              }`}
                            />
                            <span>{shop.status}</span>
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Store Icon Button */}
                            <a
                              href={`/shop/${shop.id}`}
                              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-500/20 text-slate-500 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all inline-flex items-center justify-center shadow-xs cursor-pointer"
                              title={`View ${shop.name}`}
                            >
                              <Eye className="w-4 h-4" />
                            </a>

                            {/* Approve Icon Button */}
                            {shop.status !== 'Approved' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(shop, 'Approved')}
                                className="w-9 h-9 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all inline-flex items-center justify-center shadow-xs cursor-pointer"
                                title="Approve Store"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {/* Suspend Icon Button */}
                            {shop.status !== 'Suspended' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(shop, 'Suspended')}
                                className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition-all inline-flex items-center justify-center shadow-xs cursor-pointer"
                                title="Suspend Store"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Empty State */}
                  {filteredShops.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center select-none">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Store className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No shops found</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Store onboarding applications and registrations will appear here.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
    </>
  );
}
