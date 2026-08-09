import { j as head, i as attr_class, e as escape_html, d as ensure_array_like } from "../../../chunks/index.js";
import { N as NEARBY_SHOPS } from "../../../chunks/mockData.js";
import { S as Store } from "../../../chunks/store.js";
const ADMIN_STATS = [
  {
    id: "s1",
    title: "Total Shops",
    value: "142",
    change: "+12% this month",
    isPositive: true,
    iconName: "Store",
    color: "emerald"
  },
  {
    id: "s2",
    title: "Total Products",
    value: "6,840",
    change: "+18.4% this week",
    isPositive: true,
    iconName: "Package",
    color: "blue"
  },
  {
    id: "s3",
    title: "Today's Updates",
    value: "1,280",
    change: "+34% vs yesterday",
    isPositive: true,
    iconName: "Sparkles",
    color: "amber"
  },
  {
    id: "s4",
    title: "Freshness Alerts",
    value: "3",
    change: "-25% low score items",
    isPositive: true,
    iconName: "AlertTriangle",
    color: "rose"
  }
];
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const mockUsers = [
      {
        id: "u1",
        name: "Jaswanth",
        email: "jaswanth@example.com",
        role: "admin",
        status: "Active"
      },
      {
        id: "u2",
        name: "Rajesh Kumar",
        email: "rajesh@greenearth.com",
        role: "shopkeeper",
        status: "Active"
      },
      {
        id: "u3",
        name: "Ananya Sharma",
        email: "ananya@example.com",
        role: "customer",
        status: "Active"
      }
    ];
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Platform Admin Dashboard - Local Inventory AI</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><span class="text-xs font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Super Admin Control Panel</span> <h1 class="text-3xl font-black text-slate-900 dark:text-white mt-2">Platform Administration</h1></div> <div class="flex gap-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"><button${attr_class(`px-4 py-2 rounded-xl text-xs font-bold transition-all ${"bg-emerald-600 text-white shadow-sm"}`)}>Overview</button> <button${attr_class(`px-4 py-2 rounded-xl text-xs font-bold transition-all ${"text-slate-600 dark:text-slate-300"}`)}>Shops (${escape_html(NEARBY_SHOPS.length)})</button> <button${attr_class(`px-4 py-2 rounded-xl text-xs font-bold transition-all ${"text-slate-600 dark:text-slate-300"}`)}>Users (${escape_html(mockUsers.length)})</button></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
    const each_array = ensure_array_like(ADMIN_STATS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stat = each_array[$$index];
      $$renderer2.push(`<div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold text-slate-400">${escape_html(stat.title)}</span> `);
      Store($$renderer2, { class: "w-5 h-5 text-emerald-500" });
      $$renderer2.push(`<!----></div> <p class="text-3xl font-black text-slate-900 dark:text-white">${escape_html(stat.value)}</p> <span class="text-[11px] font-bold text-emerald-500">${escape_html(stat.change)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"><h3 class="text-lg font-black text-slate-900 dark:text-white">Merchant Stores Management</h3> <div class="overflow-x-auto"><table class="w-full text-left text-xs text-slate-700 dark:text-slate-300"><thead class="bg-slate-100 dark:bg-slate-800 uppercase text-[10px] text-slate-400 font-bold"><tr><th class="p-3">Store Name</th><th class="p-3">Category</th><th class="p-3">Rating</th><th class="p-3">Products</th><th class="p-3">Status</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
      const each_array_1 = ensure_array_like(NEARBY_SHOPS);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let shop = each_array_1[$$index_1];
        $$renderer2.push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-slate-900 dark:text-white">${escape_html(shop.name)}</td><td class="p-3">${escape_html(shop.category)}</td><td class="p-3 font-bold text-amber-500">★ ${escape_html(shop.rating)}</td><td class="p-3 font-bold">${escape_html(shop.inventoryCount || 85)} items</td><td class="p-3"><span${attr_class(`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${shop.isOpen ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`)}>${escape_html(shop.isOpen ? "Active" : "Closed")}</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
