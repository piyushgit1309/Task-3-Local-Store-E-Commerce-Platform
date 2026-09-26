import { NextResponse } from 'next/server';
import { sampleOrder } from '@/data/initialOrders';
import { Order } from '@/types';

// In-memory order store for runtime demo / deployment
const ordersStore: Record<string, Order> = {
  [sampleOrder.id]: sampleOrder,
  'ORD-10001': {
    ...sampleOrder,
    id: 'ORD-10001',
    status: 'delivered',
    timeline: sampleOrder.timeline.map(t => ({ ...t, completed: true, current: t.step === 'Delivered' }))
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const order = ordersStore[orderId.toUpperCase()];
    if (order) {
      return NextResponse.json({ success: true, order });
    }
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    orders: Object.values(ordersStore)
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, payment, pricing } = body;

    if (!items || items.length === 0 || !customer?.name || !customer?.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory order details' },
        { status: 400 }
      );
    }

    const orderRandomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `ORD-${orderRandomNum}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: newOrderId,
      items,
      customer,
      payment: {
        method: payment.method || 'cod',
        status: payment.method === 'cod' ? 'pending' : 'completed',
        transactionId: payment.method !== 'cod' ? `TXN-${Math.floor(100000000 + Math.random() * 900000000)}` : undefined
      },
      pricing,
      status: 'placed',
      createdAt: now.toISOString(),
      estimatedDelivery: '35-45 mins',
      deliveryRider: {
        name: 'Arjun Verma',
        phone: '+91 94500 12890',
        vehicle: 'Hero Electric (UP-32-BZ-3310)'
      },
      timeline: [
        {
          step: 'Order Received',
          time: timeString,
          completed: true,
          current: true,
          description: 'Order confirmed and registered in our local store kitchen.'
        },
        {
          step: 'Store Confirmation',
          time: 'Pending',
          completed: false,
          current: false,
          description: 'Store manager reviews fresh item batches.'
        },
        {
          step: 'Carefully Packed',
          time: 'Pending',
          completed: false,
          current: false,
          description: 'Hand-picked organic goods packed in insulated bio-boxes.'
        },
        {
          step: 'Out for Delivery',
          time: 'Pending',
          completed: false,
          current: false,
          description: 'Rider picks up package for local dispatch.'
        },
        {
          step: 'Delivered',
          time: 'Est. 45 mins',
          completed: false,
          current: false,
          description: 'Handed over at customer address.'
        }
      ]
    };

    ordersStore[newOrderId] = newOrder;

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error while placing order' },
      { status: 500 }
    );
  }
}
