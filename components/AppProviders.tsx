// app/app-providers.tsx أو wherever your AppProviders is located
"use client";

import type React from "react";
import ThemeProvider from "./theme-provider";
import { CartProvider } from "./cart-provider";
import { FavoritesProvider } from "./favourite-items";
import { SiteHeader } from "./site-header";
import SiteFooter from "./site-footer";
import FixedButtons from "./fixed-buttons"; // ✅ استيراد المكون الجديد

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col page-background">
            <SiteHeader />
            <main className="flex-1 pb-28 page-container max-w-7xl mx-auto w-full m-4 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
