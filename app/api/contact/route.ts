import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Map both standard formats so that the Apps Script can read either key naming convention
    const payload = {
      name: body.name || body.fullName || "",
      fullName: body.fullName || body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      message: body.message || body.requirements || "",
      requirements: body.requirements || body.message || "",
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    console.log("GOOGLE_SCRIPT_URL:", googleScriptUrl);

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Google Apps Script Web App from Server (bypassing CORS)
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    console.log("Google Status:", response.status);
    console.log("Google Status Text:", response.statusText);

    const result = await response.text();
    console.log("Google Response:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
