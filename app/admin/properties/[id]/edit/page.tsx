import PropertyForm from '@/components/admin/PropertyForm';
import Link from 'next/link';
import { getPropertyById } from '@/lib/db/properties';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-900 mb-4">
        <Link href="/admin/properties">Properties</Link>
        <span className="mx-2">/</span>
        <span>Edit Property</span>
      </nav>

      <div className="bg-amber-50 border p-4 rounded-xl text-sm mb-6">
        Editing property ID: <strong>{id}</strong>
      </div>

      <PropertyForm
        id={id}
        initial={{
          title: property.title,
          price: property.price,
          priceLabel: property.priceLabel ?? "",
          location: property.location,
          type: property.type,
          listingType: property.listingType,
          description: property.description ?? "",
          images: property.images || [],
        }}
      />
    </div>
  );
}