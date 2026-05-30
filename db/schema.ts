import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  priceLabel: text("price_label"),
  location: text("location").notNull(),
  type: text("type").notNull(),
  listingType: text("listing_type", {
    enum: ["SALE", "RENTAL", "MANDATE"],
  }).notNull(),
  propertySegment: text("property_segment", {
    enum: ["RESIDENTIAL", "COMMERCIAL"],
  }).notNull(),
  projectStatus: text("project_status", {
    enum: ["NEW", "RESALE", "UPCOMING"],
  }),
  bedrooms: integer("bedrooms").default(0),
  bathrooms: integer("bathrooms").default(0),
  area: text("area"),
  description: text("description"),
  images: text("images").array(),
  featured: boolean("featured").default(false).notNull(),
  status: text("status").default("available"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
