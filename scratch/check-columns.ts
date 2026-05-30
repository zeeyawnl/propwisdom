import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function run() {
  try {
    const rows = await db.execute(sql`
      SELECT id, title, type, listing_type, property_segment, project_status FROM properties;
    `);
    console.log("Updated rows in DB:", JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  }
}

run();
