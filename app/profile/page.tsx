'use client';

import React, { useState } from 'react';
import { ShopPortalSidebar } from '@/components/dashboard/ShopPortalSidebar';
import { DETAILED_SHOPS } from '@/data/mockData';
import { Store, PhoneCall, MapPin, Clock, ShieldCheck, Camera, Save, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ShopProfilePage() {
  const shop = DETAILED_SHOPS[0];

  const [shopName, setShopName] = useState(shop.name);
  const [address, setAddress] = useState(shop.address);
  const [phone, setPhone] = useState(shop.phone);
  const [openTime, setOpenTime] = useState(shop.openTime);
  const [description, setDescription] = useState(shop.description);
  const [whatsappBotNumber, setWhatsappBotNumber] = useState('+1 (555) 839-2041');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Shop Profile & WhatsApp Sync details updated successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <ShopPortalSidebar activePath="/profile" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span>Shop Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-100 font-bold">Shop Profile Management</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto w-full">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              STORE METADATA & WHATSAPP LINK
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center">
              <Store className="w-7 h-7 text-emerald-400 mr-2" />
              Shop Profile Settings
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manage your marketplace listing details, cover photos, and linked WhatsApp voice bot number.
            </p>
          </div>

          <form onSubmit={handleSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
              <img src={shop.coverImage || shop.image} alt={shopName} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => alert('Update store cover photo')}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs border border-slate-700 flex items-center space-x-2 backdrop-blur-md"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Change Cover Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Public Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Store Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Linked WhatsApp Voice Bot Number</label>
                <input
                  type="text"
                  required
                  value={whatsappBotNumber}
                  onChange={(e) => setWhatsappBotNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-emerald-500/50 rounded-xl px-3.5 py-2 text-sm text-emerald-300 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Store Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Shop Profile Changes
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
