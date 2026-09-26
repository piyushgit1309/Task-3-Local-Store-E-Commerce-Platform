import { NextResponse } from 'next/server';
import { initialReviews } from '@/data/reviews';
import { Review } from '@/types';

let reviewsStore: Review[] = [...initialReviews];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (productId) {
    const filtered = reviewsStore.filter(r => r.productId === productId);
    return NextResponse.json({ success: true, reviews: filtered });
  }

  return NextResponse.json({ success: true, reviews: reviewsStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, userName, rating, comment } = body;

    if (!productId || !userName || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'All review fields are required' },
        { status: 400 }
      );
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: userName.trim(),
      rating: Number(rating),
      date: 'Just now',
      comment: comment.trim(),
      verified: true
    };

    reviewsStore.unshift(newReview);

    return NextResponse.json({
      success: true,
      message: 'Review posted successfully',
      review: newReview
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
