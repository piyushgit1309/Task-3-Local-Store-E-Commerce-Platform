import { NextResponse } from 'next/server';
import { sampleOrder } from '@/data/initialOrders';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orderId = params.id.toUpperCase();

  // If matches sample order
  if (orderId === sampleOrder.id || orderId === 'ORD-78241') {
    return NextResponse.json({ success: true, order: sampleOrder });
  }

  // Generate dynamic simulated order if arbitrary order format
  if (orderId.startsWith('ORD-')) {
    const dynamicOrder = {
      ...sampleOrder,
      id: orderId,
      status: 'packing' as const,
      timeline: [
        { ...sampleOrder.timeline[0], completed: true, current: false },
        { ...sampleOrder.timeline[1], completed: true, current: false },
        { ...sampleOrder.timeline[2], completed: true, current: true, time: 'Just now' },
        { ...sampleOrder.timeline[3], completed: false, current: false },
        { ...sampleOrder.timeline[4], completed: false, current: false }
      ]
    };
    return NextResponse.json({ success: true, order: dynamicOrder });
  }

  return NextResponse.json(
    { success: false, error: 'Order not found' },
    { status: 404 }
  );
}
