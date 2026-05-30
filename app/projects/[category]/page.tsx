import { notFound } from "next/navigation";
import { PROPERTY_PAGES } from "@/config/property-pages";
import { getFilteredProperties } from "@/lib/property-query-builder";
import PropertyListingPage from "@/components/listings/PropertyListingPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const config =
    PROPERTY_PAGES[
      resolvedParams.category.toUpperCase().replace(/-/g, "_") as keyof typeof PROPERTY_PAGES
    ];

  if (!config) {
    return { title: "Projects not found" };
  }

  return {
    title: `${config.title} | PropWisdom`,
    description: `Discover the best ${config.title.toLowerCase()} carefully curated by PropWisdom.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  
  const config =
    PROPERTY_PAGES[
      resolvedParams.category.toUpperCase().replace(/-/g, "_") as keyof typeof PROPERTY_PAGES
    ];

  if (!config) {
    return notFound();
  }

  const properties = await getFilteredProperties(config.filters);

  return (
    <>
      <Navbar />
      <PropertyListingPage properties={properties as any} title={config.title} />
      <Footer />
    </>
  );
}
