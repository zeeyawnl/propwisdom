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

function mapLegacyFilters(filters: PropertyQuery) {
  const mapped = { ...filters };
  
  if (filters.listingType) {
    const lt = filters.listingType.toLowerCase();
    if (lt === "rent") {
      mapped.listingType = "RENTAL" as any;
      mapped.propertySegment = "RESIDENTIAL";
    } else if (lt === "resale") {
      mapped.listingType = "SALE" as any;
      mapped.projectStatus = "RESALE";
      mapped.propertySegment = "RESIDENTIAL";
    } else if (lt === "new_project") {
      mapped.listingType = "SALE" as any;
      mapped.projectStatus = "NEW";
      mapped.propertySegment = "RESIDENTIAL";
    } else if (lt === "mandate") {
      mapped.listingType = "MANDATE" as any;
    } else if (lt === "commercial") {
      mapped.propertySegment = "COMMERCIAL";
      mapped.listingType = undefined;
    } else if (lt === "plot") {
      mapped.propertySegment = "RESIDENTIAL";
      mapped.type = "plot";
      mapped.listingType = undefined;
    } else {
      mapped.listingType = filters.listingType.toUpperCase() as any;
    }
  }
  
  if (filters.propertySegment) {
    mapped.propertySegment = filters.propertySegment.toUpperCase() as any;
  }
  
  if (filters.projectStatus) {
    mapped.projectStatus = filters.projectStatus.toUpperCase() as any;
  }
  
  return mapped;
}

export async function getPropertiesSupabase(filters: PropertyQuery) {
  const supabase = getSupabaseClient();
  const mappedFilters = mapLegacyFilters(filters);
  const { type, location, area, bedrooms, listingType, propertySegment, projectStatus, min, max, sort, page, limit } = mappedFilters;

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
  if (propertySegment) query = query.eq("property_segment", propertySegment);
  if (projectStatus) query = query.eq("project_status", projectStatus);
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
