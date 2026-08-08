'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Store,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount
  } = useCart();

  const router = useRouter();

  const freeDeliveryThreshold = 300;
  const deliveryFee = cartTotal >= freeDeliveryThreshold || cartTotal === 0 ? 0 : 29;
  const grandTotal = cartTotal + deliveryFee;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotal);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[99998]"
            aria-hidden="true"
          />

          {/* Fixed Right Slide-out Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-[99999] w-full max-w-md bg-white dark:bg-[#091122] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#040810]/80 backdrop-blur-md shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                    <span>Your Fresh Cart</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors px-2 py-1 rounded-lg hover:bg-rose-500/10"
                    title="Clear all items"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Free Delivery Tracker Bar */}
            {cartItems.length > 0 && (
              <div className="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-semibold">
                  <Truck className="w-4 h-4 shrink-0 text-emerald-500" />
                  {amountForFreeDelivery > 0 ? (
                    <span>
                      Add <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{amountForFreeDelivery}</span> more for <span className="font-extrabold underline">FREE Delivery</span>
                    </span>
                  ) : (
                    <span className="font-extrabold flex items-center gap-1">
                      ✨ Congratulations! You unlocked FREE Delivery
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Cart Items Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-10 h-10 text-slate-400 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Explore nearby organic stores and add fresh produce directly to your cart.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer"
                  >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      {/* Item Thumbnail Image */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        {item.freshnessScore && (
                          <div className="absolute bottom-0 inset-x-0 bg-emerald-500/90 text-slate-950 text-[9px] font-black text-center py-0.5">
                            {item.freshnessScore}% Fresh
                          </div>
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <Store className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                          <span className="truncate">{item.shopName}</span>
                        </div>
                        <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          ₹{item.price}{' '}
                          <span className="text-[10px] font-normal text-slate-400">/ {item.unit}</span>
                        </div>
                      </div>

                      {/* Item Quantity Counter & Line Total */}
                      <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                        <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>

                        <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Decrease quantity"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-xs font-black w-5 text-center text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 text-emerald-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#040810]/90 backdrop-blur-md space-y-3 shrink-0">
                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">₹{cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 && (
                        <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    <span>Grand Total</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-lg font-mono font-black">
                      ₹{grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified 100% Hyperlocal Store Guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
