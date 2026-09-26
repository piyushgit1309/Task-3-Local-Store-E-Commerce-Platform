'use client';

import React, { useState } from 'react';
import { storeFaqs } from '@/data/faqs';
import {
  XIcon,
  PhoneIcon,
  MailIcon,
  ChevronDownIcon,
  MessageCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon
} from './Icons';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, orderId, message })
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedTicketId(data.ticketId);
        setName('');
        setEmail('');
        setOrderId('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-700 text-white flex items-center justify-center font-bold text-sm">
              💬
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">Local Store Customer Help Desk</h2>
              <p className="text-xs text-stone-500">Awadh Greens Support &amp; Neighborhood FAQs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Direct channels banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+919450012890"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors text-emerald-950"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Call Store Manager</div>
                <div className="text-[11px] text-emerald-700 font-mono">+91 94500 12890</div>
              </div>
            </a>

            <a
              href="mailto:care@awadhgreens.local"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-stone-900"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-800 text-white flex items-center justify-center shrink-0">
                <MailIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Email Support</div>
                <div className="text-[11px] text-stone-500">care@awadhgreens.local</div>
              </div>
            </a>
          </div>

          {/* Store Hours & Location Note */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 text-brand-700" />
              <span><strong>Store Hours:</strong> 6:00 AM – 10:00 PM (Daily)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4 text-brand-700" />
              <span>Hazratganj Flagship Outlet, Lucknow</span>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {storeFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-stone-200 rounded-2xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full px-4 py-3 text-left font-bold text-xs sm:text-sm text-stone-800 hover:bg-stone-50 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          isOpen ? 'rotate-180 text-brand-700' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Form */}
          <div className="border-t border-stone-200 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Send an Instant Inquiry to Store Helpdesk
            </h3>

            {submittedTicketId ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-emerald-900">
                  Message Sent! Ticket #{submittedTicketId}
                </div>
                <div className="text-[11px] text-emerald-700">
                  Our store representative has been notified and will get in touch with you shortly.
                </div>
                <button
                  onClick={() => setSubmittedTicketId(null)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. ORD-78241"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    How can we help you? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue regarding product quality, delivery timing, or store items..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:border-brand-600 outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
