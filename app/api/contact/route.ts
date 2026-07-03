import { NextResponse } from "next/server";

// POST /api/contact
// Receives the contact form submission and forwards it to the LeadPluss CRM.

export async function POST(req: Request) {
  try {
    // ── 1. Parse body ────────────────────────────────────────────────────────
    const body = await req.json();

    const name: string = (body.name ?? "").trim();
    const phone: string = (body.phone ?? "").trim();
    const email: string = (body.email ?? "").trim();
    const message: string = (body.message ?? "").trim();

    // ── 2. Validate fields ────────────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // exactly 10 digits

    const errors: string[] = [];

    if (name.length < 2) {
      errors.push("Full name must be at least 2 characters.");
    }

    if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      errors.push("Phone number must be exactly 10 digits.");
    }

    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }

    // Requirements / message is optional — no validation needed.

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(" ") },
        { status: 400 }
      );
    }

    // ── 3. Split full name → first / last name ───────────────────────────────
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" "); // "" when only one word provided

    // ── 4. Read CRM credentials from environment ─────────────────────────────
    const apiUrl = process.env.LEADPLUSS_API_URL;
    const vendorKey = process.env.LEADPLUSS_VENDOR_KEY;

    if (!apiUrl || !vendorKey) {
      console.error("[contact] LeadPluss env vars are not set.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    // ── 5. Build LeadPluss payload ────────────────────────────────────────────
    const crmPayload = {
      FirstName: firstName,
      LastName: lastName,
      ISD: null,
      Phone: phone.replace(/\s+/g, ""),
      EmailId: email,
      State: "",
      City: "",
      Location: "",
      Project: "",
      Pincode: "",
      PropertyFor: "Buy",
      Property: "Flat",
      PropertyType: "",
      Message: message,
      LeadSource: "Website",
      vendor_key: vendorKey,
    };

    console.log("[contact] CRM Payload:", {
      ...crmPayload,
      vendor_key: "***", // mask key from logs
    });

    // ── 6. POST to LeadPluss CRM ──────────────────────────────────────────────
    const crmResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(crmPayload),
    });

    const responseText = await crmResponse.text();
    console.log("[contact] CRM Response:", crmResponse.status, responseText);

    // ── 7. Handle CRM responses ───────────────────────────────────────────────
    // Parse JSON if possible; fall back to raw text
    let crmData: Record<string, unknown> = {};
    try {
      crmData = JSON.parse(responseText);
    } catch {
      // plain-text response — use responseText for string checks
    }

    const statusCode = String(crmData.statusCode ?? crmData.StatusCode ?? "").toLowerCase();
    const crmMessage = String(crmData.message ?? crmData.Message ?? responseText ?? "");

    // "Lead details already exists." → soft success
    if (crmMessage.toLowerCase().includes("lead details already exists")) {
      return NextResponse.json({
        success: true,
        message:
          "We already have your enquiry. Our team will contact you shortly.",
      });
    }

    // statusCode Ok → success
    if (statusCode === "ok" || crmResponse.ok) {
      return NextResponse.json({ success: true });
    }

    // Invalid payload or other CRM errors
    console.error("[contact] CRM rejected submission:", crmMessage);
    return NextResponse.json(
      { success: false, error: "CRM submission failed. Please try again." },
      { status: 502 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
