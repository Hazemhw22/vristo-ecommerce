"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { useSwipeable } from "react-swipeable"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PopularStores() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const stores = [
    { id: 1, name: "Store 1", address: "Street 0, City", rating: 4.5, items: 120 },
    { id: 2, name: "Store 2", address: "Street 1, City", rating: 4.2, items: 85 },
    { id: 3, name: "Store 3", address: "Street 2, City", rating: 4.8, items: 210 },
    { id: 4, name: "Store 4", address: "Street 3, City", rating: 4.6, items: 150 },
    { id: 5, name: "Store 5", address: "Street 4, City", rating: 4.3, items: 95 },
    { id: 6, name: "Store 6", address: "Street 5, City", rating: 4.7, items: 180 },
  ]

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const maxIndex = Math.max(0, stores.length - itemsPerView.desktop)

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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Popular Stores</h2>
          <Link href="/stores" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            See All
          </Link>
        </div>

        <div className="relative" {...swipeHandlers}>
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous stores"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next stores"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Stores Grid */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` }}
            >
              {stores.map((store) => (
                <Card
                  key={store.id}
                  className="overflow-hidden bg-white dark:bg-gray-900 border-0 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-0">
                    {/* Upper Section - Image */}
                    <div className="relative h-48 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30 flex items-center justify-center">
                      <Image
                        src="/KFC_logo.svg.png"
                        alt={store.name}
                        width={120}
                        height={120}
                        className="object-contain w-30 h-30 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                        priority
                      />
                      {/* Optional: Add a tagline or promotional text */}
                      <div className="absolute top-4 right-4 text-right">
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm">Premium Store</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Official Partner</p>
                      </div>
                    </div>

                    {/* Lower Section - Store Info with Featured Badge */}
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <div className="flex items-start gap-3 mb-3">
                        {/* Featured Badge */}
                        <Badge
                          variant="outline"
                          className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-3 py-1 text-xs font-medium"
                        >
                          Featured
                        </Badge>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{store.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{store.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {store.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">({store.id * 10})</span>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{store.items} items</span>
                      </div>

                      <Link
                        href={`/stores/${store.id}`}
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Visit Store
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
