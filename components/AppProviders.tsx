"use client"

import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "./theme-provider"
import { CartProvider } from "./cart-provider"
import { SiteHeader } from "./site-header"
import SiteFooter from "./site-footer"
import { CartSidebar } from "./cart-sidebar"

function AppContent({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader onCartToggle={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent>{children}</AppContent>
      </CartProvider>
    </ThemeProvider>
  )
}
