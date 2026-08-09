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
    id: 'bath-body',
    name: 'Bath & Body',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1420,
    popularItems: [
      'Bathing Soaps',
      'Shower Gels & Scrubs',
      'Oral Care',
      'Handwash',
      'Fragrance & Talc',
      'Bath Accessories',
      'Shampoo',
      'Conditioner',
      'Face Cleaning',
      'Body Lotions & Oils',
      'Body Treatment & Roll On',
      'Bath & Beauty Gifts'
    ],
    subcategories: [
      'Bathing Soaps',
      'Shower Gels & Scrubs',
      'Oral Care',
      'Handwash',
      'Fragrance & Talc',
      'Bath Accessories',
      'Shampoo',
      'Conditioner',
      'Face Cleaning',
      'Body Lotions & Oils',
      'Body Treatment & Roll On',
      'Bath & Beauty Gifts'
    ],
    gradient: 'from-purple-400 to-indigo-500',
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-600',
    description: 'Bathing Soaps, Shower Gels & Scrubs, Oral Care, Handwash, Fragrance & Talc, Bath Accessories, Shampoo, Conditioner, Face Cleaning, Body Lotions & Oils, Body Treatment & Roll On, Bath & Beauty Gifts.'
  },
  {
    id: 'hair-care',
    name: 'Hair',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1250,
    popularItems: [
      'Shampoo',
      'Conditioner',
      'Hair Colour',
      'Hair Oil & Cream',
      'Hair Serums',
      'Hair Styling',
      'Appliances',
      'Hair Accessories'
    ],
    subcategories: [
      'Shampoo',
      'Conditioner',
      'Hair Colour',
      'Hair Oil & Cream',
      'Hair Serums',
      'Hair Styling',
      'Appliances',
      'Hair Accessories'
    ],
    gradient: 'from-rose-400 to-pink-500',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-600',
    description: 'Shampoo, Conditioner, Hair Colour, Hair Oil & Cream, Hair Serums, Hair Styling, Appliances, Hair Accessories.'
  },
  {
    id: 'skin-face',
    name: 'Skin & Face',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1890,
    popularItems: [
      'Sunscreen',
      'Face Cleaning',
      'Face Oil, Serum & Essence',
      'Face Moisturisers',
      'Body Lotions & Oils',
      'Lip & Eye Care',
      'Face Masks & Packs',
      'Toners & Mists',
      'Acne & Blackhead Fixers',
      "Men's Grooming",
      "Women's Grooming"
    ],
    subcategories: [
      'Sunscreen',
      'Face Cleaning',
      'Face Oil, Serum & Essence',
      'Face Moisturisers',
      'Body Lotions & Oils',
      'Lip & Eye Care',
      'Face Masks & Packs',
      'Toners & Mists',
      'Acne & Blackhead Fixers',
      "Men's Grooming",
      "Women's Grooming"
    ],
    gradient: 'from-pink-400 to-rose-500',
    accentBg: 'bg-pink-50',
    accentText: 'text-pink-600',
    description: "Sunscreen, Face Cleaning, Face Oil, Serum & Essence, Face Moisturisers, Body Lotions & Oils, Lip & Eye Care, Face Masks & Packs, Toners & Mists, Acne & Blackhead Fixers, Men's Grooming, Women's Grooming."
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2300,
    popularItems: [
      'Lipstick & Gloss',
      'Cleansers & Toners',
      'Foundation & Compact',
      'Blush & Highlighter',
      'Primer & Concealer',
      'Kajal & Eyeliners',
      'Bindi, Bangles & Others',
      'Nail Paints & Accessories',
      'Beauty Accessories',
      'Bath & Beauty Gifts'
    ],
    subcategories: [
      'Lipstick & Gloss',
      'Cleansers & Toners',
      'Foundation & Compact',
      'Blush & Highlighter',
      'Primer & Concealer',
      'Kajal & Eyeliners',
      'Bindi, Bangles & Others',
      'Nail Paints & Accessories',
      'Beauty Accessories',
      'Bath & Beauty Gifts'
    ],
    gradient: 'from-fuchsia-500 to-pink-600',
    accentBg: 'bg-fuchsia-50',
    accentText: 'text-fuchsia-600',
    description: 'Lipstick & Gloss, Cleansers & Toners, Foundation & Compact, Blush & Highlighter, Primer & Concealer, Kajal & Eyeliners, Bindi, Bangles & Others, Nail Paints & Accessories, Beauty Accessories, Bath & Beauty Gifts.'
  },
  {
    id: 'feminine-hygiene',
    name: 'Feminine Hygiene',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 980,
    popularItems: [
      'Sanitary Pads',
      'Tampons & Menstrual Cups',
      'Period Panty',
      'Period Pain Relief',
      'Intimate Wash & Wipes',
      'Hair Removal',
      'Mom Care'
    ],
    subcategories: [
      'Sanitary Pads',
      'Tampons & Menstrual Cups',
      'Period Panty',
      'Period Pain Relief',
      'Intimate Wash & Wipes',
      'Hair Removal',
      'Mom Care'
    ],
    gradient: 'from-pink-500 to-rose-600',
    accentBg: 'bg-pink-50',
    accentText: 'text-pink-600',
    description: 'Sanitary Pads, Tampons & Menstrual Cups, Period Panty, Period Pain Relief, Intimate Wash & Wipes, Hair Removal, Mom Care.'
  },
  {
    id: 'baby-care-qc',
    name: 'Baby Care',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1640,
    popularItems: [
      'Diaper & Wipes',
      'Baby Food',
      'Baby Shampoo & Soaps',
      'Skin & Hair Care',
      'Feeding Essentials',
      'Clothes & Accessories',
      'Health & Hygiene',
      'Baby Oral Care',
      'Baby Toys & Gifts',
      'Baby Gear',
      'Mom Care Needs'
    ],
    subcategories: [
      'Diaper & Wipes',
      'Baby Food',
      'Baby Shampoo & Soaps',
      'Skin & Hair Care',
      'Feeding Essentials',
      'Clothes & Accessories',
      'Health & Hygiene',
      'Baby Oral Care',
      'Baby Toys & Gifts',
      'Baby Gear',
      'Mom Care Needs'
    ],
    gradient: 'from-sky-400 to-blue-500',
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-600',
    description: 'Diaper & Wipes, Baby Food, Baby Shampoo & Soaps, Skin & Hair Care, Feeding Essentials, Clothes & Accessories, Health & Hygiene, Baby Oral Care, Baby Toys & Gifts, Baby Gear, Mom Care Needs.'
  },
  {
    id: 'health-pharma',
    name: 'Health & Pharma',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2150,
    popularItems: [
      'Fever & Pain Relief',
      'Cough, Cold & Flu',
      'Masks & Sanitizers',
      'Stomach & Digestive Care',
      'Protein Supplements',
      'Vitamins & Supplements',
      'Derma Medicines',
      'Bandaid & Wound Care',
      'Eye & Ear Care',
      'Adult Diapers',
      'Health & Ortho Supports',
      'Gynaecology Medicines',
      'Oral Care',
      'Diabetes Medicines',
      'Heart Medicines',
      'Neuro Medicines',
      'Hangover Cure',
      'Health & Wellness E-Cards'
    ],
    subcategories: [
      'Fever & Pain Relief',
      'Cough, Cold & Flu',
      'Masks & Sanitizers',
      'Stomach & Digestive Care',
      'Protein Supplements',
      'Vitamins & Supplements',
      'Derma Medicines',
      'Bandaid & Wound Care',
      'Eye & Ear Care',
      'Adult Diapers',
      'Health & Ortho Supports',
      'Gynaecology Medicines',
      'Oral Care',
      'Diabetes Medicines',
      'Heart Medicines',
      'Neuro Medicines',
      'Hangover Cure',
      'Health & Wellness E-Cards'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    description: 'Fever & Pain Relief, Cough, Cold & Flu, Masks & Sanitizers, Stomach & Digestive Care, Protein Supplements, Vitamins & Supplements, Derma Medicines, Bandaid & Wound Care, Eye & Ear Care, Adult Diapers, Health & Ortho Supports, Gynaecology Medicines, Oral Care, Diabetes Medicines, Heart Medicines, Neuro Medicines, Hangover Cure, Health & Wellness E-Cards.'
  },
  {
    id: 'sexual-wellness',
    name: 'Sexual Wellness',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 650,
    popularItems: [
      'Massagers',
      'Condoms',
      'Lubricants',
      'Enhancers',
      'Adult Games',
      'Test Kits',
      'Medicines'
    ],
    subcategories: [
      'Massagers',
      'Condoms',
      'Lubricants',
      'Enhancers',
      'Adult Games',
      'Test Kits',
      'Medicines'
    ],
    gradient: 'from-rose-500 to-red-600',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-600',
    description: 'Massagers, Condoms, Lubricants, Enhancers, Adult Games, Test Kits, Medicines.'
  },
  {
    id: 'vegetables-fruits',
    name: 'Vegetables & Fruits',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2890,
    popularItems: [
      'Fresh Vegetables',
      'Fresh Fruits',
      'Exotics',
      'Coriander & Others',
      'Freshly Cut & Sprouts',
      'Trusted Organics',
      'Flowers & Leaves',
      'Seasonal',
      'Frozen Veg',
      'Hydroponic'
    ],
    subcategories: [
      'Fresh Vegetables',
      'Fresh Fruits',
      'Exotics',
      'Coriander & Others',
      'Freshly Cut & Sprouts',
      'Trusted Organics',
      'Flowers & Leaves',
      'Seasonal',
      'Frozen Veg',
      'Hydroponic'
    ],
    gradient: 'from-green-500 to-emerald-600',
    accentBg: 'bg-green-50',
    accentText: 'text-green-600',
    description: 'Fresh Vegetables, Fresh Fruits, Exotics, Coriander & Others, Freshly Cut & Sprouts, Trusted Organics, Flowers & Leaves, Seasonal, Frozen Veg, Hydroponic.'
  },
  {
    id: 'atta-rice-dal',
    name: 'Atta, Rice & Dal',
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2100,
    popularItems: [
      'Atta',
      'Rice',
      'Dal',
      'Besan, Sooji & Maida',
      'Rajma, Chhole & Others',
      'Millet & Other Flours',
      'Organic',
      'Poha, Daliya & Other Grains',
      'Summer Specials'
    ],
    subcategories: [
      'Atta',
      'Rice',
      'Dal',
      'Besan, Sooji & Maida',
      'Rajma, Chhole & Others',
      'Millet & Other Flours',
      'Organic',
      'Poha, Daliya & Other Grains',
      'Summer Specials'
    ],
    gradient: 'from-amber-500 to-yellow-600',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Atta, Rice, Dal, Besan, Sooji & Maida, Rajma, Chhole & Others, Millet & Other Flours, Organic, Poha, Daliya & Other Grains, Summer Specials.'
  },
  {
    id: 'oil-ghee-masala',
    name: 'Oil, Ghee & Masala',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1950,
    popularItems: [
      'Oil',
      'Desi Ghee',
      'Cow Ghee',
      'Powdered Spices',
      'Non Veg Spices',
      'Salt, Sugar & Jaggery',
      'Whole Spices',
      'Gravy Mixes & Pastes',
      'Herbs & Seasoning',
      'Organic'
    ],
    subcategories: [
      'Oil',
      'Desi Ghee',
      'Cow Ghee',
      'Powdered Spices',
      'Non Veg Spices',
      'Salt, Sugar & Jaggery',
      'Whole Spices',
      'Gravy Mixes & Pastes',
      'Herbs & Seasoning',
      'Organic'
    ],
    gradient: 'from-orange-500 to-amber-600',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-600',
    description: 'Oil, Desi Ghee, Cow Ghee, Powdered Spices, Non Veg Spices, Salt, Sugar & Jaggery, Whole Spices, Gravy Mixes & Pastes, Herbs & Seasoning, Organic.'
  },
  {
    id: 'dairy-bread-eggs',
    name: 'Dairy, Bread & Eggs',
    icon: 'Milk',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2400,
    popularItems: [
      'Milk',
      'Bread & Pav',
      'Eggs',
      'Curd & Yogurt',
      'Cheese & Butter',
      'Batter',
      'Paneer & Tofu',
      'Soy Milk & More',
      'Lassi & Milkshakes',
      'Cream & Whitener'
    ],
    subcategories: [
      'Milk',
      'Bread & Pav',
      'Eggs',
      'Curd & Yogurt',
      'Cheese & Butter',
      'Batter',
      'Paneer & Tofu',
      'Soy Milk & More',
      'Lassi & Milkshakes',
      'Cream & Whitener'
    ],
    gradient: 'from-blue-400 to-cyan-500',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    description: 'Milk, Bread & Pav, Eggs, Curd & Yogurt, Cheese & Butter, Batter, Paneer & Tofu, Soy Milk & More, Lassi & Milkshakes, Cream & Whitener.'
  },
  {
    id: 'bakery-biscuits',
    name: 'Bakery & Biscuits',
    icon: 'Cookie',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1780,
    popularItems: [
      'Cookies',
      'Cream Biscuits',
      'Healthy & Digestive',
      'Sweet & Salty',
      'Glucose & Marie',
      'Rusks & Wafers',
      'Cakes & Rolls',
      'Baking Ingredients',
      'Gourmet Bakery',
      'Biscuit Gift Pack'
    ],
    subcategories: [
      'Cookies',
      'Cream Biscuits',
      'Healthy & Digestive',
      'Sweet & Salty',
      'Glucose & Marie',
      'Rusks & Wafers',
      'Cakes & Rolls',
      'Baking Ingredients',
      'Gourmet Bakery',
      'Biscuit Gift Pack'
    ],
    gradient: 'from-amber-600 to-yellow-700',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Cookies, Cream Biscuits, Healthy & Digestive, Sweet & Salty, Glucose & Marie, Rusks & Wafers, Cakes & Rolls, Baking Ingredients, Gourmet Bakery, Biscuit Gift Pack.'
  },
  {
    id: 'dry-fruits-cereals',
    name: 'Dry Fruits & Cereals',
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1350,
    popularItems: [
      'Dry Fruits',
      'Dry Fruits Snacks',
      'Corn Flakes & Kids Cereals',
      'Muesli & Granola',
      'Oats & Daliya',
      'Dates',
      'Seeds',
      'Vermicelli & Poha',
      'Organic & Premium',
      'Dry Fruit Gift Packs'
    ],
    subcategories: [
      'Dry Fruits',
      'Dry Fruits Snacks',
      'Corn Flakes & Kids Cereals',
      'Muesli & Granola',
      'Oats & Daliya',
      'Dates',
      'Seeds',
      'Vermicelli & Poha',
      'Organic & Premium',
      'Dry Fruit Gift Packs'
    ],
    gradient: 'from-amber-500 to-orange-500',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Dry Fruits, Dry Fruits Snacks, Corn Flakes & Kids Cereals, Muesli & Granola, Oats & Daliya, Dates, Seeds, Vermicelli & Poha, Organic & Premium, Dry Fruit Gift Packs.'
  },
  {
    id: 'chicken-meat-fish',
    name: 'Chicken, Meat & Fish',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 890,
    popularItems: [
      'Chicken',
      'Fresh Meat',
      'Fish & Seafood',
      'Mutton',
      'Frozen Non-Veg Snacks',
      'Non Veg Spices',
      'Sausage, Salami & Ham',
      'Exotic Meat',
      'Fresh Marinades',
      'Plant Based Meat',
      'Eggs'
    ],
    subcategories: [
      'Chicken',
      'Fresh Meat',
      'Fish & Seafood',
      'Mutton',
      'Frozen Non-Veg Snacks',
      'Non Veg Spices',
      'Sausage, Salami & Ham',
      'Exotic Meat',
      'Fresh Marinades',
      'Plant Based Meat',
      'Eggs'
    ],
    gradient: 'from-red-600 to-rose-700',
    accentBg: 'bg-red-50',
    accentText: 'text-red-600',
    description: 'Chicken, Fresh Meat, Fish & Seafood, Mutton, Frozen Non-Veg Snacks, Non Veg Spices, Sausage, Salami & Ham, Exotic Meat, Fresh Marinades, Plant Based Meat, Eggs.'
  },
  {
    id: 'kitchenware-appliances',
    name: 'Kitchenware & Appliances',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1620,
    popularItems: [
      'Bottles & Flasks',
      'Kitchen Accessories',
      'Mugs & Glasses',
      'Cookware & Sets',
      'Storage & Containers',
      'Barware',
      'Lunch Boxes',
      'Cutting & Chopping',
      'Dining & Serveware',
      'Kitchen Appliances',
      'Tissues & Disposables'
    ],
    subcategories: [
      'Bottles & Flasks',
      'Kitchen Accessories',
      'Mugs & Glasses',
      'Cookware & Sets',
      'Storage & Containers',
      'Barware',
      'Lunch Boxes',
      'Cutting & Chopping',
      'Dining & Serveware',
      'Kitchen Appliances',
      'Tissues & Disposables'
    ],
    gradient: 'from-slate-600 to-zinc-700',
    accentBg: 'bg-slate-50',
    accentText: 'text-slate-600',
    description: 'Bottles & Flasks, Kitchen Accessories, Mugs & Glasses, Cookware & Sets, Storage & Containers, Barware, Lunch Boxes, Cutting & Chopping, Dining & Serveware, Kitchen Appliances, Tissues & Disposables.'
  },
  {
    id: 'chips-namkeen',
    name: 'Chips & Namkeen',
    icon: 'Cookie',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2150,
    popularItems: [
      'Chips & Wafers',
      'Bhujia & Mixtures',
      'Namkeen Snacks',
      'Nachos',
      'Healthy Snacks',
      'Popcorn',
      'Papad & Fryums',
      'Premium',
      'Gift Packs'
    ],
    subcategories: [
      'Chips & Wafers',
      'Bhujia & Mixtures',
      'Namkeen Snacks',
      'Nachos',
      'Healthy Snacks',
      'Popcorn',
      'Papad & Fryums',
      'Premium',
      'Gift Packs'
    ],
    gradient: 'from-yellow-400 to-amber-500',
    accentBg: 'bg-yellow-50',
    accentText: 'text-yellow-600',
    description: 'Chips & Wafers, Bhujia & Mixtures, Namkeen Snacks, Nachos, Healthy Snacks, Popcorn, Papad & Fryums, Premium, Gift Packs.'
  },
  {
    id: 'sweets-chocolates',
    name: 'Sweets & Chocolates',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1890,
    popularItems: [
      'Chocolates',
      'Chocolate Packs',
      'Chocolate Gift Pack',
      'Indian Sweets',
      'Candies & Gum',
      'Premium',
      'Energy Bars',
      'Syrups'
    ],
    subcategories: [
      'Chocolates',
      'Chocolate Packs',
      'Chocolate Gift Pack',
      'Indian Sweets',
      'Candies & Gum',
      'Premium',
      'Energy Bars',
      'Syrups'
    ],
    gradient: 'from-pink-500 to-purple-600',
    accentBg: 'bg-pink-50',
    accentText: 'text-pink-600',
    description: 'Chocolates, Chocolate Packs, Chocolate Gift Pack, Indian Sweets, Candies & Gum, Premium, Energy Bars, Syrups.'
  },
  {
    id: 'drinks-juices',
    name: 'Drinks & Juices',
    icon: 'GlassWater',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1980,
    popularItems: [
      'Soft Drinks',
      'Fruit Juices',
      'Zero Sugar Drinks',
      'Energy Drinks',
      'Hydration Drinks',
      'Soda & Mixers',
      'Water & Ice Cubes',
      'Mango Drinks',
      'Soy Milk & More',
      'Cold Coffee & Ice Tea',
      'Coconut Water',
      'Concentrates & Syrups',
      'Premium',
      'Beverages Gift Packs'
    ],
    subcategories: [
      'Soft Drinks',
      'Fruit Juices',
      'Zero Sugar Drinks',
      'Energy Drinks',
      'Hydration Drinks',
      'Soda & Mixers',
      'Water & Ice Cubes',
      'Mango Drinks',
      'Soy Milk & More',
      'Cold Coffee & Ice Tea',
      'Coconut Water',
      'Concentrates & Syrups',
      'Premium',
      'Beverages Gift Packs'
    ],
    gradient: 'from-orange-400 to-red-500',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-600',
    description: 'Soft Drinks, Fruit Juices, Zero Sugar Drinks, Energy Drinks, Hydration Drinks, Soda & Mixers, Water & Ice Cubes, Mango Drinks, Soy Milk & More, Cold Coffee & Ice Tea, Coconut Water, Concentrates & Syrups, Premium, Beverages Gift Packs.'
  },
  {
    id: 'tea-coffee-milk',
    name: 'Tea, Coffee & Milk Drinks',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1750,
    popularItems: [
      'Tea',
      'Coffee',
      'Hot Chocolate',
      'Green Tea',
      'Milk Drinks',
      'Cold Coffee & Ice Tea',
      'Bags & Premixes',
      'Premium',
      'Herbal Infusion'
    ],
    subcategories: [
      'Tea',
      'Coffee',
      'Hot Chocolate',
      'Green Tea',
      'Milk Drinks',
      'Cold Coffee & Ice Tea',
      'Bags & Premixes',
      'Premium',
      'Herbal Infusion'
    ],
    gradient: 'from-amber-600 to-emerald-700',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Tea, Coffee, Hot Chocolate, Green Tea, Milk Drinks, Cold Coffee & Ice Tea, Bags & Premixes, Premium, Herbal Infusion.'
  },
  {
    id: 'instant-food',
    name: 'Instant Food',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1680,
    popularItems: [
      'Noodles',
      'Frozen Veg Snacks',
      'Pasta',
      'Frozen Non-Veg Snacks',
      'Soup',
      'Ready to Eat',
      'Idli & Dosa Batter',
      'Dessert & Cake Mixes',
      'Organic & Premium',
      'Energy Bars'
    ],
    subcategories: [
      'Noodles',
      'Frozen Veg Snacks',
      'Pasta',
      'Frozen Non-Veg Snacks',
      'Soup',
      'Ready to Eat',
      'Idli & Dosa Batter',
      'Dessert & Cake Mixes',
      'Organic & Premium',
      'Energy Bars'
    ],
    gradient: 'from-red-500 to-amber-500',
    accentBg: 'bg-red-50',
    accentText: 'text-red-600',
    description: 'Noodles, Frozen Veg Snacks, Pasta, Frozen Non-Veg Snacks, Soup, Ready to Eat, Idli & Dosa Batter, Dessert & Cake Mixes, Organic & Premium, Energy Bars.'
  },
  {
    id: 'sauces-spreads',
    name: 'Sauces & Spreads',
    icon: 'GlassWater',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1240,
    popularItems: [
      'Tomato Ketchup',
      'Jam & Spreads',
      'Mayonnaise',
      'Chutney & Pickle',
      'Peanut Butter',
      'Asian Sauces',
      'Chyawanprash & Honey',
      'Syrups',
      'Dips & Salad Dressings',
      'Cooking Sauces',
      'Premium'
    ],
    subcategories: [
      'Tomato Ketchup',
      'Jam & Spreads',
      'Mayonnaise',
      'Chutney & Pickle',
      'Peanut Butter',
      'Asian Sauces',
      'Chyawanprash & Honey',
      'Syrups',
      'Dips & Salad Dressings',
      'Cooking Sauces',
      'Premium'
    ],
    gradient: 'from-rose-500 to-red-600',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-600',
    description: 'Tomato Ketchup, Jam & Spreads, Mayonnaise, Chutney & Pickle, Peanut Butter, Asian Sauces, Chyawanprash & Honey, Syrups, Dips & Salad Dressings, Cooking Sauces, Premium.'
  },
  {
    id: 'paan-corner',
    name: 'Paan Corner',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 540,
    popularItems: [
      'Cigarettes',
      'Lighters',
      'Cigar',
      'Rolling Needs',
      'Hookah Needs',
      'Rolling Tobacco',
      'Paan Masala',
      'Ashtrays',
      'Mouth Fresheners & Gums',
      'Non-Tobacco Blends',
      'Smoking Cessation'
    ],
    subcategories: [
      'Cigarettes',
      'Lighters',
      'Cigar',
      'Rolling Needs',
      'Hookah Needs',
      'Rolling Tobacco',
      'Paan Masala',
      'Ashtrays',
      'Mouth Fresheners & Gums',
      'Non-Tobacco Blends',
      'Smoking Cessation'
    ],
    gradient: 'from-emerald-500 to-green-600',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    description: 'Cigarettes, Lighters, Cigar, Rolling Needs, Hookah Needs, Rolling Tobacco, Paan Masala, Ashtrays, Mouth Fresheners & Gums, Non-Tobacco Blends, Smoking Cessation.'
  },
  {
    id: 'ice-creams-more',
    name: 'Ice Creams & More',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1320,
    popularItems: [
      'Tubs',
      'Sticks',
      'Cones',
      'Cassata & Sandwich',
      'Single Serve Cups',
      'Cakes & Others',
      'Guilt-Free',
      'Gourmet',
      'Syrups'
    ],
    subcategories: [
      'Tubs',
      'Sticks',
      'Cones',
      'Cassata & Sandwich',
      'Single Serve Cups',
      'Cakes & Others',
      'Guilt-Free',
      'Gourmet',
      'Syrups'
    ],
    gradient: 'from-cyan-400 to-blue-500',
    accentBg: 'bg-cyan-50',
    accentText: 'text-cyan-600',
    description: 'Tubs, Sticks, Cones, Cassata & Sandwich, Single Serve Cups, Cakes & Others, Guilt-Free, Gourmet, Syrups.'
  },
  {
    id: 'home-lifestyle',
    name: 'Home & Lifestyle',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 2450,
    popularItems: [
      'Home Decor',
      'Plants & Bouquets',
      'Bedsheets & Towels',
      'Gardening',
      'Decorative Lights',
      'Home Needs',
      'Tissues & Disposables',
      'Jewellery',
      'Innerwear',
      'Lifestyle Accessories',
      'Party & Festive Needs',
      'Socks & Handkerchiefs',
      'Fresheners',
      'Pooja Needs',
      'Bathroom Essentials',
      'Bags'
    ],
    subcategories: [
      'Home Decor',
      'Plants & Bouquets',
      'Bedsheets & Towels',
      'Gardening',
      'Decorative Lights',
      'Home Needs',
      'Tissues & Disposables',
      'Jewellery',
      'Innerwear',
      'Lifestyle Accessories',
      'Party & Festive Needs',
      'Socks & Handkerchiefs',
      'Fresheners',
      'Pooja Needs',
      'Bathroom Essentials',
      'Bags'
    ],
    gradient: 'from-slate-500 to-zinc-600',
    accentBg: 'bg-slate-50',
    accentText: 'text-slate-600',
    description: 'Home Decor, Plants & Bouquets, Bedsheets & Towels, Gardening, Decorative Lights, Home Needs, Tissues & Disposables, Jewellery, Innerwear, Lifestyle Accessories, Party & Festive Needs, Socks & Handkerchiefs, Fresheners, Pooja Needs, Bathroom Essentials, Bags.'
  },
  {
    id: 'cleaners-repellents',
    name: 'Cleaners & Repellents',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1890,
    popularItems: [
      'Repellents & Disinfectants',
      'Detergent Powder & Bars',
      'Liquid Detergents',
      'Laundry Additives',
      'Dishwashing Gels & Bars',
      'Dishwashing Accessories',
      'Toilet Cleaners',
      'Floor Cleaners',
      'Cleaning Tools',
      'Garbage Bags',
      'Glass, Metal Cleaners & Others',
      'Shoe Care',
      'Machine & Car Care',
      'Household Appliance Cleaners'
    ],
    subcategories: [
      'Repellents & Disinfectants',
      'Detergent Powder & Bars',
      'Liquid Detergents',
      'Laundry Additives',
      'Dishwashing Gels & Bars',
      'Dishwashing Accessories',
      'Toilet Cleaners',
      'Floor Cleaners',
      'Cleaning Tools',
      'Garbage Bags',
      'Glass, Metal Cleaners & Others',
      'Shoe Care',
      'Machine & Car Care',
      'Household Appliance Cleaners'
    ],
    gradient: 'from-teal-500 to-cyan-600',
    accentBg: 'bg-teal-50',
    accentText: 'text-teal-600',
    description: 'Repellents & Disinfectants, Detergent Powder & Bars, Liquid Detergents, Laundry Additives, Dishwashing Gels & Bars, Dishwashing Accessories, Toilet Cleaners, Floor Cleaners, Cleaning Tools, Garbage Bags, Glass, Metal Cleaners & Others, Shoe Care, Machine & Car Care, Household Appliance Cleaners.'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1780,
    popularItems: [
      'Trimmers & Hair Appliances',
      'Earphones & Headsets',
      'Speakers',
      'Mobile & Computer',
      'Decorative Lights',
      'Chargers & Cables',
      'Smart Watches',
      'Kitchen Appliances',
      'Laptop & Mobile Phones',
      'Batteries',
      'Extension Cables & Accessories',
      'Home Appliances',
      'Music Instruments & Accessories',
      'Electronics E-Card'
    ],
    subcategories: [
      'Trimmers & Hair Appliances',
      'Earphones & Headsets',
      'Speakers',
      'Mobile & Computer',
      'Decorative Lights',
      'Chargers & Cables',
      'Smart Watches',
      'Kitchen Appliances',
      'Laptop & Mobile Phones',
      'Batteries',
      'Extension Cables & Accessories',
      'Home Appliances',
      'Music Instruments & Accessories',
      'Electronics E-Card'
    ],
    gradient: 'from-indigo-600 to-blue-700',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-600',
    description: 'Trimmers & Hair Appliances, Earphones & Headsets, Speakers, Mobile & Computer, Decorative Lights, Chargers & Cables, Smart Watches, Kitchen Appliances, Laptop & Mobile Phones, Batteries, Extension Cables & Accessories, Home Appliances, Music Instruments & Accessories, Electronics E-Card.'
  },
  {
    id: 'stationery-games',
    name: 'Stationery & Games',
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 1540,
    popularItems: [
      'Notebooks & Diaries',
      'Pens & Pencils',
      'Toys & Games',
      'Glue & Tape',
      'Books & Magazines',
      'Bags & School Needs',
      'Children\'s Books',
      'Arts & Crafts',
      'Files & Office Needs',
      'Gift Wraps & Bags',
      'Sports & Gym',
      'Shoe Polish & Brush'
    ],
    subcategories: [
      'Notebooks & Diaries',
      'Pens & Pencils',
      'Toys & Games',
      'Glue & Tape',
      'Books & Magazines',
      'Bags & School Needs',
      'Children\'s Books',
      'Arts & Crafts',
      'Files & Office Needs',
      'Gift Wraps & Bags',
      'Sports & Gym',
      'Shoe Polish & Brush'
    ],
    gradient: 'from-amber-500 to-rose-500',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-600',
    description: 'Notebooks & Diaries, Pens & Pencils, Toys & Games, Glue & Tape, Books & Magazines, Bags & School Needs, Children\'s Books, Arts & Crafts, Files & Office Needs, Gift Wraps & Bags, Sports & Gym, Shoe Polish & Brush.'
  },
  {
    id: 'stores',
    name: 'Stores',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 320,
    popularItems: [
      'Print Store',
      'Rakhi Gifts'
    ],
    subcategories: [
      'Print Store',
      'Rakhi Gifts'
    ],
    gradient: 'from-emerald-600 to-teal-700',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    description: 'Print Store, Rakhi Gifts.'
  },
  {
    id: 'e-cards',
    name: 'E-Cards',
    icon: 'Gift',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    itemCount: 450,
    popularItems: [
      'E-Gift Cards'
    ],
    subcategories: [
      'E-Gift Cards'
    ],
    gradient: 'from-purple-500 to-pink-500',
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-600',
    description: 'E-Gift Cards.'
  }
];

