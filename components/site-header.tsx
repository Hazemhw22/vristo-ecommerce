"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, User, Bell, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-provider";
import { MobileNav } from "./mobile-nav";
import { VristoLogo } from "./vristo-logo";
import { LanguageSelector } from "./language-select";
import { SimpleThemeToggle } from "./theme-toggle";
import { useOnClickOutside } from "../hooks/use-click-outside";
import { CartSidebar } from "./cart-sidebar";

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, totalPrice } = useCart();

  // Close search when clicking outside
  useOnClickOutside(searchRef, () => setSearchOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleCartToggle = () => {
    setCartOpen(true);
  };

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
          {/* فقط للموبايل */}
          <div className="w-full flex md:hidden items-center justify-between gap-2">
            {/* الموقع - يسار */}
            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              <span className="text-blue-600 dark:text-blue-400">📍</span>
              Arad, Israel
            </span>
            {/* حقل البحث - وسط */}
            <div className="flex-1 mx-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن منتج أو قسم..."
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-10 pl-3 text-base shadow-sm focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all text-right"
                />
                <Search
                  size={18}
                  className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* الأيقونات - يمين */}
            <div className="flex items-center gap-2">
              {mounted && <SimpleThemeToggle />}
              <LanguageSelector />
            </div>
          </div>

          {/* باقي الهيدر للديسكتوب */}
          <div className="hidden md:flex items-center gap-8 w-full">
            {/* Left: Logo & Navigation (Desktop) / Logo only (Mobile) */}
            <div className="flex items-center gap-8">
              <VristoLogo size={40} className="hidden md:block" />

              {/* Navigation - Desktop only */}
              <nav className="hidden md:flex gap-6 text-sm font-medium">
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
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

            {/* Right: Icons (Mobile & Desktop) */}
            <div className="flex items-center gap-3 w-full md:w-auto md:justify-end">
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
            </div>
          </div>
        </div>
      </header>

      {/* Padding below content so MobileNav doesn't cover it */}
      <div className="pb-1 md:pb-0"></div>
      {/* Mobile navigation menu - only shows on mobile */}
      <div className="md:hidden">
        <MobileNav onCartToggle={handleCartToggle} />
      </div>

      {/* Cart Sidebar - Works for both desktop and mobile */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Categories Bar */}
      <div className="w-full md:hidden mt-4">
        <div className="flex overflow-x-auto gap-2 pb-2 px-2">
          {["الكل", "عطور", "أجهزة", "ملابس", "أحذية", "إكسسوارات"].map(
            (cat, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full ${
                  idx === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                } font-semibold whitespace-nowrap`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Mobile Logo, Name, Slogan, and Socials */}
      <div className="w-full md:hidden flex flex-row mt-2 gap-6 px-4">
        {/* أيقونات التواصل الاجتماعي */}
        <div className="flex flex-col gap-2 items-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition-colors"
          >
            {/* Facebook SVG */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </a>
          <a
            href="https://wa.me/123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition-colors"
          >
            {/* WhatsApp SVG */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163A11.867 11.867 0 0 1 0 11.945C0 5.355 5.373 0 12 0c6.627 0 12 5.355 12 11.945 0 6.59-5.373 11.955-12 11.955a12.19 12.19 0 0 1-5.548-1.357L.057 24zm6.597-3.807c1.735.995 3.768 1.584 5.946 1.584 5.448 0 9.886-4.417 9.886-9.864 0-5.448-4.438-9.865-9.886-9.865-5.447 0-9.885 4.417-9.885 9.865 0 2.225.729 4.292 1.957 5.997l-.999 3.648 3.981-1.265zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.366.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "المتجر التجريبي",
                  text: "تسوق الآن مع عالمنا الواسع",
                  url: window.location.href,
                });
              } else {
                alert("ميزة المشاركة غير مدعومة في هذا المتصفح");
              }
            }}
            className="bg-gray-500 text-white p-2 rounded-full shadow hover:bg-gray-600 transition-colors"
            title="مشاركة"
          >
            {/* Share SVG */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8.59V5a3 3 0 1 0-2 2.83v3.76l-6.29 3.14A3 3 0 1 0 7 17.83l6.29-3.14A3 3 0 1 0 17 8.59z" />
            </svg>
          </button>
        </div>

        {/* الشعار والنص */}
        <div className="flex flex-col items-center text-center flex-1">
          {/* شعار بحجم أكبر */}
          <VristoLogo size={70} className="mb-4" />

          {/* نص أكبر وتباعد أكبر */}
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 ">
            تسوق الآن مع عالمنا الواسع
          </span>
        </div>
      </div>
    </>
  );
}
