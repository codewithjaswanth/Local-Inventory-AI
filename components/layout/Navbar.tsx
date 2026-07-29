'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Menu, X, LogIn, LogOut, User, Store } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { APP_CONFIG } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { RoleBasedNavigation } from '../auth/RoleBasedNavigation';
import { UserRoleBadge } from '../auth/UserRoleBadge';
import { Logo } from '../ui/Logo';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, role, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-2 sm:top-3 left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-300 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto bg-white/90 dark:bg-[#040810]/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 rounded-2xl sm:rounded-full shadow-lg dark:shadow-2xl py-3 sm:py-3.5 px-4 sm:px-7 pointer-events-auto transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a href="/" className="group shrink-0" aria-label={`${APP_CONFIG.name} Homepage`}>
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <RoleBasedNavigation
            className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold shadow-inner shrink-0"
            linkClassName="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
          />

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <ThemeToggle />

            {onOpenSearch && (
              <motion.button
                type="button"
                onClick={onOpenSearch}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#091122]/90 hover:bg-[#0E1A33] text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-emerald-500/50 shadow-md backdrop-blur-md group cursor-pointer"
                aria-label="Open search modal"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap font-bold text-slate-200">Search...</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900 text-emerald-400 font-bold text-[10px] border border-emerald-500/30 shadow-2xs">
                  ⌘K
                </kbd>
              </motion.button>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserRoleBadge role={role} />
                <motion.a
                  href={role === 'admin' ? '/admin' : role === 'shopkeeper' ? '/dashboard' : '/profile'}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all shadow-2xs whitespace-nowrap ${
                    role === 'admin'
                      ? 'bg-slate-100 dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700/90 text-slate-800 dark:text-slate-100 hover:border-indigo-500/40 dark:hover:border-indigo-500/40'
                      : role === 'shopkeeper'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-emerald-500/40'
                  }`}
                >
                  {role === 'admin' ? (
                    <Store className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  ) : role === 'shopkeeper' ? (
                    <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                  <span className="whitespace-nowrap truncate max-w-[120px] capitalize">{profile?.name || (role === 'admin' ? 'Admin' : role === 'shopkeeper' ? 'Shop' : 'Account')}</span>
                </motion.a>
                <motion.button
                  type="button"
                  onClick={() => signOut()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <a href="/login">
                  <Button variant="secondary" size="sm" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                    Sign In
                  </Button>
                </a>
                <a href="/signup">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />

            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Open search modal"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden pointer-events-auto bg-white/95 dark:bg-[#040810]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-2xl rounded-3xl mt-2 mx-auto max-w-7xl"
          >
            <div className="px-5 pt-4 pb-6 space-y-4">
              {user && (
                <div className="px-2 pt-1 pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <UserRoleBadge role={role} />
                  <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                    {profile?.name || user.email}
                  </span>
                </div>
              )}

              <RoleBasedNavigation
                className="space-y-1.5"
                linkClassName="block px-4 py-3 rounded-2xl font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm active:scale-[0.98]"
                onLinkClick={() => setMobileMenuOpen(false)}
              />

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2.5">
                {user ? (
                  <>
                    <a
                      href={role === 'admin' ? '/admin' : role === 'shopkeeper' ? '/dashboard' : '/profile'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-3 rounded-2xl font-extrabold text-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 active:scale-[0.98]"
                    >
                      {role === 'admin' ? 'Admin Console' : role === 'shopkeeper' ? 'Shopkeeper Portal' : 'My Account'}
                    </a>
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut();
                      }}
                      variant="outline"
                      size="md"
                      className="w-full min-h-[44px]"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <a href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" size="md" className="w-full min-h-[44px]">
                        Sign In
                      </Button>
                    </a>
                    <a href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" size="md" className="w-full min-h-[44px]">
                        Register Account
                      </Button>
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
