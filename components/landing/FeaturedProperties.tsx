"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PropertyCard from "@/components/listings/PropertyCard";

type Property = {
  id: string;
  title: string;
  price: number;
  priceLabel: string | null;
  location: string;
  type: string;
  listingType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string | null;
  description: string | null;
  images: string[] | null;
  featured: boolean;
  status: string | null;
};

type FeaturedPropertiesProps = {
  properties: Property[];
};

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section id="properties" className="py-24 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-medium mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Featured <span className="font-serif italic text-teal-forest">Properties</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-bold text-teal-forest border-b border-teal-forest/20 pb-2 hover:border-teal-forest transition-all"
          >
            Explore All Listings
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {properties.map((property, idx) => (
            <PropertyCard 
              key={property.id} 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              property={property as any} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
