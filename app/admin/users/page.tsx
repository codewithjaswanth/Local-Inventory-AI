'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { adminService, AdminUserRecord } from '@/services/admin.service';
import { Users, ShieldCheck, UserX, UserCheck, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminUsersPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminUsersPageContent />
    </RoleGuard>
  );
}

function AdminUsersPageContent() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await adminService.getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user: AdminUserRecord) => {
    const res = await adminService.toggleUserStatus(user.id, user.status);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: res.newStatus as any } : u))
      );
      showToast(`User "${user.name}" status updated to ${res.newStatus}`);
    }
  };

  const handleRoleChange = async (user: AdminUserRecord, newRole: 'customer' | 'shopkeeper' | 'admin') => {
    const res = await adminService.updateUserRole(user.id, newRole);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
      showToast(`Role for "${user.name}" updated to ${newRole}`);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
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
      <AdminHeader currentSection="User Management" />

        {/* Workspace Canvas */}
        <main className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Consolidated Single Container */}
          <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-6 shadow-xl">
            {/* Header & Filter Controls - Same Horizontal Plane */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">User Management Console</h1>
                    <button
                      type="button"
                      onClick={fetchUsers}
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Refresh Users List"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    View platform accounts, activate/deactivate users, and manage role assignments.
                  </p>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-sans text-xs">Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 font-medium"
                  >
                    <option value="All">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="shopkeeper">Shopkeeper</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                <thead className="bg-slate-100 dark:bg-[#050A14] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-4 rounded-l-xl text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">User Profile</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Assigned Role</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Account Status</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Registered Date</th>
                    <th className="px-5 py-4 rounded-r-xl text-right text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 font-sans">
                  {filteredUsers.map((u) => {
                    const isActive = u.status === 'Active';
                    return (
                      <tr
                        key={u.id}
                        className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 font-extrabold flex items-center justify-center text-xs shrink-0 border border-purple-500/20">
                              {u.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white text-sm block">{u.name}</span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{u.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u, e.target.value as any)}
                            className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-purple-600 dark:text-purple-300 font-bold focus:outline-none focus:border-purple-500"
                          >
                            <option value="customer">Customer</option>
                            <option value="shopkeeper">Shopkeeper</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
                              isActive
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                            <span>{u.status}</span>
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400 text-xs font-mono whitespace-nowrap">{u.createdAt}</td>

                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center space-x-1.5 transition-all ${
                              isActive
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            }`}
                          >
                            {isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                            <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Empty State */}
                  {filteredUsers.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center select-none">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <Users className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No users found</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              New user registrations will appear here.
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
