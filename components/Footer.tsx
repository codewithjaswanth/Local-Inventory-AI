'use client';

import React from 'react';
import { Sparkles, Twitter, Github, Linkedin, Instagram, ArrowRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#hero" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Local Inventory<span className="text-emerald-500">.AI</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The AI-powered hyperlocal marketplace connecting neighborhood food stores and buyers with real-time inventory visibility and 99% freshness validation.
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Subscribe to Local Freshness Alerts
              </span>
              <form onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); }} className="flex items-center space-x-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Marketplace */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Vegetables</a></li>
              <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Fresh Fruits</a></li>
              <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Farm Dairy</a></li>
              <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Artisanal Bakery</a></li>
              <li><a href="#shops" className="hover:text-emerald-400 transition-colors">Nearby Stores</a></li>
            </ul>
          </div>

          {/* Column 3: AI Technology */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              AI Solutions
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Voice Inventory NLP</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">WhatsApp Bot Sync</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Semantic Search</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Freshness Vision Engine</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Vendor Onboarding</a></li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Store Partner Portal</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center space-x-1 text-slate-500">
            <span suppressHydrationWarning>© {new Date().getFullYear()} Local Inventory AI Inc. All rights reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
