"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const NAV = [
  { label: "All Properties", href: "/admin/properties" },
  { label: "Add Property", href: "/admin/properties/add" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Missing Supabase environment variables");
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside style={{
      width: 220,
      background: "#1a1a1a",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "24px 0",
      minHeight: "100vh",
    }}>
      <div style={{ padding: "0 24px 28px", fontWeight: 600, fontSize: 18 }}>
        Admin Panel
      </div>

      <nav style={{ flex: 1 }}>
        {NAV.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "block",
              padding: "12px 24px",
              color: pathname === href ? "#fff" : "#aaa",
              background: pathname === href ? "#2e2e2e" : "transparent",
              textDecoration: "none",
              fontSize: 14,
              borderLeft: pathname === href ? "3px solid #7F77DD" : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          margin: "0 16px",
          padding: "10px 16px",
          background: "transparent",
          color: "#888",
          border: "1px solid #333",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Logout
      </button>
    </aside>
  );
}