import { NextResponse } from 'next/server';
import { initialProducts } from '@/data/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase() || '';
    const sort = searchParams.get('sort') || 'recommended';
    const inStockOnly = searchParams.get('inStock') === 'true';
    const maxPrice = Number(searchParams.get('maxPrice')) || 1000;

    let filtered = [...initialProducts];

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.origin.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    filtered = filtered.filter(p => p.price <= maxPrice);

    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        // recommended: Keep default or prioritize bestsellers
        filtered.sort((a, b) => (b.badge === 'Bestseller' ? 1 : 0) - (a.badge === 'Bestseller' ? 1 : 0));
        break;
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      products: filtered
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
