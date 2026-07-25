'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShoppingBag, Clock, CheckCircle2, QrCode, MapPin } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/Card';

export default function OrderHistoryPage() {
  return (
    <ProtectedRoute>
      <OrderHistoryPageContent />
    </ProtectedRoute>
  );
}

function OrderHistoryPageContent() {
  const mockReservations = [
    {
      id: 'RES-8921',
      date: 'Today, 3:15 PM',
      shopName: 'Green Earth Organics',
      items: [
        { name: 'Organic Vine Tomatoes (2 lbs)', price: '$4.98' },
        { name: 'Hass Avocados (3 pcs)', price: '$5.97' },
      ],
      total: '$10.95',
      status: 'Ready for Pickup',
      pickupPass: 'QR-8921',
    },
    {
      id: 'RES-7412',
      date: 'Yesterday, 5:40 PM',
      shopName: 'Sunshine Fruit Depot',
      items: [{ name: 'Fresh Organic Strawberries (1 pint)', price: '$3.99' }],
      total: '$3.99',
      status: 'Completed',
      pickupPass: 'QR-7412',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            FUTURE-READY PICKUP PASSES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 flex items-center">
            <ShoppingBag className="w-8 h-8 text-emerald-500 mr-3" />
            Item Reservations & Orders
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Track your 15-minute express local store pickups and reservation QR passes.
          </p>
        </div>

        <div className="space-y-6">
          {mockReservations.map((res) => (
            <Card key={res.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{res.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        res.status === 'Ready for Pickup'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {res.shopName}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">{res.date}</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{res.total}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {res.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span>{item.name}</span>
                    <span className="font-mono">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* QR Pickup Pass */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-mono">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">15-Min Express Pickup Pass</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-mono">{res.pickupPass}</span>
                  </div>
                </div>

                <button
                  onClick={() => {}}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white text-xs font-bold"
                >
                  Show QR Pass
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
