-- ====================================================================
-- SUPABASE MIGRATION: Fix RLS Policies for public.shops & public.profiles
-- ====================================================================

-- 1. Ensure Row Level Security (RLS) is Enabled on public.shops
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies on public.shops to prevent duplicate errors
DROP POLICY IF EXISTS "Public shops read" ON public.shops;
DROP POLICY IF EXISTS "Shop owners insert shop" ON public.shops;
DROP POLICY IF EXISTS "Shop owners update shop" ON public.shops;
DROP POLICY IF EXISTS "Allow public read access on shops" ON public.shops;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own shop" ON public.shops;
DROP POLICY IF EXISTS "Allow owners to update their own shop" ON public.shops;
DROP POLICY IF EXISTS "Allow owners to delete their own shop" ON public.shops;

-- 3. SELECT Policy: Everyone (public & authenticated) can read shops
CREATE POLICY "Allow public read access on shops"
  ON public.shops
  FOR SELECT
  USING (true);

-- 4. INSERT Policy: Authenticated users can insert a shop where owner_id matches auth.uid()
CREATE POLICY "Allow authenticated users to insert their own shop"
  ON public.shops
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- 5. UPDATE Policy: Users can only update their own shop
CREATE POLICY "Allow owners to update their own shop"
  ON public.shops
  FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- 6. DELETE Policy: Users can only delete their own shop
CREATE POLICY "Allow owners to delete their own shop"
  ON public.shops
  FOR DELETE
  USING (auth.uid() = owner_id);

-- ====================================================================
-- PREREQUISITE: Ensure profiles table also permits user row creation
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
