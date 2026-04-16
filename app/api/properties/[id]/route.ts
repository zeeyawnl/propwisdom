import { NextResponse, NextRequest } from "next/server";
import { getPropertyById, updateProperty, deleteProperty } from "@/lib/db/properties";
import { UpdatePropertySchema } from "@/lib/validations/property";

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
    
    // Validate with UpdatePropertySchema (partial of CreatePropertySchema)
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
    const deletedProperty = await deleteProperty(id);

    if (!deletedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("REAL ERROR (DELETE):", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
