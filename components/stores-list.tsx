"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Star, MapPin, Clock, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Mock data for shops
const shopsData = [
  {
    id: 1,
    name: "Coffee Roaster Elite",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage:"",
    rating: 4.9,
    reviewCount: 156,
    address: "Downtown, Arad",
    category: "Coffee & Beverages",
    productsCount: 45,
    deliveryTime: "20-30 min",
    isOpen: true,
    openingHours: "06:00 - 22:00",
    featured: true,
    description: "Premium coffee roaster with  coffee",
  },
  {
    id: 2,
    name: "Fresh Market",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.7,
    reviewCount: 89,
    address: "Central Market, Arad",
    category: "Groceries",
    productsCount: 120,
    deliveryTime: "15-25 min",
    isOpen: true,
    openingHours: "07:00 - 23:00",
    featured: false,
    description: "Fresh groceries and daily essentials",
  },
  {
    id: 3,
    name: "Tech Store Pro",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    reviewCount: 234,
    address: "Tech District, Arad",
    category: "Electronics",
    productsCount: 89,
    deliveryTime: "30-45 min",
    isOpen: false,
    openingHours: "09:00 - 21:00",
    featured: true,
    description: "Latest electronics and gadgets",
  },
  {
    id: 4,
    name: "Fashion Hub",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.6,
    reviewCount: 67,
    address: "Fashion Street, Arad",
    category: "Fashion",
    productsCount: 156,
    deliveryTime: "25-35 min",
    isOpen: true,
    openingHours: "10:00 - 22:00",
    featured: false,
    description: "Trendy fashion and accessories",
  },
  {
    id: 5,
    name: "Healthy Bites",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    reviewCount: 123,
    address: "Health District, Arad",
    category: "Health & Wellness",
    productsCount: 78,
    deliveryTime: "20-30 min",
    isOpen: true,
    openingHours: "08:00 - 20:00",
    featured: false,
    description: "Organic and healthy food options",
  },
  {
    id: 6,
    name: "Book Corner",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.4,
    reviewCount: 45,
    address: "Cultural Center, Arad",
    category: "Books & Media",
    productsCount: 234,
    deliveryTime: "35-45 min",
    isOpen: true,
    openingHours: "09:00 - 21:00",
    featured: false,
    description: "Books, magazines, and educational materials",
  },
  {
    id: 7,
    name: "Sports Zone",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.7,
    reviewCount: 98,
    address: "Sports Complex, Arad",
    category: "Sports & Fitness",
    productsCount: 167,
    deliveryTime: "25-40 min",
    isOpen: true,
    openingHours: "06:00 - 23:00",
    featured: true,
    description: "Sports equipment and fitness gear",
  },
  {
    id: 8,
    name: "Home Essentials",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=400",
    rating: 4.3,
    reviewCount: 76,
    address: "Residential Area, Arad",
    category: "Home & Garden",
    productsCount: 145,
    deliveryTime: "30-50 min",
    isOpen: true,
    openingHours: "08:00 - 22:00",
    featured: false,
    description: "Everything for your home and garden",
  },
]

type SortOption = "rating" | "products" | "alphabetical" | "newest"

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("rating")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const itemsPerPage = 6

  // Filter and sort shops
  const filteredAndSortedShops = useMemo(() => {
    const filtered = shopsData.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Sort based on selected option
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "products":
        filtered.sort((a, b) => b.productsCount - a.productsCount)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedShops.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedShops = filteredAndSortedShops.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Amazing Shops</h1>
            <p className="text-gray-600 dark:text-gray-300">Find the best stores in your area</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for shops, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {paginatedShops.length} of {filteredAndSortedShops.length} shops
            </div>
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="container mx-auto px-4 py-8">
        {paginatedShops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No shops found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-0">
                  {/* Shop Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={shop.coverImage || "/placeholder.svg"}
                      alt={shop.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Shop Logo */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                        <Image
                          src={shop.logo || "/placeholder.svg"}
                          alt={`${shop.name} logo`}
                          width={80}
                          height={80}
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={shop.isOpen ? "default" : "secondary"}
                        className={shop.isOpen ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}
                      >
                        {shop.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    {/* Featured Badge */}
                    {shop.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Featured</Badge>
                      </div>
                    )}
                  </div>

                  {/* Shop Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{shop.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{shop.description}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {shop.address}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-gray-900 dark:text-white">{shop.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({shop.reviewCount})</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Package className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">{shop.productsCount}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Products</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-gray-900 dark:text-white text-xs">
                            {shop.deliveryTime}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Delivery</span>
                      </div>
                    </div>

                    {/* Category and Hours */}
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2">
                        {shop.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        {shop.openingHours}
                      </div>
                    </div>

                    {/* Visit Button */}
                    <Link href={`/stores/${shop.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Visit Shop</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
