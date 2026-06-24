import { getCategoryCounts } from "@/lib/property-query-builder";
import { ProjectCategories } from "@/components/landing";
import { PropertyCTASection } from "@/components/property/PropertyCTASection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Property Categories | PROPWisdom",
  description: "Browse Pune real estate by property types. Explore new residential projects, resale commercial listings, mandate properties, rentals, and upcoming developments.",
};

export default async function ProjectsPage() {
  const counts = await getCategoryCounts();

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Content Header */}
        <div className="mb-10 max-w-4xl">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Exclusive Segments
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight">
            Explore PROPWisdom&apos;s <br />
            <span className="font-serif italic text-teal-forest">Property Portfolio</span>
          </h1>

        </div>
      </div>

      {/* Render ProjectCategories without its default section header */}
      <ProjectCategories counts={counts} showHeader={false} />

      {/* Property Owner & Rental Services CTA cards */}
      <PropertyCTASection />
    </main>
  );
}

