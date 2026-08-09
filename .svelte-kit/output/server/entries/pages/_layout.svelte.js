import "clsx";
import "../../chunks/supabase.js";
import { s as sanitize_props, a as spread_props, b as slot, c as store_get, u as unsubscribe_stores, e as escape_html, d as ensure_array_like, f as attr, g as derived, h as stringify } from "../../chunks/index.js";
import { c as cartCount, i as isCartOpen, a as cartItems, b as cartTotal } from "../../chunks/cart.js";
import { u as userLocation, i as isSearchModalOpen, a as isLocationModalOpen, b as activeShopModal } from "../../chunks/modals.js";
import { w as writable } from "../../chunks/index3.js";
import { I as Icon } from "../../chunks/Icon.js";
import { S as Store } from "../../chunks/store.js";
import { M as Map_pin, S as Shopping_bag, a as Shield_check, b as Minus, c as SEARCH_PRODUCTS, d as Star, P as ProductCard } from "../../chunks/ProductCard.js";
import { S as Search } from "../../chunks/search.js";
import { T as Truck } from "../../chunks/truck.js";
import { A as Arrow_right } from "../../chunks/arrow-right.js";
import { P as Plus } from "../../chunks/plus.js";
function createThemeStore() {
  const initialTheme = typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light";
  const theme2 = writable(initialTheme);
  if (typeof window !== "undefined") {
    theme2.subscribe(($theme) => {
      localStorage.setItem("theme", $theme);
      if ($theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    });
  }
  const toggleTheme = () => {
    theme2.update((t) => t === "dark" ? "light" : "dark");
  };
  return {
    subscribe: theme2.subscribe,
    set: theme2.set,
    toggleTheme
  };
}
const theme = createThemeStore();
function Check($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon($$renderer, spread_props([
    { name: "check" },
    $$sanitized_props,
    {
      /**
       * @component @name Check
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
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
function Chevron_down($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
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
function Heart($$renderer, $$props) {
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
        "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "heart" },
    $$sanitized_props,
    {
      /**
       * @component @name Heart
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMTRjMS40OS0xLjQ2IDMtMy4yMSAzLTUuNUE1LjUgNS41IDAgMCAwIDE2LjUgM2MtMS43NiAwLTMgLjUtNC41IDItMS41LTEuNS0yLjc0LTItNC41LTJBNS41IDUuNSAwIDAgMCAyIDguNWMwIDIuMyAxLjUgNC4wNSAzIDUuNWw3IDdaIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/heart
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
function Moon($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]];
  Icon($$renderer, spread_props([
    { name: "moon" },
    $$sanitized_props,
    {
      /**
       * @component @name Moon
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM2E2IDYgMCAwIDAgOSA5IDkgOSAwIDEgMS05LTlaIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/moon
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
function Navigation($$renderer, $$props) {
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
  const iconNode = [["polygon", { "points": "3 11 22 2 13 21 11 13 3 11" }]];
  Icon($$renderer, spread_props([
    { name: "navigation" },
    $$sanitized_props,
    {
      /**
       * @component @name Navigation
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWdvbiBwb2ludHM9IjMgMTEgMjIgMiAxMyAyMSAxMSAxMyAzIDExIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/navigation
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
function Sun($$renderer, $$props) {
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
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sun" },
    $$sanitized_props,
    {
      /**
       * @component @name Sun
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiAvPgogIDxwYXRoIGQ9Ik0xMiAydjIiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0ibTQuOTMgNC45MyAxLjQxIDEuNDEiIC8+CiAgPHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJNMiAxMmgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxMmgyIiAvPgogIDxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJtMTkuMDcgNC45My0xLjQxIDEuNDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/sun
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
function Trash_2($$renderer, $$props) {
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
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
    ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }],
    ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyA2aDE4IiAvPgogIDxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiIC8+CiAgPHBhdGggZD0iTTggNlY0YzAtMSAxLTIgMi0yaDRjMSAwIDIgMSAyIDJ2MiIgLz4KICA8bGluZSB4MT0iMTAiIHgyPSIxMCIgeTE9IjExIiB5Mj0iMTciIC8+CiAgPGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/trash-2
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
function User($$renderer, $$props) {
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
    ["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user" },
    $$sanitized_props,
    {
      /**
       * @component @name User
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user
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
function X($$renderer, $$props) {
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
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "x" },
    $$sanitized_props,
    {
      /**
       * @component @name X
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTggNiA2IDE4IiAvPgogIDxwYXRoIGQ9Im02IDYgMTIgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/x
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
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<button class="p-2 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">`);
    if (store_get($$store_subs ??= {}, "$theme", theme) === "dark") {
      $$renderer2.push("<!--[0-->");
      Sun($$renderer2, { class: "w-5 h-5 text-amber-400" });
    } else {
      $$renderer2.push("<!--[-1-->");
      Moon($$renderer2, { class: "w-5 h-5 text-slate-600" });
    }
    $$renderer2.push(`<!--]--></button>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<header class="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4"><div class="flex items-center space-x-3 sm:space-x-6 shrink-0"><a href="/" class="flex items-center space-x-2.5 group"><div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform"><div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">`);
    Store($$renderer2, { class: "w-5 h-5 text-emerald-400" });
    $$renderer2.push(`<!----></div></div> <div class="hidden sm:block"><span class="text-lg font-black tracking-tight text-slate-900 dark:text-white block leading-none">LocalInventory<span class="text-emerald-500">.AI</span></span> <span class="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Hyperlocal Grocery</span></div></a> <button class="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors max-w-[180px] sm:max-w-[220px]">`);
    Map_pin($$renderer2, { class: "w-4 h-4 text-emerald-500 shrink-0" });
    $$renderer2.push(`<!----> <div class="text-left truncate"><span class="block text-[10px] font-bold text-slate-400 uppercase leading-none">Deliver to</span> <span class="truncate block font-bold text-slate-900 dark:text-white leading-tight">${escape_html(store_get($$store_subs ??= {}, "$userLocation", userLocation))}</span></div> `);
    Chevron_down($$renderer2, { class: "w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" });
    $$renderer2.push(`<!----></button></div> <div class="flex-1 max-w-xl hidden md:block"><button class="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-400 transition-colors shadow-inner"><div class="flex items-center space-x-2.5">`);
    Search($$renderer2, { class: "w-4 h-4 text-slate-400" });
    $$renderer2.push(`<!----> <span>Search 10,000+ fresh items, organic vegetables, spices...</span></div> <span class="text-[10px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-500 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">⌘K</span></button></div> <div class="flex items-center space-x-2 sm:space-x-3"><button class="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Open search">`);
    Search($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> `);
    ThemeToggle($$renderer2);
    $$renderer2.push(`<!----> <a href="/login" class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold">`);
    User($$renderer2, { class: "w-5 h-5 text-slate-600 dark:text-slate-300" });
    $$renderer2.push(`<!----> <span class="hidden lg:inline">Account</span></a> <button class="relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all duration-200 cursor-pointer">`);
    Shopping_bag($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span class="hidden sm:inline">Cart</span> `);
    if (store_get($$store_subs ??= {}, "$cartCount", cartCount) > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="bg-white text-emerald-700 font-mono font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm">${escape_html(store_get($$store_subs ??= {}, "$cartCount", cartCount))}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></button></div></div></div></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="space-y-4"><div class="flex items-center space-x-2.5"><div class="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black">`);
  Store($$renderer, { class: "w-5 h-5 text-slate-950" });
  $$renderer.push(`<!----></div> <span class="text-lg font-black text-white tracking-tight">LocalInventory<span class="text-emerald-400">.AI</span></span></div> <p class="text-xs text-slate-400 leading-relaxed">AI-powered hyperlocal grocery commerce connecting local neighborhood store owners with nearby customers for 10-minute fresh deliveries.</p> <div class="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">`);
  Shield_check($$renderer, { class: "w-4 h-4" });
  $$renderer.push(`<!----> <span>100% Hyperlocal Store Guarantee</span></div></div> <div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4> <ul class="space-y-2 text-xs text-slate-400"><li><a href="/" class="hover:text-emerald-400 transition-colors">Home</a></li> <li><a href="/shops" class="hover:text-emerald-400 transition-colors">Nearby Merchant Stores</a></li> <li><a href="/favorites" class="hover:text-emerald-400 transition-colors">Saved Favorites</a></li> <li><a href="/orders" class="hover:text-emerald-400 transition-colors">Order Tracking</a></li></ul></div> <div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals</h4> <ul class="space-y-2 text-xs text-slate-400"><li><a href="/shopkeeper" class="hover:text-emerald-400 transition-colors">Shopkeeper Management Portal</a></li> <li><a href="/admin" class="hover:text-emerald-400 transition-colors">Platform Admin Dashboard</a></li> <li><a href="/login" class="hover:text-emerald-400 transition-colors">Account Login</a></li> <li><a href="/register" class="hover:text-emerald-400 transition-colors">Register Your Shop</a></li></ul></div> <div><h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h4> <p class="text-xs text-slate-400 leading-relaxed mb-3">Have questions or need assistance with your hyperlocal order?</p> <a href="mailto:support@localinventory.ai" class="inline-block px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors">Contact Support</a></div></div> <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4"><p>© 2026 LocalInventory.AI. All rights reserved.</p> <p class="flex items-center gap-1">Built with `);
  Heart($$renderer, { class: "w-3.5 h-3.5 text-rose-500 fill-rose-500" });
  $$renderer.push(`<!----> for Local Neighborhood Merchants</p></div></div></footer>`);
}
function CartDrawer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const freeDeliveryThreshold = 300;
    let deliveryFee = derived(() => store_get($$store_subs ??= {}, "$cartTotal", cartTotal) >= freeDeliveryThreshold || store_get($$store_subs ??= {}, "$cartTotal", cartTotal) === 0 ? 0 : 29);
    let grandTotal = derived(() => store_get($$store_subs ??= {}, "$cartTotal", cartTotal) + deliveryFee());
    let amountForFreeDelivery = derived(() => Math.max(0, freeDeliveryThreshold - store_get($$store_subs ??= {}, "$cartTotal", cartTotal)));
    if (store_get($$store_subs ??= {}, "$isCartOpen", isCartOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[99998] transition-opacity" role="button" tabindex="-1" aria-hidden="true"></div> <div class="fixed top-0 right-0 bottom-0 z-[99999] w-full max-w-md bg-white dark:bg-[#091122] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Shopping Cart Drawer"><div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#040810]/80 backdrop-blur-md shrink-0"><div class="flex items-center space-x-2.5"><div class="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">`);
      Shopping_bag($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></div> <div><h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5"><span>Your Fresh Cart</span> <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">${escape_html(store_get($$store_subs ??= {}, "$cartCount", cartCount))} ${escape_html(store_get($$store_subs ??= {}, "$cartCount", cartCount) === 1 ? "item" : "items")}</span></h2></div></div> <div class="flex items-center space-x-2">`);
      if (store_get($$store_subs ??= {}, "$cartItems", cartItems).length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button type="button" class="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors px-2 py-1 rounded-lg hover:bg-rose-500/10" title="Clear all items">Clear All</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button type="button" class="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Close cart drawer">`);
      X($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div> `);
      if (store_get($$store_subs ??= {}, "$cartItems", cartItems).length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs shrink-0"><div class="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-semibold">`);
        Truck($$renderer2, { class: "w-4 h-4 shrink-0 text-emerald-500" });
        $$renderer2.push(`<!----> `);
        if (amountForFreeDelivery() > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span>Add <span class="font-extrabold text-emerald-600 dark:text-emerald-400">₹${escape_html(amountForFreeDelivery())}</span> more for <span class="font-extrabold underline">FREE Delivery</span></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<span class="font-extrabold flex items-center gap-1">✨ Congratulations! You unlocked FREE Delivery</span>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">`);
      if (store_get($$store_subs ??= {}, "$cartItems", cartItems).length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"><div class="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-400">`);
        Shopping_bag($$renderer2, { class: "w-10 h-10 text-slate-400 stroke-[1.5]" });
        $$renderer2.push(`<!----></div> <div class="space-y-1 max-w-xs"><h3 class="text-base font-extrabold text-slate-900 dark:text-white">Your cart is empty</h3> <p class="text-xs text-slate-500 dark:text-slate-400">Explore nearby organic stores and add fresh produce directly to your cart.</p></div> <button type="button" class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer"><span>Start Shopping</span> `);
        Arrow_right($$renderer2, { class: "w-4 h-4" });
        $$renderer2.push(`<!----></button></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="space-y-3.5"><!--[-->`);
        const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$cartItems", cartItems));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          $$renderer2.push(`<div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 shadow-xs"><div class="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0"><img${attr("src", item.image)}${attr("alt", item.name)} class="w-full h-full object-cover" onerror="this.__e=event"/> `);
          if (item.freshnessScore) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<div class="absolute bottom-0 inset-x-0 bg-emerald-500/90 text-slate-950 text-[9px] font-black text-center py-0.5">${escape_html(item.freshnessScore)}% Fresh</div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0 space-y-1"><h4 class="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm truncate">${escape_html(item.name)}</h4> <div class="flex items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">`);
          Store($$renderer2, { class: "w-3 h-3 mr-1 text-slate-400 shrink-0" });
          $$renderer2.push(`<!----> <span class="truncate">${escape_html(item.shopName)}</span></div> <div class="text-xs font-black text-emerald-600 dark:text-emerald-400">₹${escape_html(item.price)}  <span class="text-[10px] font-normal text-slate-400">/ ${escape_html(item.unit)}</span></div></div> <div class="flex flex-col items-end justify-between gap-2 shrink-0"><span class="text-xs font-black text-slate-900 dark:text-white font-mono">₹${escape_html((item.price * item.quantity).toFixed(0))}</span> <div class="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-xs"><button type="button" class="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" title="Decrease quantity">`);
          if (item.quantity === 1) {
            $$renderer2.push("<!--[0-->");
            Trash_2($$renderer2, { class: "w-3.5 h-3.5 text-rose-500" });
          } else {
            $$renderer2.push("<!--[-1-->");
            Minus($$renderer2, { class: "w-3.5 h-3.5" });
          }
          $$renderer2.push(`<!--]--></button> <span class="text-xs font-black w-5 text-center text-slate-900 dark:text-white">${escape_html(item.quantity)}</span> <button type="button" class="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" title="Increase quantity">`);
          Plus($$renderer2, { class: "w-3.5 h-3.5 text-emerald-500" });
          $$renderer2.push(`<!----></button></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (store_get($$store_subs ??= {}, "$cartItems", cartItems).length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#040810]/90 backdrop-blur-md space-y-3 shrink-0"><div class="space-y-1.5 text-xs"><div class="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium"><span>Subtotal</span> <span class="font-bold text-slate-900 dark:text-white font-mono">₹${escape_html(store_get($$store_subs ??= {}, "$cartTotal", cartTotal).toFixed(0))}</span></div> <div class="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium"><span class="flex items-center gap-1"><span>Delivery Fee</span> `);
        if (deliveryFee() === 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="text-[10px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">FREE</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></span> <span class="font-bold text-slate-900 dark:text-white font-mono">${escape_html(deliveryFee() === 0 ? "₹0" : `₹${deliveryFee()}`)}</span></div> <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm sm:text-base font-black text-slate-900 dark:text-white"><span>Grand Total</span> <span class="text-emerald-600 dark:text-emerald-400 text-lg font-mono font-black">₹${escape_html(grandTotal().toFixed(0))}</span></div></div> <button type="button" class="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"><span>Proceed to Checkout</span> `);
        Arrow_right($$renderer2, { class: "w-4 h-4 stroke-[3]" });
        $$renderer2.push(`<!----></button> <div class="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">`);
        Shield_check($$renderer2, { class: "w-3.5 h-3.5 text-emerald-500" });
        $$renderer2.push(`<!----> <span>Verified 100% Hyperlocal Store Guarantee</span></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function SearchModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let searchQuery = "";
    let filteredProducts = derived(() => SEARCH_PRODUCTS.filter((product) => {
      const matchesSearch = !searchQuery.trim() || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()) || product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    }).slice(0, 16));
    if (store_get($$store_subs ??= {}, "$isSearchModalOpen", isSearchModalOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99998]" role="button" tabindex="-1" aria-hidden="true"></div> <div class="fixed top-12 sm:top-20 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[99999] w-full max-w-3xl bg-white dark:bg-[#091122] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"><div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">`);
      Search($$renderer2, { class: "w-5 h-5 text-emerald-500 shrink-0" });
      $$renderer2.push(`<!----> <input type="text"${attr("value", searchQuery)} placeholder="Search over 10,000+ items across local stores..." class="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-semibold text-base sm:text-lg focus:outline-none" autofocus=""/> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button class="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shrink-0">ESC</button></div> <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"><div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold"><span>Found ${escape_html(filteredProducts().length)} matching products</span> <span>Showing top verified stock</span></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
      const each_array = ensure_array_like(filteredProducts());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let product = each_array[$$index];
        $$renderer2.push(`<div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 transition-all"><img${attr("src", product.image)}${attr("alt", product.name)} class="w-14 h-14 rounded-xl object-cover bg-slate-200 dark:bg-slate-800 shrink-0" onerror="this.__e=event"/> <div class="flex-1 min-w-0"><span class="text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">${escape_html(product.category)}</span> <a${attr("href", `/product/${stringify(product.id)}`)} class="block"><h4 class="font-extrabold text-slate-900 dark:text-white text-xs truncate mt-0.5 hover:text-emerald-500">${escape_html(product.name)}</h4></a> <div class="flex items-center justify-between mt-1"><span class="text-xs font-black text-slate-900 dark:text-white">₹${escape_html(product.price)} <span class="text-[10px] font-normal text-slate-400">/ ${escape_html(product.unit)}</span></span> <button class="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-colors">`);
        Shopping_bag($$renderer2, { class: "w-3.5 h-3.5" });
        $$renderer2.push(`<!----> <span>Add</span></button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function LocationModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let inputPincode = "";
    const savedAddresses = [
      {
        title: "Home",
        address: "128, 4th Main Road, Indiranagar, Bengaluru",
        pincode: "560038"
      },
      {
        title: "Work",
        address: "Tech Park Tower B, Outer Ring Road, Bellandur",
        pincode: "560103"
      },
      {
        title: "Other",
        address: "MG Road, Near Metro Station Exit A, Bengaluru",
        pincode: "560001"
      }
    ];
    if (store_get($$store_subs ??= {}, "$isLocationModalOpen", isLocationModalOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99998]" role="button" tabindex="-1" aria-hidden="true"></div> <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999] w-full max-w-lg bg-white dark:bg-[#091122] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-2.5"><div class="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">`);
      Map_pin($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></div> <div><h3 class="text-lg font-black text-slate-900 dark:text-white">Choose Delivery Location</h3> <p class="text-xs text-slate-500 dark:text-slate-400">See 10-minute delivery stores near you</p></div></div> <button class="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full">`);
      X($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div> <button class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer">`);
      Navigation($$renderer2, { class: "w-4 h-4 fill-white" });
      $$renderer2.push(`<!----> <span>Use Current GPS Location</span></button> <div class="space-y-2"><label for="pincode-input" class="text-xs font-bold text-slate-700 dark:text-slate-300">Or Enter 6-digit Pincode</label> <div class="flex items-center gap-2"><input id="pincode-input" type="text"${attr("value", inputPincode)} placeholder="e.g. 560001" maxlength="6" class="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-emerald-500"/> <button class="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs hover:bg-slate-800 transition-colors">Check</button></div></div> <div class="space-y-3"><h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Delivery Addresses</h4> <div class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(savedAddresses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<button class="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 flex items-center justify-between text-left transition-all cursor-pointer"><div class="space-y-0.5"><span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">${escape_html(item.title)}</span> <p class="text-xs font-bold text-slate-900 dark:text-white mt-1">${escape_html(item.address)}</p></div> `);
        if (store_get($$store_subs ??= {}, "$userLocation", userLocation) === item.address) {
          $$renderer2.push("<!--[0-->");
          Check($$renderer2, { class: "w-5 h-5 text-emerald-500 shrink-0" });
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></button>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function ShopModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let shop = derived(() => store_get($$store_subs ??= {}, "$activeShopModal", activeShopModal));
    let searchQuery = "";
    let shopProducts = derived(() => shop() ? SEARCH_PRODUCTS.filter((p) => p.shopId === shop().id || p.shopName?.toLowerCase() === shop().name.toLowerCase() || p.storeName?.toLowerCase() === shop().name.toLowerCase()).filter((p) => !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase())) : []);
    if (shop()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99998]" role="button" tabindex="-1" aria-hidden="true"></div> <div class="fixed top-6 bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[99999] w-full max-w-4xl bg-white dark:bg-[#091122] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"><div class="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0"><img${attr("src", shop().image)}${attr("alt", shop().name)} class="w-full h-full object-cover" onerror="this.__e=event"/> <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div> <button class="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 transition-colors z-10">`);
      X($$renderer2, { class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <div class="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white"><div><span class="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">${escape_html(shop().category || "Local Grocery Merchant")}</span> <h2 class="text-2xl sm:text-3xl font-black mt-1">${escape_html(shop().name)}</h2> <p class="text-xs text-slate-300 flex items-center gap-1 mt-1">`);
      Map_pin($$renderer2, { class: "w-3.5 h-3.5 text-emerald-400 shrink-0" });
      $$renderer2.push(`<!----> ${escape_html(shop().address)}</p></div> <div class="flex items-center gap-2">`);
      if (shop().rating) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-sm font-extrabold backdrop-blur-md">`);
        Star($$renderer2, { class: "w-4 h-4 fill-amber-400 text-amber-400" });
        $$renderer2.push(`<!----> ${escape_html(shop().rating)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md">${escape_html(shop().distance)} away</span></div></div></div> <div class="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3 shrink-0">`);
      Search($$renderer2, { class: "w-4 h-4 text-slate-400" });
      $$renderer2.push(`<!----> <input type="text"${attr("value", searchQuery)}${attr("placeholder", `Search products in ${stringify(shop().name)}...`)} class="w-full bg-transparent text-slate-900 dark:text-white font-medium text-sm focus:outline-none"/></div> <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"><div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold"><span>Available In-Stock Produce (${escape_html(shopProducts().length)})</span> <span class="text-emerald-500">10-Min Fast Hyperlocal Delivery</span></div> `);
      if (shopProducts().length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="py-12 text-center text-slate-400">`);
        Store($$renderer2, { class: "w-12 h-12 mx-auto stroke-[1.5] text-slate-500 mb-2" });
        $$renderer2.push(`<!----> <p class="text-sm font-bold">No matching products found in this store</p></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        const each_array = ensure_array_like(shopProducts());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let product = each_array[$$index];
          ProductCard($$renderer2, { product });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">`);
    Navbar($$renderer2);
    $$renderer2.push(`<!----> <main class="flex-1">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----> `);
    CartDrawer($$renderer2);
    $$renderer2.push(`<!----> `);
    SearchModal($$renderer2);
    $$renderer2.push(`<!----> `);
    LocationModal($$renderer2);
    $$renderer2.push(`<!----> `);
    ShopModal($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
