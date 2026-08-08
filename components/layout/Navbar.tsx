'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LogIn,
  LogOut,
  User,
  Store,
  Settings,
  ChevronDown,
  ShoppingBag,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { APP_CONFIG } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleBadge } from '../auth/UserRoleBadge';
import { RoleBasedNavigation } from '../auth/RoleBasedNavigation';
import { Logo } from '../ui/Logo';

import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, profile, role, signOut } = useAuth();
  const { cartCount, openCart } = useCart();

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
      className="sticky top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-[#040810]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 px-4 sm:px-8 py-3 shadow-xs dark:shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href={role === 'admin' ? '/admin' : '/'} className="group shrink-0 flex items-center space-x-2" aria-label={`${APP_CONFIG.name} Homepage`}>
          <Logo size="md" />
        </a>

        {/* Centered Desktop Navigation Links (Pill Container) */}
        <RoleBasedNavigation
          className="hidden md:flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/50 text-xs font-semibold shadow-inner shrink-0"
          linkClassName="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
        />

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          <ThemeToggle />

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-xs w-8 h-8 flex items-center justify-center cursor-pointer"
            aria-label="Open shopping cart drawer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {onOpenSearch && (
            <motion.button
              type="button"
              onClick={onOpenSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 shadow-xs w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Open search modal"
              title="Search"
            >
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            </motion.button>
          )}

          {user ? (
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block">
                  <UserRoleBadge role={role} />
                </div>
                <motion.button
                  type="button"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-xs whitespace-nowrap cursor-pointer ${
                    role === 'admin'
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20'
                      : role === 'shopkeeper'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-purple-500/40'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-[10px]">
                    {(profile?.name || user.email || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <span className="whitespace-nowrap truncate max-w-[100px] sm:max-w-[140px] font-bold">
                    {profile?.name || 'My Account'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>

              {/* Smart User Dropdown */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#091122] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden z-50 p-1.5 space-y-0.5"
                    >
                      {/* User Identity Header */}
                      <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800/60 mb-1">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          {profile?.name || 'Account'}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono mt-0.5">
                          {user.email}
                        </p>
                      </div>

                      {/* Standard User Links */}
                      <a
                        href="/orders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-purple-500" />
                        <span>My Orders</span>
                      </a>

                      <a
                        href="/favorites"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Favorites</span>
                      </a>

                      <a
                        href="/settings"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Settings</span>
                      </a>

                      {/* Divider */}
                      <div className="h-px bg-slate-200/80 dark:bg-slate-800/80 my-1" />

                      {/* Role-based Portals */}
                      {role === 'admin' && (
                        <a
                          href="/admin"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-500" />
                          <span>Admin Console</span>
                        </a>
                      )}

                      {role === 'shopkeeper' && (
                        <a
                          href="/dashboard"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-colors"
                        >
                          <Store className="w-4 h-4 text-emerald-500" />
                          <span>Shopkeeper Portal</span>
                        </a>
                      )}

                      {role !== 'admin' && role !== 'shopkeeper' && (
                        <a
                          href="/shop/create"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors"
                        >
                          <Store className="w-4 h-4 text-emerald-500" />
                          <span>Become a Seller</span>
                        </a>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-slate-200/80 dark:bg-slate-800/80 my-1" />

                      {/* Red Sign Out Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <a href="/login">
                <Button variant="secondary" size="sm" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                  Sign In
                </Button>
              </a>
              <a href="/signup" className="hidden sm:inline-block">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
