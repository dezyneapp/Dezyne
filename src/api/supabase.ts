import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TODO: Replace mock data in appStore.ts with Supabase calls
// Example:
// - supabase.auth.signUp() for user registration
// - supabase.from('listings').insert() for creating listings
// - supabase.storage.from('images').upload() for image uploads
