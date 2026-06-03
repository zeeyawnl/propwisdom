import { Suspense } from "react";
import { getProperties } from "@/lib/db/properties";
import PropertySection from "@/components/listings/PropertySection";
import PropertySearchBar from "@/components/listings/PropertySearchBar";
import { PROPERTY_CATEGORIES } from "@/config/property-categories";

// Make the route dynamic so it always fetches fresh data
export const dynamic = "force-dynamic";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageProps {
  searchParams: Promise<{
    location?: string;
    area?: string;
    bedrooms?: string;
    category?: string;
    type?: string;
    sort?: string;
    page?: string;
    min?: string;
    max?: string;
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

  const minRaw = params.min ? parseFloat(params.min) : undefined;
  const min = minRaw !== undefined && !isNaN(minRaw) && minRaw >= 0 ? minRaw : undefined;

  const maxRaw = params.max ? parseFloat(params.max) : undefined;
  const max = maxRaw !== undefined && !isNaN(maxRaw) && maxRaw > 0 ? maxRaw : undefined;

  const result = await getProperties({
    sort: (params.sort as "price_asc" | "price_desc" | "latest") ?? "latest",
    page: params.page ? Math.max(1, parseInt(params.page, 10)) : 1,
    limit: 50,
    location: params.location || undefined,
    area,
    bedrooms,
    category: params.category || undefined,
    type: params.type as any,
    min,
    max,
  });

  const allProperties = result.data;

  // Determine if any search filter is active
  const hasActiveSearch = !!(params.location || params.area || params.bedrooms || params.category || params.type || params.min || params.max);

  // ── When search is active: single unified results block
  // ── When no search: split into 10 dedicated sections in display order

  // 1. Mandate Projects (listingType = "MANDATE")
  const mandateProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "MANDATE");

  // 2. New Residential Projects (listingType = "SALE", propertySegment = "RESIDENTIAL", projectStatus = "NEW", type != "plot")
  const newResidentialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.propertySegment === "RESIDENTIAL" && p.projectStatus === "NEW" && p.type !== "plot");

  // 3. New Commercial Projects (listingType = "SALE", propertySegment = "COMMERCIAL", projectStatus = "NEW")
  const newCommercialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.propertySegment === "COMMERCIAL" && p.projectStatus === "NEW");

  // 4. Upcoming Projects (listingType = "SALE", projectStatus = "UPCOMING")
  const upcomingProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.projectStatus === "UPCOMING");

  // 5. Resale Residential Projects (listingType = "SALE", propertySegment = "RESIDENTIAL", projectStatus = "RESALE", type != "plot")
  const resaleResidentialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.propertySegment === "RESIDENTIAL" && p.projectStatus === "RESALE" && p.type !== "plot");

  // 6. Resale Commercial Projects (listingType = "SALE", propertySegment = "COMMERCIAL", projectStatus = "RESALE")
  const resaleCommercialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.propertySegment === "COMMERCIAL" && p.projectStatus === "RESALE");

  // 7. Rental Residential Projects (listingType = "RENTAL", propertySegment = "RESIDENTIAL")
  const rentalResidentialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "RENTAL" && p.propertySegment === "RESIDENTIAL");

  // 8. Rental Commercial Projects (listingType = "RENTAL", propertySegment = "COMMERCIAL")
  const rentalCommercialProjects = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "RENTAL" && p.propertySegment === "COMMERCIAL");

  // 9. Pre-lease Properties (listingType = "SALE", propertySegment = "COMMERCIAL", projectStatus = "PRE_LEASED")
  const preLeaseProperties = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.listingType === "SALE" && p.propertySegment === "COMMERCIAL" && p.projectStatus === "PRE_LEASED");

  // 10. Land & Plots (type = "plot")
  const landPlots = hasActiveSearch
    ? []
    : allProperties.filter((p) => p.type === "plot");

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Content Header */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-8">
            Global Collection <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">of Pune&apos;s Finest.</span>
          </h1>

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
              params.category && PROPERTY_CATEGORIES[params.category as keyof typeof PROPERTY_CATEGORIES] ? (
                (() => {
                  const label = PROPERTY_CATEGORIES[params.category as keyof typeof PROPERTY_CATEGORIES].label;
                  const parts = label.split(" ");
                  const lastWord = parts.pop();
                  const remaining = parts.join(" ");
                  return (
                    <>
                      {remaining}{" "}
                      <span className="font-serif italic text-teal-forest">{lastWord}.</span>
                    </>
                  );
                })()
              ) : (
                <>
                  Search{" "}
                  <span className="font-serif italic text-teal-forest">Results.</span>
                </>
              )
            }
            subtitle={`${allProperties.length} propert${allProperties.length === 1 ? "y" : "ies"} found`}
            properties={allProperties}
          />
        ) : (
          // ── Regular view: 10 dedicated sections in display order ──
          <>
            {/* 1. Mandate Projects */}
            <PropertySection
              id="mandate-projects"
              title={<>Mandate <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={mandateProjects}
            />

            {/* 2. New Residential Projects */}
            <PropertySection
              id="new-residential-projects"
              title={<>New Residential <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={newResidentialProjects}
            />

            {/* 3. New Commercial Projects */}
            <PropertySection
              id="new-commercial-projects"
              title={<>New Commercial <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={newCommercialProjects}
            />

            {/* 4. Upcoming Projects */}
            <PropertySection
              id="upcoming-projects"
              title={<>Upcoming <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={upcomingProjects}
            />

            {/* 5. Resale Residential Projects */}
            <PropertySection
              id="resale-residential-projects"
              title={<>Resale Residential <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={resaleResidentialProjects}
            />

            {/* 6. Resale Commercial Projects */}
            <PropertySection
              id="resale-commercial-projects"
              title={<>Resale Commercial <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={resaleCommercialProjects}
            />

            {/* 7. Rental Residential Projects */}
            <PropertySection
              id="rental-residential-projects"
              title={<>Rental Residential <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={rentalResidentialProjects}
            />

            {/* 8. Rental Commercial Projects */}
            <PropertySection
              id="rental-commercial-projects"
              title={<>Rental Commercial <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={rentalCommercialProjects}
            />

            {/* 9. Pre-lease Properties */}
            <PropertySection
              id="pre-lease-properties"
              title={<>Pre-lease <span className="font-serif italic text-teal-forest">Properties.</span></>}
              properties={preLeaseProperties}
            />

            {/* 10. Land & Plots */}
            <PropertySection
              id="land-plots"
              title={<>Land & <span className="font-serif italic text-teal-forest">Plots.</span></>}
              properties={landPlots}
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