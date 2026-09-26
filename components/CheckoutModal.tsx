'use client';

import React, { useState } from 'react';
import { CartItem, OrderCustomer, Order } from '@/types';
import {
  XIcon,
  CheckCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon
} from './Icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  pricing: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tip: number;
    total: number;
    couponCode?: string;
  };
  orderNotes: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  pricing,
  orderNotes,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<OrderCustomer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    pincode: '226010',
    deliverySlot: 'Express (Within 45 mins)',
    notes: orderNotes
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  const [upiVerified, setUpiVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            ...formData,
            notes: formData.notes || orderNotes
          },
          payment: {
            method: paymentMethod,
            status: paymentMethod === 'cod' ? 'pending' : 'completed'
          },
          pricing
        })
      });

      const data = await response.json();
      if (data.success && data.order) {
        onOrderSuccess(data.order);
      } else {
        setErrorMessage(data.error || 'Unable to place order. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-700 text-white flex items-center justify-center font-bold text-sm">
              🛍️
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">Quick Express Checkout</h2>
              <p className="text-xs text-stone-500">Local delivery within our Lucknow service areas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Piyush Sharma"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address (For receipt &amp; tracking)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. piyush@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address & Slot */}
          <div className="border-t border-stone-100 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Delivery Address &amp; Time Slot</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Street Address, Flat / House No *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Flat 304, Green Heights, Vibhuti Khand"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Area Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="e.g. Near Wave Mall"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Select Delivery Slot
                </label>
                <select
                  name="deliverySlot"
                  value={formData.deliverySlot}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden bg-white"
                >
                  <option value="Express (Within 45 mins)">🚀 Express (Within 45 mins) - Fastest</option>
                  <option value="Today Evening (5:00 PM - 8:00 PM)">🌆 Today Evening (5:00 PM - 8:00 PM)</option>
                  <option value="Tomorrow Morning (7:00 AM - 10:00 AM)">🌅 Tomorrow Fresh Dawn (7:00 AM - 10:00 AM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="border-t border-stone-100 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-[11px] font-bold">3</span>
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-brand-600 bg-brand-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900">UPI / QR Code</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Fast</span>
                </div>
                <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm</p>
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-brand-600 bg-brand-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900">Cash on Delivery</span>
                  <span className="text-base">💵</span>
                </div>
                <p className="text-[11px] text-stone-500">Pay cash or UPI to rider</p>
              </div>

              {/* Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-600 bg-brand-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900">Cards / Banking</span>
                  <span className="text-base">💳</span>
                </div>
                <p className="text-[11px] text-stone-500">Visa, MasterCard, Rupay</p>
              </div>
            </div>

            {/* Simulated UPI Scan */}
            {paymentMethod === 'upi' && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-24 h-24 bg-white p-2 rounded-xl border border-stone-200 shadow-xs flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=awadhgreens@upi&pn=AwadhGreensMart&am=${pricing.total}`}
                    alt="Scan UPI QR"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-stone-800">
                    Scan with any UPI App (GPay / PhonePe / Paytm)
                  </div>
                  <div className="text-[11px] text-stone-500">
                    VPA: <strong className="font-mono text-stone-700">awadhgreens@upi</strong> • Amount: <strong>₹{pricing.total}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUpiVerified(true)}
                    className={`mt-2 px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      upiVerified
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                    }`}
                  >
                    {upiVerified ? '✓ Payment Simulated & Verified' : 'Simulate Instant App Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Order Summary Recap */}
          <div className="border-t border-stone-100 pt-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="flex justify-between items-center text-xs text-stone-600 mb-1">
              <span>Items Total ({items.length} items)</span>
              <span className="font-semibold text-stone-800">₹{pricing.subtotal}</span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-700 mb-1">
                <span>Discount Promo</span>
                <span className="font-bold">-₹{pricing.discount}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-stone-600 mb-1">
              <span>Delivery Fee</span>
              <span className="font-semibold">
                {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
              </span>
            </div>
            {pricing.tip > 0 && (
              <div className="flex justify-between items-center text-xs text-stone-600 mb-1">
                <span>Rider Tip</span>
                <span className="font-semibold text-stone-800">₹{pricing.tip}</span>
              </div>
            )}
            <div className="border-t border-stone-200 mt-2 pt-2 flex justify-between items-center text-sm font-extrabold text-stone-900">
              <span>Payable Amount</span>
              <span className="text-base text-brand-800">₹{pricing.total}</span>
            </div>
          </div>

          {/* Final Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Confirm &amp; Place Order (₹{pricing.total})</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-stone-400 mt-2">
              🔒 Safe &amp; Encrypted • Guaranteed 45-min Fresh Delivery
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
