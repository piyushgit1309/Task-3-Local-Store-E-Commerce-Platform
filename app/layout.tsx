import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Awadh Greens & Artisanal Pantry | Local E-Commerce Store',
  description: 'Neighborhood online store for fresh organic vegetables, pure A2 Bilona ghee, wood-fired country sourdough, and artisanal pantry items. Express 45-min local delivery.',
  keywords: ['local store', 'e-commerce', 'organic grocery', 'fresh vegetables', 'artisan bakery', 'lucknow delivery', 'farm to table'],
  authors: [{ name: 'Internship Full Stack Project' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌱</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-brand-200 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
