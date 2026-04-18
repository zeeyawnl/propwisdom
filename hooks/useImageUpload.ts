import { useState } from "react";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  async function uploadImages(files: FileList) {
    setUploading(true);
    const uploaded: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // 1. get signature
        const signRes = await fetch("/api/cloudinary-sign", {
          method: "POST",
        });

        const { signature, timestamp, apiKey, cloudName, folder } =
          await signRes.json();

        // 2. upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await uploadRes.json();

        if (!uploadRes.ok) throw new Error("Upload failed");

        uploaded.push(data.secure_url);
      }

      return uploaded;
    } finally {
      setUploading(false);
    }
  }

  return { uploadImages, uploading };
}