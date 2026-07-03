import { db } from "../lib/db";
import { properties } from "../db/schema";
import { count } from "drizzle-orm";
import { getPropertiesSupabase } from "../lib/supabase/queries";
import { getProperties } from "../lib/db/properties";
import { PropertyQuerySchema } from "../lib/validations/property";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    // 1. Check raw count from Drizzle without any schema limits
    const rawAllDrizzle = await db.select().from(properties);
    console.log("Raw Drizzle SELECT COUNT:", rawAllDrizzle.length);

    // 2. Parsed query schema input for the admin page
    const adminInput = {
      page: 1,
      limit: 100,
      sort: "latest"
    };
    const parsed = PropertyQuerySchema.parse(adminInput);
    console.log("Parsed PropertyQuerySchema:", JSON.stringify(parsed, null, 2));

    // 3. Let's inspect the filters applied in both functions
    const drizzleRes = await getProperties(parsed);
    console.log("getProperties (Drizzle) returned count:", drizzleRes.data.length);

    const supabaseRes = await getPropertiesSupabase(parsed);
    console.log("getPropertiesSupabase (Supabase) returned count:", supabaseRes.data.length);

  } catch (err) {
    console.error(err);
  }
}

run();
