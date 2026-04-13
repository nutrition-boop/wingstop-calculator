import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const SLUG = 'wingstop-1650-phoenix-az-85023';

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const col = mongoose.connection.db.collection('locationdatas');
  const doc = await col.findOne({ storeSlug: SLUG }) as any;
  console.log('DB userReviews count:', doc?.userReviews?.length ?? 0);
  await mongoose.disconnect();
}

async function testAPI() {
  console.log('\n--- Testing API POST ---');
  try {
    const res = await fetch('http://localhost:3000/api/submit-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeSlug: SLUG,
        name: 'API Test User',
        rating: 4,
        text: 'Great wings and excellent service at this Wingstop location!'
      })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (e: any) {
    console.error('Fetch failed:', e.message);
  }
}

async function main() {
  console.log('=== Before Submit ===');
  await checkDB();
  
  await testAPI();
  
  console.log('\n=== After Submit ===');
  await checkDB();
  process.exit(0);
}

main();
