import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEARCH_PRODUCTS, SearchProduct } from '@/data/searchProducts';

export interface InventoryItemModel {
  id: string;
  name: string;
  category: string;
  price: string | number;
  unit: string;
  stock_quantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  status?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image_url: string;
  shop_id: string;
  freshness_score?: number;
  created_at: string;
  updated_at: string;
}

export const MOCK_INVENTORY_ITEMS: InventoryItemModel[] = [
  { id: 'inv-g1', name: 'Basmati Steam Rice (5kg)', category: 'Atta & Rice', price: 380, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g2', name: 'Whole Wheat Flour / Atta (5kg)', category: 'Atta & Rice', price: 220, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g3', name: 'Pure Chana Besan / Gram Flour (1kg)', category: 'Atta & Rice', price: 95, unit: 'pack', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g4', name: 'Fine Ground Rice Flour (1kg)', category: 'Atta & Rice', price: 65, unit: 'pack', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g5', name: 'Multi-Millet & Ragi Flour (1kg)', category: 'Atta & Rice', price: 85, unit: 'pack', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g7', name: 'Yellow Split Moong Dal (1kg)', category: 'Dals & Pulses', price: 140, unit: 'pack', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g8', name: 'Organic Chana Dal (1kg)', category: 'Dals & Pulses', price: 90, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g10', name: 'Red Masoor Dal (1kg)', category: 'Dals & Pulses', price: 110, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g11', name: 'Refined Sunflower Cooking Oil (1L)', category: 'Oils & Ghee', price: 135, unit: 'pouch', stock_quantity: 75, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g12', name: 'Cold Pressed Kachi Ghani Mustard Oil (1L)', category: 'Oils & Ghee', price: 155, unit: 'bottle', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g13', name: 'Pure Filtered Groundnut Oil (1L)', category: 'Oils & Ghee', price: 185, unit: 'bottle', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g14', name: 'Refined Soybean Oil (1L)', category: 'Oils & Ghee', price: 125, unit: 'pouch', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g15', name: 'Pure Virgin Coconut Oil (500ml)', category: 'Oils & Ghee', price: 160, unit: 'bottle', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g16', name: 'Pure Desi Cow Ghee (500ml)', category: 'Oils & Ghee', price: 350, unit: 'jar', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g18', name: 'Refined White Sugar (1kg)', category: 'Spices & Seasonings', price: 48, unit: 'pack', stock_quantity: 80, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g19', name: 'Pure Organic Turmeric Powder / Haldi (200g)', category: 'Spices & Seasonings', price: 55, unit: 'pack', stock_quantity: 60, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g20', name: 'Spicy Red Chilli Powder / Lal Mirch (200g)', category: 'Spices & Seasonings', price: 65, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g21', name: 'Aromatic Coriander Powder / Dhania (200g)', category: 'Spices & Seasonings', price: 50, unit: 'pack', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g22', name: 'Whole Cumin Seeds / Jeera (200g)', category: 'Spices & Seasonings', price: 90, unit: 'pack', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g23', name: 'Fresh Pasteurized Full Cream Milk (1L)', category: 'Dairy & Frozen', price: 66, unit: 'pouch', stock_quantity: 60, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g24', name: 'Salted Creamery Butter (100g)', category: 'Dairy & Frozen', price: 58, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g25', name: 'Fresh Creamy Dahi / Curd (400g)', category: 'Dairy & Frozen', price: 45, unit: 'tub', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g26', name: 'Fresh Malai Paneer / Cottage Cheese (200g)', category: 'Dairy & Frozen', price: 95, unit: 'pack', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g27', name: 'Processed Cheddar Cheese Slices (200g)', category: 'Dairy & Frozen', price: 140, unit: 'pack', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g28', name: 'Sweet Garden Frozen Green Peas (500g)', category: 'Dairy & Frozen', price: 85, unit: 'pack', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g29', name: 'Crispy Butter Cookies & Biscuits (200g)', category: 'Snacks & Beverages', price: 40, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g30', name: 'Crunchy Salted Potato Chips (100g)', category: 'Snacks & Beverages', price: 35, unit: 'pack', stock_quantity: 70, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g32', name: 'Masala Instant Noodles (4-Pack)', category: 'Snacks & Beverages', price: 60, unit: 'pack', stock_quantity: 60, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g33', name: 'Premium Assam Black Tea Leaf (250g)', category: 'Snacks & Beverages', price: 150, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g34', name: 'Instant Roasted Filter Coffee (100g)', category: 'Snacks & Beverages', price: 180, unit: 'jar', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g35', name: 'Fresh Sandwich Whole Wheat Bread (400g)', category: 'Snacks & Beverages', price: 45, unit: 'loaf', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g36', name: 'Crispy Baked Wheat Rusk (300g)', category: 'Snacks & Beverages', price: 55, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g37', name: 'Authentic Punjabi Masala Papad (200g)', category: 'Snacks & Beverages', price: 60, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g39', name: 'Nourishing Herbal Hair Shampoo (180ml)', category: 'Household & Personal Care', price: 145, unit: 'bottle', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g40', name: 'Complete Cavity Protection Toothpaste (150g)', category: 'Household & Personal Care', price: 95, unit: 'tube', stock_quantity: 55, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g41', name: 'Active Stain Removal Detergent Powder (1kg)', category: 'Household & Personal Care', price: 130, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g42', name: 'Lemon Fresh Dishwash Liquid Gel (500ml)', category: 'Household & Personal Care', price: 105, unit: 'bottle', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g43', name: 'Disinfectant Floral Floor Cleaner (1L)', category: 'Household & Personal Care', price: 140, unit: 'bottle', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g45', name: '4-Socket Heavy Duty Extension Cord (3m)', category: 'Electronics & Hardware', price: 199, unit: 'piece', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g47', name: 'Metallic Hairpins & Bobby Pins (Pack of 50)', category: 'Accessories & Care', price: 35, unit: 'pack', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g48', name: 'Organic Ripe Hass Avocado (1 pc)', category: 'Fruits & Vegetables', price: 60, unit: 'piece', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g49', name: 'Premium Non-Slip Fitness Yoga Mat (6mm)', category: 'Sports & Fitness', price: 299, unit: 'piece', stock_quantity: 15, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g50', name: 'Aromatic Sandalwood Incense Sticks (100g)', category: 'Home & Kitchen', price: 45, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g51', name: 'Multi-Bit Precision Screwdriver Set', category: 'Electronics & Hardware', price: 129, unit: 'set', stock_quantity: 20, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g52', name: 'Chunks in Sunflower Oil Canned Tuna (185g)', category: 'Gourmet & Packaged', price: 110, unit: 'can', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g53', name: 'Long-Lasting Alkaline AA Batteries (4-Pack)', category: 'Electronics & Hardware', price: 80, unit: 'pack', stock_quantity: 80, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g54', name: 'Windproof Automatic Folding Umbrella', category: 'Accessories & Care', price: 199, unit: 'piece', stock_quantity: 18, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g55', name: 'Dual-Tip Colored Sketch Pens (12 Colors)', category: 'Stationery & Office', price: 65, unit: 'pack', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g56', name: 'Durable Flat Cotton Shoelaces (1 Pair)', category: 'Accessories & Care', price: 30, unit: 'pair', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g57', name: 'Unsweetened Pure Almond Milk (1L)', category: 'Dairy & Frozen', price: 160, unit: 'carton', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g58', name: 'Solid Brass Heavy Security Padlock (40mm)', category: 'Electronics & Hardware', price: 150, unit: 'piece', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g59', name: 'Italian Black Truffle Infused Olive Oil (100ml)', category: 'Gourmet & Packaged', price: 249, unit: 'bottle', stock_quantity: 12, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g60', name: 'Ergonomic Hand Dustpan with Brush Set', category: 'Home & Kitchen', price: 75, unit: 'set', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g61', name: 'Breathable Cotton Ankle Socks (Pack of 3 Pairs)', category: 'Accessories & Care', price: 99, unit: 'pack', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g63', name: 'Heavy-Duty Office Stapler with 1000 Pins', category: 'Stationery & Office', price: 75, unit: 'set', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g64', name: 'Antiseptic Mint Mouthwash (500ml)', category: 'Household & Personal Care', price: 130, unit: 'bottle', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g65', name: 'Heavy-Duty Rubber Bicycle Inner Tube (26-inch)', category: 'Sports & Fitness', price: 99, unit: 'piece', stock_quantity: 15, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 96.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g66', name: 'Whole Aromatic Fennel Seeds / Saunf (200g)', category: 'Spices & Seasonings', price: 45, unit: 'pack', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g1', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g67', name: 'Stereo In-Ear Wired Headphones with Mic', category: 'Electronics & Hardware', price: 149, unit: 'piece', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g68', name: 'Non-Toxic Craft Paper Glue Stick (25g)', category: 'Stationery & Office', price: 25, unit: 'piece', stock_quantity: 60, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g69', name: 'Decorative Mini Indoor Potted Cactus Plant', category: 'Home & Kitchen', price: 99, unit: 'pot', stock_quantity: 15, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g71', name: '75% Alcohol Instant Hand Sanitizer Gel (500ml)', category: 'Household & Personal Care', price: 85, unit: 'bottle', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g72', name: 'Flexible Retractable Measuring Tape (5M)', category: 'Electronics & Hardware', price: 60, unit: 'piece', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g73', name: 'Premium Kashmiri Organic Saffron / Kesar (1g)', category: 'Spices & Seasonings', price: 299, unit: 'box', stock_quantity: 20, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g4', freshness_score: 100.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g74', name: 'Multi-Color Elastic Rubber Bands (100g Pack)', category: 'Stationery & Office', price: 20, unit: 'pack', stock_quantity: 50, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g75', name: 'Hardwood Charcoal Briquettes for BBQ (2kg)', category: 'Home & Kitchen', price: 140, unit: 'bag', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g77', name: '3-Star Table Tennis Ping Pong Balls (Pack of 6)', category: 'Sports & Fitness', price: 80, unit: 'pack', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g78', name: 'Heat-Resistant Silicone Kitchen Spatula', category: 'Home & Kitchen', price: 85, unit: 'piece', stock_quantity: 25, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g79', name: 'Ultra-Moisturizing Foaming Shaving Cream (200g)', category: 'Household & Personal Care', price: 95, unit: 'can', stock_quantity: 35, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g80', name: 'Nickel-Plated Steel Safety Pins (Pack of 50)', category: 'Accessories & Care', price: 20, unit: 'pack', stock_quantity: 60, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 97.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },  { id: 'inv-g82', name: 'Lavender Scented Automatic Room Spray (250ml)', category: 'Home & Kitchen', price: 140, unit: 'can', stock_quantity: 30, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g83', name: 'Salmon & Chicken Gourmet Wet Cat Food (400g Can)', category: 'Gourmet & Packaged', price: 75, unit: 'can', stock_quantity: 40, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g84', name: 'Artist Synthetic Hair Paintbrush Set (5 Brushes)', category: 'Stationery & Office', price: 95, unit: 'set', stock_quantity: 20, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g3', freshness_score: 98.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'inv-g85', name: 'Food Grade Kitchen Aluminium Foil Roll (18M)', category: 'Home & Kitchen', price: 75, unit: 'roll', stock_quantity: 45, availability: 'In Stock', image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=300&q=80', shop_id: 'shop-g2', freshness_score: 99.0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

export const inventoryService = {
  searchInventory: async (
    query?: string,
    category?: string,
    maxPrice?: number,
    minFreshness?: number
  ): Promise<SearchProduct[]> => {
    if (!isSupabaseConfigured) {
      let results = [...SEARCH_PRODUCTS];
      if (category && category !== 'All') {
        results = results.filter((p) => p.category === category);
      }
      if (maxPrice) {
        results = results.filter((p) => p.price <= maxPrice);
      }
      if (minFreshness) {
        results = results.filter((p) => p.freshnessScore >= minFreshness);
      }
      if (query) {
        const q = query.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shopName.toLowerCase().includes(q)
        );
      }
      return results;
    }

    try {
      let req = (supabase.from('inventory') as any).select(`
        id,
        price,
        quantity,
        unit,
        freshness_score,
        confidence_score,
        image_url,
        updated_at,
        shops ( id, shop_name, address, rating ),
        products ( id, name, category_id )
      `);

      if (maxPrice) req = req.lte('price', maxPrice);
      if (minFreshness) req = req.gte('freshness_score', minFreshness);

      const { data, error } = await req;
      if (error || !data || data.length === 0) {
        return SEARCH_PRODUCTS;
      }

      return data.map((inv: any) => ({
        id: inv.id,
        name: inv.products?.name || 'Organic Produce',
        image: inv.image_url || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
        category: 'Vegetables',
        shopId: inv.shops?.id || 'shop-1',
        shopName: inv.shops?.shop_name || 'Green Earth Organics',
        shopAddress: inv.shops?.address || '142 Elm Street, Downtown',
        shopRating: inv.shops?.rating || 4.9,
        price: inv.price,
        unit: inv.unit || 'lb',
        availableQty: inv.quantity,
        distance: 0.3,
        freshnessScore: inv.freshness_score,
        updatedTime: 'Just now',
        verifiedByAi: true,
        organic: true,
      }));
    } catch {
      return SEARCH_PRODUCTS;
    }
  },

  getInventoryByShopId: async (shopId: string): Promise<InventoryItemModel[]> => {
    if (!isSupabaseConfigured) {
      return MOCK_INVENTORY_ITEMS;
    }

    try {
      const { data, error } = await (supabase.from('inventory') as any)
        .select('*')
        .eq('shop_id', shopId)
        .order('updated_at', { ascending: false });

      if (error || !data) {
        console.warn('[INVENTORY_SERVICE] Error fetching inventory from Supabase:', error?.message);
        return MOCK_INVENTORY_ITEMS;
      }

      return data.map((item: any) => ({
        id: item.id,
        name: item.name || 'Produce Item',
        category: item.category || 'Vegetables',
        price: item.price,
        unit: item.unit || 'lbs',
        stock_quantity: item.quantity ?? item.stock_quantity ?? 0,
        availability:
          item.availability ||
          ((item.quantity ?? item.stock_quantity ?? 0) <= 0
            ? 'Out of Stock'
            : (item.quantity ?? item.stock_quantity ?? 0) <= 10
            ? 'Low Stock'
            : 'In Stock'),
        image_url:
          item.image_url ||
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
        shop_id: item.shop_id,
        freshness_score: item.freshness_score || 98,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));
    } catch (err) {
      console.error('[INVENTORY_SERVICE] Exception in getInventoryByShopId:', err);
      return MOCK_INVENTORY_ITEMS;
    }
  },

  createInventoryItem: async (
    item: Omit<InventoryItemModel, 'id' | 'created_at' | 'updated_at'>
  ): Promise<{ data: InventoryItemModel | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      const mockNewItem: InventoryItemModel = {
        ...item,
        id: `inv-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return { data: mockNewItem, error: null };
    }

    try {
      const payload = {
        shop_id: item.shop_id,
        name: item.name,
        category: item.category,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0 : item.price,
        quantity: item.stock_quantity,
        unit: item.unit,
        availability: item.availability,
        image_url: item.image_url,
        freshness_score: item.freshness_score || 99,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await (supabase.from('inventory') as any)
        .insert([payload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      return {
        data: {
          id: data.id,
          name: data.name || item.name,
          category: data.category || item.category,
          price: data.price,
          unit: data.unit,
          stock_quantity: data.quantity,
          availability: data.availability || item.availability,
          image_url: data.image_url || item.image_url,
          shop_id: data.shop_id,
          freshness_score: data.freshness_score,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        },
        error: null
      };
    } catch (err: any) {
      return { data: null, error: err.message || 'Error creating inventory item' };
    }
  },

  updateInventoryItem: async (
    id: string,
    updates: Partial<Omit<InventoryItemModel, 'id' | 'created_at'>>
  ): Promise<{ data: InventoryItemModel | null; error: string | null }> => {
    if (!isSupabaseConfigured) {
      const mockUpdated: InventoryItemModel = {
        id,
        name: updates.name || 'Updated Product',
        category: updates.category || 'Vegetables',
        price: updates.price || 2.99,
        unit: updates.unit || 'lbs',
        stock_quantity: updates.stock_quantity ?? 10,
        availability: updates.availability || 'In Stock',
        image_url: updates.image_url || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
        shop_id: updates.shop_id || 'shop-1',
        freshness_score: updates.freshness_score || 98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return { data: mockUpdated, error: null };
    }

    try {
      const payload: any = {
        updated_at: new Date().toISOString()
      };
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.price !== undefined) {
        payload.price = typeof updates.price === 'string' ? parseFloat(updates.price.replace(/[^0-9.]/g, '')) || 0 : updates.price;
      }
      if (updates.stock_quantity !== undefined) payload.quantity = updates.stock_quantity;
      if (updates.unit !== undefined) payload.unit = updates.unit;
      if (updates.availability !== undefined) payload.availability = updates.availability;
      if (updates.image_url !== undefined) payload.image_url = updates.image_url;
      if (updates.freshness_score !== undefined) payload.freshness_score = updates.freshness_score;

      const { data, error } = await (supabase.from('inventory') as any)
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      return {
        data: {
          id: data.id,
          name: data.name || updates.name || 'Product',
          category: data.category || updates.category || 'Vegetables',
          price: data.price,
          unit: data.unit,
          stock_quantity: data.quantity,
          availability: data.availability || updates.availability || 'In Stock',
          image_url: data.image_url || updates.image_url || '',
          shop_id: data.shop_id,
          freshness_score: data.freshness_score,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        },
        error: null
      };
    } catch (err: any) {
      return { data: null, error: err.message || 'Error updating inventory item' };
    }
  },

  deleteInventoryItem: async (id: string): Promise<{ success: boolean; error: string | null }> => {
    if (!isSupabaseConfigured) {
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase.from('inventory') as any)
        .delete()
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error deleting inventory item' };
    }
  },

  getShopInventoryStats: async (shopId: string) => {
    const items = await inventoryService.getInventoryByShopId(shopId);
    const totalProducts = items.length;
    const lowStockCount = items.filter((i) => i.availability === 'Low Stock' || (i.stock_quantity > 0 && i.stock_quantity <= 10)).length;
    const outOfStockCount = items.filter((i) => i.availability === 'Out of Stock' || i.stock_quantity <= 0).length;
    const totalValue = items.reduce((acc, curr) => {
      const numPrice = typeof curr.price === 'string' ? parseFloat(curr.price.replace(/[^0-9.]/g, '')) || 0 : curr.price;
      return acc + numPrice * curr.stock_quantity;
    }, 0);

    return {
      totalProducts,
      lowStockCount,
      outOfStockCount,
      totalValue
    };
  },

  upsertInventoryItem: async (item: {
    shopId: string;
    productId: string;
    price: number;
    quantity: number;
    unit: string;
    freshnessScore: number;
  }) => {
    return inventoryService.createInventoryItem({
      shop_id: item.shopId,
      name: 'Produce Product',
      category: 'Vegetables',
      price: item.price,
      unit: item.unit,
      stock_quantity: item.quantity,
      availability: item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 10 ? 'Low Stock' : 'In Stock',
      image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      freshness_score: item.freshnessScore
    });
  }
};
