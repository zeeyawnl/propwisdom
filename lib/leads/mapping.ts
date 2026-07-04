// ─── Lead Category → CRM Field Mapping ────────────────────────────────────────
// Single source of truth. Change any PropertyFor / Property value here only.
// No other file should hardcode these CRM field values.

export const LEAD_CATEGORY_MAP = {
  MANDATE_PROJECTS:             { PropertyFor: "Buy",        Property: "Flat"        },
  NEW_RESIDENTIAL_PROJECTS:     { PropertyFor: "Buy",        Property: "Flat"        },
  NEW_COMMERCIAL_PROJECTS:      { PropertyFor: "Buy",        Property: "Commercial"  },
  UPCOMING_PROJECTS:            { PropertyFor: "Buy",        Property: "Flat"        },
  RESALE_RESIDENTIAL_PROJECTS:  { PropertyFor: "Resale",     Property: "Flat"        },
  RESALE_COMMERCIAL_PROJECTS:   { PropertyFor: "Resale",     Property: "Commercial"  },
  RENTAL_RESIDENTIAL_PROJECTS:  { PropertyFor: "NeedOnRent", Property: "Flat"        },
  RENTAL_COMMERCIAL_PROJECTS:   { PropertyFor: "NeedOnRent", Property: "Commercial"  },
  PRE_LEASE_PROPERTIES:         { PropertyFor: "ForRent",    Property: "Commercial"  },
  LAND_PLOTS:                   { PropertyFor: "Buy",        Property: "Plot"        },
} as const;

export type LeadCategoryKey = keyof typeof LEAD_CATEGORY_MAP;

/** Returns { PropertyFor, Property } for a valid category key, or null. */
export function getCrmFields(
  category: string
): { PropertyFor: string; Property: string } | null {
  return LEAD_CATEGORY_MAP[category as LeadCategoryKey] ?? null;
}

/**
 * Server-side helper: derives the canonical category key from a property's
 * database record fields. Used on the property detail page to set CRM context
 * without any client-side guessing.
 */
export function getCategoryKeyFromProperty(property: {
  listingType: string;
  propertySegment?: string | null;
  projectStatus?: string | null;
  type?: string | null;
}): LeadCategoryKey | null {
  const { listingType, propertySegment, projectStatus, type } = property;

  if (listingType === "MANDATE") return "MANDATE_PROJECTS";
  if (type === "plot")           return "LAND_PLOTS";

  if (listingType === "RENTAL") {
    return propertySegment === "COMMERCIAL"
      ? "RENTAL_COMMERCIAL_PROJECTS"
      : "RENTAL_RESIDENTIAL_PROJECTS";
  }

  if (listingType === "SALE") {
    if (projectStatus === "PRE_LEASED") return "PRE_LEASE_PROPERTIES";
    if (projectStatus === "RESALE")
      return propertySegment === "COMMERCIAL"
        ? "RESALE_COMMERCIAL_PROJECTS"
        : "RESALE_RESIDENTIAL_PROJECTS";
    if (projectStatus === "UPCOMING") return "UPCOMING_PROJECTS";
    return propertySegment === "COMMERCIAL"
      ? "NEW_COMMERCIAL_PROJECTS"
      : "NEW_RESIDENTIAL_PROJECTS";
  }

  return null;
}
