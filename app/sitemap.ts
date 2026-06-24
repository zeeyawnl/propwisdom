import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all property IDs and last modified dates from the DB
  const allProperties = await db
    .select({
      id: properties.id,
      createdAt: properties.createdAt,
    })
    .from(properties);

  const propertyUrls = allProperties.map((property) => ({
    url: `https://propwisdom.in/properties/${property.id}`,
    lastModified: property.createdAt ? new Date(property.createdAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Define static pages and category pages
  const staticPages = [
    { url: "https://propwisdom.in", priority: 1.0, changeFrequency: "daily" as const },
    { url: "https://propwisdom.in/properties", priority: 0.9, changeFrequency: "daily" as const },
    { url: "https://propwisdom.in/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "https://propwisdom.in/services", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "https://propwisdom.in/careers", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "https://propwisdom.in/privacy-policy", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "https://propwisdom.in/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "https://propwisdom.in/cookies", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const categoryPages = [
    "new-residential",
    "new-commercial",
    "upcoming",
    "resale-residential",
    "resale-commercial",
    "rental-residential",
    "rental-commercial",
    "mandate",
  ].map((category) => ({
    url: `https://propwisdom.in/projects/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categoryPages,
    ...propertyUrls,
  ];
}
