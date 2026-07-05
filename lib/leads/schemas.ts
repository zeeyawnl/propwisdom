import { z } from "zod";

// ─── Shared field schemas ─────────────────────────────────────────────────────

const nameSchema = z
  .string()
  .min(2, "Full name must be at least 2 characters.");

const phoneSchema = z.string().refine(
  (val) => /^\d{10}$/.test(val.replace(/\s+/g, "")),
  "Phone number must be exactly 10 digits."
);

// ─── Unified Lead Schema ──────────────────────────────────────────────────────
export const leadSchema = z.object({
  name:              nameSchema,
  phone:             phoneSchema,
  preferredLocation: z.string().optional(),
  budget:            z.string().optional(),
  propertyFor:       z.enum(["Unknown", "Buy", "Resale", "Need on Rent", "NeedOnRent", ""]).optional(),
  property:          z.string().optional(),
  type:              z.string().optional(),
  message:           z.string().optional(),
  category:          z.string().optional(),
  propertyName:      z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// ─── Backward Compatibility Exports ───────────────────────────────────────────
export const homepageLeadSchema = leadSchema;
export const listingLeadSchema = leadSchema;
export type HomepageLeadInput = LeadInput;
export type ListingLeadInput = LeadInput;
