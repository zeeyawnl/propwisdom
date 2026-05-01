import { properties } from "@/db/schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export type ListingType = "rent" | "resale" | "new_project" | "mandate";

export type Property = InferSelectModel<typeof properties> & {
  listingType: ListingType;
};
export type NewProperty = InferInsertModel<typeof properties> & {
  listingType: ListingType;
};
