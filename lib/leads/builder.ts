import { getCrmFields } from "./mapping";
import type { LeadInput } from "./schemas";

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
  input: LeadInput,
  vendorKey: string
): CrmPayload {
  const { firstName, lastName } = splitName(input.name);

  // Derive CRM values from category mapping if category is provided
  const category   = input.category ?? "";
  const crmFields  = category ? getCrmFields(category) : null;
  const mappedPropertyFor = crmFields?.PropertyFor ?? "";
  const Property = crmFields?.Property ?? "";

  // Map input.propertyFor dropdown values to the CRM values:
  // "Buy" -> "Buy"
  // "Resale" -> "Resale"
  // "Need on Rent" -> "NeedOnRent"
  // "Unknown" -> ""
  let PropertyFor = "";
  if (input.propertyFor === "Buy") {
    PropertyFor = "Buy";
  } else if (input.propertyFor === "Resale") {
    PropertyFor = "Resale";
  } else if (input.propertyFor === "Need on Rent" || input.propertyFor === "NeedOnRent") {
    PropertyFor = "NeedOnRent";
  }

  // If PropertyFor was "Unknown" or not selected, fall back to derived/mapped category PropertyFor
  if (!PropertyFor) {
    PropertyFor = mappedPropertyFor;
  }

  const preferredLocation = input.preferredLocation ?? "";
  const budget            = input.budget ?? "";
  const configuration     = input.configuration ?? "";
  const propertyName      = input.propertyName      ?? "";

  const message = composeMessage([
    { label: "Preferred Location", value: preferredLocation },
    { label: "Budget",             value: budget },
    { label: "Property For",       value: input.propertyFor && input.propertyFor !== "Unknown" ? input.propertyFor : undefined },
    { label: "Configuration",      value: configuration },
    input.message ?? "",
  ]);

  return {
    FirstName:    firstName,
    LastName:     lastName,
    ISD:          null,
    Phone:        input.phone.replace(/\s+/g, ""),
    EmailId:      "", // Removed email completely
    State:        "",
    City:         "",
    Location:     preferredLocation,
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
