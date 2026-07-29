-- ====================================================================
-- SUPABASE MIGRATION: Inventory History & AI Operation Logs
-- ====================================================================

-- 1. Create Inventory History Table
CREATE TABLE IF NOT EXISTS public.inventory_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  input_type TEXT NOT NULL CHECK (input_type IN ('voice', 'image', 'voice_and_image')),
  audio_url TEXT,
  image_url TEXT,
  raw_transcript TEXT,
  extracted_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  confirmed_items_count INTEGER NOT NULL DEFAULT 0,
  overall_confidence INTEGER NOT NULL DEFAULT 95 CHECK (overall_confidence BETWEEN 0 AND 100),
  provider TEXT NOT NULL DEFAULT 'Whisper + Vision AI Adapter',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security
ALTER TABLE public.inventory_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts
DROP POLICY IF EXISTS "Shop owners view own inventory history" ON public.inventory_history;
DROP POLICY IF EXISTS "Shop owners insert own inventory history" ON public.inventory_history;

-- RLS Policies
CREATE POLICY "Shop owners view own inventory history" ON public.inventory_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = inventory_history.shop_id 
        AND (shops.owner_id = auth.uid() OR EXISTS (
          SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        ))
    )
  );

CREATE POLICY "Shop owners insert own inventory history" ON public.inventory_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = inventory_history.shop_id 
        AND (shops.owner_id = auth.uid() OR EXISTS (
          SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        ))
    )
  );
