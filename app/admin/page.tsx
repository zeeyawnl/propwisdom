import Link from "next/link";
import { getProperties } from "@/lib/db/properties";
import PropertyTable from "@/components/admin/PropertyTable";
import { type Property } from "@/lib/types/property";

export default async function PropertiesPage() {
  const { data: properties } = await getProperties({
    page: 1,
    limit: 100,
    sort: "latest",
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1>Properties</h1>

        <Link href="/admin/properties/add">
          <button>+ Add Property</button>
        </Link>
      </div>

      <PropertyTable properties={properties as Property[]} />
    </div>
  );
}