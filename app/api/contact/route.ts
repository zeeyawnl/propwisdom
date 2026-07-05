import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads/schemas";
import { buildPayload } from "@/lib/leads/builder";
import { submitLead } from "@/lib/leads/service";

// POST /api/contact
// Handles the new unified lead form payload

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ── 1. Environment check ───────────────────────────────────────────────────
    const apiUrl    = process.env.LEADPLUSS_API_URL;
    const vendorKey = process.env.LEADPLUSS_VENDOR_KEY;

    if (!apiUrl || !vendorKey) {
      console.error("[contact/route] LeadPluss env vars not set.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    // ── 2. Schema validation ───────────────────────────────────────────────────
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    // ── 3. Build CRM payload ───────────────────────────────────────────────────
    const payload = buildPayload(parsed.data, vendorKey);

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
    console.error("[contact/route] Unexpected error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
