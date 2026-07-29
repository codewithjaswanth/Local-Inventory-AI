'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { shopService } from '@/services/shop.service';
import { DetailedShop, DETAILED_SHOPS } from '@/data/mockData';

export function useShopkeeperShops() {
  const { user, profile, isLoading: isAuthLoading } = useAuth();
  const [ownedShops, setOwnedShops] = useState<DetailedShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<DetailedShop | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadShopkeeperShops() {
      if (isAuthLoading) return;

      if (!user) {
        if (isMounted) {
          setOwnedShops([DETAILED_SHOPS[0]]);
          setSelectedShop(DETAILED_SHOPS[0]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const shops = await shopService.getShopsByOwnerId(user.id);

      if (isMounted) {
        if (shops.length > 0) {
          setOwnedShops(shops);
          setSelectedShop(shops[0]);
        } else {
          // Fallback primary shop
          const fallback = DETAILED_SHOPS[0];
          setOwnedShops([fallback]);
          setSelectedShop(fallback);
        }
        setIsLoading(false);
      }
    }

    loadShopkeeperShops();

    return () => {
      isMounted = false;
    };
  }, [user, isAuthLoading]);

  const selectShop = (shopId: string) => {
    const target = ownedShops.find((s) => s.id === shopId);
    if (target) {
      setSelectedShop(target);
    }
  };

  const isOwnerOf = (shopId: string) => {
    return ownedShops.some((s) => s.id === shopId);
  };

  return {
    ownedShops,
    selectedShop,
    selectShop,
    isOwnerOf,
    isLoading: isAuthLoading || isLoading,
    hasMultipleShops: ownedShops.length > 1
  };
}
