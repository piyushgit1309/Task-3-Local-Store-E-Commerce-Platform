'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/types';
import { sampleOrder } from '@/data/initialOrders';
import {
  XIcon,
  SearchIcon,
  TruckIcon,
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon
} from './Icons';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  activeOrder
}) => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(activeOrder || sampleOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeOrder) {
      setCurrentOrder(activeOrder);
      setSearchOrderId(activeOrder.id);
    } else {
      setCurrentOrder(sampleOrder);
      setSearchOrderId(sampleOrder.id);
    }
    setError('');
  }, [activeOrder, isOpen]);

  if (!isOpen) return null;

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/${searchOrderId.trim().toUpperCase()}`);
      const data = await res.json();
      if (data.success && data.order) {
        setCurrentOrder(data.order);
      } else {
        setError(`No active order found for ${searchOrderId}. Try demo ID: ORD-78241`);
      }
    } catch (err) {
      setError('Unable to fetch order status. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-700 text-white flex items-center justify-center font-bold text-sm">
              🚚
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">Live Order Tracking</h2>
              <p className="text-xs text-stone-500">Real-time local dispatch &amp; delivery timeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar for Order ID */}
        <div className="p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleTrackSubmit} className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              Track by Order ID
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <SearchIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g. ORD-78241)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span>Quick demo:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchOrderId('ORD-78241');
                  setCurrentOrder(sampleOrder);
                  setError('');
                }}
                className="font-mono font-bold text-brand-700 hover:underline cursor-pointer"
              >
                ORD-78241
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {error}
              </p>
            )}
          </form>

          {/* Current Order Display */}
          {currentOrder && (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-brand-900 text-sm">
                      {currentOrder.id}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-700 text-white uppercase tracking-wider">
                      {currentOrder.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Placed for: <strong className="text-stone-800">{currentOrder.customer.name}</strong> • Slot: {currentOrder.customer.deliverySlot}
                  </p>
                </div>

                <div className="sm:text-right">
                  <div className="text-[11px] text-stone-500">Estimated Arrival</div>
                  <div className="text-sm font-extrabold text-stone-900 flex items-center sm:justify-end gap-1">
                    <ClockIcon className="w-3.5 h-3.5 text-brand-700" />
                    <span>{currentOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Rider Details Card (if out for delivery) */}
              {currentOrder.deliveryRider && (
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-lg">
                      🛵
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        Rider: {currentOrder.deliveryRider.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {currentOrder.deliveryRider.vehicle}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:${currentOrder.deliveryRider.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    <PhoneIcon className="w-3 h-3 text-emerald-700" />
                    <span>Call Rider</span>
                  </a>
                </div>
              )}

              {/* Visual Stepper Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                  Live Dispatch Stepper
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {currentOrder.timeline.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Node Icon */}
                      <div
                        className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                          item.completed
                            ? 'bg-brand-700 text-white'
                            : item.current
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircleIcon className="w-3 h-3" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              item.completed || item.current ? 'text-stone-900' : 'text-stone-400'
                            }`}
                          >
                            {item.step}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this order */}
              <div className="border-t border-stone-200 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Items in this Order ({currentOrder.items.length})
                </h4>
                <div className="divide-y divide-stone-100 bg-stone-50 rounded-2xl p-3 border border-stone-200/80">
                  {currentOrder.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-stone-800">{item.product.name}</div>
                          <div className="text-[10px] text-stone-400">Qty: {item.quantity} × ₹{item.product.price}</div>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        ₹{item.quantity * item.product.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery destination address */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-xs">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Delivery Address: </span>
                    <span className="text-stone-600">
                      {currentOrder.customer.address}, Landmark: {currentOrder.customer.landmark || 'N/A'}, PIN: {currentOrder.customer.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
