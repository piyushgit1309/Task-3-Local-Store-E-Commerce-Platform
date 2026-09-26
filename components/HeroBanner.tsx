'use client';

import React from 'react';
import { TruckIcon, ShieldCheckIcon, SparklesIcon, ClockIcon, ArrowRightIcon, TagIcon } from './Icons';

interface HeroBannerProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  onApplyCouponPrompt: (code: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onCategorySelect,
  selectedCategory,
  onApplyCouponPrompt
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-stone-50 to-white pt-6 pb-8 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#edf7ef] via-[#f5f3ee] to-[#f9f6f0] text-stone-900 p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-200/80 overflow-hidden">
          {/* Subtle background glow & organic leaf patterns */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold backdrop-blur-xs">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Harvested at Dawn • Delivered in 45 Mins</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Fresh, Pure &amp; Artisanal <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600">
                  From Local Farms to Your Kitchen
                </span>
              </h1>

              <p className="text-stone-700 text-sm sm:text-base max-w-xl leading-relaxed">
                Hand-picked organic greens, pure Vedic A2 Bilona ghee, wood-fired country sourdough, and unrefined regional spices sourced directly from trusted cultivators across Awadh.
              </p>

              {/* Promo code badge */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-800 transition-all shadow-sm">
                  <TagIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Use coupon:</span>
                  <button
                    onClick={() => onApplyCouponPrompt('FRESH10')}
                    className="font-mono font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2 decoration-amber-400/60 cursor-pointer"
                    title="Click to copy & apply"
                  >
                    FRESH10
                  </button>
                  <span className="text-[11px] text-stone-500">(10% OFF)</span>
                </div>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-800 transition-all shadow-sm">
                  <TagIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Over ₹599:</span>
                  <button
                    onClick={() => onApplyCouponPrompt('LOCAL50')}
                    className="font-mono font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 decoration-emerald-500/50 cursor-pointer"
                    title="Click to copy & apply"
                  >
                    LOCAL50
                  </button>
                  <span className="text-[11px] text-stone-500">(₹50 flat OFF)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Local Store Guarantees */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/80 border border-stone-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:bg-white transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <TruckIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900">45-Min Express</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Quick local EV delivery across all neighborhood sectors</div>
                </div>
              </div>

              <div className="bg-white/80 border border-stone-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:bg-white transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900">100% Organic</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Lab-tested &amp; certified chemical &amp; pesticide free</div>
                </div>
              </div>

              <div className="bg-white/80 border border-stone-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:bg-white transition-colors">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900">Harvested at 5 AM</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Never stored in cold warehouses; farm fresh daily</div>
                </div>
              </div>

              <div className="bg-white/80 border border-stone-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:bg-white transition-colors">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900">Fair-Trade Local</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">85% revenue goes straight to regional UP farmers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Category Quick-Nav */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 shrink-0 mr-1">
            Browse by:
          </span>
          {[
            { id: 'All', label: 'All Items', icon: '🛒' },
            { id: 'Fresh Produce', label: 'Fresh Produce', icon: '🥬' },
            { id: 'Dairy & Bakery', label: 'Dairy & Bakery', icon: '🥖' },
            { id: 'Pantry & Spices', label: 'Pantry & Spices', icon: '🍯' },
            { id: 'Beverages', label: 'Artisanal Beverages', icon: '☕' },
            { id: 'Artisanal Snacks', label: 'Healthy Snacks', icon: '🌾' }
          ].map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
