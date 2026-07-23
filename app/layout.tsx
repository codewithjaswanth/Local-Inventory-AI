import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Local Inventory AI - Hyperlocal Live Produce & Grocery Marketplace",
  description: "Search nearby vegetable and fruit shops with real-time live inventory powered by AI. Vision OCR, voice updates, and 99% freshness scores.",
  keywords: ["hyperlocal marketplace", "AI inventory", "fresh vegetables nearby", "local fruit shop stock", "live grocery search"],
  authors: [{ name: "Local Inventory AI Team" }],
  openGraph: {
    title: "Local Inventory AI - Find Fresh Products Near You",
    description: "Search nearby vegetable and fruit shops with live inventory powered by AI.",
    url: "https://localinventory.ai",
    siteName: "Local Inventory AI",
    locale: "en_US",
    type: "website",
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased bg-white text-slate-900 overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
