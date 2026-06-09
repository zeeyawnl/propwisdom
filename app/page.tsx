import { getProperties } from "@/lib/db/properties";
import { getCategoryCounts } from "@/lib/property-query-builder";
import { Hero, FeaturedProperties, About, Services, Contact, Testimonials, ProjectCategories } from "@/components/landing";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch latest properties for the Featured section
  const result = await getProperties({
    sort: "latest",
    page: 1,
    limit: 12,
  });

  // Prefer featured properties; fallback to the newest 6
  const featured = result.data.filter((p) => p.featured);
  const displayProperties = featured.length > 0 ? featured : result.data.slice(0, 6);

  // Fetch counts dynamically for each category card
  const counts = await getCategoryCounts();

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <FeaturedProperties properties={displayProperties} />
      <ProjectCategories counts={counts} />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}

