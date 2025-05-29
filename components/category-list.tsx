"use client"

import { useState } from "react"
import { Search, ArrowRight, Package, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Mock data for categories
const categoriesData = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets, smartphones, laptops, and electronic accessories",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 1250,
    trending: true,
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "2",
    name: "Fashion & Clothing",
    description: "Trendy clothes, shoes, accessories for men, women, and kids",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 890,
    trending: false,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "3",
    name: "Home & Garden",
    description: "Furniture, home decor, kitchen appliances, and garden tools",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 675,
    trending: true,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "4",
    name: "Health & Beauty",
    description: "Skincare, makeup, supplements, and wellness products",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 420,
    trending: false,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "5",
    name: "Sports & Fitness",
    description: "Exercise equipment, sportswear, and outdoor gear",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 380,
    trending: true,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "6",
    name: "Books & Media",
    description: "Books, magazines, movies, music, and educational content",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 560,
    trending: false,
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "7",
    name: "Food & Beverages",
    description: "Fresh groceries, snacks, beverages, and gourmet foods",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 720,
    trending: true,
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "8",
    name: "Automotive",
    description: "Car accessories, parts, tools, and maintenance products",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 290,
    trending: false,
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "9",
    name: "Baby & Kids",
    description: "Toys, baby care products, children's clothing, and educational items",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 450,
    trending: true,
    color: "from-pink-400 to-purple-500",
  },
  {
    id: "10",
    name: "Pet Supplies",
    description: "Pet food, toys, accessories, and care products for all pets",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 180,
    trending: false,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "11",
    name: "Office & Business",
    description: "Office supplies, business equipment, and professional tools",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 320,
    trending: false,
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "12",
    name: "Arts & Crafts",
    description: "Art supplies, craft materials, and creative tools",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 240,
    trending: true,
    color: "from-violet-500 to-purple-600",
  },
]

type SortOption = "name" | "products" | "trending"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)

  // Filter and sort categories
  const filteredAndSortedCategories = categoriesData
    .filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTrending = !showTrendingOnly || category.trending
      return matchesSearch && matchesTrending
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "products":
          return b.productCount - a.productCount
        case "trending":
          return Number(b.trending) - Number(a.trending)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Categories</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover thousands of products across all categories. Find exactly what you're looking for.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Alphabetical</SelectItem>
                    <SelectItem value="products">Most Products</SelectItem>
                    <SelectItem value="trending">Trending First</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={showTrendingOnly ? "default" : "outline"}
                  onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending Only
                </Button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredAndSortedCategories.length} of {categoriesData.length} categories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredAndSortedCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No categories found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCategories.map((category) => (
              <Card
                key={category.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-0">
                  {/* Category Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />

                    {/* Trending Badge */}
                    {category.trending && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                          🔥 Trending
                        </Badge>
                      </div>
                    )}

                    {/* Category Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{category.name}</h3>
                    </div>
                  </div>

                  {/* Category Details */}
                  <div className="p-6 space-y-4">
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {category.description}
                    </p>

                    {/* Product Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Package className="h-4 w-4" />
                      <span>{category.productCount.toLocaleString()} products available</span>
                    </div>

                    {/* View Products Button */}
                    <Link href={`/categories/${category.id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-blue-700">
                        View Products
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{categoriesData.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {categoriesData.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {categoriesData.filter((cat) => cat.trending).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trending</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
