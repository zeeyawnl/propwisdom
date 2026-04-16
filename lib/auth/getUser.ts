import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// 🔐 Require logged-in user
export async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Unauthorized — please sign in" },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}

// 🔐 Require admin role (SECURE)
export async function requireAdmin() {
  const { user, response } = await requireAuth();

  if (response) return { user: null, response };

  const role = user!.app_metadata?.role; // ✅ FIXED

  if (role !== "admin") {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Forbidden — admin access required" },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}
