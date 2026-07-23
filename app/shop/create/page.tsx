'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { shopService } from '@/services/shop.service';
import { Store, MapPin, Phone, Clock, User, Sparkles, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ShopCreatePage() {
  const { user, profile, isLoading: isAuthLoading } = useAuth();
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [openingTime, setOpeningTime] = useState('07:00 AM');
  const [closingTime, setClosingTime] = useState('09:00 PM');
  const [category, setCategory] = useState<'Vegetables' | 'Fruits' | 'Both'>('Both');

  const [isCheckingShop, setIsCheckingShop] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check if owner already registered a shop
  useEffect(() => {
    async function checkExistingShop() {
      if (!isAuthLoading) {
        if (!user) {
          window.location.href = '/login?redirect=/shop/create';
          return;
        }

        if (profile?.name) {
          setOwnerName(profile.name);
        }
        if (profile?.phone) {
          setPhone(profile.phone);
        }

        const existingShop = await shopService.getShopByOwnerId(user.id);
        if (existingShop) {
          window.location.href = '/dashboard';
        } else {
          setIsCheckingShop(false);
        }
      }
    }

    checkExistingShop();
  }, [user, profile, isAuthLoading]);

  // GPS Location Auto-detect
  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(6)));
          setLongitude(Number(pos.coords.longitude.toFixed(6)));
          setSuccessMsg('GPS Location detected successfully!');
          setTimeout(() => setSuccessMsg(null), 3000);
        },
        () => {
          setErrorMsg('Failed to detect GPS location. Please enter coordinates manually.');
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim() || !ownerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!user) {
      setErrorMsg('User authentication required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const { shop, error } = await shopService.createShop({
      owner_id: user.id,
      shop_name: shopName.trim(),
      owner_name: ownerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      latitude,
      longitude,
      opening_time: openingTime,
      closing_time: closingTime,
      category,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error);
      return;
    }

    setSuccessMsg('Shop registered successfully! Redirecting to Dashboard...');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  if (isCheckingShop || isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Verifying shop registration status...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <Navbar />

      <div className="pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl"
        >
          {/* Header */}
          <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              SHOPKEEPER ONBOARDING
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-1">
              Register Your Local Produce Shop
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Create your store profile to enable automated WhatsApp voice & photo AI stock updates.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 animate-bounce" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Shop Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Shop Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Store className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Green Earth Organics"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Owner Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Owner Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Street Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="142 Elm Street, Downtown Market"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Primary Category Offered <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Vegetables', 'Fruits', 'Both'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      category === cat
                        ? 'bg-emerald-500 text-white border-transparent shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Opening Time
                </label>
                <div className="relative flex items-center">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    placeholder="07:00 AM"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Closing Time
                </label>
                <div className="relative flex items-center">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    placeholder="09:00 PM"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Location Picker / Coordinates */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center">
                  <Navigation className="w-4 h-4 text-emerald-500 mr-1.5" />
                  GPS Store Coordinates
                </span>

                <button
                  type="button"
                  onClick={handleDetectGPS}
                  className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[11px] border border-emerald-500/30 flex items-center space-x-1 transition-all"
                >
                  <span>Auto-detect GPS</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full shadow-lg shadow-emerald-500/25"
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Complete Registration & Access Control Panel
          </Button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
