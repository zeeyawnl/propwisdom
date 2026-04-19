import Link from "next/link";
import { getProperties } from "@/lib/db/properties";

// Make the route dynamic so it fetches fresh data in Next.js 16
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  // Fetch properties with latest sort
  const result = await getProperties({
    sort: "latest",
    page: 1,
    limit: 50,
  });

  const properties = result.data;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Discover Your Next Property
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Browse our exclusive collection of apartments, villas, and commercial spaces tailored to your needs.
          </p>
        </div>

        {/* Listings Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Properties Found</h3>
            <p className="text-slate-500">We currently have no active listings. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              // Ensure we safely pull the first image or a fallback
              const images = property.images || [];
              const coverImage = images.length > 0 ? images[0] : "/placeholder-property.jpg";

              return (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    <img
                      src={coverImage}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {property.listingType.replace("_", " ")}
                      </span>
                      {property.featured && (
                        <span className="bg-indigo-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-lg shadow-sm">
                        {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wide mb-2">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.location}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {property.title}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">
                      {property.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                      <div className="font-bold uppercase tracking-wider text-xs">
                        {property.type}
                      </div>

                      <div className="flex gap-4 font-bold text-slate-700">
                        {(property.bedrooms ?? 0) > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            {property.bedrooms} Bed
                          </span>
                        )}
                        {(property.bathrooms ?? 0) > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            {property.bathrooms} Bath
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
