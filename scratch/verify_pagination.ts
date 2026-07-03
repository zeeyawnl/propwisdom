import { getPropertiesSupabase } from "../lib/supabase/queries";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const page1 = await getPropertiesSupabase({ page: 1, limit: 25, sort: "latest" });
    const page2 = await getPropertiesSupabase({ page: 2, limit: 25, sort: "latest" });

    console.log(`Page 1 returned count: ${page1.data.length} (expected 25)`);
    console.log(`Page 2 returned count: ${page2.data.length} (expected 25)`);
    console.log(`Total count reported: ${page1.pagination.total} (expected 107)`);
    console.log(`Total pages: ${page1.pagination.totalPages} (expected 5)`);

    const page1Ids = new Set(page1.data.map(p => p.id));
    const duplicates: string[] = [];

    for (const p of page2.data) {
      if (page1Ids.has(p.id)) {
        duplicates.push(p.title);
      }
    }

    if (duplicates.length > 0) {
      console.error(`FAIL: Found ${duplicates.length} duplicate properties between page 1 and page 2!`);
      duplicates.forEach(d => console.log(`- Duplicate: "${d}"`));
    } else {
      console.log("SUCCESS: Sorting is stable! No duplicates between Page 1 and Page 2.");
    }

  } catch (err) {
    console.error("Verification failed:", err);
  }
}

run();
