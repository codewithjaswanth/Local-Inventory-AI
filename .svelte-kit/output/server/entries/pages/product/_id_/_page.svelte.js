import { j as head, f as attr, e as escape_html, d as ensure_array_like, g as derived } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/index2.js";
import { a as Shield_check, e as Package_check, d as Star, M as Map_pin, b as Minus, S as Shopping_bag, P as ProductCard, c as SEARCH_PRODUCTS } from "../../../../chunks/ProductCard.js";
import "../../../../chunks/cart.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
import { T as Truck } from "../../../../chunks/truck.js";
import { S as Store } from "../../../../chunks/store.js";
import { P as Plus } from "../../../../chunks/plus.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let rawId = derived(() => page.params.id);
    let product = derived(() => SEARCH_PRODUCTS.find((p) => p.id === rawId()) || SEARCH_PRODUCTS[0]);
    let relatedProducts = derived(() => SEARCH_PRODUCTS.filter((p) => p.category === product().category && p.id !== product().id).slice(0, 4));
    let qty = 1;
    head("uk8mco", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(product().name || product().title)} - Local Inventory AI</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"><a href="/" class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">`);
    Arrow_left($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Back to Store</span></a> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"><div class="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg"><img${attr("src", product().image)}${attr("alt", product().name || product().title)} class="w-full h-96 sm:h-[450px] object-cover" onerror="this.__e=event"/> `);
    if (product().freshnessScore) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-md">`);
      Shield_check($$renderer2, { class: "w-4 h-4 text-emerald-400" });
      $$renderer2.push(`<!----> <span>${escape_html(product().freshnessScore)}% AI Freshness Score</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-6 flex flex-col justify-between"><div class="space-y-4"><div class="flex items-center gap-2"><span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">${escape_html(product().category)}</span> <span class="text-xs font-medium text-slate-500 flex items-center gap-1">`);
    Package_check($$renderer2, { class: "w-4 h-4 text-emerald-500" });
    $$renderer2.push(`<!----> ${escape_html(product().availableQty || 50)} in stock</span></div> <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">${escape_html(product().name || product().title)}</h1> <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-baseline justify-between"><div><span class="text-3xl font-black text-slate-900 dark:text-white">₹${escape_html(product().price)}</span> <span class="text-sm font-medium text-slate-500 ml-1">/ ${escape_html(product().unit || "pc")}</span></div> <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">`);
    Truck($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> 10-Min Fast Delivery</span></div> <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-500 flex items-center gap-1">`);
    Store($$renderer2, { class: "w-4 h-4 text-emerald-500" });
    $$renderer2.push(`<!----> Sourced From Merchant</span> `);
    if (product().shopRating) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="flex items-center text-amber-500 font-extrabold gap-1">`);
      Star($$renderer2, { class: "w-3.5 h-3.5 fill-amber-400 text-amber-400" });
      $$renderer2.push(`<!----> ${escape_html(product().shopRating)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="font-extrabold text-slate-900 dark:text-white text-base">${escape_html(product().shopName || product().storeName || "Local Merchant")}</p> <p class="text-xs text-slate-500 flex items-center gap-1">`);
    Map_pin($$renderer2, { class: "w-3.5 h-3.5 text-emerald-500 shrink-0" });
    $$renderer2.push(`<!----> ${escape_html(product().shopAddress || "Local Market Area")} (${escape_html(product().distance || 0.8)} km away)</p></div></div> <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800"><div class="flex items-center gap-4"><div class="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700"><button class="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center hover:bg-slate-200">`);
    Minus($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></button> <span class="w-8 text-center font-extrabold text-sm">${escape_html(qty)}</span> <button class="w-9 h-9 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center hover:bg-emerald-500">`);
    Plus($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></div> <button class="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all">`);
    Shopping_bag($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add to Cart (₹${escape_html(product().price * qty)})</span></button></div></div></div></div> `);
    if (relatedProducts().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800"><h3 class="text-xl font-black text-slate-900 dark:text-white">Similar Items in ${escape_html(product().category)}</h3> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
      const each_array = ensure_array_like(relatedProducts());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let relProduct = each_array[$$index];
        ProductCard($$renderer2, { product: relProduct });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
