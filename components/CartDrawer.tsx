'use client';

import React, { useState } from 'react';
import { CartItem } from '@/types';
import {
  XIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  TagIcon,
  TruckIcon,
  ArrowRightIcon,
  SparklesIcon
} from './Icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  deliveryTip: number;
  onSelectTip: (tip: number) => void;
  orderNotes: string;
  onOrderNotesChange: (notes: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  deliveryTip,
  onSelectTip,
  orderNotes,
  onOrderNotesChange
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 499;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon === 'FRESH10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'LOCAL50' && subtotal >= 599) {
    discount = 50;
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 40;
  const total = Math.max(0, subtotal - discount + deliveryFee + deliveryTip);
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (code === 'LOCAL50' && subtotal < 599) {
      setCouponError('LOCAL50 is valid only on orders of ₹599 or more.');
      return;
    }

    const success = onApplyCoupon(code);
    if (success) {
      setCouponSuccess(`Coupon ${code} applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try FRESH10 or LOCAL50');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-100 text-brand-800">
              <ShoppingBagIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">Your Fresh Basket</h2>
              <p className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} ready for express dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        {items.length > 0 && (
          <div className="bg-emerald-50/90 px-5 py-2.5 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1">
              <span className="flex items-center gap-1.5">
                <TruckIcon className="w-3.5 h-3.5 text-emerald-700" />
                {amountNeededForFreeDelivery > 0
                  ? `Add ₹${amountNeededForFreeDelivery} more for FREE local delivery`
                  : '🎉 Free Express Doorstep Delivery Unlocked!'}
              </span>
              <span className="text-[11px] font-bold text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-stone-100 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-300 flex items-center justify-center mx-auto mb-4 text-3xl">
                🛒
              </div>
              <h3 className="font-bold text-stone-800 text-base">Your basket is empty</h3>
              <p className="text-stone-500 text-xs max-w-xs mx-auto mt-1 mb-6">
                Explore our farm-fresh vegetables, cold-pressed oils, and Lucknow artisan pantry items.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Browse Fresh Products
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3 pt-1">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-stone-50/70 hover:bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-200"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <div className="text-[11px] text-stone-500">{product.unit}</div>
                      <div className="font-extrabold text-xs text-stone-900 mt-1">
                        ₹{product.price * quantity}
                        {quantity > 1 && (
                          <span className="text-[10px] text-stone-400 font-normal ml-1">
                            (₹{product.price} each)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center bg-white border border-stone-200 rounded-xl px-1 py-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                        aria-label="Decrease"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                        aria-label="Increase"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Module */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <TagIcon className="w-3.5 h-3.5 text-brand-700" />
                  <span>Promo / Discount Voucher</span>
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="font-bold text-amber-900 font-mono">{appliedCoupon}</span>
                        <span className="text-stone-600 text-[11px] ml-1.5">
                          (-₹{discount} applied)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-stone-400 hover:text-rose-600 font-bold text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code (FRESH10 / LOCAL50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-700">{couponSuccess}</p>}
              </div>

              {/* Delivery Partner Tip */}
              <div className="pt-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
                  <span>Say thanks with a rider tip</span>
                  <span className="text-[11px] font-normal text-stone-400">100% goes to rider</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => onSelectTip(amount)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        deliveryTip === amount
                          ? 'bg-brand-50 border-brand-600 text-brand-800'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {amount === 0 ? 'None' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Notes */}
              <div className="pt-3">
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Delivery instructions / notes
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => onOrderNotesChange(e.target.value)}
                  placeholder="e.g. Leave with gate guard or ring bell twice"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-600 outline-hidden"
                />
              </div>

              {/* Bill Details */}
              <div className="pt-3 space-y-2 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Coupon ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {deliveryTip > 0 && (
                  <div className="flex justify-between">
                    <span>Rider Tip</span>
                    <span className="font-semibold text-stone-800">₹{deliveryTip}</span>
                  </div>
                )}

                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-extrabold text-stone-900">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white space-y-2">
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-900/10 flex items-center justify-between transition-all transform active:scale-98 cursor-pointer"
            >
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-emerald-200 font-medium">{items.length} items</span>
                <span>₹{total} To Pay</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
