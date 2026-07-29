import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ADMIN_STATS, MOST_SEARCHED_PRODUCTS, RECENT_AI_LOGS } from '@/data/adminData';
import { DETAILED_SHOPS } from '@/data/mockData';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'shopkeeper' | 'admin';
  status: 'Active' | 'Suspended' | 'Pending';
  createdAt: string;
  lastLogin: string;
}

export interface AdminShopRecord {
  id: string;
  name: string;
  ownerName: string;
  address: string;
  phone: string;
  category: string;
  status: 'Approved' | 'Pending Review' | 'Suspended';
  rating: number;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorName: string;
  actorRole: string;
  actionType: string;
  targetResource: string;
  details: string;
  timestamp: string;
}

export interface AiMonitoringJob {
  id: string;
  shopName: string;
  inputType: 'voice' | 'image' | 'voice_and_image';
  status: 'Validated' | 'Flagged Review' | 'Failed';
  confidenceScore: number;
  processedMs: number;
  extractedSummary: string;
  timestamp: string;
}

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex@greenearth.com',
    role: 'shopkeeper',
    status: 'Active',
    createdAt: '2026-07-01',
    lastLogin: '10m ago'
  },
  {
    id: 'u2',
    name: 'Elena Rostova',
    email: 'elena@downtownorganics.com',
    role: 'shopkeeper',
    status: 'Active',
    createdAt: '2026-07-05',
    lastLogin: '2h ago'
  },
  {
    id: 'u3',
    name: 'Sarah Connor',
    email: 'sarah@customer.com',
    role: 'customer',
    status: 'Active',
    createdAt: '2026-07-12',
    lastLogin: '1d ago'
  },
  {
    id: 'u4',
    name: 'Michael Scott',
    email: 'michael@dundermifflin.com',
    role: 'shopkeeper',
    status: 'Pending',
    createdAt: '2026-07-25',
    lastLogin: 'Never'
  },
  {
    id: 'u5',
    name: 'Admin System',
    email: 'admin@localinventory.ai',
    role: 'admin',
    status: 'Active',
    createdAt: '2026-06-01',
    lastLogin: 'Just now'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'aud-1',
    actorName: 'Admin System',
    actorRole: 'admin',
    actionType: 'APPROVE_SHOP',
    targetResource: 'Shop #7829 (Green Earth Organics)',
    details: 'Verified owner identity and business phone.',
    timestamp: '25m ago'
  },
  {
    id: 'aud-2',
    actorName: 'Alex Rivera',
    actorRole: 'shopkeeper',
    actionType: 'UPDATE_INVENTORY',
    targetResource: 'Inventory Batch #491',
    details: 'Confirmed 45 Hass Avocados via AI voice update.',
    timestamp: '1h ago'
  },
  {
    id: 'aud-3',
    actorName: 'System Guard',
    actorRole: 'system',
    actionType: 'FEATURE_FLAG_TOGGLE',
    targetResource: 'AI_VISION_OCR_V2',
    details: 'Enabled Vision OCR v2 for all registered shops.',
    timestamp: '3h ago'
  }
];

export const adminService = {
  getPlatformStats: async () => {
    return {
      totalUsers: 1420,
      totalShops: 48,
      totalProducts: 3890,
      activeInventoryCount: 12450,
      aiSuccessRate: 98.6,
      monthlySearchVolume: 42800
    };
  },

  getUsers: async (): Promise<AdminUserRecord[]> => {
    if (!isSupabaseConfigured) return MOCK_ADMIN_USERS;
    try {
      const { data, error } = await (supabase.from('profiles') as any).select('*');
      if (error || !data) return MOCK_ADMIN_USERS;
      return data.map((p: any) => ({
        id: p.id,
        name: p.name || 'User',
        email: p.email || 'user@example.com',
        role: p.role || 'customer',
        status: p.status || 'Active',
        createdAt: p.created_at || '2026-07-01',
        lastLogin: 'Recently'
      }));
    } catch {
      return MOCK_ADMIN_USERS;
    }
  },

  toggleUserStatus: async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    if (!isSupabaseConfigured) {
      const idx = MOCK_ADMIN_USERS.findIndex((u) => u.id === userId);
      if (idx !== -1) MOCK_ADMIN_USERS[idx].status = nextStatus as any;
      return { success: true, newStatus: nextStatus };
    }

    try {
      const { error } = await (supabase.from('profiles') as any)
        .update({ status: nextStatus })
        .eq('id', userId);

      if (error) return { success: false, error: error.message };
      return { success: true, newStatus: nextStatus };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  updateUserRole: async (userId: string, newRole: 'customer' | 'shopkeeper' | 'admin') => {
    if (!isSupabaseConfigured) {
      const idx = MOCK_ADMIN_USERS.findIndex((u) => u.id === userId);
      if (idx !== -1) MOCK_ADMIN_USERS[idx].role = newRole;
      return { success: true };
    }

    try {
      const { error } = await (supabase.from('profiles') as any)
        .update({ role: newRole })
        .eq('id', userId);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  getShopsList: async (): Promise<AdminShopRecord[]> => {
    return DETAILED_SHOPS.map((s, idx) => ({
      id: s.id,
      name: s.name,
      ownerName: idx === 0 ? 'Alex Rivera' : 'Elena Rostova',
      address: s.address,
      phone: s.phone || '+1 (555) 234-5678',
      category: s.category,
      status: idx === 2 ? 'Pending Review' : 'Approved',
      rating: s.rating,
      createdAt: '2026-07-10'
    }));
  },

  updateShopStatus: async (shopId: string, status: 'Approved' | 'Pending Review' | 'Suspended') => {
    if (!isSupabaseConfigured) return { success: true };
    try {
      const { error } = await (supabase.from('shops') as any)
        .update({ status })
        .eq('id', shopId);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  getAiMonitoringJobs: async (): Promise<AiMonitoringJob[]> => {
    return RECENT_AI_LOGS.map((log) => ({
      id: log.id,
      shopName: log.shopName,
      inputType: log.inputType as any,
      status: log.status as any,
      confidenceScore: log.confidenceScore,
      processedMs: (log as any).processedMs || 1240,
      extractedSummary: log.extractedSummary,
      timestamp: log.timestamp
    }));
  },

  retryFailedAiJob: async (jobId: string) => {
    return { success: true, message: `Successfully re-queued AI job #${jobId} for execution.` };
  },

  getAuditLogs: async (): Promise<AuditLogRecord[]> => {
    return MOCK_AUDIT_LOGS;
  }
};
