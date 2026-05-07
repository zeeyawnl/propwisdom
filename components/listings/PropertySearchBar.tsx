"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, MapPin, Maximize2, Home, X, Loader2 } from "lucide-react";

const BHK_OPTIONS = [
  { label: "Any BHK", value: "" },
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "4+ BHK", value: "5" },
];

export default function PropertySearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialise from current URL params so state survives navigation
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [area, setArea] = useState(searchParams.get("area") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");

  const hasFilters = location || area || bedrooms;

  const buildQuery = useCallback(
    (overrides: { location?: string; area?: string; bedrooms?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = {
        location: overrides.location ?? location,
        area: overrides.area ?? area,
        bedrooms: overrides.bedrooms ?? bedrooms,
      };

      // Reset to page 1 on every search
      params.set("page", "1");

      if (merged.location) params.set("location", merged.location);
      else params.delete("location");

      if (merged.area) params.set("area", merged.area);
      else params.delete("area");

      if (merged.bedrooms) params.set("bedrooms", merged.bedrooms);
      else params.delete("bedrooms");

      return params.toString();
    },
    [searchParams, location, area, bedrooms]
  );

  const handleSearch = () => {
    startTransition(() => {
      router.push(`${pathname}?${buildQuery({})}`);
    });
  };

  const handleClear = () => {
    setLocation("");
    setArea("");
    setBedrooms("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("location");
      params.delete("area");
      params.delete("bedrooms");
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full mb-12">
      {/* ── Search Card ── */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <MapPin
              size={18}
              className="text-teal-forest shrink-0 group-focus-within:scale-110 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                Location
              </p>
              <input
                id="search-location"
                type="text"
                placeholder="e.g. Baner, Viman Nagar…"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-300 outline-none"
                autoComplete="off"
              />
            </div>
            {location && (
              <button
                onClick={() => setLocation("")}
                className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                aria-label="Clear location"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Area Input */}
          <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <Maximize2
              size={18}
              className="text-teal-forest shrink-0 group-focus-within:scale-110 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                Area (sq.ft) <span className="normal-case tracking-normal font-normal text-slate-300">±100 sq.ft</span>
              </p>
              <input
                id="search-area"
                type="number"
                min="1"
                placeholder="e.g. 600, 1200, 2000"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-300 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoComplete="off"
              />
            </div>
            {area && (
              <button
                onClick={() => setArea("")}
                className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                aria-label="Clear area"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* BHK Selector */}
          <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <Home
              size={18}
              className="text-teal-forest shrink-0 group-focus-within:scale-110 transition-transform"
            />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                BHK
              </p>
              <select
                id="search-bhk"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer appearance-none pr-4"
              >
                {BHK_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 px-4 py-3 md:py-0 shrink-0">
            {hasFilters && (
              <button
                onClick={handleClear}
                disabled={isPending}
                className="h-11 px-4 text-[11px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-600 transition-colors rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200"
                aria-label="Clear all filters"
              >
                Clear
              </button>
            )}
            <button
              id="search-submit"
              onClick={handleSearch}
              disabled={isPending}
              className="h-11 px-6 rounded-xl bg-teal-forest text-vanilla-latte text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-teal-forest/90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {location && (
            <FilterChip
              label={`📍 ${location}`}
              onRemove={() => {
                setLocation("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("location");
                  router.push(`${pathname}?${params.toString()}`);
                });
              }}
            />
          )}
          {area && (
            <FilterChip
              label={`📏 ~${area} sq.ft`}
              onRemove={() => {
                setArea("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("area");
                  router.push(`${pathname}?${params.toString()}`);
                });
              }}
            />
          )}
          {bedrooms && (
            <FilterChip
              label={`🛏 ${bedrooms === "5" ? "4+" : bedrooms} BHK`}
              onRemove={() => {
                setBedrooms("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("bedrooms");
                  router.push(`${pathname}?${params.toString()}`);
                });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[rgba(23,78,79,0.08)] border border-teal-forest/20 text-teal-forest text-[11px] font-semibold tracking-wide">
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-teal-forest hover:text-white transition-colors"
        aria-label={`Remove filter ${label}`}
      >
        <X size={10} />
      </button>
    </span>
  );
}
