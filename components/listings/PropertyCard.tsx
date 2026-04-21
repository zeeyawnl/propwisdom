"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Heart, ArrowUpRight, MessageCircle } from "lucide-react";

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

export default function PropertyCard({ property, index }: { property: Property; index: number }) {
  const coverImage = property.images?.[0] || "/assets/images/legaladvisory.jpg";
  const waMessage = `Hi, I am interested in ${property.title} located at ${property.location}. I would like to discuss more.`;
  const waUrl = `https://wa.me/918975123786?text=${encodeURIComponent(waMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Staggered entrance based on the index in the grid
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(23,78,79,0.12)] transition-all duration-500"
    >
      {/* 1. Cinematic Image Section (70% visual focus) */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden bg-slate-100 cursor-pointer">
        <Link href={`/properties/${property.id}`} className="absolute inset-0 z-10" aria-label={`View ${property.title}`} />

        <img
          src={coverImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />

        {/* Subtle top gradient to ensure badge readability */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent z-0" />

        {/* Status Badges */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-md text-teal-forest text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm">
            {property.listingType.replace("_", " ")}
          </span>
          {property.featured && (
            <span className="bg-teal-forest/95 backdrop-blur-md text-vanilla-latte text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm w-fit">
              Featured
            </span>
          )}
        </div>

        {/* Favorite/Save Button (Classic Real Estate UI) */}
        <button className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-teal-forest transition-colors shadow-sm">
          <Heart size={18} strokeWidth={2} />
        </button>
      </div>

      {/* 2. Minimalist Data Panel (30% informational focus) */}
      <div className="p-8 flex flex-col flex-grow relative bg-white">

        {/* Header: Price, Title & Location */}
        <div className="mb-6">
          <p className="text-2xl font-serif text-teal-forest mb-3">
            {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
          </p>
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-xl font-medium text-slate-900 line-clamp-1 group-hover:text-teal-forest transition-colors">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-slate-400 mt-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <MapPin size={14} className="text-teal-forest" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="w-full h-px bg-slate-100 mb-6" />

        {/* Amenities Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-6 text-slate-500 font-light text-sm">

            {(property.bedrooms ?? 0) > 0 && (
              <div className="flex items-center gap-2" title="Bedrooms">
                <Bed size={18} className="text-teal-forest/50" strokeWidth={1.5} />
                <span>{property.bedrooms}</span>
              </div>
            )}

            {(property.bathrooms ?? 0) > 0 && (
              <div className="flex items-center gap-2" title="Bathrooms">
                <Bath size={18} className="text-teal-forest/50" strokeWidth={1.5} />
                <span>{property.bathrooms}</span>
              </div>
            )}

            {property.area && (
              <div className="flex items-center gap-2" title="Square Footage">
                <Maximize size={16} className="text-teal-forest/50" strokeWidth={1.5} />
                <span>{property.area} <span className="text-[10px] uppercase tracking-widest opacity-60">sqft</span></span>
              </div>
            )}

          </div>
          <div className="flex items-center gap-3">
            {/* WhatsApp Inquiry Button */}
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 h-10 rounded-full border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest font-bold"
              title="Inquire via WhatsApp"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Subtle Action Icon that reacts on card hover */}
            <Link
              href={`/properties/${property.id}`}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-teal-forest group-hover:border-teal-forest group-hover:text-vanilla-latte transition-all duration-500 hover:scale-110"
            >
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
