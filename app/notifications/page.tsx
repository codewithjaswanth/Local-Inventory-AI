'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Bell, Sparkles, Store, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function CustomerNotificationsPage() {
  const notifications = [
    {
      id: 'n1',
      title: '🥑 Hass Avocados Restocked Nearby!',
      message: 'Green Earth Organics (0.3 mi) just updated stock via WhatsApp: 40 avocados at $1.99 each (99% Fresh).',
      time: '10m ago',
      type: 'restock',
      read: false,
    },
    {
      id: 'n2',
      title: '🍅 Organic Vine Tomatoes In Stock',
      message: 'Verified by AI: 50kg fresh tomatoes available at Green Earth Organics.',
      time: '1h ago',
      type: 'verified',
      read: true,
    },
    {
      id: 'n3',
      title: '🎁 Earned 15 FreshTokens!',
      message: 'Thank you for confirming freshness at Sunshine Fruit Depot. 15 FreshTokens added to your profile.',
      time: '3h ago',
      type: 'reward',
      read: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            HYPERLOCAL FRESHNESS ALERTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 flex items-center">
            <Bell className="w-8 h-8 text-emerald-500 mr-3" />
            Notifications & Alerts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time restock updates from your favorite neighborhood stores.
          </p>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card key={notif.id} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
                  <Sparkles className="w-4 h-4 text-emerald-500 mr-2" />
                  {notif.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">{notif.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                {notif.message}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
