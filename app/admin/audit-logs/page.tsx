'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { adminService, AuditLogRecord } from '@/services/admin.service';
import { History, ShieldCheck, RefreshCw, FileText } from 'lucide-react';

export default function AdminAuditLogsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminAuditLogsPageContent />
    </RoleGuard>
  );
}

function AdminAuditLogsPageContent() {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    setIsLoading(true);
    const data = await adminService.getAuditLogs();
    setLogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <main className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090F1D] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <History className="w-6 h-6 text-purple-400" />
              <span>System Audit Logs & Security Trail</span>
            </h1>
            <p className="text-xs text-slate-400">
              Immutable audit trail of login events, shop approvals, inventory mutations, and administrative actions.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLogs}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Audit Trail Table */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 shadow-2xl overflow-x-auto select-none">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Actor Profile</th>
                <th className="p-3.5">Action Type</th>
                <th className="p-3.5">Target Resource</th>
                <th className="p-3.5">Event Details</th>
                <th className="p-3.5 rounded-r-2xl text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">
                    <div>
                      <span>{log.actorName}</span>
                      <span className="text-[10px] text-purple-400 block uppercase font-bold">
                        {log.actorRole}
                      </span>
                    </div>
                  </td>

                  <td className="p-3.5 text-xs font-bold text-emerald-400">
                    {log.actionType}
                  </td>

                  <td className="p-3.5 text-xs text-slate-300 font-medium">{log.targetResource}</td>

                  <td className="p-3.5 text-slate-400 text-xs font-medium">{log.details}</td>

                  <td className="p-3.5 text-xs text-slate-500 text-right font-medium">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </main>
  );
}
