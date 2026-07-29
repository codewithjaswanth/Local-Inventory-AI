import { Category, Shop, AiFeature, HowItWorksStep } from '@/types';

export interface ShopReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  itemPurchased: string;
}

export interface DetailedShop extends Shop {
  coverImage: string;
  description: string;
  openingHours: string;
  reviews: ShopReview[];
}

export const POPULAR_CATEGORIES: Category[] = [
  {
    id: 'veg',
    name: 'Vegetables',
    icon: 'Salad',
    itemCount: 1420,
    popularItems: ['Organic Tomatoes', 'Farm Spinach', 'Avocados', 'Bell Peppers'],
    gradient: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    description: 'Farm-fresh organic and local vegetables sourced daily from regional farms.'
  },
  {
    id: 'fruit',
    name: 'Fruits',
    icon: 'Apple',
    itemCount: 980,
    popularItems: ['Hass Avocados', 'Blueberries', 'Alphonso Mangoes', 'Crisp Apples'],
    gradient: 'from-amber-400 to-orange-500',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Tree-ripened seasonal fruits with AI freshness verified scores.'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    icon: 'Milk',
    itemCount: 640,
    popularItems: ['Organic Whole Milk', 'Greek Yogurt', 'Artisan Butter', 'Paneer'],
    gradient: 'from-blue-400 to-cyan-500',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    description: 'Pure, grass-fed dairy products delivered fresh every morning.'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    icon: 'Wheat',
    itemCount: 450,
    popularItems: ['Sourdough Loaf', 'Croissants', 'Multigrain Bread', 'Bagels'],
    gradient: 'from-amber-600 to-yellow-700',
    accentBg: 'bg-amber-100/50',
    accentText: 'text-amber-700',
    description: 'Oven-fresh artisanal bread, pastries, and baked goods baked daily.'
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'ShoppingBag',
    itemCount: 3100,
    popularItems: ['Cold-Pressed Oil', 'Organic Lentils', 'Wild Rice', 'Spices'],
    gradient: 'from-purple-500 to-indigo-600',
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-600',
    description: 'Daily kitchen essentials, organic grains, cold-pressed oils, and spices.'
  }
];

