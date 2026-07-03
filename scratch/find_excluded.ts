import { db } from "../lib/db";
import { properties } from "../db/schema";
import { getPropertiesSupabase } from "../lib/supabase/queries";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    // 1. Fetch all properties from database sorted the same way as getPropertiesSupabase does
    // Order: featured DESC, created_at DESC
    const allDbProps = await db
      .select()
      .from(properties);

    // Sort in memory to match the DB order applied in getPropertiesSupabase
    // in getPropertiesSupabase:
    // query.order("featured", { ascending: false }).order("created_at", { ascending: false })
    const sortedDbProps = [...allDbProps].sort((a, b) => {
      // featured: true (boolean) comes first
      const featA = a.featured ? 1 : 0;
      const featB = b.featured ? 1 : 0;
      if (featA !== featB) {
        return featB - featA; // descending
      }
      
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // descending
    });

    // 2. Fetch via getPropertiesSupabase with page: 1, limit: 100, sort: latest
    const supabaseRes = await getPropertiesSupabase({ page: 1, limit: 100, sort: "latest" });
    const supabaseIds = new Set(supabaseRes.data.map(p => p.id));

    console.log(`All DB properties count: ${sortedDbProps.length}`);
    console.log(`Supabase returned count: ${supabaseRes.data.length}`);

    console.log("\nExcluded properties (not in Supabase limit=100 query):");
    let count = 0;
    for (const p of sortedDbProps) {
      if (!supabaseIds.has(p.id)) {
        count++;
        console.log(`\nExcluded Property #${count}:`);
        console.log(`- ID: ${p.id}`);
        console.log(`- Title: "${p.title}"`);
        console.log(`- created_at: ${p.createdAt?.toISOString()}`);
        console.log(`- featured: ${p.featured}`);
        console.log(`- listing_type: ${p.listingType}`);
        console.log(`- property_segment: ${p.propertySegment}`);
        console.log(`- project_status: ${p.projectStatus}`);
      }
    }

  } catch (err) {
    console.error(err);
  }
}

run();
