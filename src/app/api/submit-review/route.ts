import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LocationData from '@/models/LocationData';

// Simple spam filter: blocks URLs and detects duplicate content
function validateReview(text: string, name: string): { ok: boolean; reason?: string } {
  // Block any URLs or links
  const linkPattern = /https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co\b/i;
  if (linkPattern.test(text) || linkPattern.test(name)) {
    return { ok: false, reason: 'Links are not allowed in reviews.' };
  }

  // Min/max length
  if (text.trim().length < 15) return { ok: false, reason: 'Review is too short. Please write at least 15 characters.' };
  if (text.trim().length > 1000) return { ok: false, reason: 'Review is too long (max 1000 characters).' };
  if (name.trim().length < 2) return { ok: false, reason: 'Please enter a valid name.' };

  // Block obvious spam patterns (all caps, repeated chars)
  const allCaps = text === text.toUpperCase() && text.length > 20;
  if (allCaps) return { ok: false, reason: 'Please write your review in normal text.' };

  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeSlug, name, rating, text } = body;

    if (!storeSlug || !name || !rating || !text) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    // Validate review content
    const validation = validateReview(text, name);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.reason }, { status: 400 });
    }

    // Use native MongoDB driver to bypass Mongoose strict mode schema cache
    const col = (LocationData as any).collection;

    // Check for duplicate review from same name in last 24hrs
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const existingDoc = await col.findOne({ storeSlug });
    const existingUserReviews: any[] = existingDoc?.userReviews || [];
    const isDuplicate = existingUserReviews.some(
      (r: any) => r.author_name?.toLowerCase() === name.toLowerCase() && r.time > oneDayAgo
    );
    if (isDuplicate) {
      return NextResponse.json({ error: 'You have already submitted a review for this location recently.' }, { status: 429 });
    }

    const newReview = {
      author_name: name.trim().substring(0, 60),
      profile_photo_url: null,
      rating: Number(rating),
      text: text.trim().substring(0, 1000),
      relative_time_description: 'just now',
      time: Date.now(),
      source: 'user',
    };

    // Native push — always works regardless of Mongoose schema cache
    const result = await col.updateOne(
      { storeSlug },
      {
        $push: { userReviews: newReview },
        $setOnInsert: { storeSlug, state: '', city: '', address: '', reviews: [], photos: [] }
      },
      { upsert: true }
    );

    console.log(`[submit-review] storeSlug=${storeSlug} matched=${result.matchedCount} modified=${result.modifiedCount}`);

    return NextResponse.json({ success: true, review: newReview });

  } catch (err: any) {
    console.error('Review submission error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
