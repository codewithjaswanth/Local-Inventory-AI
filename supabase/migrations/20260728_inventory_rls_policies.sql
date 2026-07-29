-- ====================================================================
-- SUPABASE MIGRATION: Inventory RLS Policies & Enhanced Schema
-- ====================================================================

-- 1. Ensure Inventory table contains all required columns
ALTER TABLE public.inventory 
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'In Stock' CHECK (availability IN ('In Stock', 'Low Stock', 'Out of Stock')),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 2. Create Storage Bucket for inventory assets if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('inventory-assets', 'inventory-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage RLS Policies
CREATE POLICY "Public Read Inventory Assets" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'inventory-assets');

CREATE POLICY "Shop Owners Upload Inventory Assets" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'inventory-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Shop Owners Delete Inventory Assets" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'inventory-assets' AND auth.role() = 'authenticated');

-- 4. Enable Row Level Security on Inventory Table
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts
DROP POLICY IF EXISTS "Public inventory read" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners modify inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners select own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners insert own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners update own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Shop owners delete own inventory" ON public.inventory;

-- RLS Policies for Inventory Table:
-- A) Everyone can read live public inventory
CREATE POLICY "Public inventory read" ON public.inventory 
  FOR SELECT USING (true);

-- B) Shopkeepers & Admins can INSERT inventory items for their own shops
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

-- C) Shopkeepers & Admins can UPDATE inventory items for their own shops
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

-- D) Shopkeepers & Admins can DELETE inventory items for their own shops
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
