import { d as derived, w as writable } from "./index3.js";
const LOCAL_STORAGE_KEY = "inventra_cart_v1";
const initialItems = typeof window !== "undefined" ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") : [];
const cartItems = writable(initialItems);
const isCartOpen = writable(false);
if (typeof window !== "undefined") {
  cartItems.subscribe(($items) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($items));
    } catch (e) {
      console.error("Failed to save cart to storage:", e);
    }
  });
}
const cartTotal = derived(
  cartItems,
  ($items) => $items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const cartCount = derived(
  cartItems,
  ($items) => $items.reduce((sum, item) => sum + item.quantity, 0)
);
export {
  cartItems as a,
  cartTotal as b,
  cartCount as c,
  isCartOpen as i
};
