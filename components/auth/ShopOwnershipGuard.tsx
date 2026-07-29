'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShopkeeperShops } from '@/hooks/useShopkeeperShops';
import { useRole } from '@/hooks/useRole';
import { ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopOwnershipGuardProps {
  targetShopId?: string;
  children: React.ReactNode;
}

export const ShopOwnershipGuard: React.FC<ShopOwnershipGuardProps> = ({
  targetShopId,
  children
}) => {
  const router = useRouter();
  const { ownedShops, isOwnerOf, isLoading } = useShopkeeperShops();
  const { isAdmin } = useRole();

  const isAuthorized = !targetShopId || isAdmin || isOwnerOf(targetShopId);

  useEffect(() => {
    if (!isLoading && targetShopId && !isAuthorized) {
      console.warn(`[SHOP_OWNERSHIP_GUARD] Access Denied: User does not own shopId "${targetShopId}".`);
      const timer = setTimeout(() => {
        router.replace('/dashboard');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, targetShopId, isAuthorized, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060B14] text-white flex items-center justify-center p-4 select-none">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Verifying store ownership permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#040810] text-white flex items-center justify-center p-6 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#090F1D] border border-rose-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white">Access Denied: Shop Not Owned</h2>
            <p className="text-xs text-slate-400">
              You do not have ownership permissions for shop <code className="font-mono text-rose-400">{targetShopId}</code>.
              Shopkeepers can only manage stores registered under their own profile.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => router.replace('/dashboard')}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-emerald transition-all"
            >
              <span>Return to My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};
