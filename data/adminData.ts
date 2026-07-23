export interface AdminStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
  color: string;
}

export interface SearchedProduct {
  id: string;
  term: string;
  category: string;
  searchVolume: number;
  fulfillmentRate: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AiLogEntry {
  id: string;
  shopName: string;
  inputType: 'Voice Note' | 'WhatsApp Photo' | 'Receipt OCR' | 'Community Check-in';
  extractedSummary: string;
  confidenceScore: number;
  status: 'Validated' | 'Flagged Review' | 'Processing';
  timestamp: string;
}

export interface ActivityPoint {
  time: string;
  updates: number;
  scans: number;
}

export const ADMIN_STATS: AdminStat[] = [
  {
    id: 's1',
    title: 'Total Shops',
    value: '142',
    change: '+12% this month',
    isPositive: true,
    iconName: 'Store',
    color: 'emerald'
  },
  {
    id: 's2',
    title: 'Total Products',
    value: '6,840',
    change: '+18.4% this week',
    isPositive: true,
    iconName: 'Package',
    color: 'blue'
  },
  {
    id: 's3',
    title: "Today's Updates",
    value: '1,280',
    change: '+34% vs yesterday',
    isPositive: true,
    iconName: 'Sparkles',
    color: 'amber'
  },
  {
    id: 's4',
    title: 'Freshness Alerts',
    value: '3',
    change: '-25% low score items',
    isPositive: true,
    iconName: 'AlertTriangle',
    color: 'rose'
  }
];

export const MOST_SEARCHED_PRODUCTS: SearchedProduct[] = [
  { id: 'sp1', term: 'Organic Vine Tomatoes', category: 'Vegetables', searchVolume: 4210, fulfillmentRate: 98.4, trend: 'up' },
  { id: 'sp2', term: 'Hass Avocados', category: 'Fruits', searchVolume: 3890, fulfillmentRate: 97.2, trend: 'up' },
  { id: 'sp3', term: 'Fresh Sourdough Bread', category: 'Bakery', searchVolume: 2450, fulfillmentRate: 99.0, trend: 'stable' },
  { id: 'sp4', term: 'Grass-Fed Whole Milk', category: 'Dairy', searchVolume: 2180, fulfillmentRate: 96.5, trend: 'up' },
  { id: 'sp5', term: 'Cold-Pressed Olive Oil', category: 'Groceries', searchVolume: 1820, fulfillmentRate: 94.1, trend: 'down' },
];

export const RECENT_AI_LOGS: AiLogEntry[] = [
  {
    id: 'log-1',
    shopName: 'Green Earth Organics',
    inputType: 'Voice Note',
    extractedSummary: 'Extracted: 50kg Vine Tomatoes at $2.49/lb, 20 packs Avocados at $1.99',
    confidenceScore: 99.4,
    status: 'Validated',
    timestamp: '2 mins ago'
  },
  {
    id: 'log-2',
    shopName: 'Sunshine Fruit Depot',
    inputType: 'WhatsApp Photo',
    extractedSummary: 'OCR Vision: Strawberries crate (24 units), Honeycrisp Apples (75 lbs)',
    confidenceScore: 98.1,
    status: 'Validated',
    timestamp: '6 mins ago'
  },
  {
    id: 'log-3',
    shopName: 'Artisan Bakery & Dairy',
    inputType: 'Voice Note',
    extractedSummary: 'Extracted: Fresh batch 18 French Croissants at $2.75/ea',
    confidenceScore: 100.0,
    status: 'Validated',
    timestamp: '12 mins ago'
  },
  {
    id: 'log-4',
    shopName: 'Corner Fresh Farmers Market',
    inputType: 'Receipt OCR',
    extractedSummary: 'Extracted: Yellow Onions ($2.99), Russet Potatoes 5lb ($3.49)',
    confidenceScore: 92.5,
    status: 'Flagged Review',
    timestamp: '25 mins ago'
  },
  {
    id: 'log-5',
    shopName: 'Organic Pantry Express',
    inputType: 'Community Check-in',
    extractedSummary: 'Customer verified stock of Almond Milk (32 oz) in aisle 2',
    confidenceScore: 96.8,
    status: 'Validated',
    timestamp: '40 mins ago'
  }
];

export const INVENTORY_ACTIVITY_HOURLY: ActivityPoint[] = [
  { time: '6 AM', updates: 120, scans: 180 },
  { time: '8 AM', updates: 340, scans: 420 },
  { time: '10 AM', updates: 280, scans: 510 },
  { time: '12 PM', updates: 190, scans: 640 },
  { time: '2 PM', updates: 210, scans: 580 },
  { time: '4 PM', updates: 390, scans: 720 },
  { time: '6 PM', updates: 260, scans: 490 },
  { time: '8 PM', updates: 110, scans: 230 },
];
