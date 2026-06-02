import { redirect } from "next/navigation";

export default function Page() {
  redirect("/properties?category=RESALE_COMMERCIAL_PROJECTS");
}
