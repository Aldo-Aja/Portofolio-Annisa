import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oovyulbagsbmzeppihxa.supabase.co";
const supabaseAnonKey = "sb_publishable_HuTJBV8ze_NZgfbUwoLeeg_2wvqo3Ii";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
