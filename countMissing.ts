import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const LocationData = mongoose.model('LocationData', new mongoose.Schema({}, { strict: false }));
    
    const count = await LocationData.countDocuments({
      $or: [
        { photos: { $size: 0 } },
        { photos: { $exists: false } },
        { reviews: { $size: 0 } },
        { reviews: { $exists: false } }
      ]
    });
    
    console.log(`TOTAL_MISSING: ${count}`);
    await mongoose.disconnect();
}

run();
