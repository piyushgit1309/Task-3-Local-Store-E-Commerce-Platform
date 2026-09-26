import { Product } from '@/types';

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Hydroponic Crisp Baby Spinach',
    category: 'Fresh Produce',
    price: 65,
    originalPrice: 85,
    unit: '250g pack',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 38,
    badge: 'Organic',
    description: 'Pesticide-free, crisp hydroponic baby spinach leaves harvested at daybreak. Triple-washed, tender, and rich in natural iron, folate, and vitamins.',
    features: [
      '100% Soil-free hydroponic cultivation',
      'Harvested within 6 hours of doorstep delivery',
      'Triple RO-washed & ready to toss'
    ],
    inStock: true,
    stockCount: 24,
    origin: 'Polyhouse Cluster, Mohanlalganj',
    nutrition: {
      calories: '23 kcal per 100g',
      shelfLife: '4-5 days refrigerated',
      storage: 'Keep in ventilated crisper drawer'
    }
  },
  {
    id: 'prod-2',
    name: 'Vine-Ripened Heirloom Tomatoes',
    category: 'Fresh Produce',
    price: 48,
    originalPrice: 60,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 45,
    badge: 'Farm Fresh',
    description: 'Sun-kissed, juicy heirloom tomatoes with a deep crimson color and rich umami sweetness. Perfect for gravies, artisanal salads, and slow roasting.',
    features: [
      'Naturally vine-ripened without artificial ethylene gas',
      'High lycopene content and intense natural fragrance',
      'Directly sourced from Barabanki organic cooperative'
    ],
    inStock: true,
    stockCount: 40,
    origin: 'Barabanki Organic Farms',
    nutrition: {
      calories: '18 kcal per 100g',
      shelfLife: '6-7 days at room temperature',
      storage: 'Store away from direct sunlight'
    }
  },
  {
    id: 'prod-3',
    name: 'Malihabadi Heritage Dasheri Mangoes',
    category: 'Fresh Produce',
    price: 180,
    originalPrice: 220,
    unit: '1 kg box (approx 5-6 pcs)',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 89,
    badge: 'Bestseller',
    description: 'World-renowned Malihabadi heritage mangoes with thin skins, non-fibrous melt-in-mouth pulp, and legendary floral aroma. Tree-ripened in traditional orchards.',
    features: [
      'GI-tagged authentic Malihabad origin',
      'No carbide or chemical ripening agents used',
      'Carefully cushioned in eco-friendly grass crates'
    ],
    inStock: true,
    stockCount: 18,
    origin: 'Malihabad Heritage Orchards',
    nutrition: {
      calories: '60 kcal per 100g',
      shelfLife: '5 days once ripe',
      storage: 'Keep in ambient room air until aroma blooms'
    }
  },
  {
    id: 'prod-4',
    name: 'Crisp English Greenhouse Cucumbers',
    category: 'Fresh Produce',
    price: 40,
    originalPrice: 50,
    unit: '500g (2-3 pcs)',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 22,
    badge: 'Farm Fresh',
    description: 'Thin-skinned, seedless, seed-free English cucumbers grown in climate-regulated greenhouses. Highly hydrating, refreshing, and zero bitterness.',
    features: [
      'Zero bitter ends guaranteed',
      'High moisture content for daily hydration & detox juices',
      '100% natural mulch farming'
    ],
    inStock: true,
    stockCount: 30,
    origin: 'Kakori Greenhouses',
    nutrition: {
      calories: '15 kcal per 100g',
      shelfLife: '6 days refrigerated',
      storage: 'Wrap in dry cloth and refrigerate'
    }
  },
  {
    id: 'prod-5',
    name: 'Wood-Fired Country Sourdough Boule',
    category: 'Dairy & Bakery',
    price: 160,
    originalPrice: 190,
    unit: '450g artisanal loaf',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 64,
    badge: 'Handcrafted',
    description: '36-hour slow fermented wild yeast sourdough with a dark caramelized blistered crust and an airy, custard-like open crumb. Baked fresh every morning at 5 AM.',
    features: [
      'Fermented with an 8-year-old sourdough mother starter',
      'Stoneground whole wheat and unbleached grain flour',
      'Zero commercial yeast, preservatives, or palm oil'
    ],
    inStock: true,
    stockCount: 12,
    origin: 'Awadh Artisan Bakery, Hazratganj',
    nutrition: {
      calories: '240 kcal per 100g',
      shelfLife: '3-4 days at room temp (freeze for longer)',
      storage: 'Store in breadbox or brown paper bag'
    }
  },
  {
    id: 'prod-6',
    name: 'A2 Gir Cow Vedic Bilona Ghee',
    category: 'Dairy & Bakery',
    price: 890,
    originalPrice: 999,
    unit: '500 ml glass jar',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 112,
    badge: 'Bestseller',
    description: 'Crafted using the ancient Ayurvedic 5-stage Bilona method from curd of free-grazing indigenous Gir cows. Granular golden texture with nutty, rich aroma.',
    features: [
      'Slow-cooked over slow wood fire in clay pots',
      'Rich in fat-soluble vitamins A, D, E, K and butyric acid',
      'Packaged in food-grade UV-protective amber glass'
    ],
    inStock: true,
    stockCount: 15,
    origin: 'Gomti Valley Gaushala',
    nutrition: {
      calories: '884 kcal per 100ml',
      shelfLife: '12 months',
      storage: 'Keep in cool, dry place. Do not refrigerate.'
    }
  },
  {
    id: 'prod-7',
    name: 'Fresh Malai Paneer (Cow Milk)',
    category: 'Dairy & Bakery',
    price: 135,
    originalPrice: 150,
    unit: '250g vacuum block',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 51,
    badge: 'Handcrafted',
    description: 'Pillow-soft, fresh artisanal paneer crafted from non-homogenized whole milk. Melts gracefully in curries without turning rubbery or dry.',
    features: [
      'Made fresh daily at 4 AM without cornstarch or additives',
      'High biological value protein (18g per 100g)',
      'Natural coagulant (lemon & whey) used'
    ],
    inStock: true,
    stockCount: 20,
    origin: 'Chowk Heritage Dairy',
    nutrition: {
      calories: '265 kcal per 100g',
      shelfLife: '4 days refrigerated',
      storage: 'Submerge in clean water and refrigerate'
    }
  },
  {
    id: 'prod-8',
    name: 'Kachi Ghani Cold-Pressed Mustard Oil',
    category: 'Pantry & Spices',
    price: 245,
    originalPrice: 280,
    unit: '1 Litre bottle',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 34,
    badge: 'Organic',
    description: 'Extracted in traditional wooden Kolhu expellers below 40°C. Possesses the authentic pungency, vivid golden tint, and high smoke point needed for hearty local dishes.',
    features: [
      'Zero heat treatment & chemical solvents',
      'Rich in Omega-3 and natural antioxidants',
      'First press raw unrefined mustard oil'
    ],
    inStock: true,
    stockCount: 35,
    origin: 'Sitapur Agro Village Collective',
    nutrition: {
      calories: '884 kcal per 100ml',
      shelfLife: '9 months',
      storage: 'Store in cool place away from moisture'
    }
  },
  {
    id: 'prod-9',
    name: 'Lakadong High-Curcumin Turmeric (7.5%)',
    category: 'Pantry & Spices',
    price: 195,
    originalPrice: 240,
    unit: '200g tin',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 76,
    badge: 'Organic',
    description: 'Premium organic turmeric powder renowned worldwide for holding 7.5%+ active curcumin. Intense earthy aroma and vibrant saffron-orange hue.',
    features: [
      'Direct farm-sourced from pristine Meghalaya hills',
      'No added colorants, lead chromate, or starch fillers',
      'Air-tight tin packaging to seal essential oils'
    ],
    inStock: true,
    stockCount: 28,
    origin: 'Jaintia Hills Organic Co-op',
    nutrition: {
      calories: '312 kcal per 100g',
      shelfLife: '18 months',
      storage: 'Seal tight after every use'
    }
  },
  {
    id: 'prod-10',
    name: 'Wild Multiflora Raw Forest Honey',
    category: 'Pantry & Spices',
    price: 380,
    originalPrice: 450,
    unit: '350g jar',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 42,
    badge: 'Sale',
    description: 'Unpasteurized, unprocessed raw honey collected by indigenous forest bee keepers. Loaded with live pollen, enzymes, and wildflowers floral undertones.',
    features: [
      'Naturally crystallizes as proof of raw purity',
      'Zero corn syrup, jaggery syrup, or artificial sugars',
      'Sustainably harvested without destroying wild hives'
    ],
    inStock: true,
    stockCount: 16,
    origin: 'Dudhwa Foothills Biosphere',
    nutrition: {
      calories: '304 kcal per 100g',
      shelfLife: 'Indefinite when kept moisture-free',
      storage: 'Room temperature; do not heat above 45°C'
    }
  },
  {
    id: 'prod-11',
    name: 'Chikmagalur Single-Origin Dark Roast',
    category: 'Beverages',
    price: 360,
    originalPrice: 420,
    unit: '250g whole bean/ground',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 57,
    badge: 'Bestseller',
    description: '100% shade-grown Arabica beans batch-roasted to deep chocolatey perfection. Features subtle notes of toasted hazelnuts, dark cocoa, and caramel finish.',
    features: [
      'Slow drum-roasted weekly in micro-batches',
      'Degassing one-way valve pouch to preserve aroma',
      'Perfect for French Press, Moka Pot, or South Indian Filter'
    ],
    inStock: true,
    stockCount: 22,
    origin: 'Baba Budangiri Estate, Chikmagalur',
    nutrition: {
      calories: '2 kcal per black cup',
      shelfLife: '6 months in sealed pouch',
      storage: 'Keep in airtight container away from light'
    }
  },
  {
    id: 'prod-12',
    name: 'Royal Kashmiri Saffron Kahwa Infusion',
    category: 'Beverages',
    price: 290,
    originalPrice: 350,
    unit: '100g tin (40 cups)',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 29,
    badge: 'Handcrafted',
    description: 'Exquisite traditional Kashmiri green tea blended with whole green cardamom pods, cinnamon bark, crushed almonds, and pure Kashmiri saffron strands.',
    features: [
      'Warming, aromatic and immune-boosting winter tonic',
      'Authentic whole spices; zero synthetic flavor droplets',
      'Reusable commemorative gift tin'
    ],
    inStock: true,
    stockCount: 25,
    origin: 'Pampore Valley, Kashmir',
    nutrition: {
      calories: '5 kcal per cup without honey',
      shelfLife: '12 months',
      storage: 'Keep sealed in cool dark cupboard'
    }
  },
  {
    id: 'prod-13',
    name: 'Slow-Roasted Peri Peri Masala Makhana',
    category: 'Artisanal Snacks',
    price: 140,
    originalPrice: 175,
    unit: '90g pouch',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 31,
    badge: 'Organic',
    description: 'Puffed Himalayan lotus seeds gently dry-roasted in small pans and dusted with our secret zesty peri-peri and sea salt spice seasoning. Gluten-free snacking.',
    features: [
      'Zero palm oil or deep-frying (roasted in olive oil)',
      'Rich in calcium, plant protein, and dietary magnesium',
      'Resealable zip-lock pouch for lasting crunch'
    ],
    inStock: true,
    stockCount: 35,
    origin: 'Mithila Wetlands Harvest',
    nutrition: {
      calories: '110 kcal per 30g serving',
      shelfLife: '4 months',
      storage: 'Reseal pouch immediately after opening'
    }
  },
  {
    id: 'prod-14',
    name: 'Artisanal Desi Ghee Besan Nankhatai',
    category: 'Artisanal Snacks',
    price: 190,
    originalPrice: 230,
    unit: '250g box (10 cookies)',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 68,
    badge: 'Bestseller',
    description: 'Traditional melt-in-mouth Awadhi shortbread biscuits slow-baked with pure A2 cow ghee, stoneground gram flour, green cardamom, and crushed pistachios.',
    features: [
      '100% Maida-free, baked with roasted chana besan',
      'Sweetened with organic raw unrefined khandsari sugar',
      'Baked fresh daily in small family bakery batches'
    ],
    inStock: true,
    stockCount: 14,
    origin: 'Aminabad Heritage Confectionery',
    nutrition: {
      calories: '145 kcal per cookie',
      shelfLife: '30 days in airtight container',
      storage: 'Store in cool ambient pantry'
    }
  }
];
