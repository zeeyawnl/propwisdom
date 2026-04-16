import { NextRequest, NextResponse } from "next/server";
import { getProperties, createProperty } from "@/lib/db/properties";
import { CreatePropertySchema, PropertyQuerySchema } from "@/lib/validators/property";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsed = PropertyQuerySchema.safeParse(
      Object.fromEntries(searchParams.entries())
    );

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query params", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await getProperties(parsed.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreatePropertySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const data = validatedData.data;
    const newProperty = await createProperty({ id: uuid(), ...data });
    
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("REAL ERROR (POST):", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
