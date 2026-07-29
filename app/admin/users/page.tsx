'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { adminService, AdminUserRecord } from '@/services/admin.service';
import { Users, ShieldCheck, UserX, UserCheck, Shield, RefreshCw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminUsersPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminUsersPageContent />
    </RoleGuard>
  );
}

function AdminUsersPageContent() {
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
              <Users className="w-6 h-6 text-purple-400" />
              <span>User Management Console</span>
            </h1>
            <p className="text-xs text-slate-400">
              View platform accounts, activate/deactivate users, and manage role assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchUsers}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Search & Role Filters */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs shrink-0 font-medium">
            <span className="text-slate-400">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
            >
              <option value="All">All Roles</option>
              <option value="customer">Customer</option>
              <option value="shopkeeper">Shopkeeper</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 shadow-2xl overflow-x-auto select-none">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="p-3.5 rounded-l-2xl">User Profile</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Account Status</th>
                <th className="p-3.5">Registered Date</th>
                <th className="p-3.5 rounded-r-2xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredUsers.map((u) => {
                const isActive = u.status === 'Active';
                return (
                  <tr key={u.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5">
                      <div>
                        <span className="font-bold text-white text-sm block">{u.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{u.email}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u, e.target.value as any)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-purple-400 font-bold focus:outline-none"
                      >
                        <option value="customer">Customer</option>
                        <option value="shopkeeper">Shopkeeper</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-xs">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-400 text-xs font-medium">{u.createdAt}</td>

                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1 ml-auto transition-all ${
                          isActive
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        }`}
                      >
                        {isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                      </button>
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
