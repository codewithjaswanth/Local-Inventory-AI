-- ====================================================================
-- SUPABASE MIGRATION: PGVECTOR SEMANTIC SEARCH & MATCH RPC
-- ====================================================================

-- 1. Enable pgvector Extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add 1024-dim Vector Embedding Columns
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS embedding vector(1024);
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS embedding vector(1024);

-- 3. Create HNSW Cosine Index for Fast Vector Search
CREATE INDEX IF NOT EXISTS inventory_embedding_hnsw_idx 
ON public.inventory 
USING hnsw (embedding vector_cosine_ops);

-- 4. Create Semantic Search RPC Function match_inventory_semantic
CREATE OR REPLACE FUNCTION public.match_inventory_semantic(
  query_embedding vector(1024),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10,
  user_lat float DEFAULT 37.7749,
  user_lng float DEFAULT -122.4194
)
RETURNS TABLE (
  inventory_id UUID,
  shop_id UUID,
  shop_name TEXT,
  shop_address TEXT,
  distance_miles float,
  product_name TEXT,
  category TEXT,
  price NUMERIC,
  quantity INT,
  unit TEXT,
  freshness_score INT,
  confidence_score INT,
  similarity float,
  ai_explanation TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id AS inventory_id,
    s.id AS shop_id,
    s.shop_name,
    s.address AS shop_address,
    -- Haversine distance in miles approximation
    (3959 * acos(
      cos(radians(user_lat)) * cos(radians(COALESCE(s.latitude, user_lat))) *
      cos(radians(COALESCE(s.longitude, user_lng)) - radians(user_lng)) +
      sin(radians(user_lat)) * sin(radians(COALESCE(s.latitude, user_lat)))
    ))::float AS distance_miles,
    p.name AS product_name,
    c.name AS category,
    i.price,
    i.quantity,
    i.unit,
    i.freshness_score,
    i.confidence_score,
    (1 - (i.embedding <=> query_embedding))::float AS similarity,
    CONCAT(
      s.shop_name, ' ranked highly because it is within ',
      ROUND((3959 * acos(
        cos(radians(user_lat)) * cos(radians(COALESCE(s.latitude, user_lat))) *
        cos(radians(COALESCE(s.longitude, user_lng)) - radians(user_lng)) +
        sin(radians(user_lat)) * sin(radians(COALESCE(s.latitude, user_lat)))
      ))::numeric, 1),
      ' miles, updated stock via WhatsApp, with ',
      i.freshness_score, '% AI freshness score and ',
      i.confidence_score, '% availability confidence.'
    ) AS ai_explanation
  FROM public.inventory i
  JOIN public.shops s ON i.shop_id = s.id
  JOIN public.products p ON i.product_id = p.id
  JOIN public.categories c ON p.category_id = c.id
  WHERE (1 - (i.embedding <=> query_embedding)) > match_threshold
  ORDER BY similarity DESC, distance_miles ASC, i.freshness_score DESC
  LIMIT match_count;
END;
$$;
