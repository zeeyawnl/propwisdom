import { NextResponse, NextRequest } from "next/server";
import { getPropertiesSupabase } from "@/lib/supabase/queries";
import { createProperty } from "@/lib/db/properties";
import { CreatePropertySchema, PropertyQuerySchema } from "@/lib/validations/property";
import { requireAdmin } from "@/lib/auth/getUser";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

// GET /api/properties (Filterable list)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = PropertyQuerySchema.parse(Object.fromEntries(searchParams));
    const data = await getPropertiesSupabase(query);
    
    // Safely enforce `images: string[]` for every property globally
    const safeData = {
      ...data,
      data: data.data.map(property => ({
        ...property,
        images: property.images || []
      }))
    };

    return NextResponse.json(safeData);
  } catch (error) {
    console.error("[GET /api/properties]", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

// POST /api/properties (Create new: Admin only)
export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    const body = await request.json();
    const validatedData = CreatePropertySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const newProperty = await createProperty({
      ...validatedData.data,
      listingType: validatedData.data.listingType,
      propertySegment: validatedData.data.propertySegment ?? "RESIDENTIAL",
      projectStatus: validatedData.data.projectStatus ?? undefined,
      id: uuidv4(),
      userId: user.id,
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("[POST /api/properties]", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}