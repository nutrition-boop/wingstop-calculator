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

    const CHUNK_SIZE = 5; // Run 5 tabs concurrently
    const limit = 50; // Process 50 per script run so it doesn't crash memory

    const targets = await LocationData.find({
      $or: [
        { photos: { $size: 0 } },
        { photos: { $exists: false } },
        { reviews: { $size: 0 } },
        { reviews: { $exists: false } }
      ]
    }).limit(limit);

    if (targets.length === 0) {
        console.log("All locations already have photos and reviews!");
        process.exit(0);
    }

    console.log(`Found ${targets.length} locations to scrape in this batch.`);

    let chromePath = CHROME_PATHS.find(p => fs.existsSync(p));
    if (!chromePath) {
        console.error(`Chrome not found. Please ensure Google Chrome is installed.`);
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: false, 
        defaultViewport: null,
        args: ['--start-maximized']
    });

    for (let i = 0; i < targets.length; i += CHUNK_SIZE) {
        const chunk = targets.slice(i, i + CHUNK_SIZE);
        console.log(`\n--- Processing chunk ${i / CHUNK_SIZE + 1} of ${Math.ceil(targets.length / CHUNK_SIZE)} ---`);
        
        await Promise.all(chunk.map(async (loc) => {
            const page = await browser.newPage();
            try {
                const queryParts = ['Wingstop', loc.address, loc.city, loc.stateName || loc.state].filter(Boolean);
                const query = encodeURIComponent(queryParts.join(' '));
                const url = `https://www.google.com/maps/search/${query}`;
                
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
                
                // Wait for the main panel to settle instead of a long hard delay
                await page.waitForSelector('img', { timeout: 10000 }).catch(() => {});
                await delay(3000); 

                const images = await page.evaluate(() => {
                    const imgs = Array.from(document.querySelectorAll('img'));
                    return imgs
                        .map(img => img.src)
                        .filter(src => (
                             src.includes('googleusercontent.com/') || 
                             src.includes('ggpht.com/') || 
                             src.includes('streetviewpixels-pa.googleapis.com/')
                        ))
                        .filter(src => src.length > 50 && !src.includes('MapsLogo'));
                });

                const uniqueImages = [...new Set(images)].slice(0, 2);
                
                const uploadedUrls: string[] = [];
                for (const imgUrl of uniqueImages) {
                    try {
                        const highResUrl = imgUrl.split('=')[0] + '=s1000';
                        const result = await cloudinary.uploader.upload(highResUrl, {
                            folder: "wingstop_locations_scraped",
                            format: "webp",
                        });
                        uploadedUrls.push(result.secure_url);
                    } catch(e) { }
                }

                if (uploadedUrls.length > 0) loc.photos = uploadedUrls;

                const reviewElements = await page.evaluate(() => {
                    const results = [];
                    const els = Array.from(document.querySelectorAll('.wiI7pd')); 
                    for(let j = 0; j < Math.min(els.length, 3); j++) {
                        const textContent = els[j]?.textContent || '';
                        if (textContent.length > 10) { 
                            results.push({
                                text: textContent,
                                author_name: "Google Reviewer",
                                rating: 5, 
                                relative_time_description: "recently",
                                profile_photo_url: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            });
                        }
                    }
                    return results;
                });

                if (reviewElements.length > 0) loc.reviews = reviewElements;

                await loc.save();
                console.log(`[Success] Scraped & saved: ${loc.storeSlug} (${uploadedUrls.length} images, ${reviewElements.length} reviews)`);

            } catch(e) {
                console.error(`[Error] ${loc.storeSlug} failed.`);
            } finally {
                await page.close();
            }
        }));
    }

    console.log("\nBatch completed!");
    await browser.close();
    await mongoose.disconnect();
}

run();
