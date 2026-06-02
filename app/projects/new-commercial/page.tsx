import { redirect } from "next/navigation";

export default function Page() {
  redirect("/properties?category=NEW_COMMERCIAL_PROJECTS");
}
