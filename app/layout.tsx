import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#040810" },
  ],
};

export const metadata: Metadata = {
  title: "Inventra - Hyperlocal Live Produce & Grocery Marketplace",
  description: "Search nearby vegetable and fruit shops with real-time live inventory powered by AI. Vision OCR, voice updates, and 99% freshness scores.",
  keywords: ["hyperlocal marketplace", "AI inventory", "fresh vegetables nearby", "local fruit shop stock", "live grocery search"],
  authors: [{ name: "Inventra Team" }],
  icons: {
    icon: "/logo.png?v=3",
    shortcut: "/logo.png?v=3",
    apple: "/logo.png?v=3",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Inventra",
  },
  openGraph: {
    title: "Inventra - Find Fresh Products Near You",
    description: "Search nearby vegetable and fruit shops with live inventory powered by AI.",
    url: "https://localinventory.ai",
    siteName: "Inventra",
    locale: "en_US",
    type: "website",
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('[BOOT] App RootLayout rendered');
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-slate-100 overflow-x-hidden min-h-screen relative">
        <AuthProvider>
          <AmbientBackground />
          <div className="relative z-10">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