export const DETAILED_SHOPS: DetailedShop[] = [
  {
    id: 'shop-1',
    name: 'Green Earth Organics',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
  },
  {
    id: 'shop-7',
    name: 'Urban Glow Beauty & Cosmetics',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
    distance: '1.8 km',
    latitude: 37.7850,
    longitude: -122.4080,
    rating: 4.9,
    reviewsCount: 156,
    freshnessBadge: '99% AI Verified',
    freshnessScore: 99,
    isOpen: true,
    openTime: '9:00 AM - 9:00 PM',
    openingHours: 'Mon-Sun: 9:00 AM - 9:00 PM',
    address: '204 Blossom Avenue, Downtown, CA 94105',
    nearbyLandmark: 'Opposite City Fashion Hub',
    category: 'Beauty & Cosmetics',
    phone: '+1 (555) 890-1234',
    inventoryCount: 410,
    description: 'Premier beauty hub carrying premium skincare, dermatological serums, organic lipsticks, and personal care.',
    verifiedItems: [
      { id: 'i25', name: 'Matte Liquid Lipstick', category: 'Beauty', price: '₹499', unit: 'each', freshnessScore: 99, inStock: true, lastUpdated: '5 mins ago', verifiedByAi: true },
      { id: 'i26', name: 'Vitamin C Face Serum 30ml', category: 'Skin & Face', price: '₹699', unit: 'bottle', freshnessScore: 98, inStock: true, lastUpdated: '12 mins ago', verifiedByAi: true },
      { id: 'i27', name: 'Hydrating Sunscreen SPF50', category: 'Skin & Face', price: '₹399', unit: 'tube', freshnessScore: 99, inStock: true, lastUpdated: '8 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Ananya Roy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Authentic products and great recommendation from the store team!',
        verifiedPurchase: true,
        itemPurchased: 'Vitamin C Face Serum'
      }
    ]
  },
  {
    id: 'shop-8',
    name: 'Paws & Whiskers Pet Superstore',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1600&q=80',
    distance: '2.5 km',
    latitude: 37.7710,
    longitude: -122.4210,
    rating: 4.8,
    reviewsCount: 210,
    freshnessBadge: '97% AI Verified',
    freshnessScore: 97,
    isOpen: true,
    openTime: '8:30 AM - 8:30 PM',
    openingHours: 'Mon-Sat: 8:30 AM - 8:30 PM',
    address: '512 Barking Lane, Westside, CA 94107',
    nearbyLandmark: 'Near Pet Care Clinic',
    category: 'Pet Care',
    phone: '+1 (555) 901-2345',
    inventoryCount: 380,
    description: 'Complete pet supply boutique offering premium dog kibble, cat treats, grooming shampoos, and interactive toys.',
    verifiedItems: [
      { id: 'i28', name: 'Adult Dog Kibble 3kg', category: 'Pet Care', price: '₹1,299', unit: 'bag', freshnessScore: 99, inStock: true, lastUpdated: '20 mins ago', verifiedByAi: true },
      { id: 'i29', name: 'Cat Tuna Treats 100g', category: 'Pet Care', price: '₹249', unit: 'pack', freshnessScore: 97, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i30', name: 'Herbal Pet Shampoo 500ml', category: 'Pet Care', price: '₹450', unit: 'bottle', freshnessScore: 98, inStock: true, lastUpdated: '30 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Liam O’Connor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'My dog loves their tuna treats! Great live stock updates.',
        verifiedPurchase: true,
        itemPurchased: 'Cat Tuna Treats'
      }
    ]
  },
  {
    id: 'shop-9',
    name: 'Apex Hardware & Electrical Supplies',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    distance: '3.0 km',
    latitude: 37.7620,
    longitude: -122.4050,
    rating: 4.7,
    reviewsCount: 134,
    freshnessBadge: '96% AI Verified',
    freshnessScore: 96,
    isOpen: true,
    openTime: '8:00 AM - 8:00 PM',
    openingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    address: '88 Industrial Park Rd, SoMa, CA 94103',
    nearbyLandmark: 'Next to Tech Park Gate 3',
    category: 'Plumbing & Electrical',
    phone: '+1 (555) 012-3456',
    inventoryCount: 520,
    description: 'Trusted neighborhood hardware supplier stocking electrical LED fittings, PVC pipes, multi-sockets, and tools.',
    verifiedItems: [
      { id: 'i31', name: 'Smart LED Bulb 12W', category: 'Plumbing & Electrical', price: '₹299', unit: 'each', freshnessScore: 100, inStock: true, lastUpdated: '10 mins ago', verifiedByAi: true },
      { id: 'i32', name: 'Multi-Plug Extension Cord', category: 'Plumbing & Electrical', price: '₹499', unit: 'each', freshnessScore: 99, inStock: true, lastUpdated: '25 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r11',
        author: 'Vikram Rao',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Very helpful staff and found exact extension cord needed.',
        verifiedPurchase: true,
        itemPurchased: 'Multi-Plug Extension Cord'
      }
    ]
  },
  {
    id: 'shop-10',
    name: 'Green Thumb Plant Nursery & Garden',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80',
    distance: '3.4 km',
    latitude: 37.7550,
    longitude: -122.4400,
    rating: 4.9,
    reviewsCount: 188,
    freshnessBadge: '98% AI Verified',
    freshnessScore: 98,
    isOpen: true,
    openTime: '7:30 AM - 7:30 PM',
    openingHours: 'Mon-Sun: 7:30 AM - 7:30 PM',
    address: '102 Eco Drive, Sunset District, CA 94122',
    nearbyLandmark: 'Beside Botanical Garden',
    category: 'Home & Lifestyle',
    phone: '+1 (555) 123-4567',
    inventoryCount: 290,
    description: 'Vibrant indoor plant shop offering potted succulents, botanical fertilizers, terracotta pots, and gardening tools.',
    verifiedItems: [
      { id: 'i33', name: 'Indoor Snake Plant in Pot', category: 'Home & Lifestyle', price: '₹499', unit: 'pot', freshnessScore: 98, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i34', name: 'Organic Soil Mix 5kg', category: 'Home & Lifestyle', price: '₹299', unit: 'bag', freshnessScore: 99, inStock: true, lastUpdated: '40 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r12',
        author: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Healthy indoor plants with great advice on soil care.',
        verifiedPurchase: true,
        itemPurchased: 'Indoor Snake Plant'
      }
    ]
  },
  {
    id: 'shop-11',
    name: 'SmartTech Electronics Hub',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    distance: '3.9 km',
    latitude: 37.7480,
    longitude: -122.4150,
    rating: 4.8,
    reviewsCount: 240,
    freshnessBadge: '99% AI Verified',
    freshnessScore: 99,
    isOpen: true,
    openTime: '10:00 AM - 9:30 PM',
    openingHours: 'Mon-Sun: 10:00 AM - 9:30 PM',
    address: '404 Cyber Arcade, Tech Hill, CA 94107',
    nearbyLandmark: 'Near Metro Plaza Exit B',
    category: 'Electronics',
    phone: '+1 (555) 234-5678',
    inventoryCount: 460,
    description: 'Modern gadgets & tech accessories store stocking fast chargers, power banks, wireless earbuds, and cables.',
    verifiedItems: [
      { id: 'i35', name: '65W Fast Charger Type-C', category: 'Electronics', price: '₹899', unit: 'each', freshnessScore: 100, inStock: true, lastUpdated: '5 mins ago', verifiedByAi: true },
      { id: 'i36', name: 'Wireless Bluetooth Earbuds', category: 'Electronics', price: '₹1,499', unit: 'pair', freshnessScore: 99, inStock: true, lastUpdated: '18 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r13',
        author: 'Daniel Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Great price on fast chargers and genuine warranty provided.',
        verifiedPurchase: true,
        itemPurchased: '65W Fast Charger'
      }
    ]
  },
  {
    id: 'shop-12',
    name: 'Kiddo & Toy Kingdom',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1600&q=80',
    distance: '4.2 km',
    latitude: 37.7400,
    longitude: -122.4300,
    rating: 4.9,
    reviewsCount: 175,
    freshnessBadge: '98% AI Verified',
    freshnessScore: 98,
    isOpen: true,
    openTime: '9:30 AM - 8:30 PM',
    openingHours: 'Mon-Sun: 9:30 AM - 8:30 PM',
    address: '305 Joy Lane, Family Square, CA 94118',
    nearbyLandmark: 'Beside Children Play Park',
    category: 'Stationery & Games',
    phone: '+1 (555) 345-6789',
    inventoryCount: 310,
    description: 'Family toy store offering educational board games, action figures, gel pens, art supplies, and kids books.',
    verifiedItems: [
      { id: 'i37', name: 'Monopoly Board Game', category: 'Stationery & Games', price: '₹799', unit: 'box', freshnessScore: 99, inStock: true, lastUpdated: '12 mins ago', verifiedByAi: true },
      { id: 'i38', name: 'Pastel Gel Pens Pack of 10', category: 'Stationery & Games', price: '₹199', unit: 'pack', freshnessScore: 98, inStock: true, lastUpdated: '35 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r14',
        author: 'Emily Watson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Lovely selection of board games and friendly staff.',
        verifiedPurchase: true,
        itemPurchased: 'Monopoly Board Game'
      }
    ]
  },
  {
    id: 'shop-13',
    name: 'Pooja Divine Essentials',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
    distance: '1.2 km',
    latitude: 37.7800,
    longitude: -122.4100,
    rating: 4.9,
    reviewsCount: 215,
    freshnessBadge: '99% AI Verified',
    freshnessScore: 99,
    isOpen: true,
    openTime: '6:00 AM - 9:00 PM',
    openingHours: 'Mon-Sun: 6:00 AM - 9:00 PM',
    address: '12 Temple Street, Heritage Arcade, CA 94103',
    nearbyLandmark: 'Near Ganesha Temple Gate',
    category: 'Home & Lifestyle',
    phone: '+1 (555) 456-7890',
    inventoryCount: 260,
    description: 'Traditional pooja store offering pure brass diyas, organic camphor, incense sticks, cotton wicks, and garlands.',
    verifiedItems: [
      { id: 'i39', name: 'Handcrafted Brass Diya', category: 'Pooja Essentials', price: '₹349', unit: 'each', freshnessScore: 100, inStock: true, lastUpdated: '10 mins ago', verifiedByAi: true },
      { id: 'i40', name: 'Organic Sandalwood Incense 100g', category: 'Pooja Essentials', price: '₹149', unit: 'pack', freshnessScore: 99, inStock: true, lastUpdated: '20 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r15',
        author: 'Ramesh Kulkarni',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Pure aromatic incense and beautiful brass diyas.',
        verifiedPurchase: true,
        itemPurchased: 'Handcrafted Brass Diya'
      }
    ]
  },
  {
    id: 'shop-14',
    name: 'Velvet & Stitch Sewing Crafts',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1600&q=80',
    distance: '2.8 km',
    latitude: 37.7650,
    longitude: -122.4250,
    rating: 4.8,
    reviewsCount: 142,
    freshnessBadge: '97% AI Verified',
    freshnessScore: 97,
    isOpen: true,
    openTime: '9:00 AM - 8:00 PM',
    openingHours: 'Mon-Sat: 9:00 AM - 8:00 PM',
    address: '88 Craft Lane, Artisan District, CA 94110',
    nearbyLandmark: 'Opposite Textile House',
    category: 'Stationery & Games',
    phone: '+1 (555) 567-8901',
    inventoryCount: 340,
    description: 'Specialty haberdashery store stocking colorful embroidery threads, sewing kits, designer buttons, and fabrics.',
    verifiedItems: [
      { id: 'i41', name: 'Cotton Embroidery Thread Set', category: 'Sewing & Crafts', price: '₹299', unit: 'pack', freshnessScore: 98, inStock: true, lastUpdated: '15 mins ago', verifiedByAi: true },
      { id: 'i42', name: 'Professional Tailor Scissors 10"', category: 'Sewing & Crafts', price: '₹499', unit: 'each', freshnessScore: 99, inStock: true, lastUpdated: '30 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r16',
        author: 'Meera Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'High quality tailor scissors and huge variety of threads.',
        verifiedPurchase: true,
        itemPurchased: 'Professional Tailor Scissors'
      }
    ]
  },
  {
    id: 'shop-15',
    name: 'Traveler’s Hub & Backpacks',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1600&q=80',
    distance: '3.6 km',
    latitude: 37.7500,
    longitude: -122.4000,
    rating: 4.9,
    reviewsCount: 198,
    freshnessBadge: '99% AI Verified',
    freshnessScore: 99,
    isOpen: true,
    openTime: '9:30 AM - 9:00 PM',
    openingHours: 'Mon-Sun: 9:30 AM - 9:00 PM',
    address: '302 Transit Avenue, Airport Road, CA 94128',
    nearbyLandmark: 'Near Central Bus Terminal',
    category: 'Home & Lifestyle',
    phone: '+1 (555) 678-9012',
    inventoryCount: 410,
    description: 'Travel gear boutique stocking TSA luggage trolleys, waterproof hiking backpacks, neck pillows, and organizers.',
    verifiedItems: [
      { id: 'i43', name: 'Cabin Trolley Bag 20"', category: 'Travel Accessories', price: '₹2,499', unit: 'each', freshnessScore: 99, inStock: true, lastUpdated: '8 mins ago', verifiedByAi: true },
      { id: 'i44', name: 'Memory Foam Travel Neck Pillow', category: 'Travel Accessories', price: '₹599', unit: 'each', freshnessScore: 98, inStock: true, lastUpdated: '25 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r17',
        author: 'Karan Malhotra',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Durable cabin trolley bag for my flight. Great customer service.',
        verifiedPurchase: true,
        itemPurchased: 'Cabin Trolley Bag'
      }
    ]
  },
  {
    id: 'shop-16',
    name: 'Sole Care Footwear Clinic',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1600&q=80',
    distance: '4.0 km',
    latitude: 37.7420,
    longitude: -122.4200,
    rating: 4.7,
    reviewsCount: 165,
    freshnessBadge: '96% AI Verified',
    freshnessScore: 96,
    isOpen: true,
    openTime: '10:00 AM - 8:30 PM',
    openingHours: 'Mon-Sat: 10:00 AM - 8:30 PM',
    address: '77 Cobbler Street, Market Square, CA 94102',
    nearbyLandmark: 'Beside Grand Plaza Hotel',
    category: 'Bath & Body',
    phone: '+1 (555) 789-0123',
    inventoryCount: 230,
    description: 'Shoe care specialty shop carrying leather polish, sneaker cleaning kits, memory foam insoles, and shoe horns.',
    verifiedItems: [
      { id: 'i45', name: 'Sneaker Cleaner Foam Kit', category: 'Footwear Care', price: '₹399', unit: 'kit', freshnessScore: 98, inStock: true, lastUpdated: '12 mins ago', verifiedByAi: true },
      { id: 'i46', name: 'Black Leather Polish Cream', category: 'Footwear Care', price: '₹199', unit: 'jar', freshnessScore: 99, inStock: true, lastUpdated: '40 mins ago', verifiedByAi: true }
    ],
    reviews: [
      {
        id: 'r18',
        author: 'Siddharth Roy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Sneaker cleaner kit worked magic on my white shoes!',
        verifiedPurchase: true,
        itemPurchased: 'Sneaker Cleaner Foam Kit'
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
