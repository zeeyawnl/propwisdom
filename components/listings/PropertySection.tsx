"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!properties || properties.length === 0) return null;

  const visibleProperties = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  // Check scroll position to toggle fade + button visibility
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    // Initial check
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState, visibleProperties.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.75;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="mb-20 md:mb-32" id={id}>
      <div className="flex flex-col md:flex-row md:items-end justify-between py-6 border-b border-slate-200 mb-8 md:mb-12 gap-4 max-w-[1440px] mx-auto px-6 lg:px-12">
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

        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 whitespace-nowrap">
            Showing <span className="text-teal-forest">{visibleProperties.length}</span> of {properties.length}
          </p>
          <div className={`flex md:hidden items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-teal-forest transition-opacity duration-300 ${canScrollRight ? "opacity-100 animate-pulse" : "opacity-0 pointer-events-none"}`}>
            <span>Swipe</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Full-width scroll area with edge buttons and fade masks */}
      <div className="relative">

        {/* ── Left scroll button: pinned to page edge ── */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-3 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-slate-200/60 hidden md:flex items-center justify-center text-slate-600 hover:bg-teal-forest hover:text-white hover:border-teal-forest hover:scale-110 active:scale-95 transition-all duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        {/* ── Right scroll button: pinned to page edge ── */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-3 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-slate-200/60 hidden md:flex items-center justify-center text-slate-600 hover:bg-teal-forest hover:text-white hover:border-teal-forest hover:scale-110 active:scale-95 transition-all duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>

        {/* ── Left fade mask ── */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-20 z-20 pointer-events-none bg-gradient-to-r from-white/60 to-transparent transition-opacity duration-500 hidden md:block ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ── Right fade mask ── */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-20 z-20 pointer-events-none bg-gradient-to-l from-white/60 to-transparent transition-opacity duration-500 hidden md:block ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ── Horizontal scroll container ── */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-10 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 lg:px-12 scroll-smooth"
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
    </div>
  );
}
