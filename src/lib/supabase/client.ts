import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Wiring point for the real backend. The rest of the app reads from
// src/data (local seed data) via src/lib/queries.ts, which mirrors the
// shape of the tables in schema.sql — pointing those functions at Supabase
// instead of the local arrays is the only change needed to go live.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
