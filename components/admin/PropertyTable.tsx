"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { type Property } from "@/lib/types/property";

const STATUS_COLOR: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700 border-green-200",
  SOLD: "bg-red-100 text-red-700 border-red-200",
  RENTED: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function PropertyTable({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this property?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Failed to delete property");
    } finally {
      setDeleting(null);
    }
  }

  async function toggleFeatured(id: string, current: boolean) {
    setToggling(id);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Failed to update featured status");
    } finally {
      setToggling(null);
    }
  }

  if (!properties.length) {
    return (
      <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
        No properties found. Add your first listing.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-left font-semibold text-slate-700">
            <th className="px-5 py-4">Title</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Display Price</th>
            <th className="px-5 py-4">Actual Price</th>
            <th className="px-5 py-4">Date Added</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {properties.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-4 font-medium text-slate-900">{p.title ?? "Untitled"}</td>
              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{p.location ?? "No location"}</td>
              <td className="px-5 py-4 font-mono text-slate-900">
                {p.priceLabel || `₹${(p.price ?? 0).toLocaleString("en-IN")}`}
              </td>
              <td className="px-5 py-4 font-mono text-teal-700 font-semibold bg-teal-50/50">
                ₹{(p.price ?? 0).toLocaleString("en-IN")}
              </td>
              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                {p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                }) : "N/A"}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end items-center gap-3">
                  <Link 
                    href={`/admin/properties/${p.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-all"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => toggleFeatured(p.id, !!p.featured)}
                    disabled={toggling === p.id}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      p.featured 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
                    }`}
                  >
                    {toggling === p.id ? "..." : p.featured ? "Featured" : "Boost"}
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    className="p-1 px-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    {deleting === p.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}