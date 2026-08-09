
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/categories" | "/categories/[id]" | "/checkout" | "/login" | "/orders" | "/product" | "/product/[id]" | "/shopkeeper";
		RouteParams(): {
			"/categories/[id]": { id: string };
			"/product/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string | undefined };
			"/admin": Record<string, never>;
			"/categories": { id?: string | undefined };
			"/categories/[id]": { id: string };
			"/checkout": Record<string, never>;
			"/login": Record<string, never>;
			"/orders": Record<string, never>;
			"/product": { id?: string | undefined };
			"/product/[id]": { id: string };
			"/shopkeeper": Record<string, never>
		};
		Pathname(): "/" | "/admin" | `/categories/${string}` & {} | "/checkout" | "/login" | "/orders" | `/product/${string}` & {} | "/shopkeeper";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}