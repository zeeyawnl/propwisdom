"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PropertyFormProps = {
  initial?: {
    title?: string;
    description?: string;
    price?: number;
    priceLabel?: string | null;
    location?: string;
    type?: string;
    listingType?: string;
  };
  id?: string; // if exists → edit mode
};

type FormData = {
  title: string;
  price: number;
  priceLabel: string;
  location: string;
  type: string;
  listingType: string;
  description: string;
};

const TYPES = ["apartment", "villa", "plot", "commercial"];
const LISTING_TYPES = ["rent", "resale", "new_project"];

export default function PropertyForm({ initial, id }: PropertyFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    priceLabel: initial?.priceLabel ?? "",
    location: initial?.location ?? "",
    type: initial?.type ?? "apartment",
    listingType: initial?.listingType ?? "rent",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(key: keyof FormData, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = form;

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
    } catch (err: any) {
      setError(err.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {id ? "Edit Property" : "Add Property Listing"}
        </h2>
        <p className="text-slate-950 text-sm font-semibold">Submit property details below to update or create a listing.</p>
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
              required
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
            <label className="block text-sm font-bold text-slate-950 mb-1">Category</label>
            <select
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none text-slate-950 font-bold"
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-950 mb-1">Listing Variant</label>
            <select
              value={form.listingType}
              onChange={(e) => updateField("listingType", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none text-slate-950 font-bold"
            >
              {LISTING_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-950 mb-1">Description</label>
          <textarea
            placeholder="Briefly describe the property..."
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-slate-950 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 disabled:bg-slate-300"
        >
          {loading ? "Processing..." : id ? "Update Property" : "Create Listing"}
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