import { getPropertyById } from "@/lib/db/properties";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const mainImage = property.images?.[0] || "/placeholder-property.jpg";
  const galleryImages = property.images?.slice(1) ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar (Simulated) */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/properties" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Properties
          </Link>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
            {property.status}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:flex lg:justify-between lg:items-end gap-6">
          <div>
            <div className="flex gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-700 text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest border border-indigo-100">
                {property.listingType.replace("_", " ")}
              </span>
              <span className="bg-slate-50 text-slate-700 text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest border border-slate-200">
                {property.type}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-500 text-lg font-medium">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:text-right">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Asking Price</p>
            <div className="text-4xl sm:text-5xl font-black text-indigo-600">
              {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
            </div>
          </div>
        </div>

        {/* Dynamic Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className={`relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto ${galleryImages.length > 0 ? "lg:col-span-2" : "lg:col-span-3"} shadow-sm`}>
            <img
              src={mainImage}
              alt={`${property.title} Main Photo`}
              className="w-full h-full object-cover"
            />
          </div>

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:grid-rows-2">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto shadow-sm">
                <img src={galleryImages[0]} alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              {galleryImages.length > 1 && (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto shadow-sm">
                  <img src={galleryImages[1]} alt="Gallery 2" className="w-full h-full object-cover" />
                  {galleryImages.length > 2 && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                      <span className="text-white font-bold text-xl tracking-wide">+ {galleryImages.length - 2} photos</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">About this Property</h2>
              <div className="prose prose-lg text-slate-600 prose-p:leading-relaxed">
                {property.description?.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                )) || <p>No description provided for this listing.</p>}
              </div>
            </section>
          </div>

          {/* Sidebar Metrics */}
          <div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Key Details</h3>

              <ul className="space-y-6">
                <li className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    Bedrooms
                  </div>
                  <span className="font-bold text-slate-900 text-lg">{property.bedrooms || "-"}</span>
                </li>

                <li className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    Bathrooms
                  </div>
                  <span className="font-bold text-slate-900 text-lg">{property.bathrooms || "-"}</span>
                </li>

                <li className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    </div>
                    Area
                  </div>
                  <span className="font-bold text-slate-900 text-lg">{property.area || "-"}</span>
                </li>

                <li className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    Listed
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    {new Date(property.createdAt!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </li>
              </ul>

              <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 border-b-4 border-indigo-800 hover:border-indigo-900">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
