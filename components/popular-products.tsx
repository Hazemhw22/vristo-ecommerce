"use client"

import ProductCard from "./ProductCard"
import { useSwipeable } from "react-swipeable"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const productSample = {
  id: 1,
  name: "Product",
  store: "Store",
  price: 100,
  discountedPrice: 75,
  rating: 4,
  reviews: 5,
  image: "/pngimg.com - iphone16_PNG35.png",
  category: "Phones",
}

export function PopularProducts({ count = 12 }: { count?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = Array.from({ length: count }, (_, i) => ({
    ...productSample,
    id: i + 1,
    name: `Product ${i + 1}`,
    store: `Store ${i + 1}`,
  }))

  const itemsPerView = {
    desktop: 5,
  }

  const maxIndex = Math.max(0, products.length - itemsPerView.desktop)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerView.desktop, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerView.desktop, 0))
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  })

  return (
    <section className="py-8 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-screen-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
            Most Popular Products <span className="text-orange-500 ml-2">🔥</span>
          </h2>
        </div>

        <div className="relative" {...swipeHandlers}>
          {/* Navigation Arrows (only on larger screens) */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Scrollable Container for Mobile */}
          <div className="overflow-x-auto sm:overflow-hidden">
            <div
              className="flex sm:grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 flex-nowrap"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-[70%] sm:min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
