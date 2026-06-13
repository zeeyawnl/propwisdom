import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const experience = formData.get("experience") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!fullName || !email || !phone || !role || !experience || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields or resume file" },
        { status: 400 }
      );
    }

    // Validate file type (should be PDF) and size (< 5MB)
    const isPdfType = resumeFile.type === "application/pdf";
    const hasPdfExtension = resumeFile.name.toLowerCase().endsWith(".pdf");
    
    if (!isPdfType && !hasPdfExtension) {
      return NextResponse.json(
        { success: false, error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Resume file size exceeds the 5MB limit" },
        { status: 400 }
      );
    }

    // Upload PDF to Cloudinary
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !apiKey || !cloudName) {
      console.error("Cloudinary env variables are missing");
      return NextResponse.json(
        { success: false, error: "Server storage configuration error" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "resumes";
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    // Convert file to a Buffer/Blob for upload
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const fileBlob = new Blob([fileBuffer], { type: "application/pdf" });

    const uploadFormData = new FormData();
    uploadFormData.append("file", fileBlob, resumeFile.name);
    uploadFormData.append("folder", folder);
    uploadFormData.append("timestamp", String(timestamp));
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    if (!uploadResponse.ok) {
      const uploadError = await uploadResponse.text();
      console.error("Cloudinary upload failed:", uploadError);
      return NextResponse.json(
        { success: false, error: "Failed to upload resume to server storage" },
        { status: 500 }
      );
    }

    const uploadData = await uploadResponse.json();
    const secureUrl = uploadData.secure_url;
    console.log("Uploaded resume successfully:", secureUrl);

    // Format a detailed message for Sheets
    const structuredMessage = `
[CAREER APPLICATION]
Role: ${role}
Experience: ${experience}
Resume Link (PDF): ${secureUrl}
Cover Letter/Note: ${coverLetter || "None provided"}
    `.trim();

    // Map payload elements for Google Apps Script Web App
    const payload = {
      formType: "careers",
      name: fullName,
      fullName: fullName,
      phone: phone,
      email: email,
      message: structuredMessage,
      requirements: structuredMessage,
      role: role,
      experience: experience,
      resumeLink: secureUrl,
      coverLetter: coverLetter || "",
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    console.log("GOOGLE_SCRIPT_URL (Careers):", googleScriptUrl);

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server sheet configuration error" },
        { status: 500 }
      );
    }

    // Send payload to Google Apps Script Web App
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    console.log("Google Apps Script Status (Careers):", response.status);
    const result = await response.text();
    console.log("Google Apps Script Response (Careers):", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("Error in careers API route:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
