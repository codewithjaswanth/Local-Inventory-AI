'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Sparkles,
  ShieldCheck,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ShopSwitcher } from '@/components/dashboard/ShopSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { useShopkeeperShops } from '@/hooks/useShopkeeperShops';

interface DashboardNavbarProps {
  shopName?: string;
  freshnessScore?: number;
  onOpenMobileMenu?: () => void;
  onQuickAction?: (action: string) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  shopName = 'GreenLeaf Fresh Market',
  freshnessScore = 98.6,
  onOpenMobileMenu,
  onQuickAction
}) => {
  const { user, profile, role, signOut } = useAuth();
  const { ownedShops, selectedShop, selectShop } = useShopkeeperShops();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const activeShopName = selectedShop?.name || shopName;

  const notifications = [
    {
      id: '1',
      title: 'Low Stock Alert',
      message: 'Hass Avocados down to 4 units. Restock recommended.',
      time: '5m ago',
      type: 'warning'
    },
    {
      id: '2',
      title: 'AI Freshness Verified',
      message: 'Fresh Vine Tomatoes scanned via Vision OCR (99.2% fresh).',
      time: '24m ago',
      type: 'success'
    },
    {
      id: '3',
      title: 'Foot Traffic Surge',
      message: 'Local customer views spiked +34% in last hour.',
      time: '1h ago',
      type: 'info'
    }
  ];

  return (
    <header className="h-20 bg-white/90 dark:bg-[#060B14]/90 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 select-none transition-colors">
      {/* Left: Mobile Menu Button & Brand Header */}
      <div className="flex items-center space-x-4">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center space-x-3">
          <Logo size="sm" showText={false} />
          <ShopSwitcher
            ownedShops={ownedShops}
            selectedShop={selectedShop}
            onSelectShop={selectShop}
          />
        </div>
      </div>

      {/* Center/Right Actions & Badges */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* AI Freshness Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-glow-emerald">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold">{freshnessScore}% AI Verified</span>
        </div>

        <ThemeToggle />

        {/* Notifications Bell Drawer */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 relative transition-all active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-[#060B14]">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUnreadCount(0)}
                    className="text-[11px] font-mono text-emerald-400 hover:underline"
                  >
                    Mark read
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start space-x-3 hover:border-slate-700 transition-colors"
                    >
                      {n.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : n.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{n.title}</span>
                          <span className="text-[10px] font-mono text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all active:scale-95"
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
              alt={profile?.name || 'Shopkeeper Avatar'}
              className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40"
            />
            <span className="hidden sm:inline-block text-xs font-bold text-slate-200 max-w-[100px] truncate">
              {profile?.name || 'Shopkeeper'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <AnimatePresence>
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-[#090F1D] border border-slate-800 rounded-3xl shadow-2xl p-2 z-50 space-y-1"
              >
                <div className="px-3 py-2.5 border-b border-slate-800/80 mb-1">
                  <p className="text-xs font-bold text-white truncate">{profile?.name || 'Active Partner'}</p>
                  <p className="text-[10px] font-mono text-emerald-400 capitalize">{role || 'Shopkeeper'}</p>
                </div>

                <a
                  href="/profile"
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Shop Profile</span>
                </a>

                <a
                  href="/settings"
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Store Settings</span>
                </a>

                <button
                  type="button"
                  onClick={() => signOut()}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
