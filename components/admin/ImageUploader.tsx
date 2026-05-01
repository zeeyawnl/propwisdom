"use client";

import { useRef } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { optimizeImage } from "@/lib/utils";

type ImageUploaderProps = {
  value: string[]; // controlled array of URLs
  onChange: (urls: string[]) => void;
};

export default function ImageUploader({ value = [], onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImages, uploading } = useImageUpload();

  async function handleUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    try {
      const newUrls = await uploadImages(fileList);
      onChange([...value, ...newUrls]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("One or more images failed to upload.");
    }
  }

  function removeImage(url: string) {
    // 1. Notify parent immediately (Optimistic UI)
    const next = value.filter((imgUrl) => imgUrl !== url);
    onChange(next);

    // 2. Optional: Extract publicId and cleanup Cloudinary
    const publicId = extractPublicId(url);
    if (publicId && publicId !== url) {
      fetch("/api/cloudinary-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicIds: [publicId] }),
      }).catch((err) => console.warn("Background delete failed:", err));
    }
  }

  return (
    <div className="space-y-4">
      {/* ── Drop Zone ───────────────────────────────────────────────────── */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-2xl px-6 py-10 cursor-pointer
          transition-all duration-200
          ${
            uploading
              ? "border-indigo-400 bg-indigo-50/50 cursor-not-allowed"
              : "border-slate-300 hover:border-indigo-500 hover:bg-slate-50/50"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
        />

        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
          {uploading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">
            {uploading ? "Uploading images..." : "Add property photos"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            JPEG, PNG or WebP · Up to 5MB
          </p>
        </div>
      </div>

      {/* ── Preview Grid ────────────────────────────────────────────────── */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 group border border-slate-200"
            >
              <img src={optimizeImage(url, "f_auto,q_auto,w_400")} className="w-full h-full object-cover" alt="Property" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {i === 0 && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Cover</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function extractPublicId(url: string): string {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return "";
    return parts[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
  } catch {
    return "";
  }
}