'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Menu, X, LogIn, LogOut, User, Store } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { Button } from './ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { RoleBasedNavigation } from './auth/RoleBasedNavigation';
import { UserRoleBadge } from './auth/UserRoleBadge';
import { LogoutModal } from './ui/LogoutModal';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, profile, role, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm py-3'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-4 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2.5 group" aria-label="Local Inventory AI Homepage">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Local Inventory<span className="text-brand-500">.AI</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                Hyperlocal Freshness
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <RoleBasedNavigation
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/60 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 text-sm font-medium text-slate-600 dark:text-slate-300"
            linkClassName="px-4 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 font-semibold text-xs sm:text-sm"
          />

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
                aria-label="Open search modal"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search items...</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>
            )}

            {user ? (
              <div className="flex items-center space-x-2.5">
                <UserRoleBadge role={role} />
                <a
                  href={role === 'shopkeeper' ? '/dashboard' : role === 'admin' ? '/admin' : '/profile'}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-emerald-500/40 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile?.name || 'Account'}</span>
                </a>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
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
            <button
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl"
          >
            <RoleBasedNavigation
              className="px-4 pt-3 pb-2 space-y-1"
              linkClassName="block px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors text-sm"
              onLinkClick={() => setMobileMenuOpen(false)}
            />
            <div className="px-4 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
              {user ? (
                <>
                  <a
                    href={role === 'shopkeeper' ? '/dashboard' : '/profile'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2.5 rounded-xl font-bold text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    {profile?.name || 'My Profile'}
                  </a>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <a href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" size="md" className="w-full">
                      Sign In
                    </Button>
                  </a>
                  <a href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Register Account
                    </Button>
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={async () => {
          setShowLogoutModal(false);
          await signOut();
        }}
      />
    </header>
  );
};
