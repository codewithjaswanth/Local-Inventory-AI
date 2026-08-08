'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  ArrowLeft,
  Store,
  QrCode,
  Banknote,
  Sparkles,
  Lock,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const router = useRouter();

  // Form State
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<string>('home');

  // Address Inputs
  const [fullName, setFullName] = useState(profile?.name || 'Jaswanth Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('142 Elm Street, Suite 4B');
  const [city, setCity] = useState('San Francisco');
  const [zip, setZip] = useState('94103');
  const [deliveryNotes, setDeliveryNotes] = useState('Leave at front gate / call upon arrival');

  // Delivery Speed Choice
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'standard'>('express');

  // Payment Method Tab State
  const [paymentTab, setPaymentTab] = useState<'card' | 'upi' | 'cod'>('card');

  // Mock Credit Card Inputs
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardHolder, setCardHolder] = useState(fullName.toUpperCase() || 'JASWANTH KUMAR');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  // Processing & Confirmation State
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  // Calculations
  const freeDeliveryThreshold = 300;
  const rawDeliveryFee = cartTotal >= freeDeliveryThreshold || cartTotal === 0 ? 0 : 29;
  const expressFee = deliverySpeed === 'express' ? 15 : 0;
  const deliveryFee = rawDeliveryFee + expressFee;
  const taxesAndFee = Math.round(cartTotal * 0.05); // 5% GST & packaging
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const grandTotal = Math.max(0, cartTotal + deliveryFee + taxesAndFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode) return;
    if (promoCode.toUpperCase() === 'FRESH50' || promoCode.toUpperCase() === 'INVENTRA') {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount: 50 });
    } else {
      alert('Invalid promo code. Try "FRESH50"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cartItems],
        total: grandTotal,
        address: `${street}, ${city} ${zip}`,
        estimatedTime: deliverySpeed === 'express' ? '20 - 30 Mins' : '45 - 60 Mins',
        paymentMethod: paymentTab === 'card' ? 'Credit Card (ending in 7890)' : paymentTab === 'upi' ? 'UPI Instant Pay' : 'Cash on Delivery',
      };

      setOrderConfirmed(confirmation);
      setIsPlacingOrder(false);
      clearCart();
    }, 1800);
  };

  // Render Confirmation Modal/Screen
  if (orderConfirmed) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500/30">
        <Navbar />

        <div className="pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 text-center"
          >
            {/* Success Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-2">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Your order <span className="font-mono font-bold text-slate-900 dark:text-white">{orderConfirmed.orderId}</span> has been broadcasted to local shopkeepers.
              </p>
            </div>

            {/* Estimated Delivery Banner */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-left">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Estimated Delivery Arrival</div>
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {orderConfirmed.estimatedTime}
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wide">
                Live Dispatch
              </span>
            </div>

            {/* Order Items Breakdown */}
            <div className="bg-slate-50 dark:bg-[#0F172A] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-left space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                Purchased Items ({orderConfirmed.items.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {orderConfirmed.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate">
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-800" />
                      <span className="font-bold text-slate-900 dark:text-white truncate">{item.name}</span>
                      <span className="text-slate-400 font-mono">x{item.quantity}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0 ml-2">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-500 dark:text-slate-400">Delivering to</span>
                <span className="text-slate-900 dark:text-white truncate max-w-[220px]">{orderConfirmed.address}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a href="/orders" className="w-full">
                <button
                  type="button"
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  View My Orders
                </button>
              </a>
              <a href="/" className="w-full">
                <button
                  type="button"
                  className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Back to Home
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-[#040810] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500/30">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#091122] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Checkout &amp; Live Dispatch
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Complete your order details for instant hyperlocal delivery
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-extrabold flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              <span>100% Encrypted Checkout</span>
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white dark:bg-[#091122] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md mx-auto p-8">
            <ShoppingBag className="w-16 h-16 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Your cart is empty</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add products from nearby stores before checking out.</p>
            </div>
            <a href="/" className="inline-block">
              <button
                type="button"
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Go to Home
              </button>
            </a>
          </div>
        ) : (
          /* Two Column Desktop Layout (Stacked on Mobile) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Forms & Stepper (8 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Stepper Tabs */}
              <div className="flex items-center space-x-3 bg-white dark:bg-[#091122] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    step === 'address'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>1. Delivery Address</span>
                </button>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    step === 'payment'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>2. Payment Method</span>
                </button>
              </div>

              {/* STEP 1: Delivery Address Form */}
              <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Delivery Address & Contact
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Step 1 of 2
                  </span>
                </div>

                {/* Saved Address Quick Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                    Saved Addresses
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSavedAddress('home');
                        setStreet('142 Elm Street, Suite 4B');
                        setCity('San Francisco');
                        setZip('94103');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedSavedAddress === 'home'
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="font-extrabold text-xs flex items-center justify-between">
                        <span>🏡 Home</span>
                        {selectedSavedAddress === 'home' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">142 Elm Street, Suite 4B</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSavedAddress('work');
                        setStreet('500 Howard Street, Tech Hub');
                        setCity('San Francisco');
                        setZip('94105');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedSavedAddress === 'work'
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="font-extrabold text-xs flex items-center justify-between">
                        <span>🏢 Work</span>
                        {selectedSavedAddress === 'work' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">500 Howard Street, Tech Hub</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Street Address & Apartment
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      ZIP / Pincode
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Delivery Instructions
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Delivery Option Selector */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                    Choose Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliverySpeed('express')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deliverySpeed === 'express'
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="font-extrabold text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-emerald-500" />
                          <span>Express Hyperlocal</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-500">+₹15</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Delivered live in 20 - 35 Mins</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliverySpeed('standard')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        deliverySpeed === 'standard'
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="font-extrabold text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          <span>Standard Evening</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-500">FREE</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Delivered between 6 PM - 8 PM</p>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* STEP 2: Payment Method */}
              <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Payment Method
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Step 2 of 2
                  </span>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      paymentTab === 'card'
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      paymentTab === 'upi'
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentTab('cod')}
                    className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      paymentTab === 'cod'
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Cash / COD</span>
                  </button>
                </div>

                {/* Card Payment Form with Live Visual Mock Card */}
                {paymentTab === 'card' && (
                  <div className="space-y-6">
                    {/* Sleek Interactive Mock Credit Card Preview */}
                    <div className="relative w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-5 shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between select-none">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex items-center justify-between z-10">
                        <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">INVENTRA CARD</span>
                        <span className="text-xs font-extrabold italic font-serif">VISA</span>
                      </div>

                      <div className="z-10 space-y-1 my-auto">
                        <div className="text-xs text-slate-400 font-mono">Card Number</div>
                        <div className="text-lg sm:text-xl font-mono font-black tracking-wider text-slate-100">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                      </div>

                      <div className="flex items-center justify-between z-10 text-xs font-mono">
                        <div>
                          <div className="text-[9px] uppercase text-slate-400">Cardholder</div>
                          <div className="font-bold truncate max-w-[150px] uppercase">{cardHolder || 'FULL NAME'}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase text-slate-400">Expires</div>
                          <div className="font-bold">{cardExpiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Credit Card Inputs */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 8912 3456 7890"
                            className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                          />
                          <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          placeholder="JASWANTH KUMAR"
                          className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="08/28"
                            className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="892"
                            className="w-full bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI QR Payment UI */}
                {paymentTab === 'upi' && (
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-center space-y-4">
                    <div className="w-40 h-40 rounded-2xl bg-white p-3 mx-auto shadow-md border border-slate-200 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Scan & Pay via GPay / PhonePe / Paytm</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">UPI ID: localinventory@okaxis</p>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery UI */}
                {paymentTab === 'cod' && (
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-center space-y-3">
                    <Banknote className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Cash on Delivery Available</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Pay cash directly to the delivery partner when your items arrive at your doorstep.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Order Summary Card (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-white dark:bg-[#091122] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-500" />
                    <span>Order Summary</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Items List Mini Scroll */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-2.5 truncate">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="truncate">
                          <div className="font-extrabold text-slate-900 dark:text-white truncate">{item.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Store className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{item.shopName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono font-extrabold text-slate-900 dark:text-white">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {item.quantity} x ₹{item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. FRESH50)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Code {appliedPromo.code} applied! (-₹{appliedPromo.discount})</span>
                    </p>
                  )}
                </form>

                {/* Cost Calculations */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">₹{cartTotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <span>Delivery Fee</span>
                      {rawDeliveryFee === 0 && (
                        <span className="text-[9px] font-extrabold text-emerald-500 uppercase bg-emerald-500/10 px-1 rounded">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                    <span>GST & Local Packaging</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">₹{taxesAndFee}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Promo Discount</span>
                      <span className="font-mono">-₹{appliedPromo.discount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">Order Total</span>
                    <div className="text-right">
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        ₹{grandTotal.toFixed(0)}
                      </div>
                      <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
                    </div>
                  </div>
                </div>

                {/* Final Submit Place Order Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] disabled:opacity-50 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer"
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Broadcasting Order to Shopkeeper...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                      <span>Place Order (₹{grandTotal.toFixed(0)})</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] text-slate-400 font-medium">
                  🔒 256-Bit SSL Encrypted & Direct Hyperlocal Store Fulfillment
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
