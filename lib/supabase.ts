import { createClient } from "@supabase/supabase-js";
import type { Product, Shop } from "./type";

// For server components
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
};

// Singleton pattern for client-side
let browserClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseBrowserClient = () => {
  if (!browserClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    browserClient = createClient(supabaseUrl, supabaseKey);
  }
  return browserClient;
};

// Helper functions for common data fetching
export const fetchProducts = async (category: string | null = null) => {
  const supabase = createServerSupabaseClient();
  let query = supabase.from("products").select("*");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export const fetchProductById = async (id: string | number) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Product;
};

// Helper function to fetch shops (with work_hours as string[])
export const fetchShops = async () => {
  const supabase = createServerSupabaseClient();
  const { data: shops, error } = await supabase
    .from("shops")
    .select(`
      *,
      profiles:profiles(full_name)
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // جلب أوقات العمل لكل متجر كسلسلة نصية
  for (const shop of shops) {
    const { data: work_hours } = await supabase
      .from("work_hours")
      .select("*")
      .eq("shop_id", shop.id);

    // حول كل عنصر إلى نص JSON أو أي تمثيل نصي يناسبك
    shop.work_hours = (work_hours ?? []).map((wh) => JSON.stringify(wh));
  }

  return shops as Shop[];
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);