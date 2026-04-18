import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth/getUser";

// POST /api/cloudinary-sign
// Admin-only. Returns a signed upload signature so the client can upload
// directly to Cloudinary without exposing the API secret.
export async function POST(req: NextRequest) {
  try {
    // 1. Only admins can get upload signatures
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    // 2. Validate env vars
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !apiKey || !cloudName) {
      return NextResponse.json(
        { error: "Cloudinary is not configured on the server." },
        { status: 500 }
      );
    }

    // 3. Build params to sign
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "properties";

    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    // 4. HMAC-SHA1 signature (Cloudinary standard)
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (error) {
    console.error("[POST /api/cloudinary-sign]", error);
    return NextResponse.json({ error: "Failed to sign upload" }, { status: 500 });
  }
}