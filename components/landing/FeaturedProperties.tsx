"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Maximize } from "lucide-react";

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
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header - Lean & Classy */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property, idx) => {
            const coverImage = property.images?.[0] || "/placeholder-property.jpg";

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/properties/${property.id}`}
                  className="group flex flex-col bg-white overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-slate-100">
                    <img
                      src={coverImage}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      {property.featured && (
                        <span className="bg-teal-forest text-vanilla-latte text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest backdrop-blur-sm">
                          Featured
                        </span>
                      )}
                      <span className="bg-white/90 text-teal-forest text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
                        {property.listingType.replace("_", " ")}
                      </span>
                    </div>

                    {/* Price Overlay on Image (Realtyr Style) */}
                    <div className="absolute bottom-5 left-5">
                      <p className="text-xl font-bold text-white drop-shadow-md">
                        {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
                      </p>
                    </div>
                  </div>

                  {/* Content - Minimalist */}
                  <div className="px-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest mb-3">
                      <MapPin size={12} className="text-teal-forest" />
                      {property.location}
                    </div>

                    <h3 className="text-xl font-medium text-slate-900 mb-6 group-hover:text-teal-forest transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Footer Info */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">

                      {/* Left side: Property Specs or Contact Prompt */}
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                        {property.bedrooms ? (
                          <span>{property.bedrooms} Bed</span>
                        ) : null}
                        {property.bathrooms ? (
                          <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{property.bathrooms} Bath</span>
                          </>
                        ) : null}
                        {property.area ? (
                          <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{property.area}</span>
                          </>
                        ) : null}
                        {(!property.bedrooms && !property.bathrooms && !property.area) && (
                          <span>Inquire for Details</span>
                        )}
                      </div>

                      {/* Right side: View Details Action */}
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-teal-forest">
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          View Details
                        </span>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-teal-forest group-hover:text-white group-hover:border-teal-forest transition-all duration-300">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
