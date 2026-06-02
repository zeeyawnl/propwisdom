import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import {
  asc,
  desc,
  and,
  eq,
  gte,
  lte,
  ilike,
  count,
  sql,
} from "drizzle-orm";

import type { PropertyQuery, CreatePropertyInput } from "@/lib/validations/property";
import { PROPERTY_CATEGORIES } from "@/config/property-categories";

// ✅ SORT MAP (clean + scalable)
const SORT_MAP = {
  price_asc: [desc(properties.featured), asc(properties.price)],
  price_desc: [desc(properties.featured), desc(properties.price)],
  latest: [desc(properties.featured), desc(properties.createdAt)],
} as const;

/**
 * Compute a buffered area range so that searching for e.g. 600 sq.ft
 * returns properties in the range [500, 700] (±100, or ±15% — whichever is
 * larger). This prevents overly strict exact-match results for text-stored area values.
 *
 * Buffer formula: Math.max(MIN_BUFFER, Math.round(value * BUFFER_FACTOR))
 *   600 → max(100, 90)  = 100  →  [500, 700]
 *  2000 → max(100, 300) = 300  → [1700, 2300]
 *  5000 → max(100, 750) = 750  → [4250, 5750]
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

export async function getProperties(filters: PropertyQuery) {
  const mappedFilters = mapLegacyFilters(filters);
  const {
    type,
    location,
    area,
    bedrooms,
    listingType,
    propertySegment,
    projectStatus,
    min,
    max,
    sort,
    page,
    limit,
  } = mappedFilters;

  const conditions = [
    type && eq(properties.type, type),
    // Partial, case-insensitive match on location (e.g. "Baner" matches "Baner, Pune")
    location && ilike(properties.location, `%${location}%`),
    // Numeric range with buffer: CAST(area AS NUMERIC) BETWEEN areaMin AND areaMax
    // NULLIF guards against non-numeric values stored in the text column.
    ...(area !== undefined
      ? (() => {
          const { areaMin, areaMax } = getAreaRange(area);
          return [
            sql`CAST(NULLIF(${properties.area}, '') AS NUMERIC) >= ${areaMin}`,
            sql`CAST(NULLIF(${properties.area}, '') AS NUMERIC) <= ${areaMax}`,
          ];
        })()
      : []),
    // Exact bedrooms/BHK match
    bedrooms !== undefined && eq(properties.bedrooms, bedrooms),
    listingType && eq(properties.listingType, listingType as any),
    propertySegment && eq(properties.propertySegment, propertySegment as any),
    projectStatus && eq(properties.projectStatus, projectStatus as any),
    min && gte(properties.price, min),
    max && lte(properties.price, max),
  ].filter(Boolean) as any[];

  const whereClause = conditions.length ? and(...conditions) : undefined;
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(properties)
      .where(whereClause)
      .orderBy(...SORT_MAP[sort]) // ✅ multi-column sorting
      .limit(limit)
      .offset(offset),

    db
      .select({ count: sql<number>`count(*)::int` })
      .from(properties)
      .where(whereClause),
  ]);

  const total = totalResult[0].count;

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createProperty(data: CreatePropertyInput & { id: string; userId: string }) {
  const payload = {
    ...data,
    listingType: data.listingType,
    propertySegment: data.propertySegment ?? "RESIDENTIAL",
    projectStatus: data.projectStatus ?? null,
  };
  const [result] = await db.insert(properties).values(payload as any).returning();
  return result;
}

export async function getPropertyById(id: string) {
  return db.query.properties.findFirst({
    where: eq(properties.id, id),
  });
}

export async function updateProperty(id: string, data: Partial<CreatePropertyInput>) {
  const payload = {
    ...data,
    ...(data.listingType !== undefined && { listingType: data.listingType }),
    ...(data.propertySegment !== undefined && { propertySegment: data.propertySegment }),
    ...(data.projectStatus !== undefined && { projectStatus: data.projectStatus }),
  };

  const [result] = await db
    .update(properties)
    .set(payload as any)
    .where(eq(properties.id, id))
    .returning();
  return result;
}

export async function deleteProperty(id: string) {
  const [result] = await db.delete(properties).where(eq(properties.id, id)).returning();
  return result;
}