export const DETAILED_SHOPS: DetailedShop[] = [
  {
    id: 'shop-1',
    name: 'Green Earth Organics',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80',
    distance: '0.5 km',
    latitude: 37.7749,
    longitude: -122.4194,
    rating: 4.9,
    reviewsCount: 184,
    freshnessBadge: '99% AI Verified',
    freshnessScore: 99,
    isOpen: true,
    openTime: '7:00 AM - 9:00 PM',
    openingHours: 'Mon-Sun: 7:00 AM - 9:00 PM',
    address: '142 Elm Street, Downtown, CA 94103',
    nearbyLandmark: 'Near City Center Mall, Gate 1',
    category: 'Organics & Produce',
    phone: '+1 (555) 234-5678',
    inventoryCount: 320,
    description: 'Family-owned organic market specializing in daily farm-harvested heirloom vegetables, tree-ripened fruits, and local artisanal cold-pressed oils.',
    verifiedItems: [
      { id: 'i1', name: 'Vine-Ripened Organic Tomatoes', category: 'Vegetables', price: '₹199', unit: 'per kg', freshnessScore: 99, inStock: true, lastUpdated: '4 mins ago', verifiedByAi: true },
      { id: 'i2', name: 'Tree-Ripened Hass Avocados', category: 'Fruits', price: '₹159', unit: 'each', freshnessScore: 98, inStock: true, lastUpdated: '8 mins ago', verifiedByAi: true },
      { id: 'i3', name: 'Fresh Baby Spinach Bunch', category: 'Vegetables', price: '₹239', unit: 'per pack', freshnessScore: 97, inStock: true, lastUpdated: '20 mins ago', verifiedByAi: true },
      { id: 'i4', name: 'Raw Himalayan Wildflower Honey', category: 'Groceries', price: '₹699', unit: '16 oz jar', freshnessScore: 100, inStock: true, lastUpdated: '1 hr ago', verifiedByAi: true },
      { id: 'i5', name: 'Fresh English Cucumbers', category: 'Vegetables', price: '₹119', unit: 'each', freshnessScore: 96, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i6', name: 'Organic Red Bell Peppers', category: 'Vegetables', price: '₹279', unit: 'per kg', freshnessScore: 98, inStock: true, lastUpdated: '10 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'The live AI inventory accurately showed vine tomatoes in stock! When I arrived 10 mins later, they were super fresh and exactly ₹199/kg.',
        verifiedPurchase: true,
        itemPurchased: 'Vine-Ripened Organic Tomatoes'
      },
      {
        id: 'r2',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Best organic avocados in the neighborhood. Highly recommend checking their WhatsApp stock updates.',
        verifiedPurchase: true,
        itemPurchased: 'Hass Avocados'
      },
      {
        id: 'r3',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        rating: 4.8,
        date: '1 week ago',
        comment: 'Very friendly shopkeeper and super fast pickup process.',
        verifiedPurchase: true,
        itemPurchased: 'Wildflower Honey'
      }
    ]
  },
  {
    id: 'shop-2',
    name: 'Sunshine Fruit Depot',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
    distance: '1.0 km',
    latitude: 37.7833,
    longitude: -122.4167,
    rating: 4.8,
    reviewsCount: 142,
    freshnessBadge: '97% AI Verified',
    freshnessScore: 97,
    isOpen: true,
    openTime: '8:00 AM - 8:30 PM',
    openingHours: 'Mon-Sat: 8:00 AM - 8:30 PM',
    address: '88 Market Avenue, Westside, CA 94107',
    nearbyLandmark: 'Opposite Metro Station Gate 2',
    category: 'Fresh Fruits',
    phone: '+1 (555) 345-6789',
    inventoryCount: 210,
    description: 'Premier fruit market delivering orchard-fresh berries, tropical mangoes, crisp apples, and citrus fruits daily.',
    verifiedItems: [
      { id: 'i7', name: 'Fresh Organic Strawberries', category: 'Fruits', price: '₹319', unit: 'per pack', freshnessScore: 97, inStock: true, lastUpdated: '12 mins ago', verifiedByAi: true },
      { id: 'i8', name: 'Crisp Honeycrisp Apples', category: 'Fruits', price: '₹149', unit: 'per kg', freshnessScore: 98, inStock: true, lastUpdated: '5 mins ago', verifiedByAi: true },
      { id: 'i9', name: 'Juicy Watermelon Wedge', category: 'Fruits', price: '₹439', unit: 'each', freshnessScore: 95, inStock: true, lastUpdated: '35 mins ago', verifiedByAi: true },
      { id: 'i10', name: 'Fresh Blueberries Punnet', category: 'Fruits', price: '₹399', unit: '6 oz', freshnessScore: 98, inStock: true, lastUpdated: '7 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r4',
        author: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Honeycrisp apples are unbelievably crisp! 98% freshness score was 100% accurate.',
        verifiedPurchase: true,
        itemPurchased: 'Honeycrisp Apples'
      }
    ]
  },
  {
    id: 'shop-3',
    name: 'Artisan Bakery & Dairy',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=80',
    distance: '1.4 km',
    latitude: 37.7983,
    longitude: -122.4075,
    rating: 4.9,
    reviewsCount: 210,
    freshnessBadge: '98% AI Verified',
    freshnessScore: 98,
    isOpen: true,
    openTime: '6:30 AM - 7:00 PM',
    openingHours: 'Mon-Sun: 6:30 AM - 7:00 PM',
    address: '310 Baker Square, North End, CA 94111',
    nearbyLandmark: 'Near Central Park Clock Tower',
    category: 'Bakery & Milk',
    phone: '+1 (555) 456-7890',
    inventoryCount: 175,
    description: 'Traditional wood-fired sourdough bakery paired with grass-fed local dairy glass bottles.',
    verifiedItems: [
      { id: 'i11', name: 'French Butter Croissants', category: 'Bakery', price: '₹220', unit: 'each', freshnessScore: 100, inStock: true, lastUpdated: '2 mins ago', verifiedByAi: true },
      { id: 'i12', name: 'Whole Wheat Sourdough Loaf', category: 'Bakery', price: '₹499', unit: 'loaf', freshnessScore: 99, inStock: true, lastUpdated: '10 mins ago', verifiedByAi: true },
      { id: 'i13', name: 'Grass-Fed Farm Milk 1/2 Gal', category: 'Dairy', price: '₹340', unit: '1/2 gal bottle', freshnessScore: 97, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i14', name: 'Artisan Paneer Block', category: 'Dairy', price: '₹479', unit: '400g pack', freshnessScore: 97, inStock: true, lastUpdated: '14 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Chloe Bennet',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Warm croissants out of the oven! The voice inventory feature updated the batch immediately.',
        verifiedPurchase: true,
        itemPurchased: 'French Butter Croissants'
      }
    ]
  },
  {
    id: 'shop-4',
    name: 'Metro Fresh Farmers Market',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80',
    distance: '2.2 km',
    latitude: 37.7690,
    longitude: -122.4280,
    rating: 4.8,
    reviewsCount: 168,
    freshnessBadge: '96% AI Verified',
    freshnessScore: 96,
    isOpen: true,
    openTime: '7:30 AM - 9:30 PM',
    openingHours: 'Mon-Sun: 7:30 AM - 9:30 PM',
    address: '512 Mission Street, Mission District, CA 94110',
    nearbyLandmark: 'Beside St. John Library, Main Rd',
    category: 'Groceries & Vegetables',
    phone: '+1 (555) 567-8901',
    inventoryCount: 290,
    description: 'Vibrant local produce hub providing seasonal Alphonso mangoes, fresh farm greens, and cold-pressed cooking oils.',
    verifiedItems: [
      { id: 'i15', name: 'Organic Alphonso Mangoes', category: 'Fruits', price: '₹299', unit: 'per kg', freshnessScore: 98, inStock: true, lastUpdated: '10 mins ago', verifiedByAi: true },
      { id: 'i16', name: 'Fresh Broccoli Heads', category: 'Vegetables', price: '₹179', unit: 'per kg', freshnessScore: 96, inStock: true, lastUpdated: '18 mins ago', verifiedByAi: true },
      { id: 'i17', name: 'Cold-Pressed Mustard Oil 500ml', category: 'Groceries', price: '₹349', unit: 'bottle', freshnessScore: 99, inStock: true, lastUpdated: '45 mins ago', verifiedByAi: true },
      { id: 'i18', name: 'Farm Fresh Organic Eggs', category: 'Dairy', price: '₹149', unit: '12 pack', freshnessScore: 97, inStock: true, lastUpdated: '30 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Arjun Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Alphonso mangoes were juicy and sweet! The 2.2 km directions route was smooth.',
        verifiedPurchase: true,
        itemPurchased: 'Organic Alphonso Mangoes'
      }
    ]
  },
  {
    id: 'shop-5',
    name: 'Pantry & Spice Corner',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80',
    distance: '3.1 km',
    latitude: 37.7580,
    longitude: -122.4120,
    rating: 4.7,
    reviewsCount: 124,
    freshnessBadge: '95% AI Verified',
    freshnessScore: 95,
    isOpen: true,
    openTime: '8:00 AM - 9:00 PM',
    openingHours: 'Mon-Sun: 8:00 AM - 9:00 PM',
    address: '782 Valencia Boulevard, SoMa, CA 94103',
    nearbyLandmark: 'Near Grand Bazaar Circle',
    category: 'Groceries & Spices',
    phone: '+1 (555) 678-9012',
    inventoryCount: 340,
    description: 'Specialty grocery corner offering authentic regional spices, premium basmati rice, lentils, and cold-pressed oils.',
    verifiedItems: [
      { id: 'i19', name: 'Premium Basmati Rice 5kg', category: 'Groceries', price: '₹649', unit: 'bag', freshnessScore: 99, inStock: true, lastUpdated: '1 hr ago', verifiedByAi: true },
      { id: 'i20', name: 'Organic Red Lentils (Masoor Dal)', category: 'Groceries', price: '₹189', unit: 'per kg', freshnessScore: 96, inStock: true, lastUpdated: '2 hrs ago', verifiedByAi: true },
      { id: 'i21', name: 'Kashmiri Chili Powder 200g', category: 'Groceries', price: '₹129', unit: 'pack', freshnessScore: 97, inStock: true, lastUpdated: '40 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Great selection of organic lentils and spices. Directions button guided me straight to their parking lot.',
        verifiedPurchase: true,
        itemPurchased: 'Organic Red Lentils'
      }
    ]
  },
  {
    id: 'shop-6',
    name: 'Highland Organic Dairy & Pantry',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1600&q=80',
    distance: '3.8 km',
    latitude: 37.7450,
    longitude: -122.4350,
    rating: 4.9,
    reviewsCount: 195,
    freshnessBadge: '98% AI Verified',
    freshnessScore: 98,
    isOpen: true,
    openTime: '7:00 AM - 8:00 PM',
    openingHours: 'Mon-Sun: 7:00 AM - 8:00 PM',
    address: '19 Highland Road, Castro, CA 94114',
    nearbyLandmark: 'Opposite Highland Community Hospital',
    category: 'Dairy & Bakery',
    phone: '+1 (555) 789-0123',
    inventoryCount: 220,
    description: 'Highland organic dairy farm shop providing fresh cottage cheese paneer, A2 ghee, sourdough, and cold-pressed extra virgin olive oil.',
    verifiedItems: [
      { id: 'i22', name: 'Fresh Cottage Cheese Paneer', category: 'Dairy', price: '₹249', unit: '400g pack', freshnessScore: 99, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i23', name: 'A2 Cow Desi Ghee 500ml', category: 'Dairy', price: '₹899', unit: 'jar', freshnessScore: 100, inStock: true, lastUpdated: '1 hr ago', verifiedByAi: true },
      { id: 'i24', name: 'Multigrain Sandwich Bread', category: 'Bakery', price: '₹140', unit: 'loaf', freshnessScore: 97, inStock: true, lastUpdated: '25 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r8',
        author: 'Rohan Verma',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Fresh cottage cheese paneer was superb! 3.8 km drive was worth it.',
        verifiedPurchase: true,
        itemPurchased: 'Fresh Cottage Cheese Paneer'
      }
    ]
  }
];

export const NEARBY_SHOPS: Shop[] = DETAILED_SHOPS;

export const AI_FEATURES: AiFeature[] = [
  {
    id: 'voice',
    title: 'Voice Inventory Updates',
    description: 'Shopkeepers can update their live stock in seconds by simply recording a quick voice note in any local language.',
    icon: 'Mic',
    highlight: 'Multi-lingual NLP engine',
    tag: 'Real-time Voice AI'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Integration',
    description: 'Zero app installation required for local vendors. Snap a photo of new stock and message WhatsApp bot to sync.',
    icon: 'MessageSquare',
    highlight: 'Zero-friction adoption',
    tag: 'Instant Sync'
  },
  {
    id: 'semantic',
    title: 'Semantic Search',
    description: 'Customers search using natural language like "ripe avocados for guacamole nearby under ₹150" and get instant exact matches.',
    icon: 'Sparkles',
    highlight: 'Contextual AI matching',
    tag: 'Smart Search'
  },
  {
    id: 'freshness',
    title: 'Freshness Score',
    description: 'Proprietary computer vision algorithms assess fruit ripeness, crop arrival times, and vendor restock logs.',
    icon: 'TrendingUp',
    highlight: '99.2% Accuracy rate',
    tag: 'AI Ripeness Vision'
  },
  {
    id: 'verified',
    title: 'Customer Verified Availability',
    description: 'Crowdsourced community verification with micro-rewards ensures 100% accurate shelf inventory confidence.',
    icon: 'CheckCircle2',
    highlight: 'Community crowdsourced',
    tag: 'Live Validation'
  },
  {
    id: 'image-validation',
    title: 'AI Image Validation',
    description: 'Automated receipt parsing and shelf-photo classification extracts prices, items, and quantities in under 3 seconds.',
    icon: 'Scan',
    highlight: 'Sub-second OCR',
    tag: 'Vision Parser'
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: 1,
    role: 'shopkeeper',
    roleLabel: '1. Vendor Action',
    title: 'Shopkeeper Uploads Photo',
    description: 'Local shopkeeper snaps a picture of their newly arrived morning fresh produce shelf.',
    icon: 'Camera',
    badge: 'WhatsApp / Camera',
    previewSnippet: {
      type: 'photo',
      content: '📷 Photo captured: Fresh Alphonso Mangoes & Vine Tomatoes crate.'
    }
  },
  {
    stepNumber: 2,
    role: 'shopkeeper',
    roleLabel: '2. Voice Memo',
    title: 'Adds Quick Voice Note',
    description: 'Vendor dictates prices and quantities in their native language e.g. "50kg tomatoes at ₹199/kg".',
    icon: 'Mic',
    badge: 'Voice Input',
    previewSnippet: {
      type: 'audio',
      content: '🎙️ "Just received 50kg vine tomatoes at ₹199/kg and 20 packs organic strawberries!"'
    }
  },
  {
    stepNumber: 3,
    role: 'ai',
    roleLabel: '3. AI Processing',
    title: 'AI Extracts Live Inventory',
    description: 'Local Inventory AI parses audio and images, tags items with freshness scores, and updates marketplace stock instantly.',
    icon: 'Cpu',
    badge: 'AI Vision & LLM',
    previewSnippet: {
      type: 'ai-json',
      content: '⚡ Stock Extracted: { item: "Vine Tomatoes", qty: "50kg", price: "₹199/kg", freshnessScore: 99 }'
    }
  },
  {
    stepNumber: 4,
    role: 'customer',
    roleLabel: '4. Hyperlocal Search',
    title: 'Customer Searches Nearby',
    description: 'Nearby customer types or speaks a query seeking specific fresh items within a 3-kilometer radius.',
    icon: 'Search',
    badge: 'Semantic Discovery',
    previewSnippet: {
      type: 'search',
      content: '🔍 Search: "Fresh organic vine tomatoes within 2 km"'
    }
  },
  {
    stepNumber: 5,
    role: 'customer',
    roleLabel: '5. Direct Shop Visit',
    title: 'Visits Shop with Confidence',
    description: 'Customer navigates directly to the store with guaranteed product availability and pre-verified pricing.',
    icon: 'Navigation',
    badge: 'Navigation & Pickup',
    previewSnippet: {
      type: 'location',
      content: '📍 Route set to Green Earth Organics (0.5 km away - In Stock Verified)'
    }
  },
  {
    stepNumber: 6,
    role: 'customer',
    roleLabel: '6. Community Feedback',
    title: 'Leaves Freshness Feedback',
    description: 'Customer confirms product quality with 1-click feedback, earning discount rewards for future local purchases.',
    icon: 'Star',
    badge: 'Reward Tokens',
    previewSnippet: {
      type: 'rating',
      content: '⭐ "Verified 100% fresh! Earned +10 FreshTokens"'
    }
  }
];
