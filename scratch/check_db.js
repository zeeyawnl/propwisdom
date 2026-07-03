require('dotenv').config();
const postgres = require('postgres');

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing!");
    return;
  }
  const client = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    const totalResult = await client`SELECT COUNT(*) FROM properties`;
    console.log("Total properties in database:", totalResult[0].count);

    const activeListings = await client`SELECT id, title, listing_type, property_segment, project_status, type FROM properties`;
    console.log("List of all properties in DB (count = " + activeListings.length + "):");
    activeListings.forEach(p => {
      console.log(`- ID: ${p.id}, Title: "${p.title}", listing_type: ${p.listing_type}, segment: ${p.property_segment}, status: ${p.project_status}, type: ${p.type}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
