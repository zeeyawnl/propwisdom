import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = process.env.DATABASE_URL;

// For edge environments (like Vercel) or when using some Postgres providers (like Supabase Transaction pooler)
// we often need to set prepare: false
const client = postgres(connectionString, { prepare: false, ssl: "require" });
export const db = drizzle(client, { schema });
