import { getProperties } from "@/lib/db/properties";
import { Hero, FeaturedProperties, About, Services, Contact, Testimonials } from "@/components/landing";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch latest properties for the Featured section
  const result = await getProperties({
    sort: "latest",
    page: 1,
    limit: 12,
  });

  // Prefer featured properties; fallback to the newest 4
  const featured = result.data.filter((p) => p.featured).slice(0, 4);
  const displayProperties = featured.length > 0 ? featured : result.data.slice(0, 4);

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <FeaturedProperties properties={displayProperties} />

      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}
