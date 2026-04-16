import { NextRequest, NextResponse } from "next/server";
import { CreatePropertySchema, PropertyQuerySchema } from "@/lib/validations/property";
import { createProperty, getProperties } from "@/lib/db/properties";
import { requireAuth, requireAdmin } from "@/lib/auth/getUser";
import { v4 as uuid } from "uuid";

// ── GET /api/properties → public, anyone can read ──────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const queryResult = PropertyQuerySchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sort: searchParams.get("sort"),
      type: searchParams.get("type"),
      location: searchParams.get("location"),
      listingType: searchParams.get("listingType"),
      min: searchParams.get("min"),
      max: searchParams.get("max"),
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: queryResult.error.flatten() },
        { status: 400 }
      );
    }

    const result = await getProperties(queryResult.data);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("[GET /api/properties]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── POST /api/properties → admin only ──────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const { user, response } = await requireAdmin();
    if (response || !user) return response!;

    // 2. Parse + validate body
    const body = await req.json();
    const parsed = CreatePropertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Attach owner + generate ID
    const property = await createProperty({
      id: uuid(),
      ...parsed.data,
      userId: user.id,
    });

    return NextResponse.json(property, { status: 201 });

  } catch (error) {
    console.error("[POST /api/properties]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}