export const PROPERTY_CATEGORIES = {
  MANDATE_PROJECTS: {
    label: "Mandate Projects",
    listingType: "MANDATE",
    propertySegment: null,
    projectStatus: null,
  },
  NEW_RESIDENTIAL_PROJECTS: {
    label: "New Residential Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "NEW",
  },
  NEW_COMMERCIAL_PROJECTS: {
    label: "New Commercial Projects",
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "NEW",
  },
  UPCOMING_PROJECTS: {
    label: "Upcoming Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "UPCOMING",
  },
  RESALE_RESIDENTIAL_PROJECTS: {
    label: "Resale Residential Projects",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: "RESALE",
  },
  RESALE_COMMERCIAL_PROJECTS: {
    label: "Resale Commercial Projects",
    listingType: "SALE",
    propertySegment: "COMMERCIAL",
    projectStatus: "RESALE",
  },
  RENTAL_RESIDENTIAL_PROJECTS: {
    label: "Rental Residential Projects",
    listingType: "RENTAL",
    propertySegment: "RESIDENTIAL",
    projectStatus: null,
  },
  RENTAL_COMMERCIAL_PROJECTS: {
    label: "Rental Commercial Projects",
    listingType: "RENTAL",
    propertySegment: "COMMERCIAL",
    projectStatus: null,
  },
  LAND_PLOTS: {
    label: "Land & Plots",
    listingType: "SALE",
    propertySegment: "RESIDENTIAL",
    projectStatus: null,
    type: "plot",
  },
} as const;
