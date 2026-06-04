import { createClient } from "@supabase/supabase-js";
import type { PropertyQuery } from "@/lib/validations/property";
import { PROPERTY_CATEGORIES } from "@/config/property-categories";

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

  if (filters.category && PROPERTY_CATEGORIES[filters.category as keyof typeof PROPERTY_CATEGORIES]) {
    const config = PROPERTY_CATEGORIES[filters.category as keyof typeof PROPERTY_CATEGORIES];
    if (config.listingType) mapped.listingType = config.listingType as any;
    if (config.propertySegment) mapped.propertySegment = config.propertySegment as any;
    if (config.projectStatus) mapped.projectStatus = config.projectStatus as any;
    if ("type" in config && config.type) mapped.type = config.type as any;
  } else if (filters.listingType) {
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

function mapDbPropertyToProperty(dbProp: any) {
  return {
    id: dbProp.id,
    title: dbProp.title,
    price: dbProp.price,
    priceLabel: dbProp.price_label !== undefined ? dbProp.price_label : dbProp.priceLabel,
    location: dbProp.location,
    type: dbProp.type,
    listingType: dbProp.listing_type !== undefined ? dbProp.listing_type : dbProp.listingType,
    propertySegment: dbProp.property_segment !== undefined ? dbProp.property_segment : dbProp.propertySegment,
    projectStatus: dbProp.project_status !== undefined ? dbProp.project_status : dbProp.projectStatus,
    bedrooms: dbProp.bedrooms,
    bathrooms: dbProp.bathrooms,
    area: dbProp.area,
    description: dbProp.description,
    images: dbProp.images,
    featured: dbProp.featured,
    status: dbProp.status,
    userId: dbProp.user_id !== undefined ? dbProp.user_id : dbProp.userId,
    createdAt: dbProp.created_at !== undefined ? dbProp.created_at : dbProp.createdAt,
  };
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
    data: (data ?? []).map(mapDbPropertyToProperty),
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

  if (error || !data) return null;
  return mapDbPropertyToProperty(data);
}
