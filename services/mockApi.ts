import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';
import { DETAILED_SHOPS, DetailedShop } from '@/data/mockData';
import { UserProfile } from '@/types';

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'usr-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  phone: '+1 (555) 987-6543',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  address: '742 Evergreen Terrace, Downtown, CA 94103',
  role: 'customer',
  savedShopsCount: 5,
  rewardsPoints: 340,
  tier: 'Gold Freshness Member',
  preferredRadius: 2.0,
};

export const mockApiService = {
  getProducts: async (query?: string, category?: string): Promise<SearchProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...SEARCH_PRODUCTS];
        if (category && category !== 'All') {
          results = results.filter(p => p.category === category);
        }
        if (query) {
          const q = query.toLowerCase();
          results = results.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shopName.toLowerCase().includes(q)
          );
        }
        resolve(results);
      }, 150);
    });
  },

  getShops: async (): Promise<DetailedShop[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DETAILED_SHOPS);
      }, 150);
    });
  },

  getShopById: async (id: string): Promise<DetailedShop | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const shop = DETAILED_SHOPS.find(s => s.id === id) || DETAILED_SHOPS[0];
        resolve(shop);
      }, 150);
    });
  },

  getUserProfile: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USER_PROFILE);
      }, 100);
    });
  }
};
