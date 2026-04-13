import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';

// Load Env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const BATCH_LIMIT = 50; // Run in small batches so we don't crash
const MAX_PHOTOS_PER_LOCATION = 2; // We only want 2 photos
const DUMMY_PLACE_ID = "ChIJxZtpkvn6SVERU8vUpAgByOY";

// Validate Env
if (!process.env.MONGODB_URI || !process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) {
  console.error("Missing critical environment variables.");
  process.exit(1);
}

// SAFETY CHECK: Prevent accidental mass billing
if (process.argv[2] !== '--force') {
  console.error("\n====================================================");
  console.error("⚠️  BILLING WARNING: This script calls Google Places API.");
  console.error("Each location costs ~$0.04 - $0.06.");
  console.error("To proceed, run with the --force flag:");
  console.error("npm run migrate:photos -- --force");
  console.error("====================================================\n");
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define simplified LocationSchema for this script
const LocationDataSchema = new mongoose.Schema({
  storeSlug: { type: String },
  place_id: { type: String },
  photos: { type: Array, default: [] },
}, { strict: false });

const LocationData = mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);

async function getGooglePlacePhotos(placeId: string): Promise<string[]> {
  try {
    const key = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${key}`;
    
    const res = await fetch(detailsUrl);
    const data = await res.json();
    
    if (data.status === 'OK' && data.result.photos) {
      // Get photo references for the first 2 photos
      const photoRefs = data.result.photos.slice(0, MAX_PHOTOS_PER_LOCATION).map((p: any) => p.photo_reference);
      
      // Convert references to actual image URLs
      return photoRefs.map((ref: string) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${key}`);
    }
  } catch (err) {
    console.error(`Error fetching Google details for ${placeId}:`, err);
  }
  return [];
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    // Find locations that DO NOT have cloudinary images yet
    // We check if photos array is completely empty
    const targets = await LocationData.find({
      place_id: { $exists: true, $nin: ["", null, "null", DUMMY_PLACE_ID] },
      $or: [
        { photos: { $size: 0 } },
        { photos: { $exists: false } }
      ]
    }).limit(BATCH_LIMIT);

    console.log(`Found ${targets.length} locations to process in this batch (Limit: ${BATCH_LIMIT}).`);

    for (const loc of targets) {
      console.log(`\nProcessing Location: ${loc.storeSlug} (PlaceID: ${loc.place_id})`);
      
      const googlePhotoUrls = await getGooglePlacePhotos(loc.place_id);
      
      if (googlePhotoUrls.length === 0) {
        console.log(`No photos found on Google Maps for ${loc.storeSlug}. Skipping.`);
        continue;
      }
      
      console.log(`Found ${googlePhotoUrls.length} photos on Google Maps. Uploading to Cloudinary...`);
      
      const uploadedCloudinaryUrls: string[] = [];
      
      for (let i = 0; i < googlePhotoUrls.length; i++) {
        const fileUrl = googlePhotoUrls[i];
        try {
            // Upload directly from the Google Maps URL to Cloudinary
            const result = await cloudinary.uploader.upload(fileUrl, {
               folder: "wingstop_locations", // Organizes them inside Cloudinary
               format: "webp", // Automatically converts to fast WebP format
               quality: "auto:good", // Optimal compression
            });
            uploadedCloudinaryUrls.push(result.secure_url);
            console.log(`  Uploaded ${i+1}/${googlePhotoUrls.length} -> ${result.secure_url}`);
        } catch (uploadErr) {
            console.error(`  Upload failed for URL: ${fileUrl}`, uploadErr);
        }
      }
      
      if (uploadedCloudinaryUrls.length > 0) {
        // Update database with the new secure Cloudinary URLs
        loc.photos = uploadedCloudinaryUrls;
        await loc.save();
        console.log(`Database updated for ${loc.storeSlug} with ${uploadedCloudinaryUrls.length} photos.`);
      }
      
      // Sleep a tiny bit to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log("\nBatch Processing Complete.");
    
  } catch (e) {
    console.error("Fatal Error:", e);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

run();
