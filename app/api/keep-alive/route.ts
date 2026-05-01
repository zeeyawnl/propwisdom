export async function GET() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?select=1`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    });
    return Response.json({ status: "alive" });
  } catch (error) {
    return Response.json({ status: "error", message: "Failed to ping database" }, { status: 500 });
  }
}
