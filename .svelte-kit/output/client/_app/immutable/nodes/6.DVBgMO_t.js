import{c as H,a as b,d as te,e as ae,b as S,f as J,s as V}from"../chunks/Dhh8W0-e.js";import{f as K,p as re,t as W,g as e,a as se,M as oe,c as a,s,b as i,e as f,$ as le,r,n as de}from"../chunks/C4BwYqi9.js";import{i as ie}from"../chunks/BaV5QPhA.js";import{h as ne}from"../chunks/wzU6o4Mj.js";import{I as O,s as Q,r as F,b as M}from"../chunks/C84bOAez.js";import{a as G}from"../chunks/DGikphmN.js";import{a as ce,u as pe,p as ue,r as me}from"../chunks/CIVsKIgp.js";import{S as ve}from"../chunks/DrEwsQBU.js";import{l as T,s as U}from"../chunks/CECoDZ_6.js";import{A as fe}from"../chunks/aPwPpL20.js";function xe(m,p){const n=T(p,["children","$$slots","$$events","$$legacy"]);/**
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
 */const c=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];O(m,U({name:"lock"},()=>n,{get iconNode(){return c},children:(t,u)=>{var o=H(),v=K(o);Q(v,p,"default",{}),b(t,o)},$$slots:{default:!0}}))}function be(m,p){const n=T(p,["children","$$slots","$$events","$$legacy"]);/**
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
 */const c=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]];O(m,U({name:"mail"},()=>n,{get iconNode(){return c},children:(t,u)=>{var o=H(),v=K(o);Q(v,p,"default",{}),b(t,o)},$$slots:{default:!0}}))}var he=J('<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold"> </div>'),ge=J('<div class="max-w-md mx-auto px-4 py-16 space-y-6"><div class="text-center space-y-2"><div class="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 font-black"><!></div> <h1 class="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1> <p class="text-xs text-slate-500">Sign in to your Local Inventory AI account</p></div> <form class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl"><!> <div class="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"><button type="button">Customer</button> <button type="button">Merchant</button> <button type="button">Admin</button></div> <div class="space-y-3 text-xs"><div><label for="login-email" class="font-bold text-slate-700 dark:text-slate-300">Email Address</label> <div class="relative mt-1"><!> <input id="login-email" type="email" placeholder="you@example.com" required="" class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"/></div></div> <div><label for="login-password" class="font-bold text-slate-700 dark:text-slate-300">Password</label> <div class="relative mt-1"><!> <input id="login-password" type="password" placeholder="••••••••" required="" class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"/></div></div></div> <button type="submit" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"><span> </span> <!></button></form></div>');function Ne(m,p){re(p,!0);let n=f(""),c=f(""),t=f("customer"),u=f(null),o=f(!1);async function v(l){var x;if(l.preventDefault(),!e(n)||!e(c))return;i(o,!0),i(u,null);const d=await ce.signIn(e(n),e(c),e(t));i(o,!1),d.error?i(u,d.error,!0):(pe.set(d.user),ue.set(d.profile),me.set(((x=d.profile)==null?void 0:x.role)||e(t)),typeof window<"u"&&(e(t)==="admin"?window.location.href="/admin":e(t)==="shopkeeper"?window.location.href="/shopkeeper":window.location.href="/"))}var h=ge();ne("1x05zx6",l=>{oe(()=>{le.title="Login - Local Inventory AI"})});var g=a(h),N=a(g),X=a(N);ve(X,{class:"w-6 h-6"}),r(N),de(4),r(g);var w=s(g,2),z=a(w);{var Y=l=>{var d=he(),x=a(d,!0);r(d),W(()=>V(x,e(u))),b(l,d)};ie(z,l=>{e(u)&&l(Y)})}var _=s(z,2),y=a(_),$=s(y,2),P=s($,2);r(_);var k=s(_,2),I=a(k),j=s(a(I),2),q=a(j);be(q,{class:"w-4 h-4 text-slate-400 absolute left-3 top-3"});var B=s(q,2);F(B),r(j),r(I);var C=s(I,2),D=s(a(C),2),E=a(D);xe(E,{class:"w-4 h-4 text-slate-400 absolute left-3 top-3"});var R=s(E,2);F(R),r(D),r(C),r(k);var L=s(k,2),A=a(L),Z=a(A,!0);r(A);var ee=s(A,2);fe(ee,{class:"w-4 h-4"}),r(L),r(w),r(h),W(()=>{M(y,1,`py-1.5 rounded-lg transition-colors ${e(t)==="customer"?"bg-emerald-600 text-white shadow-xs":"text-slate-500"}`),M($,1,`py-1.5 rounded-lg transition-colors ${e(t)==="shopkeeper"?"bg-emerald-600 text-white shadow-xs":"text-slate-500"}`),M(P,1,`py-1.5 rounded-lg transition-colors ${e(t)==="admin"?"bg-emerald-600 text-white shadow-xs":"text-slate-500"}`),L.disabled=e(o),V(Z,e(o)?"Signing In...":"Sign In")}),ae("submit",w,v),S("click",y,()=>i(t,"customer")),S("click",$,()=>i(t,"shopkeeper")),S("click",P,()=>i(t,"admin")),G(B,()=>e(n),l=>i(n,l)),G(R,()=>e(c),l=>i(c,l)),b(m,h),se()}te(["click"]);export{Ne as component};
