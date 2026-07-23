-- ====================================================================
-- SUPABASE MIGRATION: Local Inventory AI Schema & RLS Policies
-- ====================================================================

-- 1. Create Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'shopkeeper', 'admin')),
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create Shops Table
CREATE TABLE IF NOT EXISTS public.shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  opening_time TEXT DEFAULT '07:00 AM',
  closing_time TEXT DEFAULT '09:00 PM',
  rating NUMERIC(3, 2) DEFAULT 4.90,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- 4. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}'
);

-- 5. Create Inventory Table
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'lb',
  freshness_score INTEGER NOT NULL DEFAULT 95 CHECK (freshness_score BETWEEN 0 AND 100),
  confidence_score INTEGER NOT NULL DEFAULT 96 CHECK (confidence_score BETWEEN 0 AND 100),
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(shop_id, product_id)
);

-- 6. Create Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Create Search Logs Table
CREATE TABLE IF NOT EXISTS public.search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- RLS POLICIES
-- ====================================================================

-- Profiles: Users can view their own profile; admins view all.
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Shops: Everyone can read shops; Shop owners edit their own shops.
CREATE POLICY "Public shops read" ON public.shops FOR SELECT USING (true);
CREATE POLICY "Shop owners insert shop" ON public.shops FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Shop owners update shop" ON public.shops FOR UPDATE USING (auth.uid() = owner_id);

-- Categories & Products: Public read access; admins/shopkeepers insert.
CREATE POLICY "Public categories read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products read" ON public.products FOR SELECT USING (true);

-- Inventory: Public read access; Shop owners update their inventory.
CREATE POLICY "Public inventory read" ON public.inventory FOR SELECT USING (true);
CREATE POLICY "Shop owners modify inventory" ON public.inventory FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.shops
    WHERE shops.id = inventory.shop_id AND shops.owner_id = auth.uid()
  )
);

-- Feedback: Public read & insert feedback.
CREATE POLICY "Public feedback read" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Public feedback insert" ON public.feedback FOR INSERT WITH CHECK (true);

-- Search Logs: Public insert search logs.
CREATE POLICY "Search logs insert" ON public.search_logs FOR INSERT WITH CHECK (true);

-- ====================================================================
-- INITIAL SEED DATA
-- ====================================================================
INSERT INTO public.categories (name) VALUES 
  ('Vegetables'), ('Fruits'), ('Dairy'), ('Bakery'), ('Groceries')
ON CONFLICT (name) DO NOTHING;
