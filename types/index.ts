export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Fresh Produce' | 'Dairy & Bakery' | 'Pantry & Spices' | 'Beverages' | 'Artisanal Snacks';
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: 'Organic' | 'Bestseller' | 'Farm Fresh' | 'Handcrafted' | 'Sale';
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  origin: string;
  nutrition?: {
    calories?: string;
    shelfLife?: string;
    storage?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark?: string;
  pincode: string;
  deliverySlot: string;
  notes?: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  couponCode?: string;
}

export interface OrderTimelineStep {
  step: string;
  time: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  payment: {
    method: 'cod' | 'upi' | 'card';
    status: 'pending' | 'completed';
    transactionId?: string;
  };
  pricing: OrderPricing;
  status: 'placed' | 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
  deliveryRider?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  timeline: OrderTimelineStep[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Orders & Delivery' | 'Product Quality' | 'Payments' | 'Returns & Refunds';
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  orderId?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'open' | 'resolved';
}
