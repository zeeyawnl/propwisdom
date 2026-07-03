import { getProperties } from "../lib/db/properties";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  const sort = "latest";
  try {
    const [
      mandateRes,
      newResRes,
      newCommRes,
      upcomingRes,
      resaleResRes,
      resaleCommRes,
      rentalResRes,
      rentalCommRes,
      preLeaseRes,
      landPlotsRes,
    ] = await Promise.all([
      getProperties({ page: 1, limit: 100, sort, listingType: "MANDATE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "RESIDENTIAL", projectStatus: "NEW" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "NEW" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", projectStatus: "UPCOMING" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "RESIDENTIAL", projectStatus: "RESALE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "RESALE" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "RENTAL", propertySegment: "RESIDENTIAL" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "RENTAL", propertySegment: "COMMERCIAL" }),
      getProperties({ page: 1, limit: 100, sort, listingType: "SALE", propertySegment: "COMMERCIAL", projectStatus: "PRE_LEASED" }),
      getProperties({ page: 1, limit: 100, sort, type: "plot" }),
    ]);

    const mandateProjects = mandateRes.data;
    const newResidentialProjects = newResRes.data.filter((p) => p.type !== "plot");
    const newCommercialProjects = newCommRes.data;
    const upcomingProjects = upcomingRes.data;
    const resaleResidentialProjects = resaleResRes.data.filter((p) => p.type !== "plot");
    const resaleCommercialProjects = resaleCommRes.data;
    const rentalResidentialProjects = rentalResRes.data;
    const rentalCommercialProjects = rentalCommRes.data;
    const preLeaseProperties = preLeaseRes.data;
    const landPlots = landPlotsRes.data;

    console.log("Section counts:");
    console.log("- mandateProjects:", mandateProjects.length);
    console.log("- newResidentialProjects:", newResidentialProjects.length);
    console.log("- newCommercialProjects:", newCommercialProjects.length);
    console.log("- upcomingProjects:", upcomingProjects.length);
    console.log("- resaleResidentialProjects:", resaleResidentialProjects.length);
    console.log("- resaleCommercialProjects:", resaleCommercialProjects.length);
    console.log("- rentalResidentialProjects:", rentalResidentialProjects.length);
    console.log("- rentalCommercialProjects:", rentalCommercialProjects.length);
    console.log("- preLeaseProperties:", preLeaseProperties.length);
    console.log("- landPlots:", landPlots.length);

    const lists = [
      { name: "Mandate", items: mandateProjects },
      { name: "New Residential", items: newResidentialProjects },
      { name: "New Commercial", items: newCommercialProjects },
      { name: "Upcoming", items: upcomingProjects },
      { name: "Resale Residential", items: resaleResidentialProjects },
      { name: "Resale Commercial", items: resaleCommercialProjects },
      { name: "Rental Residential", items: rentalResidentialProjects },
      { name: "Rental Commercial", items: rentalCommercialProjects },
      { name: "Pre-lease", items: preLeaseProperties },
      { name: "Land Plots", items: landPlots }
    ];

    let totalRendered = 0;
    const uniqueIds = new Set<string>();
    const propertyToSections: Record<string, string[]> = {};

    for (const list of lists) {
      totalRendered += list.items.length;
      for (const item of list.items) {
        uniqueIds.add(item.id);
        if (!propertyToSections[item.id]) {
          propertyToSections[item.id] = [];
        }
        propertyToSections[item.id].push(list.name);
      }
    }

    console.log("\nTotal property cards rendered on the website:", totalRendered);
    console.log("Total unique property IDs in the rendered cards:", uniqueIds.size);

    console.log("\nProperties appearing in multiple sections:");
    for (const [id, sections] of Object.entries(propertyToSections)) {
      if (sections.length > 1) {
        const item = lists.flatMap(l => l.items).find(i => i.id === id);
        console.log(`- "${item?.title}" (ID: ${id}) appears in: ${sections.join(", ")}`);
      }
    }

  } catch (err) {
    console.error("Error running count_rendered:", err);
  }
}

run();
