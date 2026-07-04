import { NextResponse } from "next/server";
import { homepageLeadSchema, listingLeadSchema } from "@/lib/leads/schemas";
import { buildPayload } from "@/lib/leads/builder";
import { submitLead } from "@/lib/leads/service";
import type { HomepageLeadInput, ListingLeadInput } from "@/lib/leads/schemas";

// POST /api/leads
// Thin route — validate, build, submit, return. No business logic lives here.

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ── 1. Environment check ───────────────────────────────────────────────────
    const apiUrl    = process.env.LEADPLUSS_API_URL;
    const vendorKey = process.env.LEADPLUSS_VENDOR_KEY;

    if (!apiUrl || !vendorKey) {
      console.error("[leads/route] LeadPluss env vars not set.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    // ── 2. Schema selection + validation ───────────────────────────────────────
    // If the request includes a category → listing enquiry; otherwise homepage.
    const isListing = Boolean(body?.category);

    let validatedData: HomepageLeadInput | ListingLeadInput;

    if (isListing) {
      const parsed = listingLeadSchema.safeParse(body);
      if (!parsed.success) {
        const message = parsed.error.issues.map((i) => i.message).join(" ");
        return NextResponse.json({ success: false, error: message }, { status: 400 });
      }
      validatedData = parsed.data;
    } else {
      const parsed = homepageLeadSchema.safeParse(body);
      if (!parsed.success) {
        const message = parsed.error.issues.map((i) => i.message).join(" ");
        return NextResponse.json({ success: false, error: message }, { status: 400 });
      }
      validatedData = parsed.data;
    }

    // ── 3. Build CRM payload ───────────────────────────────────────────────────
    const payload = buildPayload(validatedData, vendorKey);

    // ── 4. Submit ──────────────────────────────────────────────────────────────
    const result = await submitLead(payload, apiUrl);

    // ── 5. Return ──────────────────────────────────────────────────────────────
    if (result.ok) {
      return NextResponse.json({ success: true });
    }

    if (result.duplicate) {
      return NextResponse.json({ success: true, message: result.message });
    }

    return NextResponse.json(
      { success: false, error: result.error },
      { status: 502 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[leads/route] Unexpected error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
