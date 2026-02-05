import { createClient } from '@supabase/supabase-js'

let _supabase

export function getSupabase() {
  if (!_supabase) {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}
