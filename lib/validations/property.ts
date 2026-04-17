import { z } from "zod";

export const CreatePropertySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title too long"),

  description: z
    .string()
    .max(2000, "Description must be under 2000 characters")
    .optional(),

  price: z
    .number()
    .positive("Price must be a positive number"),

  priceLabel: z.string().optional(),

  location: z.string().min(2, "Location required"),

  type: z.enum(["apartment", "villa", "plot", "commercial"]),

  listingType: z.enum(["rent", "resale", "new_project"]),

  bedrooms: z.number().int().min(0).optional().default(0),

  bathrooms: z.number().int().min(0).optional().default(0),

  area: z.string().optional(),

  featured: z.boolean().optional().default(false),

  status: z
    .enum(["available", "sold"])
    .default("available"),

  images: z.array(z.string().url("Each image must be a valid URL")).optional().default([]),
});

// For PATCH requests — every field optional
export const UpdatePropertySchema = CreatePropertySchema.partial();

// Query params schema for GET
export const PropertyQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  type: z.string().optional(),
  location: z.string().optional(),
  listingType: z.enum(["rent", "sale"]).optional(),

  min: z.coerce.number().positive().optional(),
  max: z.coerce.number().positive().optional(),

  sort: z.enum(["price_asc", "price_desc", "latest"]).default("latest"),
});

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
export type PropertyQuery = z.infer<typeof PropertyQuerySchema>;
