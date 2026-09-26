'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { initialProducts } from '@/data/products';
import { Product, CartItem, Order } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderTrackingModal } from '@/components/OrderTrackingModal';
import { SupportModal } from '@/components/SupportModal';
import { Footer } from '@/components/Footer';
import {
  ShoppingCartIcon,
  MessageCircleIcon,
  TruckIcon,
  SparklesIcon,
  CheckIcon,
  XIcon
} from '@/components/Icons';

export default function HomePage() {
  // Products & Filtering state
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [deliveryTip, setDeliveryTip] = useState<number>(0);
  const [orderNotes, setOrderNotes] = useState<string>('');

  // Modals & Panels state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore cart from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('awadh_greens_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('awadh_greens_coupon');
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('awadh_greens_cart', JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem('awadh_greens_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('awadh_greens_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart, appliedCoupon]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered & Sorted products calculation
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Organic
    if (organicOnly) {
      result = result.filter((p) => p.badge === 'Organic');
    }

    // Max Price
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        // Featured: prioritize Bestseller badge
        result.sort((a, b) => (b.badge === 'Bestseller' ? 1 : 0) - (a.badge === 'Bestseller' ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, organicOnly, maxPrice, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to your basket`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from basket');
  };

  const handleClearCart = () => {
    setCart([]);
    setAppliedCoupon('');
    setDeliveryTip(0);
    setOrderNotes('');
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'FRESH10' || code === 'LOCAL50') {
      setAppliedCoupon(code);
      showToast(`Coupon ${code} applied successfully!`);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    showToast('Coupon removed');
  };

  const getCartQuantity = (productId: string): number => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Pricing calculations
  let calculatedDiscount = 0;
  if (appliedCoupon === 'FRESH10') {
    calculatedDiscount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'LOCAL50' && cartSubtotal >= 599) {
    calculatedDiscount = 50;
  }

  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, cartSubtotal - calculatedDiscount + deliveryFee + deliveryTip);

  const cartPricing = {
    subtotal: cartSubtotal,
    discount: calculatedDiscount,
    deliveryFee,
    tip: deliveryTip,
    total: grandTotal,
    couponCode: appliedCoupon || undefined
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('recommended');
    setInStockOnly(false);
    setOrganicOnly(false);
    setMaxPrice(1000);
  };

  const handleOrderSuccess = (order: Order) => {
    setActiveOrder(order);
    handleClearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsTrackingOpen(true);
    showToast(`Order #${order.id} placed! Tracking started.`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between relative selection:bg-brand-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fadeIn border border-stone-700">
          <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={grandTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroBanner
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          selectedCategory={selectedCategory}
          onApplyCouponPrompt={(code) => {
            handleApplyCoupon(code);
            setIsCartOpen(true);
          }}
        />

        {/* Catalog Section */}
        <ProductGrid
          products={displayedProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly(!inStockOnly)}
          organicOnly={organicOnly}
          onToggleOrganic={() => setOrganicOnly(!organicOnly)}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          getCartQuantity={getCartQuantity}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenQuickView={(p) => setActiveQuickViewProduct(p)}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Modals & Slide-overs */}
      <ProductModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        quantityInCart={activeQuickViewProduct ? getCartQuantity(activeQuickViewProduct.id) : 0}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        deliveryTip={deliveryTip}
        onSelectTip={setDeliveryTip}
        orderNotes={orderNotes}
        onOrderNotesChange={setOrderNotes}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        pricing={cartPricing}
        orderNotes={orderNotes}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        activeOrder={activeOrder}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Floating Action Button for Help & Support */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {cartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="md:hidden flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white p-3.5 rounded-full shadow-xl shadow-brand-950/20 active:scale-95 transition-all cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="text-xs font-bold bg-amber-400 text-stone-900 rounded-full px-1.5 py-0.2">
              {cartCount}
            </span>
          </button>
        )}

        <button
          onClick={() => setIsSupportOpen(true)}
          className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white px-4 py-3 rounded-full shadow-xl shadow-stone-950/20 active:scale-95 transition-all cursor-pointer group"
          title="Need Help? Chat with local store"
        >
          <MessageCircleIcon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold hidden sm:inline">Store Help</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
