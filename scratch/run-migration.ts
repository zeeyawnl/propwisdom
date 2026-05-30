import { db } from "../lib/db";
import { sql } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

async function run() {
  try {
    const migrationPath = path.join(__dirname, "../db/migrations/0002_property_classification.sql");
    const sqlContent = fs.readFileSync(migrationPath, "utf8");
    console.log("Applying migration...");
    
    // Split the SQL queries by semicolon to execute them.
    // We filter out empty queries and run them.
    const queries = sqlContent
      .split(";")
      .map(q => q.trim())
      .filter(q => q.length > 0);

    for (const query of queries) {
      console.log(`Running query: ${query}`);
      await db.execute(sql.raw(query));
    }

    console.log("Migration applied successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

run();
