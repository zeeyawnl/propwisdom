import { PROPERTY_CATEGORIES } from "@/config/property-categories";
import { getFilteredProperties } from "@/lib/property-query-builder";
import PropertyListingPage from "@/components/listings/PropertyListingPage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const properties = await getFilteredProperties(
    PROPERTY_CATEGORIES.UPCOMING_PROJECTS
  );

  return (
    <PropertyListingPage
      properties={properties}
      title="Upcoming Launch Projects"
    />
  );
}
