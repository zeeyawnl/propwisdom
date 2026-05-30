"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";
import { PROPERTY_CATEGORY_MAPPING } from "@/config/property-category-mapping";

function getCategoryFromFields(listingType?: string, propertySegment?: string, projectStatus?: string | null) {
  for (const [key, val] of Object.entries(PROPERTY_CATEGORY_MAPPING)) {
    if (
      val.listingType === listingType?.toUpperCase() &&
      val.propertySegment === propertySegment?.toUpperCase() &&
      (val.projectStatus === (projectStatus?.toUpperCase() || null) || (!val.projectStatus && !projectStatus))
    ) {
      return key as keyof typeof PROPERTY_CATEGORY_MAPPING;
    }
  }
  return "NEW_RESIDENTIAL";
}

type PropertyFormProps = {
  initial?: {
    title?: string;
    description?: string;
    price?: number;
    priceLabel?: string | null;
    location?: string;
    type?: string;
    listingType?: string;
    propertySegment?: string;
    projectStatus?: string | null;
    images?: string[];
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: string | null;
  };
  id?: string;
};

type FormData = {
  title: string;
  price: number;
  priceLabel: string;
  location: string;
  type: string;
  projectCategory: keyof typeof PROPERTY_CATEGORY_MAPPING;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  images: string[];
};

const TYPES = ["residential", "villa", "plot", "commercial"];

export default function PropertyForm({ initial, id }: PropertyFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    priceLabel: initial?.priceLabel ?? "",
    location: initial?.location ?? "",
    type: initial?.type ?? "residential",
    projectCategory: getCategoryFromFields(initial?.listingType, initial?.propertySegment, initial?.projectStatus),
    bedrooms: initial?.bedrooms != null ? String(initial.bedrooms) : "",
    bathrooms: initial?.bathrooms != null ? String(initial.bathrooms) : "",
    area: initial?.area ?? "",
    images: initial?.images || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CRITICAL FIX: Sync initial props to state if they arrive late
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title ?? "",
        description: initial.description ?? "",
        price: initial.price ?? 0,
        priceLabel: initial.priceLabel ?? "",
        location: initial.location ?? "",
        type: initial.type ?? "residential",
        projectCategory: getCategoryFromFields(initial.listingType, initial.propertySegment, initial.projectStatus),
        bedrooms: initial.bedrooms != null ? String(initial.bedrooms) : "",
        bathrooms: initial.bathrooms != null ? String(initial.bathrooms) : "",
        area: initial.area ?? "",
        images: initial.images ?? [],
      });
    }
  }, [initial]);

  function updateField(key: keyof FormData, value: string | number | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // FRONTEND VALIDATION
      if (!form.title.trim()) throw new Error("Title is required");
      if (!form.location.trim()) throw new Error("Location is required");
      if (form.price <= 0) throw new Error("Price must be greater than 0");
      if (form.images.length === 0) throw new Error("At least 1 image is required");

      const selectedCategory = PROPERTY_CATEGORY_MAPPING[form.projectCategory];

      const payload = {
        ...form,
        price: Number(form.price),
        priceLabel: form.priceLabel || null,
        bedrooms: form.bedrooms !== "" ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms !== "" ? Number(form.bathrooms) : null,
        area: form.area || null,
        listingType: selectedCategory.listingType,
        propertySegment: selectedCategory.propertySegment || undefined,
        projectStatus: selectedCategory.projectStatus || undefined,
      };

      const res = await fetch(
        id ? `/api/properties/${id}` : "/api/properties",
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      router.push("/admin/properties");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save property";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {id ? "Edit Property" : "Add Property Listing"}
        </h2>
        <p className="text-slate-950 text-sm font-semibold">
          Submit property details below to update or create a listing.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-950 mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. Modern Suburban Apartment"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Price Label (Display)</label>
            <input
              type="text"
              placeholder="e.g. 1.2 Cr or 50k/mo"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
              value={form.priceLabel}
              onChange={(e) => updateField("priceLabel", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Actual Price (Number)</label>
            <input
              type="number"
              placeholder="e.g. 12000000"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-950 mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Pune"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Project Category</label>
            <select
              value={form.projectCategory}
              onChange={(e) => updateField("projectCategory", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none text-slate-950 font-bold"
            >
              {Object.entries(PROPERTY_CATEGORY_MAPPING).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Property Sub-Type</label>
            <select
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none text-slate-950 font-bold"
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* BHK, Bathrooms & Carpet Area */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">BHK <span className="font-normal text-slate-400">(optional)</span></label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 2"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
              value={form.bedrooms}
              onChange={(e) => updateField("bedrooms", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Bathrooms <span className="font-normal text-slate-400">(optional)</span></label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 2"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
              value={form.bathrooms}
              onChange={(e) => updateField("bathrooms", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Carpet Area <span className="font-normal text-slate-400">(optional)</span></label>
            <input
              type="text"
              placeholder="sq ft"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-950 mb-1">Description</label>
          <textarea
            placeholder="Briefly describe the property…"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
          />
        </div>

        {/* ── 2. Image Upload Section (Controlled) ─────────────────────── */}
        <div>
          <label className="block text-sm font-bold text-slate-950 mb-2">
            Property Images
          </label>
          <ImageUploader 
            value={form.images || []} 
            onChange={(imgs) => updateField("images", imgs)} 
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 disabled:bg-slate-300"
        >
          {loading ? "Processing…" : id ? "Update Property" : "Create Listing"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}