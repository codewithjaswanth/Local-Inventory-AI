import { createClient } from "@supabase/supabase-js";
const __vite_import_meta_env__ = {};
const supabaseUrl = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
createClient(
  supabaseUrl || "https://supabase-project.invalid",
  supabaseAnonKey || "dummy-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
