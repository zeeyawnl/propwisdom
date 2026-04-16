import { properties } from "@/db/schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export type Property = InferSelectModel<typeof properties>;
export type NewProperty = InferInsertModel<typeof properties>;
