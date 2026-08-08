'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || role !== 'admin')) {
      router.replace('/');
    }
  }, [user, role, isLoading, router]);

  // Show loading spinner while auth state is being resolved
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#040810]">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Block render for non-admin users (redirect is already triggered above)
  if (!user || role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#040810]">
        <div className="flex flex-col items-center space-y-3 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Access Denied</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Only administrators can access this console. You are being redirected...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 flex overflow-hidden font-sans selection:bg-purple-500/30 transition-colors duration-200">
      {/* Unified Enterprise Left Sidebar */}
      <AdminSidebar />

      {/* Main Content Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
