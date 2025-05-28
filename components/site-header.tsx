"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Search, User, Bell, ShoppingBag, X } from "lucide-react"
import { useCart } from "./cart-provider"
import { MobileNav } from "./mobile-nav"
import { VristoLogo } from "./vristo-logo"
import { LanguageSelector } from "./language-select"
import { SimpleThemeToggle } from "./theme-toggle"
import { useOnClickOutside } from "../hooks/use-click-outside"
import { CartSidebar } from "./cart-sidebar"

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { totalItems, totalPrice } = useCart()

  // Close search when clicking outside
  useOnClickOutside(searchRef, () => setSearchOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const handleCartToggle = () => {
    setCartOpen(true)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="w-full border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        {/* Top bar - Only visible on desktop */}
        <div className="bg-gray-100 dark:bg-gray-800 text-sm py-2 border-b border-gray-200 dark:border-gray-700 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">📍</span>
              Arad, Israel
            </span>

            <div className="flex items-center gap-3">
              {/* Desktop Theme Toggle */}
              {mounted && <SimpleThemeToggle />}

              {/* Language Selector */}
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Logo & Navigation (Desktop) / Logo only (Mobile) */}
          <div className="flex items-center gap-8">
            <VristoLogo />

            {/* Navigation - Desktop only */}
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/categories"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                Categories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/favourite"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                Favourite
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/stores"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                Stores
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/products"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Mobile Center: Location */}
          <div className="md:hidden flex items-center">
            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">📍</span>
              Arad, Israel
            </span>
          </div>

          {/* Right: Search & Icons */}
          <div className="flex items-center gap-3">
            {/* Desktop Search with side dropdown */}
            <div ref={searchRef} className="relative hidden md:block">
              {searchOpen ? (
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    className="w-64 py-2 px-4 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Mobile Theme Toggle */}
            {mounted && (
              <div className="md:hidden">
                <SimpleThemeToggle />
              </div>
            )}

            {/* Mobile Language Selector */}
            <div className="md:hidden">
              <LanguageSelector />
            </div>

            {/* Shopping Cart - Desktop only */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative hidden md:flex md:items-center md:gap-2"
              onClick={handleCartToggle}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium md:static md:bg-blue-600 md:dark:bg-blue-500 md:ml-1">
                    {totalItems}
                  </span>
                  <span className="hidden lg:inline text-sm font-medium">${totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>

            {/* User Account - Desktop only */}
            <Link
              href="/account"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden md:block"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-4 bg-white dark:bg-gray-900 transition-all duration-300 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, stores, categories..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 pl-10 pr-4 text-base shadow-sm focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
                autoFocus
              />
              <Search size={20} className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        )}
      </header>

      {/* Padding below content so MobileNav doesn't cover it */}
      <div className="pb-16 md:pb-0"></div>

      {/* Mobile navigation menu - only shows on mobile */}
      <div className="md:hidden">
        <MobileNav onCartToggle={handleCartToggle} />
      </div>

      {/* Cart Sidebar - Works for both desktop and mobile */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
