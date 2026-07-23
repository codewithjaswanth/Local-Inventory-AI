'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, LogIn, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/services/auth.service';

export default function LoginPage() {
  const { signIn, user, role: currentRole, isLoading: isAuthLoading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('shopkeeper');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isAuthLoading) {
      if (currentRole === 'shopkeeper') {
        window.location.href = '/dashboard';
      } else if (currentRole === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }
  }, [user, currentRole, isAuthLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const success = await signIn(email, password);
    setIsSubmitting(false);

    if (!success) {
      setErrorMsg(authError || 'Failed to sign in. Please check your credentials.');
      return;
    }

    if (role === 'shopkeeper') {
      window.location.href = '/dashboard';
    } else if (role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-md mx-auto px-4 w-full">
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Sign In to Local Inventory AI
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access your marketplace account or shopkeeper control panel.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Role Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Login Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'shopkeeper', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                    role === r
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 border-transparent shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} variant="primary" size="md" className="w-full" leftIcon={<LogIn className="w-4 h-4" />}>
            Sign In with Supabase Auth
          </Button>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Create Account
            </a>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
