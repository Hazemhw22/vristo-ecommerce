"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function CategorySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
    { id: 4, name: "Category 4" },
    { id: 5, name: "Category 5" },
    { id: 6, name: "Category 6" },
    { id: 7, name: "Category 7" },
    { id: 8, name: "Category 8" },
    { id: 9, name: "Category 9" },
    { id: 10, name: "Category 10" },
    { id: 11, name: "Category 11" },
    { id: 12, name: "Category 12" },
  ]

  const itemsPerView = {
    mobile: 4,
    desktop: 8,
  }

  const maxIndex = Math.max(0, categories.length - itemsPerView.desktop)

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
    <section className="py-6 relative">
      <div className="mx-auto max-w-screen-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="relative" {...swipeHandlers}>
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous categories"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next categories"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Categories Grid */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-4 md:grid-cols-8 gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/categories/${category.id}`}>
                    <div className="flex flex-col items-center gap-2 group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 bg-red-600 flex items-center justify-center relative"
                      >
                        <Image
                          src="/KFC_logo.svg.png"
                          alt={category.name}
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover" }}
                          priority={true}
                        />
                      </motion.div>
                      <span className="text-sm text-center group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
