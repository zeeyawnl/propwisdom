import { getProperties } from "../lib/db/properties";
import { getPropertiesSupabase } from "../lib/supabase/queries";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const drizzleResult = await getProperties({ page: 1, limit: 100, sort: "latest" });
    const supabaseResult = await getPropertiesSupabase({ page: 1, limit: 100, sort: "latest" });

    console.log(`Drizzle (getProperties) count: ${drizzleResult.data.length}`);
    console.log(`Supabase (getPropertiesSupabase) count: ${supabaseResult.data.length}`);

    const drizzleIds = new Set(drizzleResult.data.map(p => p.id));
    const supabaseIds = new Set(supabaseResult.data.map(p => p.id));

    console.log("\nProperties returned by Drizzle but NOT by Supabase:");
    for (const p of drizzleResult.data) {
      if (!supabaseIds.has(p.id)) {
        console.log(`- ID: ${p.id}, Title: "${p.title}"`);
      }
    }

    console.log("\nProperties returned by Supabase but NOT by Drizzle:");
    for (const p of supabaseResult.data) {
      if (!drizzleIds.has(p.id)) {
        console.log(`- ID: ${p.id}, Title: "${p.title}"`);
      }
    }
  } catch (err) {
    console.error("Error running comparison:", err);
  }
}

run();
