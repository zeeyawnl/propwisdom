import { createClient } from "@supabase/supabase-js";
import type { PropertyQuery } from "@/lib/validations/property";

// Service-role-free anonymous client for reads — uses HTTP, works perfectly on Vercel edge
function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getPropertiesSupabase(filters: PropertyQuery) {
  const supabase = getSupabaseClient();
  const { type, location, listingType, min, max, sort, page, limit } = filters;

  let query = supabase.from("properties").select("*", { count: "exact" });

  // Apply filters
  if (type) query = query.eq("type", type);
  if (location) query = query.eq("location", location);
  if (listingType) query = query.eq("listing_type", listingType);
  if (min) query = query.gte("price", min);
  if (max) query = query.lte("price", max);

  // Apply sorting
  const offset = (page - 1) * limit;
  query = query
    .order("featured", { ascending: false })
    .order(sort === "price_asc" || sort === "price_desc" ? "price" : "created_at", {
      ascending: sort === "price_asc",
    })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  const total = count ?? 0;

  return {
    data: data ?? [],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPropertyByIdSupabase(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
