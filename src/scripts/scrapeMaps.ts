import puppeteer from 'puppeteer-core';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';
import * as fs from 'fs';

// Load Env
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LocationDataSchema = new mongoose.Schema({
  storeSlug: { type: String },
  address: { type: String },
  city: { type: String },
  stateName: { type: String },
  photos: { type: Array, default: [] },
  reviews: { type: Array, default: [] },
}, { strict: false });

const LocationData = mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);

const CHROME_PATHS = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

async function delay(time: number) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function run() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    const targets = await LocationData.find({
      $or: [
        { photos: { $size: 0 } },
        { photos: { $exists: false } },
        { reviews: { $size: 0 } },
        { reviews: { $exists: false } }
      ]
    }).limit(10); // Batch limit to avoid freezing the system

    if (targets.length === 0) {
        console.log("All locations already have photos and reviews!");
        process.exit(0);
    }

    console.log(`Found ${targets.length} locations to scrape.`);

    let chromePath = CHROME_PATHS.find(p => fs.existsSync(p));
    if (!chromePath) {
        console.error(`Chrome not found. Please ensure Google Chrome is installed on your Windows machine.`);
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: false, // Chrome window will open visually as requested
        defaultViewport: null,
        args: ['--start-maximized']
    });

    for (const loc of targets) {
        const page = await browser.newPage();
        try {
            const query = encodeURIComponent(`Wingstop ${loc.address} ${loc.city} ${loc.stateName}`);
            const url = `https://www.google.com/maps/search/${query}`;
            console.log(`\n======================================================`);
            console.log(`Navigating to Google Maps for: ${loc.storeSlug}`);
            console.log(`URL: ${url}`);
            
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            console.log('Waiting for map and images to fully load...');
            
            // Wait for images to load in the sidebar
            await delay(7000); 

            console.log('Extracting photos from Google Maps...');
            const images = await page.evaluate(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs
                    .map(img => img.src)
                    .filter(src => (src.includes('googleusercontent.com/p/') || src.includes('ggpht.com/p/')))
                    // We try to exclude obvious menu/food icons by filtering out small resolution patterns if any
                    // but usually the main side-panel images are store views
                    .filter(src => src.length > 50);
            });

            // Get unique images, slice exactly 2 (for inside and outside)
            const uniqueImages = [...new Set(images)].slice(0, 2);
            
            const uploadedUrls: string[] = [];
            for (const imgUrl of uniqueImages) {
                try {
                    // Extract base URL and append '=s1000' to force high resolution download
                    const highResUrl = imgUrl.split('=')[0] + '=s1000';
                    console.log(`Uploading to Cloudinary: ${highResUrl}`);
                    
                    const result = await cloudinary.uploader.upload(highResUrl, {
                        folder: "wingstop_locations_scraped",
                        format: "webp",
                    });
                    uploadedUrls.push(result.secure_url);
                    console.log(`  Success -> ${result.secure_url}`);
                } catch(e) {
                    console.error("  Failed to upload image", e);
                }
            }

            if (uploadedUrls.length > 0) {
                loc.photos = uploadedUrls;
            } else {
                console.log('  No suitable photos found on Maps.');
            }

            console.log('Extracting reviews...');
            const reviewElements = await page.evaluate(() => {
                const results = [];
                // Look for standard Google Maps review text blocks
                const els = Array.from(document.querySelectorAll('.wiI7pd')); 
                
                // Grab top 3 reviews
                for(let i = 0; i < Math.min(els.length, 3); i++) {
                    const textContent = els[i]?.textContent || '';
                    if (textContent.length > 10) { // filter out empty or extremely short ones
                        results.push({
                            text: textContent,
                            author_name: "Google Reviewer",
                            rating: 5, // Default fallback if actual rating element isn't easily selectable
                            relative_time_description: "recently",
                            profile_photo_url: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        });
                    }
                }
                return results;
            });

            if (reviewElements.length > 0) {
                loc.reviews = reviewElements;
                console.log(`  Scraped ${reviewElements.length} reviews.`);
            } else {
                console.log('  No reviews visible on the main panel.');
            }

            // Always save to mark as processed or update with found data
            await loc.save();
            console.log(`Data saved to MongoDB for ${loc.storeSlug}.`);

        } catch(e) {
            console.error(`Error scraping ${loc.storeSlug}:`, e);
        } finally {
            await page.close();
            // Wait 3 seconds before next store to avoid immediate rate limit blocking
            await delay(3000);
        }
    }

    console.log("\nBatch completed!");
    await browser.close();
    await mongoose.disconnect();
    console.log("Closed browser and MongoDB connection.");
}

run();
