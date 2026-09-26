import { FAQItem } from '@/types';

export const storeFaqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How fast is local doorstep delivery?',
    answer: 'We provide express local delivery within 45 to 60 minutes for orders placed within our 8 km service radius. You can also select designated scheduled slots (e.g., Morning 8 AM – 11 AM or Evening 5 PM – 8 PM) during checkout.',
    category: 'Orders & Delivery'
  },
  {
    id: 'faq-2',
    question: 'What is the minimum order for free delivery?',
    answer: 'Orders above ₹499 qualify for 100% FREE express local delivery. For orders below ₹499, a nominal delivery charge of ₹40 is applied to cover eco-friendly transport.',
    category: 'Orders & Delivery'
  },
  {
    id: 'faq-3',
    question: 'How do you guarantee the freshness of vegetables & dairy?',
    answer: 'All greens and seasonal produce are harvested before 6:00 AM from our partnered local organic farms and brought straight to our temperature-regulated local sorting hub. Milk, paneer, and sourdough are prepared fresh each morning.',
    category: 'Product Quality'
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD), instant UPI payments via QR code (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and all major Credit/Debit Cards.',
    category: 'Payments'
  },
  {
    id: 'faq-5',
    question: 'What is your return & replacement policy?',
    answer: 'We offer a "No-Questions-Asked" doorstep replacement or immediate refund if any produce or grocery item does not meet your quality expectations upon delivery.',
    category: 'Returns & Refunds'
  },
  {
    id: 'faq-6',
    question: 'Can I track my delivery rider in real time?',
    answer: 'Yes! As soon as your order is confirmed, you receive an Order ID (e.g., ORD-84920). Enter this in our "Track Order" tab to see real-time updates from packing to rider dispatch.',
    category: 'Orders & Delivery'
  }
];
