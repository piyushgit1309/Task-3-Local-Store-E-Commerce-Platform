'use client';

import React, { useState } from 'react';
import {
  ShoppingCartIcon,
  SearchIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
  MessageCircleIcon,
  SparklesIcon,
  XIcon
} from './Icons';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenSupport: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTracking,
  onOpenSupport,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-brand-900 text-brand-50 px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-brand-800/80 px-2 py-0.5 rounded-full text-[11px] font-semibold text-emerald-300">
              <SparklesIcon className="w-3 h-3 text-emerald-300" />
              Neighbourhood Special
            </span>
            <span className="hidden sm:inline">Use code <strong className="text-amber-300 tracking-wide">FRESH10</strong> for 10% OFF | Free delivery above ₹499</span>
            <span className="sm:hidden text-[11px]">Free delivery on orders &gt; ₹499</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <button
              onClick={onOpenTracking}
              className="hover:text-white flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer"
            >
              <TruckIcon className="w-3.5 h-3.5 text-emerald-300" />
              <span>Track Order</span>
            </button>
            <span className="text-brand-700">|</span>
            <button
              onClick={onOpenSupport}
              className="hover:text-white flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer"
            >
              <PhoneIcon className="w-3 h-3 text-emerald-300" />
              <span className="hidden md:inline">Helpline: +91 94500 12890</span>
              <span className="md:hidden">Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-brand-900/10">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
                Awadh<span className="text-brand-700">Greens</span>
              </span>
              <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                Artisanal Mart
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
              <MapPinIcon className="w-3 h-3 text-brand-600 shrink-0" />
              <span className="truncate max-w-[170px] sm:max-w-xs">Hazratganj &amp; Gomti Nagar • 45m Express</span>
            </div>
          </div>
        </div>

        {/* Global search input */}
        <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search farm spinach, bilona ghee, sourdough..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-stone-100/90 hover:bg-stone-100 focus:bg-white border border-stone-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm text-stone-800 placeholder-stone-400 transition-all outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Actions (Track, Support, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenTracking}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-brand-800 hover:bg-stone-100 border border-stone-200/80 transition-all cursor-pointer"
          >
            <TruckIcon className="w-4 h-4 text-brand-700" />
            <span>Track</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-brand-800 hover:bg-stone-100 border border-stone-200/80 transition-all cursor-pointer"
          >
            <MessageCircleIcon className="w-4 h-4 text-brand-700" />
            <span>Support</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative flex items-center gap-2.5 bg-brand-700 hover:bg-brand-800 text-white px-3.5 py-2 rounded-xl font-medium text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-emerald-200 font-medium">Cart</span>
              <span className="text-xs font-bold mt-0.5">₹{cartTotal}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search farm fresh vegetables, dairy, pantry..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-stone-100 border border-stone-200 text-sm text-stone-800 placeholder-stone-400 outline-hidden focus:border-brand-600 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
