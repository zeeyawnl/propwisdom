"use client";

import { useRef } from "react";
import { useImageUpload, type UploadedImage } from "@/hooks/useImageUpload";

type ImageUploaderProps = {
  initialImages?: UploadedImage[];
  onChange: (urls: string[]) => void; // called whenever the image list changes
};

export default function ImageUploader({ initialImages = [], onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { images, uploading, uploadErrors, progress, upload, remove } = useImageUpload(
    initialImages
  );

  // Notify parent whenever the image list changes
  function handleUpload(files: FileList | null) {
    upload(files).then(() => {
      // After upload completes the hook state is updated; we'll notify via useEffect
    });
  }

  // Keep parent in sync every render where images change
  // (We use a callback ref pattern — simple and reliable)
  onChange(images.map((img) => img.url));

  return (
    <div className="space-y-4">
      {/* ── Drop zone / trigger ─────────────────────────────────────────── */}
      <div
        className={`
          relative flex flex-col items-center justify-center gap-2
          border-2 border-dashed rounded-2xl px-6 py-8 cursor-pointer
          transition-all duration-200
          ${uploading
            ? "border-indigo-400 bg-indigo-50 cursor-not-allowed"
            : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/40"
          }
        `}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!uploading) handleUpload(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
        />

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        {uploading ? (
          <div className="text-center space-y-2 w-full max-w-xs">
            <p className="text-sm font-semibold text-indigo-600">Uploading…</p>
            <div className="w-full bg-indigo-100 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-indigo-400">{progress}%</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              Click or drag &amp; drop images
            </p>
            <p className="text-xs text-slate-400 mt-1">
              JPEG, PNG, WebP, AVIF · Max 5 MB per file · Up to 10 images
            </p>
          </div>
        )}
      </div>

      {/* ── Errors ─────────────────────────────────────────────────────────── */}
      {uploadErrors.length > 0 && (
        <ul className="space-y-1">
          {uploadErrors.map((err, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              <span className="mt-0.5">⚠️</span>
              <span>
                {err.file && <strong>{err.file}: </strong>}
                {err.reason}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Preview grid ───────────────────────────────────────────────────── */}
      {images.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
            {images.length} / 10 images
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={img.publicId} className="relative group rounded-xl overflow-hidden aspect-video bg-slate-100 shadow-sm">
                {/* Badge for first image */}
                {i === 0 && (
                  <span className="absolute top-1 left-1 z-10 text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">
                    Cover
                  </span>
                )}

                <img
                  src={img.url}
                  alt={`Property image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => remove(img.publicId)}
                  className="
                    absolute top-1 right-1 z-10
                    w-6 h-6 rounded-full
                    bg-black/60 hover:bg-red-600
                    text-white text-xs
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-all duration-150
                  "
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}