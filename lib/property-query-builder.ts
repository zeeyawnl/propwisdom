import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getFilteredProperties(filters: {
  listingType?: string;
  propertySegment?: string;
  projectStatus?: string | null;
}) {
  const conditions = [];

  if (filters.listingType) {
    conditions.push(eq(properties.listingType, filters.listingType as any));
  }

  if (filters.propertySegment) {
    conditions.push(eq(properties.propertySegment, filters.propertySegment as any));
  }

  if (filters.projectStatus) {
    conditions.push(eq(properties.projectStatus, filters.projectStatus as any));
  }

  return db.select().from(properties).where(and(...conditions));
}
