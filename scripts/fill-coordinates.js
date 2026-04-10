const fs = require('fs');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const INPUT_FILE = path.join(__dirname, 'locations.json');
const CONCURRENCY = 15;

if (!API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY is not defined in .env.local');
  process.exit(1);
}

async function geocode(loc) {
  const query = `${loc.name} ${loc.address} ${loc.city} ${loc.state} ${loc.zip}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${API_KEY}`;
  
  try {
    const res = await axios.get(url);
    if (res.data.status === 'OK' && res.data.results.length > 0) {
      const geo = res.data.results[0].geometry.location;
      return { lat: geo.lat, lng: geo.lng };
    }
  } catch (err) {
    console.error(`Error geocoding ${loc.slug}: ${err.message}`);
  }
  return null;
}

// Custom Promise pool
async function runWithPool(tasks, limit) {
  const results = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

async function start() {
  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const missing = data.filter(l => !l.lat || !l.lng);
  
  console.log(`Found ${data.length} total stores. ${missing.length} stores still need coordinates.`);
  
  if (missing.length === 0) {
    console.log('✅ All stores already have coordinates. Success!');
    return;
  }

  let count = 0;
  const tasks = missing.map(loc => async () => {
    const coords = await geocode(loc);
    if (coords) {
      loc.lat = coords.lat;
      loc.lng = coords.lng;
    }
    count++;
    if (count % 50 === 0) {
      console.log(`  Progress: ${count}/${missing.length} geocoded.`);
      // Intermediate save to avoid ENOSPC loss
      fs.writeFileSync(INPUT_FILE, JSON.stringify(data, null, 2));
    }
  });

  await runWithPool(tasks, CONCURRENCY);

  fs.writeFileSync(INPUT_FILE, JSON.stringify(data, null, 2));
  console.log('✅ Final success! Updated locations.json with real coordinates.');
}

start().catch(console.error);
