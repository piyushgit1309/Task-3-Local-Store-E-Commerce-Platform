import { Order } from '@/types';
import { initialProducts } from './products';

export const sampleOrder: Order = {
  id: 'ORD-78241',
  items: [
    { product: initialProducts[0], quantity: 2 },
    { product: initialProducts[4], quantity: 1 },
    { product: initialProducts[6], quantity: 1 }
  ],
  customer: {
    name: 'Priyanka Saxena',
    email: 'priyanka.s@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Royal Palms Apartments, Gomti Nagar',
    landmark: 'Near Riverside Park',
    pincode: '226010',
    deliverySlot: 'Express (Within 45 mins)',
    notes: 'Please ring the bell twice and leave near doorstep shoe rack.'
  },
  payment: {
    method: 'upi',
    status: 'completed',
    transactionId: 'UPI-98214710294'
  },
  pricing: {
    subtotal: 425,
    discount: 42,
    deliveryFee: 0,
    tip: 20,
    total: 403,
    couponCode: 'FRESH10'
  },
  status: 'out_for_delivery',
  createdAt: '2026-09-25T16:15:00Z',
  estimatedDelivery: '30-40 mins',
  deliveryRider: {
    name: 'Ramesh Kumar',
    phone: '+91 98390 12345',
    vehicle: 'Electric Scooter (UP-32-EK-4912)'
  },
  timeline: [
    {
      step: 'Order Received',
      time: '04:15 PM',
      completed: true,
      current: false,
      description: 'Your order was successfully placed and verified.'
    },
    {
      step: 'Store Confirmation',
      time: '04:18 PM',
      completed: true,
      current: false,
      description: 'Awadh Greens store manager accepted and queued the order.'
    },
    {
      step: 'Carefully Packed',
      time: '04:26 PM',
      completed: true,
      current: false,
      description: 'Hand-picked organic greens and artisanal items packed in eco-friendly canvas bags.'
    },
    {
      step: 'Out for Delivery',
      time: '04:32 PM',
      completed: true,
      current: true,
      description: 'Rider Ramesh Kumar is en route to Gomti Nagar via EV.'
    },
    {
      step: 'Delivered',
      time: 'Est. 04:55 PM',
      completed: false,
      current: false,
      description: 'Package delivered at your doorstep.'
    }
  ]
};
