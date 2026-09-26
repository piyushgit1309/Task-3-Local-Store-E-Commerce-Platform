'use client';

import React from 'react';
import { TruckIcon, ShieldCheckIcon, SparklesIcon, PhoneIcon, MapPinIcon, MailIcon, ClockIcon } from './Icons';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenSupport: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenSupport,
  onSelectCategory
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-stone-800 text-center sm:text-left">
          <div className="flex items-center gap-4 bg-stone-800/40 p-4 rounded-2xl border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <TruckIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">45-Minute Local Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Prompt doorstep delivery across Hazratganj, Gomti Nagar &amp; nearby areas</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/40 p-4 rounded-2xl border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Quality &amp; Purity</h4>
              <p className="text-xs text-stone-400 mt-0.5">Freshly harvested chemical-free produce, Vedic ghee &amp; pure cold-pressed oils</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/40 p-4 rounded-2xl border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct Farm Fair-Trade</h4>
              <p className="text-xs text-stone-400 mt-0.5">Empowering 50+ regional farmers and artisan baking families</p>
            </div>
          </div>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-stone-800 text-xs">
          {/* Col 1: Brand story */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="text-base font-extrabold text-white tracking-tight">
                Awadh<span className="text-brand-400">Greens</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Your neighborhood e-commerce market dedicated to bringing farm-fresh organic vegetables, pure Vedic dairy, wood-fired artisan breads, and regional heritage staples right to your dining table.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>●</span> Store is OPEN for Orders (6 AM – 10 PM)
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Explore Aisles
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Fresh Produce')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hydroponic Greens &amp; Farm Veggies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Dairy & Bakery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vedic A2 Ghee &amp; Sourdough Breads
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Pantry & Spices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cold-Pressed Oils &amp; Raw Honey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Beverages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Single-Origin Arabica &amp; Kashmiri Kahwa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Artisanal Snacks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Roasted Foxnuts &amp; Heritage Nankhatai
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Help &amp; Services
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Track Your Delivery (Real-time)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Support &amp; FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quality Guarantee &amp; Returns
                </button>
              </li>
              <li>
                <span className="text-stone-500">Service Radius: 8 km from Hazratganj</span>
              </li>
              <li>
                <span className="text-stone-500">Free delivery on orders ₹499+</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Visit & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Neighborhood Store Outlet
            </h4>
            <div className="flex items-start gap-2 text-stone-400">
              <MapPinIcon className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>Shop 14, Heritage Square, MG Marg, Hazratganj, Lucknow – 226001</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <PhoneIcon className="w-4 h-4 text-brand-400 shrink-0" />
              <span>+91 94500 12890</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <MailIcon className="w-4 h-4 text-brand-400 shrink-0" />
              <span>care@awadhgreens.local</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <ClockIcon className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Mon – Sun: 6:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Awadh Greens &amp; Artisanal Pantry. Built for Prodigy InfoTech Internship (Task-03).
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Local Vendor Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
