export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  popularItems: string[];
  gradient: string;
  accentBg: string;
  accentText: string;
  description: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  price: number | string;
  unit: string;
  freshnessScore: number;
  availableQty?: number;
  inStock: boolean;
  lastUpdated: string;
  verifiedByAi?: boolean;
  organic?: boolean;
  image?: string;
}

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

export interface Shop {
  id: string;
  name: string;
  image: string;
  coverImage?: string;
  distance: number | string; // numeric or formatted string
  distanceText?: string;
  rating: number;
  reviewsCount: number;
  freshnessBadge: string;
  freshnessScore: number;
  isOpen: boolean;
  openTime: string;
  openingHours?: string;
  address: string;
  category: string;
  phone: string;
  inventoryCount: number;
  description?: string;
  verifiedItems: StockItem[];
  reviews?: ShopReview[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  shopId: string;
  shopName: string;
  shopAddress: string;
  shopRating: number;
  price: number;
  unit: string;
  availableQty: number;
  distance: number;
  freshnessScore: number;
  updatedTime: string;
  verifiedByAi: boolean;
  organic: boolean;
}

export interface AiFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
  tag: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  role: 'shopkeeper' | 'ai' | 'customer';
  roleLabel: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  previewSnippet?: {
    type: 'photo' | 'audio' | 'ai-json' | 'search' | 'location' | 'rating';
    content: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  role: 'customer' | 'shopkeeper' | 'admin';
  savedShopsCount: number;
  rewardsPoints: number;
  tier: string;
  preferredRadius: number;
}

export interface ShopkeeperMetrics {
  shopId: string;
  shopName: string;
  todaySalesVolume: string;
  todayUpdatesCount: number;
  aiVerificationAccuracy: number;
  lowStockAlerts: number;
}

export interface AdminStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
  color: string;
}
