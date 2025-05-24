"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function RecommendedStores() {
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const itemsPerView = {
    mobile: 4,
    desktop: 8,
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
          <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
             Recommended Stores <span className="text-orange-500 ml-2">🔥</span>
          </h2>
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
              className="grid grid-cols-4 md:grid-cols-8 gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` }}
            >
              {stores.map((store, index) => (
              <motion.div
                  key={store.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 flex items-center justify-center relative shadow-lg border-4 border-white dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors"
              >
                <Image
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  width={80} // استخدم حجم محدد
                  height={80}
                  style={{ objectFit: "cover", borderRadius: "9999px" }} // تأكد من أن الصورة نفسها دائرية
                  className="w-full h-full"
                  priority={true}
                />
              </motion.div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

