'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, LogIn, Lock, Mail, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/services/auth.service';
import { shopService } from '@/services/shop.service';

export default function LoginPage() {
  const { signIn, signInWithGoogle, user, profile, role: currentRole, isLoading: isAuthLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<UserRole>('shopkeeper');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered') === 'true') {
        setInfoMsg('Account created successfully. Please log in with your email and password.');
      }
      if (params.get('reset') === 'success') {
        setInfoMsg('Password reset successfully. Please log in with your new password.');
      }
      const prefilledEmail = params.get('email');
      if (prefilledEmail) {
        setEmail(prefilledEmail);
      }
    }
  }, []);

  useEffect(() => {
    async function redirectLoggedInUser() {
      if (user && !isAuthLoading) {
        const activeRole = profile?.role || currentRole || role;
        if (activeRole === 'shopkeeper') {
          const existingShop = await shopService.getShopByOwnerId(user.id);
          if (existingShop) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/shop/create';
          }
        } else if (activeRole === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      }
    }

    redirectLoggedInUser();
  }, [user, profile, currentRole, isAuthLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    console.log('[LoginPage] Login Started for:', email);
    setIsSubmitting(true);

    const { success, error } = await signIn(email, password);
    setIsSubmitting(false);

    if (!success || error) {
      console.error('[LoginPage] Sign in failed:', error);
      setErrorMsg(error || 'Failed to sign in. Please check your credentials.');
      return;
    }

    console.log('[LoginPage] Sign in successful. Determining redirect destination...');
    const activeRole = profile?.role || role;
    if (activeRole === 'shopkeeper') {
      const existingShop = user ? await shopService.getShopByOwnerId(user.id) : null;
      if (existingShop) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/shop/create';
      }
    } else if (activeRole === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsGoogleSubmitting(true);
    const { error } = await signInWithGoogle();
    setIsGoogleSubmitting(false);
    if (error) {
      setErrorMsg(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-md mx-auto px-4 w-full">
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-xl">
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

          {infoMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting || isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{isGoogleSubmitting ? 'Connecting...' : 'Continue with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 shrink-0">
              OR EMAIL
            </span>
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          </div>

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

          <div className="space-y-3">
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <a href="/forgot-password" className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} variant="primary" size="md" className="w-full" leftIcon={<LogIn className="w-4 h-4" />}>
            Sign In with Supabase Auth
          </Button>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
