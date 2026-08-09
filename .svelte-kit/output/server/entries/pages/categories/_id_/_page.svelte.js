import { s as sanitize_props, a as spread_props, b as slot, j as head, e as escape_html, i as attr_class, d as ensure_array_like, g as derived } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/index2.js";
import { P as POPULAR_CATEGORIES } from "../../../../chunks/mockData.js";
import { P as ProductCard, c as SEARCH_PRODUCTS } from "../../../../chunks/ProductCard.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Grid_3x3($$renderer, $$props) {
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
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ],
    ["path", { "d": "M3 9h18" }],
    ["path", { "d": "M3 15h18" }],
    ["path", { "d": "M9 3v18" }],
    ["path", { "d": "M15 3v18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "grid-3x3" },
    $$sanitized_props,
    {
      /**
       * @component @name Grid3x3
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDloMTgiIC8+CiAgPHBhdGggZD0iTTMgMTVoMTgiIC8+CiAgPHBhdGggZD0iTTkgM3YxOCIgLz4KICA8cGF0aCBkPSJNMTUgM3YxOCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/grid-3x3
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
function Sliders_horizontal($$renderer, $$props) {
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
    ["line", { "x1": "21", "x2": "14", "y1": "4", "y2": "4" }],
    ["line", { "x1": "10", "x2": "3", "y1": "4", "y2": "4" }],
    ["line", { "x1": "21", "x2": "12", "y1": "12", "y2": "12" }],
    ["line", { "x1": "8", "x2": "3", "y1": "12", "y2": "12" }],
    ["line", { "x1": "21", "x2": "16", "y1": "20", "y2": "20" }],
    ["line", { "x1": "12", "x2": "3", "y1": "20", "y2": "20" }],
    ["line", { "x1": "14", "x2": "14", "y1": "2", "y2": "6" }],
    ["line", { "x1": "8", "x2": "8", "y1": "10", "y2": "14" }],
    ["line", { "x1": "16", "x2": "16", "y1": "18", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sliders-horizontal" },
    $$sanitized_props,
    {
      /**
       * @component @name SlidersHorizontal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMjEiIHgyPSIxNCIgeTE9IjQiIHkyPSI0IiAvPgogIDxsaW5lIHgxPSIxMCIgeDI9IjMiIHkxPSI0IiB5Mj0iNCIgLz4KICA8bGluZSB4MT0iMjEiIHgyPSIxMiIgeTE9IjEyIiB5Mj0iMTIiIC8+CiAgPGxpbmUgeDE9IjgiIHgyPSIzIiB5MT0iMTIiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iMjEiIHgyPSIxNiIgeTE9IjIwIiB5Mj0iMjAiIC8+CiAgPGxpbmUgeDE9IjEyIiB4Mj0iMyIgeTE9IjIwIiB5Mj0iMjAiIC8+CiAgPGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIyIiB5Mj0iNiIgLz4KICA8bGluZSB4MT0iOCIgeDI9IjgiIHkxPSIxMCIgeTI9IjE0IiAvPgogIDxsaW5lIHgxPSIxNiIgeDI9IjE2IiB5MT0iMTgiIHkyPSIyMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/sliders-horizontal
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
    let rawId = derived(() => page.params.id || "");
    let category = derived(() => POPULAR_CATEGORIES.find((c) => c.id === rawId() || c.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") === rawId().toLowerCase()) || {
      id: rawId(),
      name: (rawId() || "Category").replace(/-/g, " ").replace(/\band\b/g, "&").replace(/\b\w/g, (l) => l.toUpperCase()),
      subcategories: ["All", "Organic", "Fresh Picks", "Best Sellers", "Premium"],
      popularItems: ["Fresh Picks", "Top Rated"],
      description: "Explore fresh quality produce from verified local stores."
    });
    let activeSubcategory = "All";
    let sortBy = "popular";
    let categoryProducts = derived(() => SEARCH_PRODUCTS.filter((p) => {
      const matchesCategory = p.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") === rawId().toLowerCase() || p.category.toLowerCase() === category().name.toLowerCase();
      const matchesSubcategory = activeSubcategory === "All";
      return matchesCategory && matchesSubcategory;
    }));
    let sortedProducts = derived(() => [...categoryProducts()].sort((a, b) => {
      return 0;
    }));
    head("17y9ji1", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(category().name)} - Local Inventory AI</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"><div class="space-y-4"><a href="/" class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">`);
    Arrow_left($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Back to All Categories</span></a> <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white relative overflow-hidden shadow-xl"><div class="relative z-10 max-w-2xl space-y-2"><span class="inline-block text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Hyperlocal Verified Category</span> <h1 class="text-3xl sm:text-4xl font-black tracking-tight">${escape_html(category().name)}</h1> <p class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">${escape_html(category().description || "Browse fresh stock available at nearby neighborhood stores with 10-minute delivery.")}</p></div></div></div> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800"><div class="flex flex-wrap gap-2 items-center"><button${attr_class(`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${"bg-emerald-600 text-white shadow-md"}`)}>All Products</button> `);
    if (category().subcategories) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(category().subcategories);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let sub = each_array[$$index];
        $$renderer2.push(`<button${attr_class(`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${activeSubcategory === sub ? "bg-emerald-600 text-white shadow-md" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500"}`)}>${escape_html(sub)}</button>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex items-center gap-2 shrink-0">`);
    Sliders_horizontal($$renderer2, { class: "w-4 h-4 text-slate-400" });
    $$renderer2.push(`<!----> `);
    $$renderer2.select(
      {
        value: sortBy,
        class: "px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "popular" }, ($$renderer4) => {
          $$renderer4.push(`Popularity`);
        });
        $$renderer3.option({ value: "price-low" }, ($$renderer4) => {
          $$renderer4.push(`Price: Low to High`);
        });
        $$renderer3.option({ value: "price-high" }, ($$renderer4) => {
          $$renderer4.push(`Price: High to Low`);
        });
        $$renderer3.option({ value: "freshness" }, ($$renderer4) => {
          $$renderer4.push(`AI Freshness Score`);
        });
        $$renderer3.option({ value: "rating" }, ($$renderer4) => {
          $$renderer4.push(`Store Rating`);
        });
      }
    );
    $$renderer2.push(`</div></div> `);
    if (sortedProducts().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="py-20 text-center space-y-3">`);
      Grid_3x3($$renderer2, { class: "w-12 h-12 mx-auto text-slate-400 stroke-[1.5]" });
      $$renderer2.push(`<!----> <h3 class="text-base font-extrabold text-slate-900 dark:text-white">No items found</h3> <p class="text-xs text-slate-500">Try selecting "All Products" chip or changing your search filters.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`);
      const each_array_1 = ensure_array_like(sortedProducts());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let product = each_array_1[$$index_1];
        ProductCard($$renderer2, { product });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
