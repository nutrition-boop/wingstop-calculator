import mongoose from 'mongoose';

const LocationDataSchema = new mongoose.Schema(
  {
    storeSlug: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    place_id: { type: String },
    reviews: { type: Array, default: [] },
    photos: { type: Array, default: [] },
    userReviews: { type: Array, default: [] },
  },
  { timestamps: true }
);

// To avoid mongoose 'OverwriteModelError' in Next.js development environment
export default mongoose.models.LocationData || mongoose.model('LocationData', LocationDataSchema);
