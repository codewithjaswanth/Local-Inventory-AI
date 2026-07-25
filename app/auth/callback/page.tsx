'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, RefreshCw, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { authService } from '@/services/auth.service';
import { shopService } from '@/services/shop.service';

const SUBTEXT_STEPS = [
  'Verifying your Google account...',
  'Creating secure session...',
  'Loading your profile...',
  'Preparing your dashboard...',
  'Almost ready...',
];

export default function AuthCallbackPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Cycling subtext every 2 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setStepIndex((prev) => (prev < SUBTEXT_STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + Math.floor(Math.random() * 12 + 6) : 95));
    }, 350);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    async function handleAuthRedirect() {
      try {
        console.log('[AuthCallback] Processing OAuth callback...');

        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
          const errorDescription = urlParams.get('error_description');

          if (errorDescription) {
            console.error('[AuthCallback] OAuth Error in URL:', errorDescription);
            if (isMounted) setErrorMsg(errorDescription);
            return;
          }

          // Step 1: Check if Supabase client auto-exchanged session
          const { data: initialSessionData } = await supabase.auth.getSession();

          if (!initialSessionData.session?.user && code) {
            console.log('[AuthCallback] Session not found yet. Attempting code exchange...');
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              console.warn('[AuthCallback] Code exchange warning:', exchangeError.message);
              // Re-check getSession() in case auto-exchange completed concurrently
              const { data: retrySession } = await supabase.auth.getSession();
              if (!retrySession.session?.user) {
                console.error('[AuthCallback] Final session check failed after code exchange attempt');
                if (isMounted) setErrorMsg(exchangeError.message);
                return;
              }
            }
          }
        }

        // Step 2: Fetch authenticated user & profile
        const { user: currentUser, profile: currentProfile } = await authService.getCurrentUser();

        if (!currentUser) {
          console.warn('[AuthCallback] No user session found after callback');
          if (isMounted) setErrorMsg('No active user session found. Please sign in again.');
          return;
        }

        if (isMounted) setProgress(100);

        // Ensure minimum loading duration of 1.5 seconds to avoid UI flashing
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 1500 - elapsed);

        setTimeout(() => {
          if (!isMounted) return;
          const role = currentProfile?.role || currentUser.user_metadata?.role || 'customer';
          console.log('[AuthCallback] Successfully authenticated via OAuth. User role:', role);

          // Step 3: Role-based destination routing
          if (role === 'shopkeeper') {
            shopService.getShopByOwnerId(currentUser.id).then((existingShop) => {
              if (existingShop) {
                window.location.href = '/dashboard';
              } else {
                window.location.href = '/shop/create';
              }
            });
          } else if (role === 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        }, remainingDelay);

      } catch (err: any) {
        console.error('[AuthCallback] Unexpected error in AuthCallback:', err);
        if (isMounted) setErrorMsg(err.message || 'Authentication callback failed');
      }
    }

    handleAuthRedirect();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[
          { x: -180, y: -120 },
          { x: 140, y: 80 },
          { x: -220, y: 150 },
          { x: 200, y: -160 },
          { x: -90, y: 210 },
          { x: 110, y: -230 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
            initial={{
              x: pt.x,
              y: pt.y,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3.5 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl shadow-emerald-950/20 text-center space-y-6 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {errorMsg ? (
            /* Error Card State */
            <motion.div
              key="error-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
                <AlertTriangle className="w-8 h-8 text-rose-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Authentication Failed
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {errorMsg}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Try Again</span>
                </button>
                <a
                  href="/login"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </a>
              </div>
            </motion.div>
          ) : (
            /* Loading State */
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Animated Spinner & Pulsing Badge */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 border-r-emerald-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
                />
                
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </motion.div>
              </div>

              {/* Heading & Animated Subtext */}
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Authenticating your account
                </h2>
                
                <div className="h-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stepIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-emerald-400 font-mono font-medium flex items-center space-x-1"
                    >
                      <span>• {SUBTEXT_STEPS[stepIndex]}</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-1.5 pt-2">
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full"
                    initial={{ width: '10%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Local Inventory AI Auth</span>
                  <span>{progress}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
