import { s as sanitize_props, a as spread_props, b as slot, j as head, d as ensure_array_like, e as escape_html, i as attr_class } from "../../../chunks/index.js";
import { S as Store } from "../../../chunks/store.js";
import { T as Truck } from "../../../chunks/truck.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Package($$renderer, $$props) {
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
      "path",
      {
        "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
      }
    ],
    ["path", { "d": "M12 22V12" }],
    ["polyline", { "points": "3.29 7 12 12 20.71 7" }],
    ["path", { "d": "m7.5 4.27 9 5.15" }]
  ];
  Icon($$renderer, spread_props([
    { name: "package" },
    $$sanitized_props,
    {
      /**
       * @component @name Package
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgMjEuNzNhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M3oiIC8+CiAgPHBhdGggZD0iTTEyIDIyVjEyIiAvPgogIDxwb2x5bGluZSBwb2ludHM9IjMuMjkgNyAxMiAxMiAyMC43MSA3IiAvPgogIDxwYXRoIGQ9Im03LjUgNC4yNyA5IDUuMTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/package
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
function _page($$renderer) {
  const mockOrders = [
    {
      id: "ORD-98214",
      date: "Today, 03:42 PM",
      status: "Out for Delivery",
      storeName: "Green Earth Organics",
      items: [
        "Fresh Organic Strawberries (250g)",
        "Farm Fresh Whole Milk (1L)"
      ],
      total: 218,
      estimatedDelivery: "8 mins"
    },
    {
      id: "ORD-77120",
      date: "Yesterday, 11:20 AM",
      status: "Delivered",
      storeName: "Artisan Bakery & Pastry Shop",
      items: [
        "French Butter Croissants (Pack of 4)",
        "70% Dark Cocoa Artisanal Silk Chocolates"
      ],
      total: 398,
      estimatedDelivery: "Delivered"
    }
  ];
  head("1c7g62i", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Your Orders - Local Inventory AI</title>`);
    });
  });
  $$renderer.push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"><div class="space-y-1"><h1 class="text-3xl font-black text-slate-900 dark:text-white">Order Tracking &amp; History</h1> <p class="text-xs text-slate-500">Live 10-minute status tracking for your hyperlocal deliveries</p></div> <div class="space-y-6"><!--[-->`);
  const each_array = ensure_array_like(mockOrders);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let order = each_array[$$index_1];
    $$renderer.push(`<div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2"><div><span class="text-xs font-mono font-bold text-emerald-500">${escape_html(order.id)}</span> <h3 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">`);
    Store($$renderer, { class: "w-4 h-4 text-slate-400" });
    $$renderer.push(`<!----> ${escape_html(order.storeName)}</h3></div> <div class="flex items-center gap-2"><span${attr_class(`px-3 py-1 rounded-full text-xs font-extrabold ${order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500 animate-pulse"}`)}>${escape_html(order.status)}</span> <span class="text-xs font-bold text-slate-400">${escape_html(order.date)}</span></div></div> <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"><div class="flex items-center space-x-3"><div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">`);
    Truck($$renderer, { class: "w-5 h-5" });
    $$renderer.push(`<!----></div> <div><p class="text-xs font-bold text-slate-500 uppercase">Estimated Delivery Time</p> <p class="text-base font-black text-slate-900 dark:text-white">${escape_html(order.estimatedDelivery)}</p></div></div> <span class="text-sm font-black text-emerald-500 font-mono">₹${escape_html(order.total)}</span></div> <div class="space-y-1.5"><h4 class="text-xs font-bold text-slate-400 uppercase">Ordered Produce</h4> <ul class="text-xs text-slate-700 dark:text-slate-300 font-medium space-y-1"><!--[-->`);
    const each_array_1 = ensure_array_like(order.items);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let item = each_array_1[$$index];
      $$renderer.push(`<li class="flex items-center gap-2">`);
      Package($$renderer, { class: "w-3.5 h-3.5 text-emerald-500" });
      $$renderer.push(`<!----> <span>${escape_html(item)}</span></li>`);
    }
    $$renderer.push(`<!--]--></ul></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
export {
  _page as default
};
