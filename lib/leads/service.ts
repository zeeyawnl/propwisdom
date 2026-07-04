import type { CrmPayload } from "./builder";

// ─── Result type ─────────────────────────────────────────────────────────────

export type LeadResult =
  | { ok: true;  message?: string }
  | { ok: false; duplicate: true;  message: string }
  | { ok: false; duplicate: false; error: string   };

// ─── LeadPluss HTTP service ───────────────────────────────────────────────────
// Responsibilities:
//   1. POST the payload to the CRM endpoint
//   2. Parse the response (JSON or plain text)
//   3. Normalise all outcomes into a typed LeadResult
//
// Intentionally has no knowledge of React, validation, or env vars beyond apiUrl.

export async function submitLead(
  payload: CrmPayload,
  apiUrl:  string
): Promise<LeadResult> {
  // Log payload, masking vendor_key
  console.log("[leads] CRM Payload:", { ...payload, vendor_key: "***" });

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        Accept:         "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    console.error("[leads] Network error reaching CRM:", networkError);
    return { ok: false, duplicate: false, error: "Network error. Please try again." };
  }

  const text = await response.text();
  console.log("[leads] CRM Response:", response.status, text);

  // Try to parse JSON; fall back to plain-text checks
  let data: Record<string, unknown> = {};
  try { data = JSON.parse(text); } catch { /* plain text */ }

  const statusCode = String(data.statusCode ?? data.StatusCode ?? "").toLowerCase();
  const crmMessage = String(data.message    ?? data.Message    ?? text ?? "");

  // ── Duplicate lead ─────────────────────────────────────────────────────────
  if (crmMessage.toLowerCase().includes("lead details already exists")) {
    return {
      ok:        false,
      duplicate: true,
      message:   "We already have your enquiry. Our team will contact you shortly.",
    };
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (statusCode === "ok" || response.ok) {
    return { ok: true };
  }

  // ── CRM rejection ──────────────────────────────────────────────────────────
  if (crmMessage.toLowerCase().includes("invalid payload")) {
    console.error("[leads] CRM rejected submission due to Invalid Payload. Payload (masked):", {
      ...payload,
      vendor_key: "***",
    }, "Response:", crmMessage);
  } else {
    console.error("[leads] CRM rejected submission:", crmMessage);
  }

  return {
    ok:        false,
    duplicate: false,
    error:     "CRM submission failed. Please try again.",
  };
}
