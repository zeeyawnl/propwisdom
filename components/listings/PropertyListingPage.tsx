import PropertyCard from "@/components/listings/PropertyCard";
import { type Property } from "@/types/property";

interface PropertyListingPageProps {
  properties: Property[];
  title: string;
}

export default function PropertyListingPage({ properties, title }: PropertyListingPageProps) {
  // Split title to apply italics to the last word for the custom font-serif design theme
  const words = title.split(" ");
  const lastWord = words.pop();
  const mainTitle = words.join(" ");

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-4">
            {mainTitle}{" "}
            {lastWord && (
              <span className="font-serif italic text-teal-forest">{lastWord}.</span>
            )}
          </h1>
          <p className="text-slate-400 font-light mt-2 uppercase tracking-widest text-xs">
            {properties.length} {properties.length === 1 ? "Listing" : "Listings"} Available
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-light text-slate-400 uppercase tracking-widest">
              No listings currently available.
            </h3>
            <p className="text-slate-400 mt-4 font-light">
              Check back soon for our latest additions to this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
