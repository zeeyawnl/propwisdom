require('dotenv').config();
const postgres = require('postgres');

async function run() {
  const client = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    const countRes = await client`SELECT COUNT(*) FROM properties`;
    console.log("RAW_COUNT:", countRes[0].count);

    const allRes = await client`SELECT id, title FROM properties`;
    console.log("RAW_SELECT_ALL_COUNT:", allRes.length);

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
