// src/lib/googlePlaces.ts

export interface GooglePlaceReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  placeId: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GooglePlaceReview[];
  photoUrls: string[];
}

/**
 * Helper to fetch the authentic Google Places API rating and reviews for a given Wingstop Location.
 */
export async function getGooglePlaceDetails(storeName: string, state: string, city: string, address: string): Promise<GooglePlaceDetails | null> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!API_KEY) {
    console.log('Google Places API key is not configured.');
    return null;
  }

  try {
    // 1. First, search for the specific place using the Find Place API to get its place_id
    const query = encodeURIComponent(`${storeName} ${address} ${city} ${state}`);
    const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
    
    const findRes = await fetch(findUrl, { next: { revalidate: 3600 } });
    const findData = await findRes.json();

    if (!findData.candidates || findData.candidates.length === 0) {
      return null; // Not found on Google
    }

    const placeId = findData.candidates[0].place_id;

    // 2. Fetch the detailed reviews, ratings, and photos using the place_id via Place Details API
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,photos&key=${API_KEY}`;
    
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } });
    const detailsData = await detailsRes.json();

    if (detailsData.status !== 'OK' || !detailsData.result) {
      return null;
    }

    const r = detailsData.result;
    
    const photoUrls: string[] = [];
    if (r.photos && Array.isArray(r.photos)) {
        for (const p of r.photos.slice(0, 5)) {
            photoUrls.push(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${p.photo_reference}&key=${API_KEY}`);
        }
    }

    return {
      placeId,
      name: r.name,
      rating: r.rating || 0,
      user_ratings_total: r.user_ratings_total || 0,
      reviews: r.reviews || [],
      photoUrls
    };
  } catch (err) {
    console.error('Error hitting Google Places API:', err);
    return null;
  }
}
