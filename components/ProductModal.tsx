'use client';

import React, { useState, useEffect } from 'react';
import { Product, Review } from '@/types';
import {
  XIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
  ShieldCheckIcon,
  MapPinIcon,
  TruckIcon,
  CheckIcon,
  MessageCircleIcon
} from './Icons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  quantityInCart: number;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  quantityInCart
}) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // New review form state
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  useEffect(() => {
    if (!product) return;
    setSelectedQty(quantityInCart > 0 ? quantityInCart : 1);
    setActiveTab('details');
    setReviewSuccessMessage('');

    // Fetch reviews from API
    setIsLoadingReviews(true);
    fetch(`/api/reviews?productId=${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err))
      .finally(() => setIsLoadingReviews(false));
  }, [product, quantityInCart]);

  if (!product) return null;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: newReviewerName,
          rating: newRating,
          comment: newComment
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setNewReviewerName('');
        setNewComment('');
        setReviewSuccessMessage('Thank you! Your verified review has been published.');
        setTimeout(() => setReviewSuccessMessage(''), 4000);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100/90 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Modal Body Container */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Product Image */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-square shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-brand-800 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Core Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-brand-700 font-bold uppercase tracking-wider">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>{product.origin}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                  {product.name}
                </h2>
                <div className="text-xs text-stone-500 font-medium mt-0.5">
                  Package Size: <span className="text-stone-800 font-semibold">{product.unit}</span>
                </div>
              </div>

              {/* Star Rating & Review count */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-sm font-bold text-stone-800 ml-1.5">{product.rating}</span>
                </div>
                <span className="text-xs text-stone-400">•</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-brand-700 hover:underline font-semibold cursor-pointer"
                >
                  {reviews.length || product.reviewsCount} verified reviews
                </button>
              </div>

              {/* Price Block */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-stone-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500">Local farm-direct price • Inclusive of GST</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckIcon className="w-3 h-3" />
                    In Stock ({product.stockCount} left)
                  </span>
                </div>
              </div>

              {/* Quantity Selector & Add CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white px-2 py-1">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                      aria-label="Decrease"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-stone-800 text-sm">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(Math.min(product.stockCount, selectedQty + 1))}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                      aria-label="Increase"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, selectedQty);
                      onClose();
                    }}
                    className="flex-1 bg-brand-700 hover:bg-brand-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Add to Basket (₹{product.price * selectedQty})</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <TruckIcon className="w-3.5 h-3.5 text-brand-600" />
                    <span>45-Min Express Delivery</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Quality Guarantee</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Details vs Reviews */}
          <div className="border-t border-stone-200 pt-4">
            <div className="flex items-center gap-4 border-b border-stone-200 pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-sm font-bold pb-2 transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-brand-800 border-b-2 border-brand-700'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Product Details &amp; Origin
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-sm font-bold pb-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'text-brand-800 border-b-2 border-brand-700'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="bg-stone-100 text-stone-700 text-xs px-2 py-0.5 rounded-full">
                  {reviews.length || product.reviewsCount}
                </span>
              </button>
            </div>

            {/* Tab 1: Details */}
            {activeTab === 'details' ? (
              <div className="pt-4 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <p>{product.description}</p>

                {/* Key features bullets */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
                  <h4 className="font-bold text-stone-900 mb-2 text-xs uppercase tracking-wider">
                    Key Quality Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <CheckIcon className="w-3.5 h-3.5 text-brand-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition & Storage Info */}
                {product.nutrition && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {product.nutrition.calories && (
                      <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Nutrition</div>
                        <div className="font-bold text-stone-800 text-xs mt-0.5">
                          {product.nutrition.calories}
                        </div>
                      </div>
                    )}
                    {product.nutrition.shelfLife && (
                      <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Shelf Life</div>
                        <div className="font-bold text-stone-800 text-xs mt-0.5">
                          {product.nutrition.shelfLife}
                        </div>
                      </div>
                    )}
                    {product.nutrition.storage && (
                      <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Storage</div>
                        <div className="font-bold text-stone-800 text-xs mt-0.5">
                          {product.nutrition.storage}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Tab 2: Reviews */
              <div className="pt-4 space-y-6">
                {/* Write a review form */}
                <div className="bg-brand-50/50 p-4 sm:p-5 rounded-2xl border border-brand-200/80">
                  <h4 className="font-bold text-stone-900 text-sm mb-3">
                    Write a Verified Customer Review
                  </h4>

                  {reviewSuccessMessage && (
                    <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs rounded-xl mb-3 font-semibold">
                      {reviewSuccessMessage}
                    </div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          placeholder="e.g. Shalini Roy"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:border-brand-600 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">
                          Rating Score
                        </label>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="cursor-pointer focus:outline-hidden"
                            >
                              <StarIcon
                                className={`w-5 h-5 ${
                                  star <= newRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-stone-700 ml-2">
                            {newRating} / 5 Stars
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Your Feedback / Taste / Freshness
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tell local neighborhood shoppers about the quality, flavor, and delivery..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:border-brand-600 outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      {isSubmittingReview ? 'Publishing...' : 'Submit Review'}
                    </button>
                  </form>
                </div>

                {/* List of Existing Reviews */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Recent Customer Ratings ({reviews.length})
                  </h4>

                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-800">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                                ✓ Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-stone-400">
                      No customer reviews yet. Be the first to review this freshly harvested item!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
