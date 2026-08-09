import { s as sanitize_props, a as spread_props, b as slot, f as attr, i as attr_class, e as escape_html, d as ensure_array_like, h as stringify, j as head, g as derived } from "../../chunks/index.js";
import { P as POPULAR_CATEGORIES, N as NEARBY_SHOPS } from "../../chunks/mockData.js";
import { a as Shield_check, M as Map_pin, d as Star, P as ProductCard, c as SEARCH_PRODUCTS } from "../../chunks/ProductCard.js";
import { I as Icon } from "../../chunks/Icon.js";
import { A as Arrow_right } from "../../chunks/arrow-right.js";
import { S as Search } from "../../chunks/search.js";
import { T as Truck } from "../../chunks/truck.js";
import { S as Store } from "../../chunks/store.js";
function Circle_check($$renderer, $$props) {
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
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "circle-check" },
    $$sanitized_props,
    {
      /**
       * @component @name CircleCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtOSAxMiAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check
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
function Clock($$renderer, $$props) {
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
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  Icon($$renderer, spread_props([
    { name: "clock" },
    $$sanitized_props,
    {
      /**
       * @component @name Clock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/clock
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
function Trending_up($$renderer, $$props) {
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
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiA3IDEzLjUgMTUuNSA4LjUgMTAuNSAyIDE3IiAvPgogIDxwb2x5bGluZSBwb2ludHM9IjE2IDcgMjIgNyAyMiAxMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trending-up
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
function Zap($$renderer, $$props) {
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
        "d": "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "zap" },
    $$sanitized_props,
    {
      /**
       * @component @name Zap
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxNGExIDEgMCAwIDEtLjc4LTEuNjNsOS45LTEwLjJhLjUuNSAwIDAgMSAuODYuNDZsLTEuOTIgNi4wMkExIDEgMCAwIDAgMTMgMTBoN2ExIDEgMCAwIDEgLjc4IDEuNjNsLTkuOSAxMC4yYS41LjUgMCAwIDEtLjg2LS40NmwxLjkyLTYuMDJBMSAxIDAgMCAwIDExIDE0eiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/zap
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
function ShopCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { shop } = $$props;
    $$renderer2.push(`<div class="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between h-full group"><div><div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800"><img${attr("src", shop.image)}${attr("alt", shop.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.__e=event"/> <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div> <div class="absolute top-3 left-3 right-3 flex items-center justify-between"><span${attr_class(`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${shop.isOpen ? "bg-emerald-500/90 text-white border-emerald-400/30" : "bg-slate-800/80 text-slate-300 border-slate-700"}`)}>${escape_html(shop.isOpen ? "Open Now" : "Closed")}</span> `);
    if (shop.freshnessBadge) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">`);
      Shield_check($$renderer2, { class: "w-3.5 h-3.5 text-emerald-400" });
      $$renderer2.push(`<!----> ${escape_html(shop.freshnessBadge)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium"><span class="flex items-center bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 font-bold border border-emerald-500/30">`);
    Map_pin($$renderer2, { class: "w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" });
    $$renderer2.push(`<!----> <span>${escape_html(shop.distance)} away</span></span> <span class="flex items-center bg-slate-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full">`);
    Clock($$renderer2, { class: "w-3.5 h-3.5 text-amber-400 mr-1" });
    $$renderer2.push(`<!----> ${escape_html(shop.openTime || "8 AM - 10 PM")}</span></div></div> <div class="p-5"><div class="flex items-start justify-between"><div><span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">${escape_html(shop.category || "Grocery")}</span> <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-2">${escape_html(shop.name)}</h3></div> `);
    if (shop.rating) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-950/60 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">`);
      Star($$renderer2, { class: "w-3.5 h-3.5 fill-amber-400 text-amber-400" });
      $$renderer2.push(`<!----> <span>${escape_html(shop.rating)}</span> <span class="text-slate-400 font-normal">(${escape_html(shop.reviewsCount || 120)})</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">📍 ${escape_html(shop.address)}</p> `);
    if (shop.nearbyLandmark) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold inline-flex items-center gap-1"><span>Landmark: ${escape_html(shop.nearbyLandmark)}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (shop.verifiedItems && shop.verifiedItems.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2"><div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between"><span>Verified Produce</span> <span class="text-emerald-600 dark:text-emerald-400 font-semibold lowercase">${escape_html(shop.inventoryCount || shop.verifiedItems.length)} in stock</span></div> <div class="flex flex-wrap gap-1.5"><!--[-->`);
      const each_array = ensure_array_like(shop.verifiedItems.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<span class="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1"><span>${escape_html(item.name)}</span> <span class="font-bold text-emerald-600 dark:text-emerald-400">₹${escape_html(item.price)}</span></span>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="p-5 pt-0 grid grid-cols-2 gap-2"><button class="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-xl transition-colors">View Shop `);
    Arrow_right($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----></button> <a${attr("href", `https://www.google.com/maps/search/?api=1&query=${stringify(encodeURIComponent(shop.name + " " + shop.address))}`)} target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors">`);
    Map_pin($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> Directions</a></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedCategoryFilter = "All";
    let featuredProducts = derived(() => SEARCH_PRODUCTS.filter((p) => selectedCategoryFilter === "All").slice(0, 12));
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Local Inventory AI - 10 Min Hyperlocal Grocery Delivery</title>`);
      });
    });
    $$renderer2.push(`<section class="relative overflow-hidden bg-gradient-to-b from-emerald-950/20 via-slate-900/5 to-transparent pt-12 pb-16 sm:pt-20 sm:pb-24"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center space-y-6 max-w-3xl mx-auto"><div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider shadow-sm">`);
    Zap($$renderer2, { class: "w-4 h-4 fill-emerald-500 text-emerald-500" });
    $$renderer2.push(`<!----> <span>10-Minute Hyperlocal AI Delivery</span></div> <h1 class="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Fresh Produce from <span class="text-gradient-emerald">Local Stores</span> Near You</h1> <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto">Real-time inventory verification connecting you with local organic merchants, meat butchers, dairy farms, and bakeries in your area.</p> <div class="pt-2 max-w-xl mx-auto"><button class="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 hover:border-emerald-500 text-slate-400 shadow-xl shadow-emerald-500/10 transition-all group"><div class="flex items-center space-x-3">`);
    Search($$renderer2, {
      class: "w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-semibold text-slate-500 dark:text-slate-400 text-left">Search fresh milk, organic apples, chicken breast, bread...</span></div> <span class="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 px-3.5 py-1.5 rounded-xl shadow-sm">Search</span></button></div> <div class="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-400"><div class="flex items-center gap-1.5">`);
    Circle_check($$renderer2, { class: "w-4 h-4 text-emerald-500" });
    $$renderer2.push(`<!----> <span>AI Live Inventory Tracking</span></div> <div class="flex items-center gap-1.5">`);
    Truck($$renderer2, { class: "w-4 h-4 text-emerald-500" });
    $$renderer2.push(`<!----> <span>Zero Extra Delivery Markup</span></div> <div class="flex items-center gap-1.5">`);
    Shield_check($$renderer2, { class: "w-4 h-4 text-emerald-500" });
    $$renderer2.push(`<!----> <span>100% Quality Guaranteed</span></div></div></div></div></section> <section class="py-12 bg-white/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Explore Grocery Categories</h2> <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Select from 15 verified product categories sourced from your neighborhood market</p></div></div> <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4"><!--[-->`);
    const each_array = ensure_array_like(POPULAR_CATEGORIES);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/categories/${stringify(category.id)}`)} class="glass-card glass-card-hover p-4 rounded-2xl flex flex-col justify-between group h-36 relative overflow-hidden"><div${attr_class(`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${stringify(category.gradient)} opacity-20 group-hover:scale-150 transition-transform duration-500`)}></div> <div class="space-y-1 relative z-10"><span${attr_class(`inline-block p-2.5 rounded-xl ${stringify(category.accentBg)} ${stringify(category.accentText)} font-bold text-xs shadow-xs`)}>${escape_html(category.subcategories ? category.subcategories.length : 10)} Subcategories</span> <h3 class="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-500 transition-colors line-clamp-1">${escape_html(category.name)}</h3></div> <div class="flex items-center justify-between text-[11px] font-bold text-slate-400 relative z-10 pt-2 border-t border-slate-100 dark:border-slate-800"><span>${escape_html(category.itemCount || 850)}+ items</span> `);
      Arrow_right($$renderer2, {
        class: "w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform"
      });
      $$renderer2.push(`<!----></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-2">`);
    Store($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Local Merchant Directory</span></div> <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Stores Delivering to Your Pincode</h2></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(NEARBY_SHOPS);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let shop = each_array_1[$$index_1];
      ShopCard($$renderer2, { shop });
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-16 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs mb-2">`);
    Trending_up($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Trending Fresh Arrivals</span></div> <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Trending In-Stock Produce</h2></div> <div class="flex flex-wrap gap-2"><button${attr_class(`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${"bg-emerald-600 text-white shadow-md"}`)}>All Items</button> <!--[-->`);
    const each_array_2 = ensure_array_like([
      "Vegetables & Fruits",
      "Dairy, Bread & Eggs",
      "Atta, Rice & Dal",
      "Oil, Ghee & Masala",
      "Bakery & Biscuits"
    ]);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let cat = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class(`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${selectedCategoryFilter === cat ? "bg-emerald-600 text-white shadow-md" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"}`)}>${escape_html(cat)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(featuredProducts());
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let product = each_array_3[$$index_3];
      ProductCard($$renderer2, { product });
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
export {
  _page as default
};
