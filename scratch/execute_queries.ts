import { db } from "../lib/db";
import { properties } from "../db/schema";
import { count, asc } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    // 1. SELECT COUNT(*) FROM properties;
    const countResult = await db.select({ val: count() }).from(properties);
    console.log("EXACT_ROW_COUNT:", countResult[0].val);

    // 2. Oldest 20 records
    const oldest = await db
      .select({ id: properties.id, title: properties.title, createdAt: properties.createdAt })
      .from(properties)
      .orderBy(asc(properties.createdAt))
      .limit(20);

    console.log("\nOLDEST_20_RECORDS:");
    oldest.forEach((r, idx) => {
      console.log(`${idx + 1}. ID: ${r.id}, CreatedAt: ${r.createdAt?.toISOString()}, Title: "${r.title}"`);
    });

  } catch (err) {
    console.error(err);
  }
}

run();
