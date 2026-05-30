export const PROPERTY_CATEGORY_MAPPING = {
  NEW_RESIDENTIAL: {
    label: "New Residential Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "NEW",
  },
  NEW_COMMERCIAL: {
    label: "New Commercial Projects",
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "NEW",
  },
  UPCOMING: {
    label: "Upcoming Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "UPCOMING",
  },
  RESALE_RESIDENTIAL: {
    label: "Resale Residential Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "RESALE",
  },
  RESALE_COMMERCIAL: {
    label: "Resale Commercial Projects",
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "RESALE",
  },
  RENTAL_RESIDENTIAL: {
    label: "Rental Residential Projects",
    listingType: "RENTAL",
    propertySegment: "RESIDENTIAL",
    projectStatus: null,
  },
  RENTAL_COMMERCIAL: {
    label: "Rental Commercial Projects",
    listingType: "RENTAL",
    propertySegment: "COMMERCIAL",
    projectStatus: null,
  },
  MANDATE: {
    label: "Mandate Projects",
    listingType: "MANDATE",
    propertySegment: "COMMERCIAL",
    projectStatus: null,
  },
} as const;
