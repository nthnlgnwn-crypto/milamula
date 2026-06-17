import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type MilamulaPreorderInsert = {
  parent_name: string;
  whatsapp: string;
  email: string | null;
  child_age: string | null;
  kit_interest: "Milamula Adventure Kit #1";
  notes: string | null;
  source: "milamula_website";
};

export function createSupabaseAnonClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
