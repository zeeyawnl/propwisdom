import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import {
  asc,
  desc,
  and,
  eq,
  gte,
  lte,
  count,
} from "drizzle-orm";

import type { PropertyQuery, CreatePropertyInput } from "@/lib/validations/property";

// ✅ SORT MAP (clean + scalable)
const SORT_MAP = {
  price_asc: [desc(properties.featured), asc(properties.price)],
  price_desc: [desc(properties.featured), desc(properties.price)],
  latest: [desc(properties.featured), desc(properties.createdAt)],
} as const;

export async function getProperties(filters: PropertyQuery) {
  const {
    type,
    location,
    listingType,
    min,
    max,
    sort,
    page,
    limit,
  } = filters;

  const conditions = [
    type && eq(properties.type, type),
    location && eq(properties.location, location),
    listingType && eq(properties.listingType, listingType),
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
      .select({ count: count() })
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
  const [result] = await db.insert(properties).values(data as any).returning();
  return result;
}

export async function getPropertyById(id: string) {
  return db.query.properties.findFirst({
    where: eq(properties.id, id),
  });
}

export async function updateProperty(id: string, data: Partial<CreatePropertyInput>) {
  const [result] = await db
    .update(properties)
    .set(data as any)
    .where(eq(properties.id, id))
    .returning();
  return result;
}

export async function deleteProperty(id: string) {
  const [result] = await db.delete(properties).where(eq(properties.id, id)).returning();
  return result;
}
