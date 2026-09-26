# Awadh Greens & Artisanal Pantry — Local Store E-Commerce Platform

> **Full Stack Development Internship — Task-03: Local Store E-commerce Platform**  
> Developed for **Prodigy InfoTech**  
> Ready for seamless deployment on **Vercel**

---

## 🌟 Overview

**Awadh Greens & Artisanal Pantry** is a modern, responsive, full-stack e-commerce web platform created for a regional neighborhood store in Lucknow. It enables local customers to browse farm-fresh organic vegetables, artisanal sourdough breads, pure Vedic A2 Bilona ghee, cold-pressed oils, and heritage spices, place orders for 45-minute express local delivery, and track their delivery riders in real-time.

---

## ✨ Features Implemented

### 🛒 1. Core E-Commerce Features (Mandatory)
* **Comprehensive Product Catalog**: 14 artisanal and farm-direct products across 5 categories with high-resolution imagery, detailed descriptions, unit weights, farm origins, and certified badges.
* **Interactive Shopping Cart**:
  * Slide-over cart drawer with persistent state across browser reloads via `localStorage`.
  * Real-time item quantity adjustment (`+` / `-`) and instant item removal.
  * Free Delivery Goal Meter ("Add ₹X more to unlock free express delivery").
  * Voucher discount system with instant verification (`FRESH10` for 10% off, `LOCAL50` for ₹50 off).
  * Rider tipping option (₹0, ₹20, ₹30, ₹50) and customer delivery notes.
  * Detailed invoice breakdown (subtotal, discounts, delivery fees, tips, grand total).
* **Multi-Step Express Checkout**:
  * Contact information & local delivery address with landmarks.
  * Delivery slot scheduler (Express 45-min, Today Evening, Tomorrow Morning).
  * Multiple payment options: Instant UPI QR Code generator (with payment simulation), Cash on Delivery (COD), and Credit/Debit Cards.

### 🚀 2. Optional & Value-Add Features (All Implemented)
* **Live Order Tracking**:
  * Interactive 5-step visual delivery stepper: `Order Placed` ➔ `Store Confirmed` ➔ `Carefully Packed` ➔ `Out for Delivery` ➔ `Delivered`.
  * Live delivery partner info card (rider name, phone link, and EV scooter vehicle number).
  * Quick demo tracking lookup (`ORD-78241`).
* **Customer Reviews & Ratings**:
  * Verified buyer reviews displayed on every product modal.
  * Interactive "Write a Review" form allowing customers to rate (1–5 stars), write comments, and publish reviews live via `/api/reviews`.
* **Store Customer Support & Help Desk**:
  * Floating quick-help button with comprehensive support drawer.
  * Searchable FAQ Accordion answering key neighborhood questions (delivery radius, return policy, freshness guarantee, payment safety).
  * Live customer contact ticket form that submits inquiries directly to `/api/support`.
  * Direct one-click phone and email support links.
* **Dynamic Search, Sort & Multi-Filter**:
  * Real-time search by product name, description, category, and farm origin.
  * Category quick-filter tabs (All, Fresh Produce, Dairy & Bakery, Pantry & Spices, Beverages, Snacks).
  * Interactive max-price range slider (₹40 to ₹1000).
  * In-Stock Only and Certified Organic toggle chips.
  * Sort options: Featured & Bestselling, Price: Low to High, Price: High to Low, Highest Rated, Most Reviewed.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
* **Styling & Design System**: [Tailwind CSS](https://tailwindcss.com/) with custom earth & emerald palettes, responsive layouts, and micro-animations.
* **Backend API**: Next.js Serverless Route Handlers:
  * `GET /api/products`: Filtered, searched, and sorted product catalog.
  * `POST /api/orders`: Process and persist new customer orders.
  * `GET /api/orders/[id]`: Retrieve order details and live tracking state.
  * `GET & POST /api/reviews`: Retrieve and submit product customer reviews.
  * `POST /api/support`: Submit customer support inquiries.
* **Deployment Target**: [Vercel](https://vercel.com/) (Zero-configuration automated build and serverless hosting).

---

## 🚀 How to Run Locally

### Prerequisites
* **Node.js** v18.17.0 or higher
* **npm** or **pnpm** or **yarn**

### Quickstart Commands

1. **Extract and Navigate to Project**:
   ```bash
   unzip local-store-ecommerce.zip
   cd local-store-ecommerce
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## ☁️ How to Deploy on Vercel (Step-by-Step)

The project includes `vercel.json` and standard Next.js configurations pre-configured for instant Vercel deployment:

### Method 1: Via GitHub (Recommended)
1. Initialize a Git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Awadh Greens Local Store E-commerce"
   ```
2. Create a new repository on your GitHub account and push the code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/local-store-ecommerce.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
4. Select your GitHub repository and click **"Import"**.
5. Leave the default settings (Framework preset: **Next.js**).
6. Click **"Deploy"**. Vercel will install dependencies, build the project, and give you a live production URL in under 2 minutes!

### Method 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📁 Project Structure

```
local-store-ecommerce/
├── app/
│   ├── api/
│   │   ├── products/route.ts      # Product filtering & search API
│   │   ├── orders/
│   │   │   ├── route.ts          # Order creation & list API
│   │   │   └── [id]/route.ts     # Order tracking by ID API
│   │   ├── reviews/route.ts      # Product reviews API
│   │   └── support/route.ts      # Help desk support ticket API
│   ├── favicon.ico
│   ├── globals.css               # Tailwind CSS & global styling
│   ├── layout.tsx                # Root layout & meta tags
│   └── page.tsx                  # Master storefront client page
├── components/
│   ├── Icons.tsx                 # High-performance inline SVG icons
│   ├── Navbar.tsx                # Header, search, delivery status & cart trigger
│   ├── HeroBanner.tsx            # Value propositions, promotions & category pills
│   ├── ProductCard.tsx           # Product card with quantity stepper & quick-view
│   ├── ProductGrid.tsx           # Dynamic catalog, sort & filter controls
│   ├── ProductModal.tsx          # Full product view, specs, nutrition & reviews
│   ├── CartDrawer.tsx            # Slide-over cart, coupons, tip & bill summary
│   ├── CheckoutModal.tsx         # Delivery details, slots, UPI/COD payment
│   ├── OrderTrackingModal.tsx    # Live visual 5-step order tracking timeline
│   ├── SupportModal.tsx          # Store helpline, FAQ accordion & inquiry form
│   └── Footer.tsx                # Store story, timings, policies & location
├── data/
│   ├── products.ts               # Local store inventory dataset
│   ├── initialOrders.ts          # Seed tracking data
│   └── faqs.ts                   # Store FAQs dataset
├── types/
│   └── index.ts                  # TypeScript data interfaces
├── next.config.js                # Next.js configuration (Unsplash image domain)
├── tailwind.config.js            # Custom color palette & design tokens
├── postcss.config.js
├── tsconfig.json
├── vercel.json                   # Vercel deployment presets
└── package.json
```

---

## 📜 License & Acknowledgements
Created for **Prodigy InfoTech Internship (Task-03)** by **Piyush**.
