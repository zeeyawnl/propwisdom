"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Heart, ArrowUpRight, MessageCircle } from "lucide-react";
import { optimizeImage } from "@/lib/utils";

type Property = {
  id: string;
  title: string;
  price: number;
  priceLabel: string | null;
  location: string;
  type: string;
  listingType: string;
  propertySegment: string;
  projectStatus: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string | null;
  variantBedrooms: number | null;
  variantArea: string | null;
  variantBedrooms2: number | null;
  variantArea2: string | null;
  description: string | null;
  images: string[] | null;
  featured: boolean;
  status: string | null;
};

export default function PropertyCard({ property, index }: { property: Property; index: number }) {
  const coverImage = optimizeImage(property.images?.[0] || "/assets/images/legaladvisory.jpg", "f_auto,q_auto,w_800");
  const waMessage = `Hi, I am interested in ${property.title} located at ${property.location}. I would like to discuss more.`;
  const waUrl = `https://wa.me/918975123786?text=${encodeURIComponent(waMessage)}`;

  const isResaleResidential = property.listingType === "SALE" && property.projectStatus === "RESALE" && property.propertySegment === "RESIDENTIAL";
  const isRentalResidential = property.listingType === "RENTAL" && property.propertySegment === "RESIDENTIAL";
  const shouldCover = isResaleResidential || isRentalResidential;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Staggered entrance based on the index in the grid
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* 1. Cinematic Image Section (70% visual focus) */}
      <div className="relative h-[250px] md:h-[280px] w-full overflow-hidden bg-slate-100 cursor-pointer">
        <Link href={`/properties/${property.id}`} className="absolute inset-0 z-10" aria-label={`View ${property.title}`} />

        <img
          src={coverImage}
          alt={property.title}
          className={`w-full h-full ${shouldCover ? "object-cover" : "object-contain"} transition-transform duration-[1.5s] ease-out group-hover:scale-105`}
        />

        {/* Subtle top gradient to ensure badge readability */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent z-0" />

        {/* Status Badges */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-md text-teal-forest text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm">
            {property.projectStatus ? `${property.projectStatus} ` : ""}{property.listingType}
          </span>
          {property.featured && (
            <span className="bg-teal-forest/95 backdrop-blur-md text-vanilla-latte text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm w-fit">
              Featured
            </span>
          )}
        </div>

        {/* Favorite/Save Button (Classic Real Estate UI) */}
        <button suppressHydrationWarning className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-teal-forest transition-colors shadow-sm">
          <Heart size={18} strokeWidth={2} />
        </button>
      </div>

      {/* 2. Minimalist Data Panel (30% informational focus) */}
      <div className="p-5 md:p-6 flex flex-col flex-grow relative bg-white">

        {/* Header: Price, Title & Location */}
        <div className="mb-5">
          <p className="text-2xl font-serif text-teal-forest mb-2">
            {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
          </p>
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-xl font-medium text-slate-900 line-clamp-1 group-hover:text-teal-forest transition-colors">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-slate-400 mt-3 text-[10px] uppercase tracking-[0.2em] font-bold">
            <MapPin size={14} className="text-teal-forest" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        {/* Amenities (Moved above divider for better structure) */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Bedrooms">
              <Bed size={14} className="text-teal-forest" strokeWidth={2} />
              <span>
                {property.bedrooms && property.bedrooms > 0
                  ? `${property.bedrooms} BHK`
                  : "-- BHK"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Carpet Area">
              <Maximize size={14} className="text-teal-forest" strokeWidth={2} />
              <span>
                {property.area
                  ? `${property.area.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} Carpet Area`
                  : "-- Carpet Area"}
              </span>
            </div>
          </div>

          {(property.variantBedrooms || property.variantArea) && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Variant 1 Bedrooms">
                <Bed size={14} className="text-teal-forest" strokeWidth={2} />
                <span>
                  {property.variantBedrooms && property.variantBedrooms > 0
                    ? `${property.variantBedrooms} BHK`
                    : "-- BHK"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Variant 1 Carpet Area">
                <Maximize size={14} className="text-teal-forest" strokeWidth={2} />
                <span>
                  {property.variantArea
                    ? `${property.variantArea.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} Carpet Area`
                    : "-- Carpet Area"}
                </span>
              </div>
            </div>
          )}

          {(property.variantBedrooms2 || property.variantArea2) && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Variant 2 Bedrooms">
                <Bed size={14} className="text-teal-forest" strokeWidth={2} />
                <span>
                  {property.variantBedrooms2 && property.variantBedrooms2 > 0
                    ? `${property.variantBedrooms2} BHK`
                    : "-- BHK"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold tracking-wide border border-slate-100" title="Variant 2 Carpet Area">
                <Maximize size={14} className="text-teal-forest" strokeWidth={2} />
                <span>
                  {property.variantArea2
                    ? `${property.variantArea2.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} Carpet Area`
                    : "-- Carpet Area"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Elegant Divider */}
        <div className="w-full h-px bg-slate-100 mb-4 mt-auto" />

        {/* Action Footer */}
        <div className="flex items-center gap-3 w-full">
          {/* WhatsApp Inquiry Button - 50% */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300 text-[11px] uppercase tracking-widest font-bold"
            title="Inquire via WhatsApp"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          {/* View Details Button - 50% */}
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 text-slate-500 hover:bg-teal-forest hover:border-teal-forest hover:text-white transition-all duration-300 text-[11px] uppercase tracking-widest font-bold group/btn"
            title="View Details"
          >
            <span>Details</span>
            <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
