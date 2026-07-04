import { Suspense } from "react";
import { getProperties } from "@/lib/db/properties";
import PropertySection from "@/components/listings/PropertySection";
import PropertySearchBar from "@/components/listings/PropertySearchBar";
import { PROPERTY_CATEGORIES } from "@/config/property-categories";
import { type Property } from "@/types/property";
import type { Metadata } from "next";

// Make the route dynamic so it always fetches fresh data
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Property Collection in Pune | PROPWisdom",
  description: "Browse verified premium properties in Pune. Discover the finest residential, commercial, resale, rental, pre-leased properties and land plots.",
  keywords: ["Properties in Pune", "Real Estate Pune", "Premium residential properties", "Commercial properties Pune", "PROPWisdom"],
};

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

  const hasActiveSearch = !!(params.location || params.area || params.bedrooms || params.category || params.type || params.min || params.max);
  const sort = (params.sort as "price_asc" | "price_desc" | "latest") ?? "latest";

  let allProperties: Property[] = [];
  let mandateProjects: Property[] = [];
  let newResidentialProjects: Property[] = [];
  let newCommercialProjects: Property[] = [];
  let upcomingProjects: Property[] = [];
  let resaleResidentialProjects: Property[] = [];
  let resaleCommercialProjects: Property[] = [];
  let rentalResidentialProjects: Property[] = [];
  let rentalCommercialProjects: Property[] = [];
  let preLeaseProperties: Property[] = [];
  let landPlots: Property[] = [];

  if (hasActiveSearch) {
    const result = await getProperties({
      sort,
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
    allProperties = result.data;
  } else {
    // When no search, fetch all categories in parallel from the database
    // with a high limit (100) per category to ensure all active listings show up.
    const [
      mandateRes,
      newResRes,
      newCommRes,
      upcomingRes,
      resaleResRes,
      resaleCommRes,
      rentalResRes,
      rentalCommRes,
      preLeaseRes,
      landPlotsRes,
    ] = await Promise.all([
      getProperties({ page: 1, limit: 100, sort, listingType: "MANDATE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "RESIDENTIAL", projectStatus: "NEW" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "NEW" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", projectStatus: "UPCOMING" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "RESIDENTIAL", projectStatus: "RESALE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "RESALE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "RENTAL", propertySegment: "RESIDENTIAL" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "RENTAL", propertySegment: "COMMERCIAL" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "PRE_LEASED" }),
      getProperties({ page: 1, limit: 100, sort, type: "plot" }),
    ]);

    mandateProjects = mandateRes.data;
    newResidentialProjects = newResRes.data.filter((p) => p.type !== "plot");
    newCommercialProjects = newCommRes.data;
    upcomingProjects = upcomingRes.data;
    resaleResidentialProjects = resaleResRes.data.filter((p) => p.type !== "plot");
    resaleCommercialProjects = resaleCommRes.data;
    rentalResidentialProjects = rentalResRes.data;
    rentalCommercialProjects = rentalCommRes.data;
    preLeaseProperties = preLeaseRes.data;
    landPlots = landPlotsRes.data;

    // Combine all arrays to see if there are any properties overall
    allProperties = [
      ...mandateProjects,
      ...newResidentialProjects,
      ...newCommercialProjects,
      ...upcomingProjects,
      ...resaleResidentialProjects,
      ...resaleCommercialProjects,
      ...rentalResidentialProjects,
      ...rentalCommercialProjects,
      ...preLeaseProperties,
      ...landPlots,
    ];
  }

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
            category={params.category && PROPERTY_CATEGORIES[params.category as keyof typeof PROPERTY_CATEGORIES] ? params.category : undefined}
            categoryLabel={params.category && PROPERTY_CATEGORIES[params.category as keyof typeof PROPERTY_CATEGORIES] ? PROPERTY_CATEGORIES[params.category as keyof typeof PROPERTY_CATEGORIES].label : undefined}
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
              category="MANDATE_PROJECTS"
              categoryLabel="Mandate Projects"
              title={<>Mandate <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={mandateProjects}
            />

            {/* 2. New Residential Projects */}
            <PropertySection
              id="new-residential-projects"
              category="NEW_RESIDENTIAL_PROJECTS"
              categoryLabel="New Residential Projects"
              title={<>New Residential <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={newResidentialProjects}
            />

            {/* 3. New Commercial Projects */}
            <PropertySection
              id="new-commercial-projects"
              category="NEW_COMMERCIAL_PROJECTS"
              categoryLabel="New Commercial Projects"
              title={<>New Commercial <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={newCommercialProjects}
            />

            {/* 4. Upcoming Projects */}
            <PropertySection
              id="upcoming-projects"
              category="UPCOMING_PROJECTS"
              categoryLabel="Upcoming Projects"
              title={<>Upcoming <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={upcomingProjects}
            />

            {/* 5. Resale Residential Properties */}
            <PropertySection
              id="resale-residential-properties"
              category="RESALE_RESIDENTIAL_PROJECTS"
              categoryLabel="Resale Residential Properties"
              title={<>Resale Residential <span className="font-serif italic text-teal-forest">Properties.</span></>}
              properties={resaleResidentialProjects}
            />

            {/* 6. Resale Commercial Projects */}
            <PropertySection
              id="resale-commercial-projects"
              category="RESALE_COMMERCIAL_PROJECTS"
              categoryLabel="Resale Commercial Projects"
              title={<>Resale Commercial <span className="font-serif italic text-teal-forest">Projects.</span></>}
              properties={resaleCommercialProjects}
            />

            {/* 7. Rental Residential Properties */}
            <PropertySection
              id="rental-residential-properties"
              category="RENTAL_RESIDENTIAL_PROJECTS"
              categoryLabel="Rental Residential Properties"
              title={<>Rental Residential <span className="font-serif italic text-teal-forest">Properties.</span></>}
              properties={rentalResidentialProjects}
            />

            {/* 8. Rental Commercial Properties */}
            <PropertySection
              id="rental-commercial-properties"
              category="RENTAL_COMMERCIAL_PROJECTS"
              categoryLabel="Rental Commercial Properties"
              title={<>Rental Commercial <span className="font-serif italic text-teal-forest">Properties.</span></>}
              properties={rentalCommercialProjects}
            />

            {/* 9. Pre-lease Properties */}
            <PropertySection
              id="pre-lease-properties"
              category="PRE_LEASE_PROPERTIES"
              categoryLabel="Pre-lease Properties"
              title={<>Pre-lease <span className="font-serif italic text-teal-forest">Properties.</span></>}
              properties={preLeaseProperties}
            />

            {/* 10. Land & Plots */}
            <PropertySection
              id="land-plots"
              category="LAND_PLOTS"
              categoryLabel="Land & Plots"
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
