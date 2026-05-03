import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

const LocationDataSchema = new mongoose.Schema({
  storeSlug: String,
  photos: Array,
  reviews: Array,
}, { timestamps: true });

const LocationData = mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);

async function check() {
  await mongoose.connect(MONGODB_URI);
  
  const total = await LocationData.countDocuments();
  const withPhotos = await LocationData.countDocuments({ photos: { $exists: true, $not: { $size: 0 } } });
  const withReviews = await LocationData.countDocuments({ reviews: { $exists: true, $not: { $size: 0 } } });
  const noPhotos = await LocationData.countDocuments({ $or: [{ photos: { $size: 0 } }, { photos: { $exists: false } }] });
  
  console.log(`\n=== MongoDB Location Data Report ===`);
  console.log(`Total records: ${total}`);
  console.log(`With photos: ${withPhotos}`);
  console.log(`With reviews: ${withReviews}`);
  console.log(`Missing photos: ${noPhotos}`);
  
  // Show sample with photos
  const sample = await LocationData.findOne({ photos: { $exists: true, $not: { $size: 0 } } }).lean() as any;
  if (sample) {
    console.log(`\n=== Sample Record (${sample.storeSlug}) ===`);
    console.log(`Photos (${sample.photos?.length}):`, sample.photos?.slice(0, 2));
    console.log(`Reviews (${sample.reviews?.length}):`, sample.reviews?.slice(0, 1).map((r: any) => ({ name: r.author_name, rating: r.rating })));
  } else {
    console.log('\n⚠️  NO records found with photos!');
  }
  
  await mongoose.disconnect();
}

check();
