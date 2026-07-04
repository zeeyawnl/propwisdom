import { z } from "zod";
import { LEAD_CATEGORY_MAP } from "./mapping";

// ─── Shared field schemas ─────────────────────────────────────────────────────

const nameSchema = z
  .string()
  .min(2, "Full name must be at least 2 characters.");

const phoneSchema = z.string().refine(
  (val) => /^\d{10}$/.test(val.replace(/\s+/g, "")),
  "Phone number must be exactly 10 digits."
);

const emailSchema = z.string().email("Please enter a valid email address.");

const baseFields = {
  name:    nameSchema,
  phone:   phoneSchema,
  email:   emailSchema,
  message: z.string().optional(),
};

// ─── Homepage schema ──────────────────────────────────────────────────────────
// General callback enquiry — no property context. PropertyFor/Property must
// remain empty; do NOT add category, propertyName, or any CRM hints here.

export const homepageLeadSchema = z.object(baseFields);

// ─── Listing schema ───────────────────────────────────────────────────────────
// Category or property-specific enquiry. Includes preference fields that the
// CRM agent uses to filter suitable properties.

export const listingLeadSchema = z.object({
  ...baseFields,

  // Required — validated against the mapping so unknown keys are rejected.
  category: z
    .string()
    .min(1, "Enquiry context is missing.")
    .refine((val) => val in LEAD_CATEGORY_MAP, "Invalid enquiry category."),

  // Preference fields (all optional)
  city:          z.string().optional(),
  location:      z.string().optional(),
  budgetMin:     z.string().optional(),
  budgetMax:     z.string().optional(),
  configuration: z.string().optional(),

  // Present only when enquiring about a specific property (detail page)
  propertyName: z.string().optional(),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type HomepageLeadInput = z.infer<typeof homepageLeadSchema>;
export type ListingLeadInput  = z.infer<typeof listingLeadSchema>;
export type LeadInput         = HomepageLeadInput | ListingLeadInput;
