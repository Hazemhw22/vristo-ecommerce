"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Heart,
  Share2,
  Star,
  Clock,
  Truck,
  MapPin,
  Phone,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSwipeable } from "react-swipeable"
import ProductCard from "../../../components/ProductCard"
import Link from "next/link"
import Image from "next/image"

interface ShopDetailPageProps {
  shopId: string
}

// Mock data for shop details
const shopData = {
  id: 1,
  name: "Al-Mukhtar Roastery",
  location: "Rahat",
  coverImage: "",
  logo: "/placeholder.svg?height=80&width=80",
  rating: 4.9,
  reviewCount: 100,
  isOpen: true,
  openingHours: {
    today: "08:00 - 21:30",
    monday: "08:00 - 21:30",
    tuesday: "08:00 - 21:30",
    wednesday: "08:00 - 21:30",
    thursday: "08:00 - 21:30",
    friday: "08:00 - 21:30",
    saturday: "08:00 - 21:30",
    sunday: "Closed",
  },
  deliveryTime: "30-40 min",
  phone: "+972-50-123-4567",
  description: "Specialized coffee roastery offering authentic Arabic coffee, freshly roasted daily",
  categories: [
    {
      id: 1,
      name: "Nuts / Legumes",
      image: "/placeholder.svg?height=120&width=120",
      productCount: 25,
    },
    {
      id: 2,
      name: "Spices",
      image: "/placeholder.svg?height=120&width=120",
      productCount: 18,
    },
    {
      id: 3,
      name: "Coffee",
      image: "/placeholder.svg?height=120&width=120",
      productCount: 12,
    },
    {
      id: 4,
      name: "Tea",
      image: "/placeholder.svg?height=120&width=120",
      productCount: 8,
    },
  ],
}

// Best selling products data
const bestSellingProducts = [
  {
    id: 1,
    name: "Premium Arabic Coffee",
    store: "Al-Mukhtar Roastery",
    price: 55,
    discountedPrice: 45,
    rating: 5,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Coffee",
    description: "Freshly roasted premium Arabic coffee beans with rich flavor and aroma",
  },
  {
    id: 2,
    name: "Roasted Almonds",
    store: "Al-Mukhtar Roastery",
    price: 40,
    discountedPrice: 35,
    rating: 4,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Nuts",
    description: "Premium quality roasted almonds, perfect for snacking",
  },
  {
    id: 3,
    name: "Green Cardamom",
    store: "Al-Mukhtar Roastery",
    price: 30,
    discountedPrice: 25,
    rating: 5,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Spices",
    description: "Fresh green cardamom pods with intense aroma",
  },
  {
    id: 4,
    name: "Mixed Spices",
    store: "Al-Mukhtar Roastery",
    price: 35,
    discountedPrice: 28,
    rating: 4,
    reviews: 52,
    image: "/placeholder.svg?height=300&width=300",
    category: "Spices",
    description: "Traditional Middle Eastern spice blend",
  },
  {
    id: 5,
    name: "Earl Grey Tea",
    store: "Al-Mukhtar Roastery",
    price: 25,
    discountedPrice: 20,
    rating: 4,
    reviews: 38,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tea",
    description: "Premium Earl Grey tea with bergamot oil",
  },
  {
    id: 6,
    name: "Cashew Nuts",
    store: "Al-Mukhtar Roastery",
    price: 50,
    discountedPrice: 42,
    rating: 5,
    reviews: 73,
    image: "/placeholder.svg?height=300&width=300",
    category: "Nuts",
    description: "Premium quality cashew nuts, lightly salted",
  },
]

export default function ShopDetailPage({ shopId }: ShopDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("categories")
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  // Best selling products slider
  const itemsPerView = {
    desktop: 4,
  }

  const maxIndex = Math.max(0, bestSellingProducts.length - itemsPerView.desktop)

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Cover Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={shopData.coverImage || "/placeholder.svg"}
          alt={shopData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link href="/shops">
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200 z-10" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-full text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300 transform focus:scale-105"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Shop Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{shopData.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-lg">{shopData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${shopData.isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                />
                <span className="text-lg font-medium">
                  {shopData.isOpen ? `Open until ${shopData.openingHours.today.split(" - ")[1]}` : "Closed"}
                </span>
              </div>
            </div>

            {/* Shop Logo */}
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white ml-4">
              <Image
                src={shopData.logo || "/placeholder.svg"}
                alt={`${shopData.name} logo`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shop Stats */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {/* Rating */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{shopData.rating}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">({shopData.reviewCount}+)</span>
              <Badge className="mt-2 bg-red-500 hover:bg-red-600 text-white">Top Rated</Badge>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Monday</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{shopData.openingHours.monday}</span>
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">Now {currentTime}</span>
            </div>

            {/* Delivery Time */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <Truck className="h-6 w-6 text-green-500" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{shopData.deliveryTime}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Time</span>
              <div className="flex items-center gap-1 mt-1">
                <Phone className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{shopData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="categories">Available Categories</TabsTrigger>
            <TabsTrigger value="products">All Products</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-8">
            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shopData.categories.map((category) => (
                <Link key={category.id} href={`/shops/${shopId}/category/${category.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{category.productCount} products</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Best Selling Products Section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
                  Best Selling Products <span className="text-orange-500 ml-2">🔥</span>
                </h2>
              </div>

              <div className="relative" {...swipeHandlers}>
                {/* Navigation Arrows */}
                {currentIndex > 0 && (
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Previous products"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {currentIndex < maxIndex && (
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Next products"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                {/* Products Slider */}
                <div className="overflow-hidden">
                  <div
                    className="flex gap-4 transition-transform duration-300"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
                    }}
                  >
                    {bestSellingProducts.map((product) => (
                      <div key={product.id} className="min-w-[calc(25%-12px)]">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Products</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
