import { createSupabaseServerClient } from "@/lib/supabase/server";

// 🔐 Require admin role (Direct Setup for maximum reliability in Next 16)
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      response: new Response(
        JSON.stringify({ error: "Unauthorized: please sign in" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const role = user.app_metadata?.role;

  if (role !== "admin") {
    return {
      user: null,
      response: new Response(
        JSON.stringify({ error: "Forbidden: admin only" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { user, response: null };
}

// Keep requireAuth for other use cases if needed
export async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      response: new Response(
        JSON.stringify({ error: "Unauthorized: please sign in" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { user, response: null };
}
