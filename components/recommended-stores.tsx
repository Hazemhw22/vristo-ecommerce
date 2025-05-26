"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function RecommendedStores() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const itemWidth = 96 // px (مثلاً 96px = w-24)

  const stores = [
    { id: 1, name: "Chanel", logo: "/chanel-1.jpg" },
    { id: 2, name: "Huawei", logo: "/Huawei-Logo.jpg" },
    { id: 3, name: "Chanel", logo: "/chanel-1.jpg" },
    { id: 4, name: "Huawei", logo: "/Huawei-Logo.jpg" },
    { id: 5, name: "Chanel", logo: "/chanel-1.jpg" },
    { id: 6, name: "Huawei", logo: "/Huawei-Logo.jpg" },
    { id: 7, name: "Chanel", logo: "/chanel-1.jpg" },
    { id: 8, name: "Huawei", logo: "/Huawei-Logo.jpg" },
  ]

  // تحديد عدد العناصر بناءً على العرض
  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsPerView(4)
      } else {
        setItemsPerView(8)
      }
    }
    updateItems()
    window.addEventListener("resize", updateItems)
    return () => window.removeEventListener("resize", updateItems)
  }, [])

  const maxIndex = Math.max(0, stores.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
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
            Recommended Stores <span className="text-orange-500 ml-2">🔥</span>
          </h2>
        </div>

        <div className="relative" {...swipeHandlers}>
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (itemWidth + 16)}px)`, // 16px هي الـ gap-4
              }}
            >
              {stores.map((store) => (
                <motion.div
                  key={store.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[96px] flex-shrink-0"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 bg-white dark:bg-gray-800 flex items-center justify-center shadow-md border-4 border-white dark:border-gray-700">
                    <Image
                      src={store.logo}
                      alt={store.name}
                      width={96}
                      height={96}
                      className="object-cover rounded-full w-full h-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
