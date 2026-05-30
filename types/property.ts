import { properties } from "@/db/schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export type ListingType = "SALE" | "RENTAL" | "MANDATE";
export type PropertySegment = "RESIDENTIAL" | "COMMERCIAL";
export type ProjectStatus = "NEW" | "RESALE" | "UPCOMING";

export interface PropertyFilters {
  listingType?: ListingType;
  propertySegment?: PropertySegment;
  projectStatus?: ProjectStatus;
}

export type Property = InferSelectModel<typeof properties>;
export type NewProperty = InferInsertModel<typeof properties>;
