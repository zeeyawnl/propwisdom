import { getCrmFields } from "./mapping";
import type { HomepageLeadInput, ListingLeadInput } from "./schemas";

// ─── CRM payload type ─────────────────────────────────────────────────────────

export interface CrmPayload {
  FirstName:    string;
  LastName:     string;
  ISD:          null;
  Phone:        string;
  EmailId:      string;
  State:        string;
  City:         string;
  Location:     string;
  Project:      string;
  Pincode:      string;
  PropertyFor:  string;
  Property:     string;
  PropertyType: string;
  Message:      string;
  LeadSource:   string;
  vendor_key:   string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0],
    lastName:  parts.slice(1).join(" "),
  };
}

function buildBudgetString(min?: string, max?: string): string {
  const parts = [min, max].filter(Boolean);
  return parts.length > 0 ? parts.join(" – ") : "";
}

function composeMessage(parts: Array<{ label: string; value?: string } | string>): string {
  return parts
    .map((p) => (typeof p === "string" ? p : p.value ? `${p.label}: ${p.value}` : ""))
    .filter(Boolean)
    .join(" | ");
}

// ─── Payload builder ──────────────────────────────────────────────────────────
// Pure function — no side effects, no HTTP, no env access.
// Accepts validated form data and a vendorKey (injected by the API route).

export function buildPayload(
  input: HomepageLeadInput | ListingLeadInput,
  vendorKey: string
): CrmPayload {
  const { firstName, lastName } = splitName(input.name);

  // Determine if this is a listing-context lead
  const isListing = "category" in input;
  const listing   = isListing ? (input as ListingLeadInput) : null;

  // CRM classification — empty strings for general homepage enquiry
  const crmFields      = listing ? getCrmFields(listing.category) : null;
  const PropertyFor    = crmFields?.PropertyFor ?? "";
  const Property       = crmFields?.Property    ?? "";

  // Optional preference fields
  const city          = listing?.city          ?? "";
  const location      = listing?.location      ?? "";
  const budgetMin     = listing?.budgetMin      ?? "";
  const budgetMax     = listing?.budgetMax      ?? "";
  const configuration = listing?.configuration  ?? "";
  const propertyName  = listing?.propertyName   ?? "";
  const budget        = buildBudgetString(budgetMin, budgetMax);

  const message = composeMessage([
    { label: "City",          value: city          },
    { label: "Location",      value: location      },
    { label: "Budget",        value: budget        },
    { label: "Configuration", value: configuration },
    input.message ?? "",
  ]);

  return {
    FirstName:    firstName,
    LastName:     lastName,
    ISD:          null,
    Phone:        input.phone.replace(/\s+/g, ""),
    EmailId:      input.email.trim(),
    State:        "",
    City:         city,
    Location:     location,
    Project:      propertyName,
    Pincode:      "",
    PropertyFor,
    Property,
    PropertyType: configuration,
    Message:      message,
    LeadSource:   "Website",
    vendor_key:   vendorKey,
  };
}
