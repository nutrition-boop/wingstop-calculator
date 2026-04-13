import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { resolve, join } from 'path';
import * as fs from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const BATCH_LIMIT_PHOTOS = 2;

if (!process.env.MONGODB_URI || !process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) {
  console.error("Missing critical environment variables.");
  process.exit(1);
}

// SAFETY CHECK: Prevent accidental mass billing
if (!process.argv.includes('--force')) {
  console.error("\n====================================================");
  console.error("⚠️  BILLING WARNING: This script calls Google Places API.");
  console.error("Each location costs ~$0.04 - $0.06.");
  console.error("To proceed, run with the --force flag:");
  console.error("npm run cache:batch1 -- --force");
  console.error("====================================================\n");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LocationDataSchema = new mongoose.Schema({
  storeSlug: { type: String },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  place_id: { type: String },
  reviews: { type: Array, default: [] },
  photos: { type: Array, default: [] },
}, { strict: false });

const LocationData = mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function run() {
  const batchNumArg = process.argv[2];
  if (!batchNumArg || !['1', '2', '3', '4'].includes(batchNumArg)) {
      console.error("Please provide a batch number (1, 2, 3, or 4). Example: npx tsx src/scripts/cacheAllPlaces.ts 1");
      process.exit(1);
  }
  
  const batchNumber = parseInt(batchNumArg, 10);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    // Load JSON locations
    const FILE = join(process.cwd(), 'locations.json');
    if (!fs.existsSync(FILE)) throw new Error("locations.json missing");
    const allLocations = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    
    // Chunk into 4 batches
    const chunkSize = Math.ceil(allLocations.length / 4);
    const startIndex = (batchNumber - 1) * chunkSize;
    const endIndex = Math.min(startIndex + chunkSize, allLocations.length);
    const targetLocations = allLocations.slice(startIndex, endIndex);
    
    console.log(`Starting Batch ${batchNumber}: Processing locations from index ${startIndex} to ${endIndex - 1} (Total: ${targetLocations.length})`);

    const key = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    for (let i = 0; i < targetLocations.length; i++) {
      const loc = targetLocations[i];
      console.log(`\n[${i + 1}/${targetLocations.length}] Processing: ${loc.slug}`);
      
      // Check MongoDB if we already have fully populated data
      const existing = await LocationData.findOne({ storeSlug: loc.slug });
      if (existing && existing.place_id && existing.place_id !== 'ChIJxZtpkvn6SVERU8vUpAgByOY' && existing.photos && existing.photos.length > 0) {
          // Verify it's a cloudinary URL
          if (existing.photos[0].includes('cloudinary.com')) {
              console.log(`  -> Already fully cached in DB with Cloudinary photos. Skipping.`);
              continue;
          }
      }

      let placeId = existing?.place_id;
      
      // 1. Fetch Place ID if missing or dummy
      if (!placeId || placeId === 'ChIJxZtpkvn6SVERU8vUpAgByOY') {
          const query = `Wingstop ${loc.address} ${loc.city} ${loc.state}`;
          const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${key}`;
          
          try {
             const findRes = await fetch(findPlaceUrl);
             const findData = await findRes.json();
             if (findData.candidates && findData.candidates.length > 0) {
                 placeId = findData.candidates[0].place_id;
                 console.log(`  -> Found new Place ID: ${placeId}`);
             } else {
                 console.log(`  -> No Place ID found on Google Maps.`);
             }
          } catch(e: any) {
              console.error(`  -> Error finding Place ID:`, e.message);
          }
          await delay(50); // Speed increased
      } else {
          console.log(`  -> Using existing DB Place ID: ${placeId}`);
      }

      let reviews = existing?.reviews || [];
      let cloudinaryUrls = existing?.photos || [];

      // 2. Fetch Details & Photos using Place ID
      if (placeId && placeId !== 'ChIJxZtpkvn6SVERU8vUpAgByOY') {
          // Check if we need to fetch reviews OR we don't have cloudinary photos yet
          const needsPhotos = !cloudinaryUrls.some((u: string) => u.includes('cloudinary.com'));
          const needsReviews = reviews.length === 0;

          if (needsReviews || needsPhotos) {
             const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,photos&key=${key}`;
             try {
                 const detailRes = await fetch(detailsUrl);
                 const detailData = await detailRes.json();
                 
                 if (detailData.result) {
                     if (needsReviews && detailData.result.reviews) {
                         reviews = detailData.result.reviews;
                         console.log(`  -> Fetched ${reviews.length} reviews.`);
                     }
                     
                     if (needsPhotos && detailData.result.photos) {
                         const photoRefs = detailData.result.photos.slice(0, BATCH_LIMIT_PHOTOS).map((p: any) => p.photo_reference);
                         console.log(`  -> Uploading ${photoRefs.length} photos to Cloudinary...`);
                         cloudinaryUrls = [];
                         
                         for (const ref of photoRefs) {
                             const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${ref}&key=${key}`;
                             try {
                                const result = await cloudinary.uploader.upload(googlePhotoUrl, {
                                   folder: "wingstop_locations",
                                   format: "webp",
                                   quality: "auto:good",
                                });
                                cloudinaryUrls.push(result.secure_url);
                             } catch (upErr: any) {
                                console.error(`  -> Cloudinary upload failed:`, upErr.message);
                             }
                         }
                     }
                 }
             } catch (e: any) {
                 console.error(`  -> Error fetching Google details:`, e.message);
             }
             await delay(50); // Speed increased
          }
      }

      // 3. Save everything to MongoDB
      await LocationData.findOneAndUpdate(
          { storeSlug: loc.slug },
          {
             storeSlug: loc.slug,
             state: loc.state,
             city: loc.city,
             address: loc.address,
             place_id: placeId,
             reviews: reviews,
             photos: cloudinaryUrls,
          },
          { upsert: true, new: true }
      );
      
      console.log(`  -> DB Updated successfully.`);
    }
    
    console.log(`\nBatch ${batchNumber} Completed!`);

  } catch (err: any) {
    console.error("Fatal Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

run();
