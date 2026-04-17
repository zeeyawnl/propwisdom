import PropertyTable from '@/components/admin/PropertyTable';
import Link from 'next/link';
import { getProperties } from "@/lib/db/properties";
export const dynamic = "force-dynamic";
export default async function PropertiesAdminPage() {
  const { data: properties } = await getProperties({
    page: 1,
    limit: 100,
    sort: "latest"
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Properties</h1>
          <p className="text-black mt-1 opacity-70">Manage and monitor all property listings.</p>
        </div>
        <Link
          href="/admin/properties/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          Add New Property
        </Link>
      </div>

      <PropertyTable properties={properties} />
    </div>
  );
}
