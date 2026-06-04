import { db } from "../lib/db";
import { properties } from "../db/schema";

async function run() {
  try {
    const data = await db.select().from(properties);
    console.log(`Found ${data.length} properties:`);
    for (const p of data) {
      console.log(`- ID: ${p.id}`);
      console.log(`  Title: ${p.title}`);
      console.log(`  Images:`, p.images);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
