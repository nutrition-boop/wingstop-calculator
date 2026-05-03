'use client';

import { useState } from 'react';
import { Star, User } from 'lucide-react';
import WriteReview from './WriteReview';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  author_name: string;
  profile_photo_url: string | null;
  rating: number;
  relative_time_description: string;
  text: string;
  source?: 'google' | 'user';
}

interface ReviewsSectionProps {
  googleReviews: Review[];
  userReviews: Review[];
  storeName: string;
  storeSlug: string;
}

function ReviewCard({ review, isNew = false }: { review: Review; isNew?: boolean }) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: -16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group pb-10 border-b border-gray-50 last:border-0 last:pb-0"
      itemProp="review"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="flex items-start gap-4 mb-4">
        {review.profile_photo_url ? (
          <img src={review.profile_photo_url} alt={review.author_name} className="w-12 h-12 rounded-2xl shadow-sm object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#006938]/20 to-[#006938]/5 flex items-center justify-center text-[#006938] shrink-0">
            <User size={22} />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-1 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="font-black text-sm text-gray-900 uppercase tracking-wide" itemProp="author">
                {review.author_name}
              </p>
              {review.source === 'user' && (
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#006938]/10 text-[#006938] px-2 py-0.5 rounded-full">
                  Verified Visit
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter shrink-0" itemProp="datePublished">
              {review.relative_time_description}
            </span>
          </div>
          <div className="flex items-center gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <meta itemProp="ratingValue" content={review.rating.toString()} />
            <meta itemProp="bestRating" content="5" />
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={12} className={j < review.rating ? 'fill-[#FDB913] text-[#FDB913]' : 'fill-gray-100 text-gray-100'} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed font-medium italic" itemProp="reviewBody">
        "{review.text}"
      </p>
    </motion.div>
  );
}

export default function ReviewsSection({ googleReviews, userReviews: initialUserReviews, storeName, storeSlug }: ReviewsSectionProps) {
  const [liveUserReviews, setLiveUserReviews] = useState<Review[]>(initialUserReviews);

  const handleNewReview = (newReview: Review) => {
    setLiveUserReviews(prev => [{ ...newReview, source: 'user' }, ...prev]);
  };

  const allReviews = [...liveUserReviews, ...googleReviews];
  const hasAnyReviews = allReviews.length > 0;

  return (
    <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm lg:col-span-2 order-7">
      <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-50">
        <h3
          className="text-2xl font-black uppercase tracking-tight text-gray-900"
          style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}
        >
          What People Are Saying
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-[#006938] rounded-full text-[10px] font-black uppercase tracking-widest">
          {allReviews.length} Review{allReviews.length !== 1 ? 's' : ''}
        </div>
      </div>

      {hasAnyReviews ? (
        <div className="space-y-10">
          <AnimatePresence>
            {allReviews.slice(0, 8).map((review, i) => (
              <ReviewCard
                key={`${review.author_name}-${i}`}
                review={review}
                isNew={i < liveUserReviews.length}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50/50 rounded-3xl border border-gray-100">
          <Star size={48} className="mx-auto text-gray-300 mb-4" />
          <h4 className="text-lg font-black uppercase tracking-widest text-gray-900 mb-2">No Reviews Found</h4>
          <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto mb-6">
            We currently don't have any reviews for this Wingstop location. Be the first to share your experience!
          </p>
        </div>
      )}

      {hasAnyReviews && (
          <div className="mt-8 text-right">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full inline-block">
                  Reviews sourced from Google Maps
              </span>
          </div>
      )}

      <WriteReview
        storeName={storeName}
        storeSlug={storeSlug}
        onReviewSubmitted={handleNewReview}
      />
    </div>
  );
}
