import { getProperties } from "@/lib/db/properties";
import PropertyCard from "@/components/listings/PropertyCard";
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
    p.listingType.toLowerCase().includes("rent")
  );

  const sales = allProperties.filter((p) =>
    !p.listingType.toLowerCase().includes("rent")
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Navigation / Back Action */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-teal-forest transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Content Header */}
        <div className="mb-20">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8">
            Global Collection <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">of Pune's Finest.</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl">
            A meticulously curated selection of Pune's most prestigious residences, commercial landmarks, and strategic assets.
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
            {sales.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center justify-between py-6 border-b border-slate-200 mb-12">
                  <h2 className="text-xl font-medium text-slate-900">Purchase Opportunities</h2>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Showing <span className="text-teal-forest">{sales.length}</span> Results
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {sales.map((property, idx) => (
                    <PropertyCard
                      key={property.id}
                      property={property as any}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* --- LEASING & RENTALS SECTION --- */}
            {rentals.length > 0 && (
              <div className="pt-24 border-t border-slate-200">
                {/* Elegant Rental Header */}
                <div className="mb-16 max-w-2xl">
                  <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
                    Flexible Living & Workspaces
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6">
                    Curated <span className="font-serif italic text-teal-forest">Rental Spaces.</span>
                  </h2>
                  <p className="text-slate-500 font-light leading-relaxed text-lg">
                    Find your perfect temporary sanctuary or commercial lease with our meticulously vetted, hassle-free rental portfolio.
                  </p>
                </div>

                {/* Rental Results Count */}
                <div className="flex items-center justify-end py-4 border-b border-slate-100 mb-12">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Showing <span className="text-teal-forest">{rentals.length}</span> Results
                  </p>
                </div>

                {/* Rentals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {rentals.map((property, idx) => (
                    <PropertyCard
                      key={property.id}
                      property={property as any}
                      // Resetting index here ensures the staggered animation starts from 0 for this grid
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}