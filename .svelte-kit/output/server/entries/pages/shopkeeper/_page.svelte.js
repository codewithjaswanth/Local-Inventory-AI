import { j as head, e as escape_html, d as ensure_array_like, i as attr_class } from "../../../chunks/index.js";
import { P as Plus } from "../../../chunks/plus.js";
const SHOP_PORTAL_METRICS = {
  todaysAiUpdates: 28,
  freshnessScore: 99.2
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let inventory = [
      {
        id: "skp-1",
        name: "Fresh Organic Alphonso Mangoes",
        category: "Vegetables & Fruits",
        price: 299,
        stockCount: 40,
        unit: "kg",
        freshnessScore: 99,
        inStock: true
      },
      {
        id: "skp-2",
        name: "Farm Fresh Whole Milk",
        category: "Dairy, Bread & Eggs",
        price: 68,
        stockCount: 25,
        unit: "L",
        freshnessScore: 100,
        inStock: true
      },
      {
        id: "skp-3",
        name: "Whole Wheat Atta 5kg",
        category: "Atta, Rice & Dal",
        price: 245,
        stockCount: 18,
        unit: "pack",
        freshnessScore: 98,
        inStock: true
      },
      {
        id: "skp-4",
        name: "French Butter Croissants",
        category: "Bakery & Biscuits",
        price: 220,
        stockCount: 15,
        unit: "pack",
        freshnessScore: 97,
        inStock: true
      }
    ];
    head("1v6ce6f", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Shopkeeper Portal - Local Inventory AI</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><span class="text-xs font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Merchant Inventory Portal</span> <h1 class="text-3xl font-black text-slate-900 dark:text-white mt-2">Green Earth Organics</h1></div> <button class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer">`);
    Plus($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add New Inventory Item</span></button></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-400">Total Store Inventory</span> <p class="text-3xl font-black text-slate-900 dark:text-white">${escape_html(inventory.length)} items</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-400">Today's Orders</span> <p class="text-3xl font-black text-emerald-500">${escape_html(SHOP_PORTAL_METRICS.todaysAiUpdates)} Orders</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-400">Today's Revenue</span> <p class="text-3xl font-black text-slate-900 dark:text-white">₹4,250</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><span class="text-xs font-bold text-slate-400">AI Verified Quality Score</span> <p class="text-3xl font-black text-emerald-500">${escape_html(SHOP_PORTAL_METRICS.freshnessScore)}%</p></div></div> <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"><h3 class="text-lg font-black text-slate-900 dark:text-white">Live Produce &amp; Stock Management</h3> <div class="overflow-x-auto"><table class="w-full text-left text-xs text-slate-700 dark:text-slate-300"><thead class="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] text-slate-400 font-bold"><tr><th class="p-3">Item Name</th><th class="p-3">Category</th><th class="p-3">Price</th><th class="p-3">Stock Count</th><th class="p-3">Freshness</th><th class="p-3">Stock Status</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
    const each_array = ensure_array_like(inventory);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-slate-900 dark:text-white">${escape_html(item.name)}</td><td class="p-3">${escape_html(item.category)}</td><td class="p-3 font-black text-emerald-600 dark:text-emerald-400">₹${escape_html(item.price)} / ${escape_html(item.unit || "kg")}</td><td class="p-3 font-bold">${escape_html(item.stockCount)} in stock</td><td class="p-3 font-bold text-emerald-500">${escape_html(item.freshnessScore)}% Fresh</td><td class="p-3"><button${attr_class(`px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-colors ${item.inStock ? "bg-emerald-500/10 text-emerald-500 hover:bg-rose-500/10 hover:text-rose-500" : "bg-rose-500/10 text-rose-500 hover:bg-emerald-500/10 hover:text-emerald-500"}`)}>${escape_html(item.inStock ? "In Stock" : "Out of Stock")}</button></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
