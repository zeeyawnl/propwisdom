import { redirect } from "next/navigation";

export default function Page() {
  redirect("/properties?category=RENTAL_RESIDENTIAL_PROJECTS");
}
