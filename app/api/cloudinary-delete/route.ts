import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth/getUser";

// POST /api/cloudinary-delete
// Admin-only. Deletes one or more images from Cloudinary by public_id.
// Called automatically when a property is deleted.
export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !apiKey || !cloudName) {
      return NextResponse.json(
        { error: "Cloudinary is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { publicIds } = body as { publicIds: string[] };

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json({ error: "publicIds array is required" }, { status: 400 });
    }

    // Delete each image via Cloudinary Admin API
    const results = await Promise.allSettled(
      publicIds.map(async (publicId) => {
        const timestamp = Math.round(Date.now() / 1000);
        const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
        const signature = crypto
          .createHash("sha256")
          .update(paramsToSign + apiSecret)
          .digest("hex");

        const formData = new FormData();
        formData.append("public_id", publicId);
        formData.append("timestamp", String(timestamp));
        formData.append("api_key", apiKey);
        formData.append("signature", signature);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          { method: "POST", body: formData }
        );

        if (!res.ok) throw new Error(`Failed to delete ${publicId}`);
        return res.json();
      })
    );

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.warn("[cloudinary-delete] Some deletions failed:", failed);
    }

    return NextResponse.json({
      deleted: results.filter((r) => r.status === "fulfilled").length,
      failed: failed.length,
    });
  } catch (error) {
    console.error("[POST /api/cloudinary-delete]", error);
    return NextResponse.json({ error: "Failed to delete images" }, { status: 500 });
  }
}