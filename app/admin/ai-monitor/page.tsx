'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { adminService, AiMonitoringJob } from '@/services/admin.service';
import { Cpu, Sparkles, RefreshCw, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAiMonitorPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminAiMonitorPageContent />
    </RoleGuard>
  );
}

function AdminAiMonitorPageContent() {
  const [jobs, setJobs] = useState<AiMonitoringJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    const data = await adminService.getAiMonitoringJobs();
    setJobs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRetryJob = async (jobId: string) => {
    const res = await adminService.retryFailedAiJob(jobId);
    if (res.success) {
      showToast(res.message);
    }
  };

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
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090F1D] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-teal-400 animate-pulse" />
              <span>AI System Monitoring & Job Retries</span>
            </h1>
            <p className="text-xs text-slate-400">
              Real-time monitoring of Whisper speech transcription, Vision OCR, and LLM entity extraction pipelines.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchJobs}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* AI Health Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-bold">AI Pipeline Success Rate</div>
            <div className="text-2xl font-extrabold text-white">98.6%</div>
            <div className="text-[10px] text-emerald-400 font-semibold">+0.4% from last week</div>
          </div>

          <div className="p-4 rounded-3xl bg-teal-500/10 border border-teal-500/30 text-teal-400 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Processing Speed</div>
            <div className="text-2xl font-extrabold text-white">1,240 ms</div>
            <div className="text-[10px] text-teal-400 font-semibold">Sub-second extraction</div>
          </div>

          <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/30 text-purple-400 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Average Confidence Score</div>
            <div className="text-2xl font-extrabold text-white">96.8%</div>
            <div className="text-[10px] text-purple-400 font-semibold">BAAI BGE 1024-dim</div>
          </div>
        </div>

        {/* Job Logs Table */}
        <div className="bg-[#090F1D] rounded-3xl border border-slate-800 p-5 shadow-2xl overflow-x-auto select-none">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Store Node</th>
                <th className="p-3.5">Input Pipeline</th>
                <th className="p-3.5">Confidence Score</th>
                <th className="p-3.5">Speed</th>
                <th className="p-3.5">Execution Status</th>
                <th className="p-3.5 rounded-r-2xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">{job.shopName}</td>

                  <td className="p-3.5 text-xs text-teal-400 font-bold uppercase">
                    {job.inputType.replace('_', ' + ')}
                  </td>

                  <td className="p-3.5 text-xs font-bold text-emerald-400">
                    {job.confidenceScore}%
                  </td>

                  <td className="p-3.5 text-xs text-slate-400 font-medium">{job.processedMs} ms</td>

                  <td className="p-3.5 text-xs font-medium">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        job.status === 'Validated'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleRetryJob(job.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 font-mono font-bold text-xs flex items-center space-x-1 ml-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Job</span>
                    </button>
                  </td>
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
