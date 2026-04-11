import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LocationData from '@/models/LocationData';
import { loadLocations } from '@/lib/locations';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

// Delay function to avoid hitting Rate Limits
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET(request: Request) {
  try {
    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'dummy_key_12345') {
       return NextResponse.json({ error: 'Please set a valid Google Maps API Key in your .env file' }, { status: 400 });
    }

    await dbConnect();

    // 1. Load all locations
    const allLocations = loadLocations();

    // 2. Filter states for testing
    const testStates = ['IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'WA', 'DC', 'WV', 'WI', 'WY'];
    const targetLocations = allLocations.filter(loc => {
      const st = loc.stateCode || loc.state;
      return testStates.includes(st.toUpperCase());
    });
    
    if (targetLocations.length === 0) {
        return NextResponse.json({ message: 'No target locations found in locations.json for AL, AK, AZ, AR' });
    }

    let processed = 0;
    let errors = 0;
    const results = [];

    // 3. Process each location slowly
    for (const loc of targetLocations) {
      try {
        // Check if we ALREADY fetched this store to save Google API Quota
        const existingStore = await LocationData.findOne({ storeSlug: loc.slug });
        if (existingStore && existingStore.reviews && existingStore.reviews.length > 0) {
           results.push({ slug: loc.slug, status: 'Already in DB (Skipped API call)' });
           processed++;
           continue; // Skip the Google API hit
        }

        const query = `Wingstop ${loc.address} ${loc.city} ${loc.state}`;
        let placeId = null;
        
        // Find Place ID (Old API)
        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`;
        const findRes = await fetch(findPlaceUrl);
        const findData = await findRes.json();
        
        if (findData.candidates && findData.candidates.length > 0) {
           placeId = findData.candidates[0].place_id;
        }

        let reviews = [];
        let photos = [];

        // If Place ID found, fetch Details
        if (placeId) {
           const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,photos&key=${GOOGLE_API_KEY}`;
           const detailRes = await fetch(detailsUrl);
           const detailData = await detailRes.json();

           if (detailData.result) {
             if (detailData.result.reviews) reviews = detailData.result.reviews;
             // Store the first 5 photos (URLs need to be generated using place photo id)
             if (detailData.result.photos) {
               photos = detailData.result.photos.slice(0, 5).map((photo: any) => {
                 return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`;
               });
             }
           }
        }

        // 4. Save to MongoDB via Upsert (so running it again safely overwrites without duplication)
        const updatedRecord = await LocationData.findOneAndUpdate(
          { storeSlug: loc.slug },
          {
             storeSlug: loc.slug,
             state: loc.state,
             city: loc.city,
             address: loc.address,
             place_id: placeId,
             reviews: reviews,
             photos: photos,
          },
          { upsert: true, new: true }
        );

        results.push({ slug: loc.slug, status: placeId ? 'Success' : 'No Place Match' });
        processed++;

      } catch (e: any) {
         console.log(`Failed for ${loc.slug}:`, e.message);
         errors++;
      }

      // Add 250ms delay between requests to prevent Rate Limiting
      await delay(250);
    }

    return NextResponse.json({
       message: `Setup completed for ${processed} locations. Errors: ${errors}.`,
       details: results
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
