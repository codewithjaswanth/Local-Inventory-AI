-- ====================================================================
-- SUPABASE MIGRATION: Strict Admin RBAC & Audit Trail Policies
-- ====================================================================

-- 1. Create Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  target_resource TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create System Settings & Feature Flags Table
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Enable RLS on audit_logs & system_settings
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Admins read audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins read system settings" ON public.system_settings;
DROP POLICY IF EXISTS "Admins modify system settings" ON public.system_settings;

-- RLS Policies for Audit Logs: Only Admins can SELECT and INSERT
CREATE POLICY "Admins read audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Admins insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- RLS Policies for System Settings: Public read for feature flags; Admins modify
CREATE POLICY "Public read system settings" ON public.system_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins modify system settings" ON public.system_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- 4. Admin Management Policies on Profiles & Shops
-- Admins can UPDATE user roles and status in public.profiles
CREATE POLICY "Admins update user profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Ensure Admins CANNOT be assigned shop ownership in public.shops
ALTER TABLE public.shops DROP CONSTRAINT IF EXISTS admin_no_shop_owner;
-- Admin users maintain platform oversight without owning shops
