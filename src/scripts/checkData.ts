import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

const LocationDataSchema = new mongoose.Schema({
  storeSlug: String,
  city: String,
  state: String,
  photos: Array,
  reviews: Array,
}, { timestamps: true });

const LocationData = mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);

async function check() {
  await mongoose.connect(MONGODB_URI);
  
  // Check Athens Alabama location
  const athens = await LocationData.findOne({ city: 'Athens' }).lean() as any;
  if (athens) {
    console.log(`\n=== ${athens.storeSlug} ===`);
    console.log('Photos:', JSON.stringify(athens.photos, null, 2));
  }

  // Check 5 random locations with photos
  const samples = await LocationData.find({ photos: { $exists: true, $not: { $size: 0 } } }).limit(5).lean() as any[];
  for (const s of samples) {
    console.log(`\n--- ${s.storeSlug} ---`);
    console.log('Photo URLs:', s.photos);
  }
  
  await mongoose.disconnect();
}

check();
