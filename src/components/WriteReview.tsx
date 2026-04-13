'use client';

import { useState } from 'react';
import { Star, Send, User, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: null;
  source: 'user';
}

interface WriteReviewProps {
  storeName: string;
  storeSlug: string;
  onReviewSubmitted?: (review: NewReview) => void;
}

export default function WriteReview({ storeName, storeSlug, onReviewSubmitted }: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Client-side link detection to give instant feedback
  const hasLink = /https?:\/\/|www\.|\.com|\.net|\.org|\.io/i.test(text) || /https?:\/\/|www\./i.test(name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || hasLink) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeSlug, name, rating, text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setIsSubmitting(false);
        return;
      }

      // Immediately add the review to the page (no reload needed)
      if (onReviewSubmitted && data.review) {
        onReviewSubmitted(data.review);
      }
      setSubmitted(true);

    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#003D20] to-[#002b16] rounded-[2rem] p-8 sm:p-12 relative overflow-hidden mt-10 shadow-xl border border-green-900/50">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FDB913]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#006938]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="text-center sm:text-left border-b border-white/10 pb-6">
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                  Leave a Review
                </h3>
                <p className="text-green-50/70 text-sm font-medium">
                  Share your experience at {storeName} with the community.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating System */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FDB913]">Your Rating</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={`transition-colors duration-200 ${
                            (hoveredRating || rating) >= star
                              ? 'fill-[#FDB913] text-[#FDB913]'
                              : 'fill-white/10 text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-green-50/50 flex items-center gap-2">
                    <User size={12} /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    maxLength={60}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FDB913]/50 focus:ring-1 focus:ring-[#FDB913]/50 transition-all font-medium text-sm"
                  />
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-green-50/50 flex items-center gap-2">
                    <MessageSquare size={12} /> Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="How was the food and service?"
                    maxLength={1000}
                    className={`w-full bg-black/20 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all font-medium text-sm resize-none ${
                      hasLink
                        ? 'border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
                        : 'border-white/10 focus:border-[#FDB913]/50 focus:ring-1 focus:ring-[#FDB913]/50'
                    }`}
                  />
                  {hasLink && (
                    <p className="text-red-400 text-xs font-bold flex items-center gap-1.5">
                      <AlertCircle size={12} /> Links are not allowed in reviews.
                    </p>
                  )}
                  <p className="text-white/20 text-[10px] text-right">{text.length}/1000</p>
                </div>

                {/* Error display */}
                {error && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting || hasLink}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                    rating === 0 || hasLink
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-[#FDB913] text-[#003D20] hover:bg-[#ffc633] hover:-translate-y-0.5 shadow-lg shadow-[#FDB913]/20'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-[#003D20]/30 border-t-[#003D20] rounded-full"
                    />
                  ) : (
                    <><Send size={14} /> Submit Review</>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-[#FDB913] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#FDB913]/20">
                <CheckCircle2 size={40} className="text-[#003D20]" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                Review Published!
              </h3>
              <p className="text-green-50/80 font-medium max-w-sm mx-auto">
                Your review is now live! Scroll up to see it on this page.
              </p>
              <button
                onClick={() => { setSubmitted(false); setRating(0); setName(''); setText(''); }}
                className="mt-6 inline-block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                Write another review
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
