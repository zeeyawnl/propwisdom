import { getCategoryCounts } from "@/lib/property-query-builder";
import { ProjectCategories } from "@/components/landing";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Property Categories | PropWisdom",
  description: "Browse Pune real estate by project types. Explore new residential projects, resale commercial listings, mandate properties, rentals, and upcoming developments.",
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
            Explore Pune&apos;s <br />
            <span className="font-serif italic text-teal-forest">Project Portfolios.</span>
          </h1>
          <p className="text-slate-500 font-light mt-6 text-base md:text-lg max-w-2xl leading-relaxed">
            Select an exclusive segment to view properties tailored to your investment and lifestyle goals, verified for authenticity and value by PropWisdom.
          </p>
        </div>
      </div>

      {/* Render ProjectCategories without its default section header */}
      <ProjectCategories counts={counts} showHeader={false} />
    </main>
  );
}
