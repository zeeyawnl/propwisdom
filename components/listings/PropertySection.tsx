"use client";

import { useState, useRef } from "react";
import PropertyCard from "@/components/listings/PropertyCard";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertySection({ 
  title, 
  subtitle, 
  properties, 
  id 
}: { 
  title: React.ReactNode; 
  subtitle?: string; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any[]; 
  id?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!properties || properties.length === 0) return null;

  const visibleProperties = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="mb-20 md:mb-32" id={id}>
      <div className="flex flex-col md:flex-row md:items-end justify-between py-6 border-b border-slate-200 mb-8 md:mb-12 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-500 font-light leading-relaxed text-base md:text-lg mt-3">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 whitespace-nowrap">
            Showing <span className="text-teal-forest">{visibleProperties.length}</span> of {properties.length}
          </p>
          
          {/* Desktop Scroll Controls */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-teal-forest hover:text-white hover:border-teal-forest transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-teal-forest hover:text-white hover:border-teal-forest transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 md:gap-8 pb-10 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth"
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {visibleProperties.map((property: any, idx: number) => (
          <div key={property.id} className="w-[85vw] md:w-[420px] lg:w-[480px] snap-center shrink-0">
            <PropertyCard property={property} index={idx} />
          </div>
        ))}

        {hasMore && (
          <div className="w-[85vw] md:w-[350px] snap-center shrink-0 flex items-center justify-center bg-slate-50/50 rounded-[1.5rem] border border-slate-200/50 hover:bg-slate-50 transition-colors">
            <button
              onClick={() => {
                setVisibleCount(prev => prev + 10);
                setTimeout(() => scroll("right"), 100);
              }}
              className="flex flex-col items-center justify-center gap-4 text-teal-forest group p-12 w-full h-full"
            >
              <div className="w-16 h-16 rounded-full border-2 border-teal-forest flex items-center justify-center group-hover:bg-teal-forest group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <ArrowRight size={24} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Load More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
