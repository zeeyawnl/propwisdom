"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, MapPin, Maximize2, Home, X, Loader2, Tag } from "lucide-react";

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
  const [listingType, setListingType] = useState(searchParams.get("listingType") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [area, setArea] = useState(searchParams.get("area") ?? "");
  const [min, setMin] = useState(searchParams.get("min") ?? "");
  const [max, setMax] = useState(searchParams.get("max") ?? "");

  const hasFilters = location || area || bedrooms || listingType || min || max;

  const buildQuery = useCallback(
    (overrides: { location?: string; area?: string; bedrooms?: string; listingType?: string; min?: string; max?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = {
        location: overrides.location ?? location,
        listingType: overrides.listingType ?? listingType,
        bedrooms: overrides.bedrooms ?? bedrooms,
        area: overrides.area ?? area,
        min: overrides.min ?? min,
        max: overrides.max ?? max,
      };

      // Reset to page 1 on every search
      params.set("page", "1");

      if (merged.location) params.set("location", merged.location);
      else params.delete("location");

      if (merged.listingType) params.set("listingType", merged.listingType);
      else params.delete("listingType");

      if (merged.bedrooms) params.set("bedrooms", merged.bedrooms);
      else params.delete("bedrooms");

      if (merged.area) params.set("area", merged.area);
      else params.delete("area");

      if (merged.min) params.set("min", merged.min);
      else params.delete("min");

      if (merged.max) params.set("max", merged.max);
      else params.delete("max");

      return params.toString();
    },
    [searchParams, location, listingType, bedrooms, area, min, max]
  );

  const handleSearch = () => {
    startTransition(() => {
      router.push(`${pathname}?${buildQuery({})}`);
    });
  };

  const handleClear = () => {
    setLocation("");
    setListingType("");
    setBedrooms("");
    setArea("");
    setMin("");
    setMax("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("location");
      params.delete("listingType");
      params.delete("bedrooms");
      params.delete("area");
      params.delete("min");
      params.delete("max");
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
        <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap">

          {/* Location Input */}
          <div className="flex-1 min-w-[200px] flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
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

          {/* Project Type Selector */}
          <div className="flex-1 min-w-[150px] flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <Tag
              size={18}
              className="text-teal-forest shrink-0 group-focus-within:scale-110 transition-transform"
            />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                Project Type
              </p>
              <select
                id="search-listing-type"
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="">All Types</option>
                <option value="resale">Residential Properties</option>
                <option value="rent">Rental</option>
                <option value="mandate">Mandate</option>
                <option value="commercial">Commercial</option>
                <option value="new_project">New Project</option>
                <option value="plot">Plot</option>
              </select>
            </div>
          </div>

          {/* BHK Selector */}
          <div className="flex-1 min-w-[110px] flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
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

          {/* Area Input */}
          <div className="flex-1 min-w-[150px] flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <Maximize2
              size={18}
              className="text-teal-forest shrink-0 group-focus-within:scale-110 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                Carpet Area <span className="normal-case tracking-normal font-normal text-slate-300">±100 sq.ft</span>
              </p>
              <input
                id="search-area"
                type="number"
                min="1"
                placeholder="e.g. 1200"
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

          {/* Price Range Input (Min - Max) */}
          <div className="flex-[1.5] min-w-[220px] flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-100 group focus-within:bg-slate-50/60 transition-colors">
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                  Min Price (₹)
                </p>
                <input
                  id="search-min-price"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-300 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoComplete="off"
                />
              </div>
              <span className="text-slate-300">-</span>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                  Max Price (₹)
                </p>
                <input
                  id="search-max-price"
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-300 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoComplete="off"
                />
              </div>
            </div>
            {(min || max) && (
              <button
                onClick={() => { setMin(""); setMax(""); }}
                className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                aria-label="Clear price"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full lg:w-auto flex items-center justify-end gap-2 px-4 py-3 shrink-0">
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
              className="h-11 px-6 rounded-xl bg-teal-forest text-vanilla-latte text-[11px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-teal-forest/90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm w-full lg:w-auto"
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
          {listingType && (
            <FilterChip
              label={`🏷️ ${listingType.replace('_', ' ')}`}
              onRemove={() => {
                setListingType("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("listingType");
                  router.push(`${pathname}?${params.toString()}`);
                });
              }}
            />
          )}
          {min && (
            <FilterChip
              label={`💰 Min: ₹${min}`}
              onRemove={() => {
                setMin("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("min");
                  router.push(`${pathname}?${params.toString()}`);
                });
              }}
            />
          )}
          {max && (
            <FilterChip
              label={`💰 Max: ₹${max}`}
              onRemove={() => {
                setMax("");
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("max");
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
