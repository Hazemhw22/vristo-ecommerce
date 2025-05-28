"use client"

import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { CartProvider } from "./cart-provider"
import { FavoritesProvider } from "./favourite-items"
import { SiteHeader } from "./site-header"
import SiteFooter from "./site-footer"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 pb-16">{children}</main>
            <SiteFooter />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
