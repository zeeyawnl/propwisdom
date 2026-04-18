import { NextResponse, NextRequest } from "next/server";
import { getPropertyById, updateProperty, deleteProperty } from "@/lib/db/properties";
import { UpdatePropertySchema } from "@/lib/validations/property";
import crypto from "crypto";

export const dynamic = "force-dynamic";

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

    return NextResponse.json(property);
  } catch (error) {
    console.error("REAL ERROR (GET BY ID):", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = UpdatePropertySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const updatedProperty = await updateProperty(id, validatedData.data as any);

    if (!updatedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("REAL ERROR (PATCH):", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Fetch property first to get image URLs before deletion
    const property = await getPropertyById(id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 2. Delete from DB
    const deletedProperty = await deleteProperty(id);
    if (!deletedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 3. Clean up Cloudinary images (Blocking to prevent orphaned files)
    const imageUrls: string[] = (property.images ?? []).filter(Boolean) as string[];
    if (imageUrls.length > 0) {
      await deleteCloudinaryImages(imageUrls);
    }

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("REAL ERROR (DELETE):", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}

// ── Helper: delete images from Cloudinary on the server ─────────────────────
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