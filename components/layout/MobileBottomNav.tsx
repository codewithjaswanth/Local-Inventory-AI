'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Store, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { user, role } = useAuth();
  const { cartCount, openCart } = useCart();

  // Admin users are restricted strictly to /admin console and do not use storefront mobile nav
  if (role === 'admin') {
    return null;
  }

  const profileHref = user
    ? role === 'shopkeeper'
      ? '/dashboard'
      : '/profile'
    : '/login';

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Categories', href: '/categories', icon: Grid },
    { label: 'Shops', href: '/shops', icon: Store },
    { label: 'Profile', href: profileHref, icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-800/90 px-3 py-1.5 pb-safe shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative cursor-pointer active:scale-95 z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-all ${
                  isActive
                    ? 'text-emerald-400 scale-110'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              />
              <span
                className={`text-[10px] font-bold mt-1 tracking-tight ${
                  isActive
                    ? 'text-emerald-400 font-extrabold'
                    : 'text-zinc-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Mobile Cart Trigger */}
        <button
          type="button"
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative cursor-pointer text-zinc-400 hover:text-emerald-400 active:scale-95 z-10"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black flex items-center justify-center shadow-md animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight">Cart</span>
        </button>
      </div>
    </nav>
  );
};
