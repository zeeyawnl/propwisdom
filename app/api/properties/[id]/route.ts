import { NextResponse, NextRequest } from "next/server";
import { getPropertyById, updateProperty, deleteProperty } from "@/lib/db/properties";
import { UpdatePropertySchema } from "@/lib/validations/property";
import { requireAdmin } from "@/lib/auth/getUser";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// GET /api/properties/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Safely enforce `images: string[]` for the frontend to prevent mapping errors
    const safeProperty = {
      ...property,
      images: property.images || [],
    };

    return NextResponse.json(safeProperty);
  } catch (error) {
    console.error("[GET /api/properties/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

// PATCH /api/properties/[id] (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    const { id } = await params;
    const body = await request.json();
    const validatedData = UpdatePropertySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    // Strip undefined keys so we only update fields the client explicitly sent.
    // Without this, Drizzle could interpret `{ images: undefined }` as a null write.
    const cleanData = Object.fromEntries(
      Object.entries(validatedData.data).filter(([, v]) => v !== undefined)
    );

    if (Object.keys(cleanData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updatedProperty = await updateProperty(id, cleanData);
    if (!updatedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("[PATCH /api/properties/[id]]", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

// DELETE /api/properties/[id] (Admin only + Cloudinary Cleanup)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    const { id } = await params;

    // 1. Fetch property first to get image URLs
    const property = await getPropertyById(id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 2. Delete from DB
    const deletedProperty = await deleteProperty(id);
    if (!deletedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 3. Clean up Cloudinary images (Blocking)
    const imageUrls: string[] = (property.images ?? []).filter(Boolean) as string[];
    if (imageUrls.length > 0) {
      await deleteCloudinaryImages(imageUrls);
    }

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/properties/[id]]", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}

// ── Cloudinary Cleanup Helper ───────────────────────────────────────────────
async function deleteCloudinaryImages(urls: string[]) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) return;

  const publicIds = urls.map(extractPublicId).filter(Boolean);

  await Promise.allSettled(
    publicIds.map(async (publicId) => {
      const timestamp = Math.round(Date.now() / 1000);
      const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;

      const signature = crypto
        .createHash("sha1")
        .update(paramsToSign + apiSecret)
        .digest("hex");

      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("timestamp", String(timestamp));
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      return fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        { method: "POST", body: formData }
      );
    })
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
