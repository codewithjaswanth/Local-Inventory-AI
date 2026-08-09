export interface AiReviewItem {
  id: string;
  timestamp: string;
  source: 'WhatsApp Voice Note' | 'WhatsApp Photo OCR' | 'Community Report';
  audioSnippet?: string;
  photoUrl?: string;
  extractedItem: string;
  category: string;
  suggestedPrice: string;
  suggestedQty: number;
  confidenceScore: number;
  status: 'Pending Review' | 'Approved' | 'Rejected';
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  type: 'Voice Note Processed' | 'Shelf Photo Scanned' | 'Auto-Published' | 'Price Rule Applied';
  description: string;
  itemCount: number;
  confidence: number;
}

export interface FeedbackItem {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  itemVerified: string;
  comment: string;
  accuracyScore: number;
  earnedTokens: number;
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  type: 'whatsapp' | 'alert' | 'review' | 'system';
  timestamp: string;
  read: boolean;
}

export const SHOP_PORTAL_METRICS = {
  todaysAiUpdates: 28,
  productsUpdated: 142,
  customerSearches: 1890,
  freshnessScore: 99.2,
  availabilityConfidence: 98.6,
  whatsappNumber: '+1 (555) 839-2041 (LocalInventory AI Bot)',
  botStatus: 'Connected & Listening',
};

export const AI_REVIEW_QUEUE: AiReviewItem[] = [
  {
    id: 'rev-101',
    timestamp: '3 mins ago',
    source: 'WhatsApp Voice Note',
    audioSnippet: '🎙️ "Just received 40kg organic Alphonso Mangoes at ₹299 per kg"',
    extractedItem: 'Organic Alphonso Mangoes',
    category: 'Fruits',
    suggestedPrice: '₹299',
    suggestedQty: 40,
    confidenceScore: 99.4,
    status: 'Pending Review',
  },
  {
    id: 'rev-102',
    timestamp: '12 mins ago',
    source: 'WhatsApp Photo OCR',
    photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    extractedItem: 'Farm Fresh Spinach Crate',
    category: 'Vegetables',
    suggestedPrice: '₹199',
    suggestedQty: 25,
    confidenceScore: 96.8,
    status: 'Pending Review',
  },
  {
    id: 'rev-103',
    timestamp: '28 mins ago',
    source: 'WhatsApp Voice Note',
    audioSnippet: '🎙️ "15 bottles grass fed glass bottle milk arrived ₹140 each"',
    extractedItem: 'Grass-Fed Glass Bottle Milk',
    category: 'Dairy',
    suggestedPrice: '₹140',
    suggestedQty: 15,
    confidenceScore: 98.9,
    status: 'Pending Review',
  },
];

export const RECENT_AI_ACTIVITIES: ActivityFeedItem[] = [
  {
    id: 'act-1',
    timestamp: 'Just now',
    type: 'Auto-Published',
    description: 'WhatsApp Bot published 50kg Vine Tomatoes at ₹199/kg',
    itemCount: 50,
    confidence: 99.5,
  },
  {
    id: 'act-2',
    timestamp: '15 mins ago',
    type: 'Shelf Photo Scanned',
    description: 'OCR parsed 30 Hass Avocados & tagged Freshness 98%',
    itemCount: 30,
    confidence: 98.2,
  },
  {
    id: 'act-3',
    timestamp: '45 mins ago',
    type: 'Voice Note Processed',
    description: 'Dictation transcribed: 18 Sourdough Bread Loaves at ₹499',
    itemCount: 18,
    confidence: 99.0,
  },
  {
    id: 'act-4',
    timestamp: '2 hours ago',
    type: 'Price Rule Applied',
    description: 'Evening end-of-day 10% freshness discount applied to berries',
    itemCount: 12,
    confidence: 100.0,
  },
];

export const CUSTOMER_FEEDBACK_DATA: FeedbackItem[] = [
  {
    id: 'fb-1',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'Today, 2:15 PM',
    rating: 5,
    itemVerified: 'Vine-Ripened Organic Tomatoes',
    comment: 'Stock showed 50kg on app. I visited 20 mins later and tomatoes were 100% fresh as advertised!',
    accuracyScore: 100,
    earnedTokens: 15,
  },
  {
    id: 'fb-2',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'Yesterday, 5:40 PM',
    rating: 5,
    itemVerified: 'Tree-Ripened Hass Avocados',
    comment: 'WhatsApp voice update was super accurate. Price matched ₹159 each.',
    accuracyScore: 98,
    earnedTokens: 10,
  },
  {
    id: 'fb-3',
    author: 'Chloe Bennet',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: '2 days ago',
    rating: 4.8,
    itemVerified: 'French Croissants',
    comment: 'Freshly baked and verified in stock.',
    accuracyScore: 96,
    earnedTokens: 10,
  },
];

export const PORTAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: 'n-1',
    title: 'WhatsApp Bot Active',
    message: 'WhatsApp Bot (+1 555-839-2041) successfully processed 28 voice & photo notes today.',
    type: 'whatsapp',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: 'n-2',
    title: 'AI Review Queue Alert',
    message: '3 voice notes require vendor price approval before publishing.',
    type: 'review',
    timestamp: '15m ago',
    read: false,
  },
  {
    id: 'n-3',
    title: 'High Customer Search Volume',
    message: 'Slim Fit Linen Shirts are trending in your 2-km radius (420 searches today).',
    type: 'alert',
    timestamp: '1h ago',
    read: true,
  },
];
