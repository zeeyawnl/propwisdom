import { getProperties } from "@/lib/db/properties";
import PropertySection from "@/components/listings/PropertySection";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Make the route dynamic so it fetches fresh data
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const result = await getProperties({
    sort: "latest",
    page: 1,
    limit: 50,
  });

  const allProperties = result.data;

  // Filter properties into two arrays based on listingType
  // Adjust the ".includes('rent')" string if your DB uses a different exact term (e.g., 'for_rent')
  const rentals = allProperties.filter((p) =>
    p.listingType.toLowerCase() === "rent"
  );

  const mandate = allProperties.filter((p) =>
    p.listingType.toLowerCase() === "mandate"
  );

  const sales = allProperties.filter((p) =>
    !p.listingType.toLowerCase().includes("rent") &&
    p.listingType.toLowerCase() !== "mandate"
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Navigation / Back Action */}


        {/* Content Header */}
        <div className="mb-14">

          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8">
            Global Collection <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">of Pune&apos;s Finest.</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl">
            A meticulously curated selection of Pune&apos;s most prestigious residences, commercial landmarks, and strategic assets.
          </p>
        </div>

        {/* Global Empty State */}
        {allProperties.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-light text-slate-400 uppercase tracking-widest">
              Collections currently in curation.
            </h3>
            <p className="text-slate-400 mt-4 font-light">Check back soon for our latest acquisitions.</p>
          </div>
        ) : (
          <>
            {/* --- PRIMARY SALES SECTION --- */}
            <PropertySection
              title={<>Purchase <span className="font-serif italic text-teal-forest">Opportunities.</span></>}
              subtitle="Find your next strategic asset from our curated list of resale properties and new projects."
              properties={sales}
            />

            {/* --- MANDATE PROJECTS SECTION --- */}
            <PropertySection
              title={<>Mandate <span className="font-serif italic text-teal-forest">Projects.</span></>}
              subtitle="Exclusive mandate listings — properties entrusted to us for direct, focused representation."
              properties={mandate}
            />

            {/* --- LEASING & RENTALS SECTION --- */}
            <PropertySection
              title={<>Curated <span className="font-serif italic text-teal-forest">Rental Spaces.</span></>}
              subtitle="Find your perfect temporary sanctuary or commercial lease with our meticulously vetted, hassle-free rental portfolio."
              properties={rentals}
            />
          </>
        )}
      </div>
    </main>
  );
}