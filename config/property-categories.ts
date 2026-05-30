export const PROPERTY_CATEGORIES = {
  MANDATE_PROJECTS: {
    listingType: "MANDATE",
  },

  NEW_RESIDENTIAL_PROJECTS: {
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "NEW",
  },

  NEW_COMMERCIAL_PROJECTS: {
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "NEW",
  },

  UPCOMING_PROJECTS: {
    listingType: "SALE",
    projectStatus: "UPCOMING",
  },

  RESALE_RESIDENTIAL_PROJECTS: {
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "RESALE",
  },

  RESALE_COMMERCIAL_PROJECTS: {
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "RESALE",
  },

  RENTAL_RESIDENTIAL_PROJECTS: {
    listingType: "RENTAL",
    propertySegment: "RESIDENTIAL",
  },

  RENTAL_COMMERCIAL_PROJECTS: {
    listingType: "RENTAL",
    propertySegment: "COMMERCIAL",
  },
} as const;
