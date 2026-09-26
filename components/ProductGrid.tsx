'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { FilterIcon, RefreshCwIcon, SearchIcon, SparklesIcon } from './Icons';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  organicOnly: boolean;
  onToggleOrganic: () => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onOpenQuickView: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  organicOnly,
  onToggleOrganic,
  maxPrice,
  onMaxPriceChange,
  getCartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onOpenQuickView,
  onResetFilters
}) => {
  const categories = [
    'All',
    'Fresh Produce',
    'Dairy & Bakery',
    'Pantry & Spices',
    'Beverages',
    'Artisanal Snacks'
  ];

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    organicOnly ||
    maxPrice < 1000 ||
    sortBy !== 'recommended';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="products-section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Farm-To-Table Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            {selectedCategory === 'All' ? 'Our Local Artisan Catalog' : selectedCategory}
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'} available for 45-min local delivery
          </p>
        </div>

        {/* Filter / Sort Control Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs shadow-2xs">
            <span className="text-stone-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent font-bold text-stone-800 outline-hidden cursor-pointer"
            >
              <option value="recommended">Featured &amp; Bestselling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          {/* Quick toggle chips */}
          <button
            onClick={onToggleInStock}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              inStockOnly
                ? 'bg-brand-50 border-brand-500 text-brand-800'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            In-Stock Only
          </button>

          <button
            onClick={onToggleOrganic}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              organicOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            Organic Certified
          </button>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
            >
              <RefreshCwIcon className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category selector row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-stone-100 scrollbar-none">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Max Price Range Slider */}
      <div className="bg-stone-50 rounded-2xl p-3.5 mb-6 border border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 font-medium text-stone-700">
          <FilterIcon className="w-4 h-4 text-brand-700" />
          <span>Max Price Filter: <strong>Up to ₹{maxPrice}</strong></span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="text-stone-400 text-[11px]">₹40</span>
          <input
            type="range"
            min="40"
            max="1000"
            step="20"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-brand-700 cursor-pointer"
          />
          <span className="text-stone-400 text-[11px]">₹1000</span>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={getCartQuantity(product.id)}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty Search/Filter State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200/80 my-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4 text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-stone-800">No local products found</h3>
          <p className="text-stone-500 text-sm max-w-sm mx-auto mt-1">
            We couldn't find any products matching your current filters or search query &quot;{searchQuery}&quot;.
          </p>
          <div className="mt-5">
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
