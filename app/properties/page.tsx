import { Suspense } from "react";
import { getProperties } from "@/lib/db/properties";
import PropertySection from "@/components/listings/PropertySection";
import PropertySearchBar from "@/components/listings/PropertySearchBar";

// Make the route dynamic so it always fetches fresh data
export const dynamic = "force-dynamic";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageProps {
  searchParams: Promise<{
    location?: string;
    area?: string;
    bedrooms?: string;
    listingType?: string;
    sort?: string;
    page?: string;
  }>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Parse bedrooms safely
  const bedroomsRaw = params.bedrooms ? parseInt(params.bedrooms, 10) : undefined;
  const bedrooms = bedroomsRaw !== undefined && !isNaN(bedroomsRaw) ? bedroomsRaw : undefined;

  // Parse area safely — must be a positive number for the buffer-range query
  const areaRaw = params.area ? parseFloat(params.area) : undefined;
  const area = areaRaw !== undefined && !isNaN(areaRaw) && areaRaw > 0 ? areaRaw : undefined;

  const result = await getProperties({
    sort: (params.sort as "price_asc" | "price_desc" | "latest") ?? "latest",
    page: params.page ? Math.max(1, parseInt(params.page, 10)) : 1,
    limit: 50,
    location: params.location || undefined,
    area,
    bedrooms,
    listingType: params.listingType as "rent" | "resale" | "new_project" | "mandate" | undefined,
  });

  const allProperties = result.data;

  // Determine if any search filter is active
  const hasActiveSearch = !!(params.location || params.area || params.bedrooms);

  // When search is active, show all results in a single section
  // When no search, split by listing type
  const rentals = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType.toLowerCase() === "rent");

  const mandate = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType.toLowerCase() === "mandate");

  const sales = hasActiveSearch
    ? []
    : allProperties.filter(
        (p) =>
          !p.listingType.toLowerCase().includes("rent") &&
          p.listingType.toLowerCase() !== "mandate"
      );

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Content Header */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8">
            Global Collection <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">of Pune&apos;s Finest.</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl">
            A meticulously curated selection of Pune&apos;s most prestigious residences, commercial landmarks, and strategic assets.
          </p>
        </div>

        {/* ── Search Bar (client-side, wrapped in Suspense for useSearchParams) ── */}
        <Suspense fallback={<SearchBarSkeleton />}>
          <PropertySearchBar />
        </Suspense>

        {/* ── Results ── */}
        {allProperties.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100 shadow-sm">
            {hasActiveSearch ? (
              <>
                <h3 className="text-2xl font-light text-slate-400 uppercase tracking-widest">
                  No properties match your search.
                </h3>
                <p className="text-slate-400 mt-4 font-light">
                  Try adjusting your filters — we&apos;re always adding new listings.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-light text-slate-400 uppercase tracking-widest">
                  Collections currently in curation.
                </h3>
                <p className="text-slate-400 mt-4 font-light">
                  Check back soon for our latest acquisitions.
                </p>
              </>
            )}
          </div>
        ) : hasActiveSearch ? (
          // ── Single results section for search mode ──
          <PropertySection
            id="search-results"
            title={
              <>
                Search{" "}
                <span className="font-serif italic text-teal-forest">Results.</span>
              </>
            }
            subtitle={`${allProperties.length} propert${allProperties.length === 1 ? "y" : "ies"} found`}
            properties={allProperties}
          />
        ) : (
          // ── Regular view: split by type ──
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
              subtitle="Exclusive mandate listings, properties entrusted to us for direct, focused representation."
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

// ─── Skeleton fallback for the search bar ─────────────────────────────────────
function SearchBarSkeleton() {
  return (
    <div className="w-full mb-12">
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm h-[68px] animate-pulse" />
    </div>
  );
}