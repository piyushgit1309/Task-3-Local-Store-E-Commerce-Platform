import { NextResponse } from 'next/server';
import { SupportTicket } from '@/types';

const supportTicketsStore: SupportTicket[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, orderId, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    const newTicket: SupportTicket = {
      id: `TICKET-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim(),
      orderId: orderId?.trim() || undefined,
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'open'
    };

    supportTicketsStore.push(newTicket);

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our store manager will reply within 30 minutes!',
      ticketId: newTicket.id
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit support request' },
      { status: 500 }
    );
  }
}
