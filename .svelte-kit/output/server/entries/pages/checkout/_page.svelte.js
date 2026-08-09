import { s as sanitize_props, a as spread_props, b as slot, j as head, e as escape_html, c as store_get, i as attr_class, f as attr, d as ensure_array_like, u as unsubscribe_stores, g as derived } from "../../../chunks/index.js";
import { b as cartTotal, a as cartItems } from "../../../chunks/cart.js";
import { u as userLocation } from "../../../chunks/modals.js";
import { A as Arrow_left } from "../../../chunks/arrow-left.js";
import { T as Truck } from "../../../chunks/truck.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { A as Arrow_right } from "../../../chunks/arrow-right.js";
function Credit_card($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    [
      "rect",
      { "width": "20", "height": "14", "x": "2", "y": "5", "rx": "2" }
    ],
    ["line", { "x1": "2", "x2": "22", "y1": "10", "y2": "10" }]
  ];
  Icon($$renderer, spread_props([
    { name: "credit-card" },
    $$sanitized_props,
    {
      /**
       * @component @name CreditCard
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIiAvPgogIDxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIxMCIgeTI9IjEwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/credit-card
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let items = derived(() => store_get($$store_subs ??= {}, "$cartItems", cartItems));
    let deliveryFee = derived(() => store_get($$store_subs ??= {}, "$cartTotal", cartTotal) >= 300 || store_get($$store_subs ??= {}, "$cartTotal", cartTotal) === 0 ? 0 : 29);
    let grandTotal = derived(() => store_get($$store_subs ??= {}, "$cartTotal", cartTotal) + deliveryFee());
    let selectedPayment = "upi";
    head("jbcej5", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Checkout - Local Inventory AI</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"><a href="/" class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">`);
    Arrow_left($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Back to Store</span></a> `);
    if (items().length === 0) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="py-20 text-center space-y-4"><h2 class="text-2xl font-black">Your cart is empty</h2> <a href="/" class="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">Start Shopping</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="space-y-6"><h1 class="text-3xl font-black text-slate-900 dark:text-white">Review &amp; Checkout</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"><h3 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">`);
      Truck($$renderer2, { class: "w-5 h-5 text-emerald-500" });
      $$renderer2.push(`<!----> 1. Delivery Address</h3> <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold space-y-1"><span class="text-emerald-600 dark:text-emerald-400 font-extrabold">Primary Pincode Location</span> <p class="text-slate-900 dark:text-white text-sm">${escape_html(store_get($$store_subs ??= {}, "$userLocation", userLocation))}</p></div></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"><h3 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">`);
      Credit_card($$renderer2, { class: "w-5 h-5 text-emerald-500" });
      $$renderer2.push(`<!----> 2. Select Payment Method</h3> <div class="space-y-2"><label${attr_class(`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${"bg-emerald-500/10 border-emerald-500"}`)}><div class="flex items-center gap-3"><input type="radio"${attr("checked", selectedPayment === "upi", true)} value="upi" class="text-emerald-600"/> <span class="font-bold text-sm">UPI Instant Pay (Google Pay / PhonePe / Paytm)</span></div> <span class="text-xs font-bold text-emerald-500">Fastest</span></label> <label${attr_class(`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${"border-slate-200 dark:border-slate-800"}`)}><div class="flex items-center gap-3"><input type="radio"${attr("checked", selectedPayment === "cod", true)} value="cod" class="text-emerald-600"/> <span class="font-bold text-sm">Cash on Delivery (COD)</span></div></label></div></div></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 h-fit"><h3 class="text-base font-extrabold">Order Summary (${escape_html(items().length)} items)</h3> <div class="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
      const each_array = ensure_array_like(items());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<div class="pt-2 flex justify-between"><div><p class="font-bold text-slate-900 dark:text-white line-clamp-1">${escape_html(item.name)}</p> <span class="text-slate-400">${escape_html(item.quantity)} x ₹${escape_html(item.price)}</span></div> <span class="font-bold">₹${escape_html(item.price * item.quantity)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs"><div class="flex justify-between text-slate-500"><span>Subtotal</span> <span class="font-bold text-slate-900 dark:text-white">₹${escape_html(store_get($$store_subs ??= {}, "$cartTotal", cartTotal))}</span></div> <div class="flex justify-between text-slate-500"><span>Delivery Charge</span> <span class="font-bold text-emerald-500">${escape_html(deliveryFee() === 0 ? "FREE" : `₹${deliveryFee()}`)}</span></div> <div class="pt-2 flex justify-between text-base font-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800"><span>Total Payable</span> <span class="text-emerald-500">₹${escape_html(grandTotal())}</span></div></div> <button class="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"><span>Confirm &amp; Place Order</span> `);
      Arrow_right($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
