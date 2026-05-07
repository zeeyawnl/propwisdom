import { createClient } from "@supabase/supabase-js";
import type { PropertyQuery } from "@/lib/validations/property";

// Service-role-free anonymous client for reads, uses HTTP, works perfectly on Vercel edge
function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Same buffer logic as lib/db/properties.ts — keep in sync.
 *   600 → [500, 700]  |  2000 → [1700, 2300]  |  5000 → [4250, 5750]
 */
const AREA_BUFFER_FACTOR = 0.15;
const AREA_MIN_BUFFER    = 100;

function getAreaRange(area: number): { areaMin: number; areaMax: number } {
  const buffer = Math.max(AREA_MIN_BUFFER, Math.round(area * AREA_BUFFER_FACTOR));
  return {
    areaMin: Math.max(0, area - buffer),
    areaMax: area + buffer,
  };
}

export async function getPropertiesSupabase(filters: PropertyQuery) {
  const supabase = getSupabaseClient();
  const { type, location, area, bedrooms, listingType, min, max, sort, page, limit } = filters;

  let query = supabase.from("properties").select("*", { count: "exact" });

  // Apply filters
  if (type) query = query.eq("type", type);
  // Partial, case-insensitive match on location
  if (location) query = query.ilike("location", `%${location}%`);
  // Numeric buffered range on area: PostgREST supports "column::numeric" casting
  if (area !== undefined) {
    const { areaMin, areaMax } = getAreaRange(area);
    query = query
      .gte("area::numeric", areaMin)
      .lte("area::numeric", areaMax);
  }
  // Exact BHK / bedrooms match
  if (bedrooms !== undefined) query = query.eq("bedrooms", bedrooms);
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
