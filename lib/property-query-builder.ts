import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import { and, eq, count, sql } from "drizzle-orm";

export async function getFilteredProperties(filters: {
  listingType?: string;
  propertySegment?: string;
  projectStatus?: string | null;
  type?: string;
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

  if (filters.type) {
    conditions.push(eq(properties.type, filters.type as any));
  }

  return db.select().from(properties).where(and(...conditions));
}

export async function getCategoryCounts() {
  const [
    newRes,
    newComm,
    upcoming,
    resaleRes,
    resaleComm,
    rentalRes,
    rentalComm,
    mandate,
    preLease,
    landPlots,
  ] = await Promise.all([
    // 1. New Residential Projects (exclude plots)
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.propertySegment, "RESIDENTIAL"),
        eq(properties.projectStatus, "NEW"),
        sql`COALESCE(${properties.type}, '') != 'plot'`
      )
    ),
    // 2. New Commercial Projects
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.propertySegment, "COMMERCIAL"),
        eq(properties.projectStatus, "NEW")
      )
    ),
    // 3. Upcoming Projects
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.projectStatus, "UPCOMING")
      )
    ),
    // 4. Resale Residential Projects (exclude plots)
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.propertySegment, "RESIDENTIAL"),
        eq(properties.projectStatus, "RESALE"),
        sql`COALESCE(${properties.type}, '') != 'plot'`
      )
    ),
    // 5. Resale Commercial Projects
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.propertySegment, "COMMERCIAL"),
        eq(properties.projectStatus, "RESALE")
      )
    ),
    // 6. Rental Residential Projects
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "RENTAL"),
        eq(properties.propertySegment, "RESIDENTIAL")
      )
    ),
    // 7. Rental Commercial Projects
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "RENTAL"),
        eq(properties.propertySegment, "COMMERCIAL")
      )
    ),
    // 8. Mandate Projects
    db.select({ count: count() }).from(properties).where(
      eq(properties.listingType, "MANDATE")
    ),
    // 9. Pre-lease Properties
    db.select({ count: count() }).from(properties).where(
      and(
        eq(properties.listingType, "SALE"),
        eq(properties.propertySegment, "COMMERCIAL"),
        eq(properties.projectStatus, "PRE_LEASED")
      )
    ),
    // 10. Land & Plots
    db.select({ count: count() }).from(properties).where(
      eq(properties.type, "plot")
    ),
  ]);

  return {
    MANDATE_PROJECTS: mandate[0]?.count ?? 0,
    NEW_RESIDENTIAL_PROJECTS: newRes[0]?.count ?? 0,
    NEW_COMMERCIAL_PROJECTS: newComm[0]?.count ?? 0,
    UPCOMING_PROJECTS: upcoming[0]?.count ?? 0,
    RESALE_RESIDENTIAL_PROJECTS: resaleRes[0]?.count ?? 0,
    RESALE_COMMERCIAL_PROJECTS: resaleComm[0]?.count ?? 0,
    RENTAL_RESIDENTIAL_PROJECTS: rentalRes[0]?.count ?? 0,
    RENTAL_COMMERCIAL_PROJECTS: rentalComm[0]?.count ?? 0,
    PRE_LEASE_PROPERTIES: preLease[0]?.count ?? 0,
    LAND_PLOTS: landPlots[0]?.count ?? 0,
  };
}
