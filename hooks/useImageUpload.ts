"use client";

import { useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// ─── Types ────────────────────────────────────────────────────────────────────
export type UploadedImage = {
  url: string;        // Cloudinary secure_url
  publicId: string;   // Cloudinary public_id — needed for deletion
};

export type UploadError = {
  file: string;
  reason: string;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useImageUpload(initialImages: UploadedImage[] = []) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<UploadError[]>([]);
  const [progress, setProgress] = useState(0); // 0–100

  // ── Validate files before uploading ────────────────────────────────────────
  function validateFiles(files: File[]): { valid: File[]; errors: UploadError[] } {
    const errors: UploadError[] = [];
    const valid: File[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push({ file: file.name, reason: "Unsupported type. Use JPEG, PNG, WebP, or AVIF." });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push({ file: file.name, reason: "File exceeds 5 MB limit." });
        continue;
      }
      valid.push(file);
    }

    return { valid, errors };
  }

  // ── Upload a single file using a signed URL ────────────────────────────────
  async function uploadOne(file: File): Promise<UploadedImage> {
    // Step 1: get signature from our backend (keeps API_SECRET server-side)
    const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
    if (!signRes.ok) throw new Error("Could not get upload signature");

    const { signature, timestamp, apiKey, cloudName, folder } = await signRes.json();

    // Step 2: upload directly to Cloudinary with the signature
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    formData.append("timestamp", String(timestamp));
    formData.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!uploadRes.ok) throw new Error(`Upload failed for ${file.name}`);

    const data = await uploadRes.json();
    return { url: data.secure_url, publicId: data.public_id };
  }

  // ── Upload multiple files in parallel ─────────────────────────────────────
  const upload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      setUploadErrors([]);

      const incoming = Array.from(fileList);

      // Slot check
      const slots = MAX_IMAGES - images.length;
      if (slots <= 0) {
        setUploadErrors([{ file: "", reason: `Maximum ${MAX_IMAGES} images allowed.` }]);
        return;
      }

      const trimmed = incoming.slice(0, slots);
      if (trimmed.length < incoming.length) {
        setUploadErrors([
          { file: "", reason: `Only ${slots} slot(s) remaining. Extra files were skipped.` },
        ]);
      }

      const { valid, errors } = validateFiles(trimmed);
      if (errors.length) setUploadErrors((prev) => [...prev, ...errors]);
      if (valid.length === 0) return;

      setUploading(true);
      setProgress(0);

      let completed = 0;

      const results = await Promise.allSettled(
        valid.map(async (file) => {
          const result = await uploadOne(file);
          completed++;
          setProgress(Math.round((completed / valid.length) * 100));
          return result;
        })
      );

      const succeeded: UploadedImage[] = [];
      const failed: UploadError[] = [];

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          succeeded.push(result.value);
        } else {
          failed.push({ file: valid[i].name, reason: "Upload failed. Please try again." });
        }
      });

      if (failed.length) setUploadErrors((prev) => [...prev, ...failed]);
      setImages((prev) => [...prev, ...succeeded]);
      setUploading(false);
      setProgress(0);
    },
    [images.length]
  );

  // ── Remove an image (also deletes from Cloudinary) ─────────────────────────
  const remove = useCallback(async (publicId: string) => {
    // Optimistic UI — remove instantly
    setImages((prev) => prev.filter((img) => img.publicId !== publicId));

    // Background deletion — non-blocking
    fetch("/api/cloudinary-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicIds: [publicId] }),
    }).catch((err) => console.warn("Background image deletion failed:", err));
  }, []);

  // ── Reorder (drag support) ─────────────────────────────────────────────────
  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  return {
    images,
    uploading,
    uploadErrors,
    progress,
    upload,
    remove,
    reorder,
    urls: images.map((img) => img.url), // convenience: array of URL strings for the DB
  };
}