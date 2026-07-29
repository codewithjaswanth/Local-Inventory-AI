export const APP_CONFIG = {
  name: 'Inventra',
  tagline: 'Hyperlocal Live Produce & Grocery Marketplace',
  description: 'Search nearby vegetable and fruit shops with live inventory powered by AI.',
  version: '2.4.0',
  defaultRadiusMiles: 2.0,
  itemsPerPage: 6,
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Search', href: '/search' },
  { name: 'Shops', href: '/#shops' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Admin', href: '/admin' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
];

export const CATEGORIES_LIST = [
  'All',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Bakery',
  'Groceries',
] as const;

export const DEFAULT_LOCATIONS = [
  'Downtown, 94103 (0.3 mi)',
  'Westside, 94107 (0.6 mi)',
  'North End, 94111 (0.9 mi)',
  'Central Plaza, 94102 (1.2 mi)',
  'Uptown, 94118 (1.8 mi)',
];
