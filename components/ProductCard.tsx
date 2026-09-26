'use client';

import React from 'react';
import { Product } from '@/types';
import { StarIcon, PlusIcon, MinusIcon, EyeIcon, MapPinIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onOpenQuickView
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const badgeColorClass = {
    Organic: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Bestseller: 'bg-amber-100 text-amber-900 border-amber-200',
    'Farm Fresh': 'bg-teal-100 text-teal-800 border-teal-200',
    Handcrafted: 'bg-purple-100 text-purple-800 border-purple-200',
    Sale: 'bg-rose-100 text-rose-800 border-rose-200'
  }[product.badge || 'Farm Fresh'];

  return (
    <div className="group relative bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image area */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onOpenQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColorClass}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount tag */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick view button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="absolute inset-x-3 bottom-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-stone-50 cursor-pointer"
        >
          <EyeIcon className="w-3.5 h-3.5 text-stone-600" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Unit */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="flex items-center gap-1 truncate max-w-[140px]" title={product.origin}>
              <MapPinIcon className="w-3 h-3 text-brand-600 shrink-0" />
              <span className="truncate">{product.origin}</span>
            </span>
            <span className="font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
              {product.unit}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-brand-800 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-stone-100">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-amber-500">
              <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold ml-1 text-stone-800">{product.rating}</span>
            </div>
            <span className="text-[11px] text-stone-400">({product.reviewsCount} reviews)</span>
          </div>

          {/* Price & Add to Cart button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-stone-900">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 block -mt-0.5">inclusive of all taxes</span>
            </div>

            {/* Cart Controller */}
            {quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                  product.inStock
                    ? 'bg-brand-50 text-brand-800 hover:bg-brand-700 hover:text-white border border-brand-200 hover:border-brand-700 shadow-2xs active:scale-95'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                }`}
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>{product.inStock ? 'Add' : 'Sold Out'}</span>
              </button>
            ) : (
              <div className="flex items-center bg-brand-700 text-white rounded-xl px-1.5 py-1 shadow-xs">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-brand-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-extrabold">{quantityInCart}</span>
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-brand-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
