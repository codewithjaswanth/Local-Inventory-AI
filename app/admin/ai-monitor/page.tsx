'use client';

import React, { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { adminService, AiMonitoringJob } from '@/services/admin.service';
import { Cpu, Sparkles, RefreshCw, AlertTriangle, CheckCircle2, RotateCcw, Activity, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetricCard } from '@/components/ui/MetricCard';
import { AdminHeader } from '@/components/admin/AdminHeader';

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

  const renderPipelineBadge = (inputType: string) => {
    const typeLower = inputType.toLowerCase();
    let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    let dotClass = 'bg-slate-400';

    if (typeLower.includes('voice')) {
      bgClass = 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
      dotClass = 'bg-purple-500';
    } else if (typeLower.includes('photo') || typeLower.includes('ocr') || typeLower.includes('vision')) {
      bgClass = 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30';
      dotClass = 'bg-sky-500';
    } else if (typeLower.includes('receipt')) {
      bgClass = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      dotClass = 'bg-emerald-500';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border whitespace-nowrap ${bgClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span>{inputType.replace('_', ' ')}</span>
      </span>
    );
  };

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
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header Bar */}
      <AdminHeader currentSection="AI System Monitoring" />

        {/* Workspace Canvas */}
        <main className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Main Title Banner */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <Cpu className="w-7 h-7 text-purple-600 dark:text-purple-400 animate-pulse" />
                <span>AI System Monitoring</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Real-time monitoring of Whisper speech transcription, Vision OCR, and LLM entity extraction pipelines.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchJobs}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-xs transition-colors"
              title="Refresh AI Jobs"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Consolidated Horizontal KPI Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="AI Pipeline Success Rate"
              value="98.6%"
              change="+0.4% from last week"
              isPositive={true}
              icon={ShieldCheck}
              badgeText="High Reliability"
              accentColor="emerald"
            />
            <MetricCard
              title="Avg Processing Speed"
              value="1,240 ms"
              change="Sub-second extraction"
              isPositive={true}
              icon={Zap}
              badgeText="Optimized"
              accentColor="blue"
            />
            <MetricCard
              title="Average Confidence Score"
              value="96.8%"
              change="BAAI BGE 1024-dim"
              isPositive={true}
              icon={Sparkles}
              badgeText="High Accuracy"
              accentColor="purple"
            />
          </div>

          {/* Single Consolidated Table Container */}
          <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Active Processing Pipeline Jobs</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  {jobs.length} jobs
                </span>
              </div>
            </div>

            {/* Job Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                <thead className="bg-slate-100 dark:bg-[#050A14] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-4 rounded-l-xl text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Store Node</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Input Pipeline</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Confidence Score</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Processing Speed</th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Execution Status</th>
                    <th className="px-5 py-4 rounded-r-xl text-right text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 font-sans">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="even:bg-slate-50/50 dark:even:bg-slate-900/30 hover:bg-purple-50/40 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200/60 dark:border-slate-800/50"
                    >
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {job.shopName}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        {renderPipelineBadge(job.inputType)}
                      </td>

                      <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                        {job.confidenceScore}%
                      </td>

                      <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap">
                        {job.processedMs} ms
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
                            job.status === 'Validated'
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${job.status === 'Validated' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                          <span>{job.status}</span>
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end">
                          {job.status === 'Validated' ? (
                            <span
                              className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center justify-center cursor-default"
                              title="Job Validated - No Action Needed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRetryJob(job.id)}
                              className="w-9 h-9 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all inline-flex items-center justify-center shadow-xs cursor-pointer"
                              title="Retry Failed Job"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Empty State */}
                  {jobs.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center select-none">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <Cpu className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No active AI jobs</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Voice notes, shelf photo OCR scans, and receipt processing jobs will appear here.
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
