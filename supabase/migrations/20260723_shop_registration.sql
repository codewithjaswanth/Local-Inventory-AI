-- ====================================================================
-- SUPABASE MIGRATION: Shop Registration Schema Update
-- ====================================================================

-- 1. Ensure shops table has all required columns
ALTER TABLE public.shops ADD COLUMN IF NOT EXISTS owner_name TEXT;
ALTER TABLE public.shops ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.shops ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Both';

-- 2. Create index on owner_id for fast lookup
CREATE INDEX IF NOT EXISTS shops_owner_id_idx ON public.shops (owner_id);
