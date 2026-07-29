-- ====================================================================
-- SUPABASE MIGRATION: Strict Shopkeeper Ownership RLS Policies
-- ====================================================================

-- 1. Enable Row Level Security on Shops Table
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts
DROP POLICY IF EXISTS "Public shops read" ON public.shops;
DROP POLICY IF EXISTS "Shop owners insert shop" ON public.shops;
DROP POLICY IF EXISTS "Shop owners update shop" ON public.shops;
DROP POLICY IF EXISTS "Shop owners delete shop" ON public.shops;

-- RLS Policies for Shops Table:
-- A) Everyone can read public shop listings in marketplace
CREATE POLICY "Public shops read" ON public.shops 
  FOR SELECT USING (true);

-- B) Shopkeepers & Admins can INSERT shops where owner_id = auth.uid()
CREATE POLICY "Shop owners insert shop" ON public.shops 
  FOR INSERT WITH CHECK (
    auth.uid() = owner_id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- C) Shopkeepers & Admins can UPDATE only their own shop(s)
CREATE POLICY "Shop owners update shop" ON public.shops 
  FOR UPDATE USING (
    auth.uid() = owner_id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- D) Shopkeepers & Admins can DELETE only their own shop(s)
CREATE POLICY "Shop owners delete shop" ON public.shops 
  FOR DELETE USING (
    auth.uid() = owner_id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 2. Strict RLS Policies for Inventory Table
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public inventory read" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners insert own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners update own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners delete own inventory" ON public.inventory;

CREATE POLICY "Public inventory read" ON public.inventory 
  FOR SELECT USING (true);

CREATE POLICY "Shop owners insert own inventory" ON public.inventory 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = inventory.shop_id 
        AND (shops.owner_id = auth.uid() OR EXISTS (
          SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        ))
    )
  );

CREATE POLICY "Shop owners update own inventory" ON public.inventory 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = inventory.shop_id 
        AND (shops.owner_id = auth.uid() OR EXISTS (
          SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        ))
    )
  );

CREATE POLICY "Shop owners delete own inventory" ON public.inventory 
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = inventory.shop_id 
        AND (shops.owner_id = auth.uid() OR EXISTS (
          SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        ))
    )
  );
