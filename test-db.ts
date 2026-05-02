import { db } from "./lib/db";
import { properties } from "./db/schema";
import { desc } from "drizzle-orm";

async function run() {
  try {
    const data = await db
      .select()
      .from(properties)
      .orderBy(desc(properties.featured), desc(properties.createdAt))
      .limit(50)
      .offset(0);
    console.log("Success:", data.length);
  } catch (err: any) {
    console.error("Error caught:");
    console.error(err);
  }
}

run();
