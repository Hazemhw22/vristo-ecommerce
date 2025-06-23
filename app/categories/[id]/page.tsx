"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, Search, Filter, Grid, List, Star, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "../../../components/ProductCard"
import Link from "next/link"
import Image from "next/image"

interface PageProps {
  params: {
    id: string
  }
}

// Mock data for categories
const categoriesData = {
  "1": {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets, smartphones, laptops, and electronic accessories",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-blue-500 to-purple-600",
  },
  "2": {
    id: 2,
    name: "Fashion & Clothing",
    description: "Trendy clothes, shoes, accessories for men, women, and kids",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-pink-500 to-rose-600",
  },
  "3": {
    id: 3,
    name: "Home & Garden",
    description: "Furniture, home decor, kitchen appliances, and garden tools",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-green-500 to-emerald-600",
  },
  "4": {
    id: 4,
    name: "Health & Beauty",
    description: "Skincare, makeup, supplements, and wellness products",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-purple-500 to-indigo-600",
  },
  "5": {
    id: 5,
    name: "Sports & Fitness",
    description: "Exercise equipment, sportswear, and outdoor gear",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-orange-500 to-red-600",
  },
  "6": {
    id: 6,
    name: "Books & Media",
    description: "Books, magazines, movies, music, and educational content",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-teal-500 to-cyan-600",
  },
  "7": {
    id: 7,
    name: "Food & Beverages",
    description: "Fresh groceries, snacks, beverages, and gourmet foods",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-yellow-500 to-orange-600",
  },
  "8": {
    id: 8,
    name: "Automotive",
    description: "Car accessories, parts, tools, and maintenance products",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-gray-500 to-slate-600",
  },
  "9": {
    id: 9,
    name: "Baby & Kids",
    description: "Toys, baby care products, children's clothing, and educational items",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-pink-400 to-purple-500",
  },
  "10": {
    id: 10,
    name: "Pet Supplies",
    description: "Pet food, toys, accessories, and care products for all pets",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-amber-500 to-yellow-600",
  },
  "11": {
    id: 11,
    name: "Office & Business",
    description: "Office supplies, business equipment, and professional tools",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-blue-600 to-indigo-700",
  },
  "12": {
    id: 12,
    name: "Arts & Crafts",
    description: "Art supplies, craft materials, and creative tools",
    image: "/placeholder.svg?height=200&width=400",
    color: "from-violet-500 to-purple-600",
  },
}

// Mock products data for each category
const categoryProducts = {
  "1": [
    // Electronics
    {
      id: 101,
      name: "iPhone 15 Pro Max",
      store: "Apple Store",
      price: 1200,
      discountedPrice: 1099,
      rating: 5,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smartphones",
      description: "Latest iPhone with advanced camera system and A17 Pro chip",
    },
    {
      id: 102,
      name: "MacBook Air M3",
      store: "Apple Store",
      price: 1299,
      discountedPrice: 1199,
      rating: 5,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Laptops",
      description: "Ultra-thin laptop with M3 chip and all-day battery life",
    },
    {
      id: 103,
      name: "Samsung Galaxy S24",
      store: "Samsung",
      price: 999,
      discountedPrice: 899,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smartphones",
      description: "Flagship Android phone with AI features",
    },
    {
      id: 104,
      name: "Sony WH-1000XM5",
      store: "Sony",
      price: 399,
      discountedPrice: 349,
      rating: 5,
      reviews: 298,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      description: "Premium noise-canceling headphones",
    },
    {
      id: 105,
      name: "iPad Pro 12.9",
      store: "Apple Store",
      price: 1099,
      discountedPrice: 999,
      rating: 5,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tablets",
      description: "Professional tablet with M2 chip and Liquid Retina display",
    },
    {
      id: 106,
      name: "Dell XPS 13",
      store: "Dell",
      price: 1199,
      discountedPrice: 1099,
      rating: 4,
      reviews: 134,
      image: "/placeholder.svg?height=300&width=300",
      category: "Laptops",
      description: "Premium ultrabook with InfinityEdge display",
    },
  ],
  "2": [
    // Fashion & Clothing
    {
      id: 201,
      name: "Nike Air Max 270",
      store: "Nike",
      price: 150,
      discountedPrice: 129,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shoes",
      description: "Comfortable running shoes with Air Max technology",
    },
    {
      id: 202,
      name: "Levi's 501 Jeans",
      store: "Levi's",
      price: 89,
      discountedPrice: 69,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      description: "Classic straight-fit jeans in premium denim",
    },
    {
      id: 203,
      name: "Adidas Hoodie",
      store: "Adidas",
      price: 79,
      discountedPrice: 59,
      rating: 4,
      reviews: 78,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      description: "Comfortable cotton hoodie with iconic 3-stripes",
    },
    {
      id: 204,
      name: "Ray-Ban Aviator",
      store: "Ray-Ban",
      price: 199,
      discountedPrice: 179,
      rating: 5,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Sunglasses",
      description: "Classic aviator sunglasses with UV protection",
    },
    {
      id: 205,
      name: "H&M Summer Dress",
      store: "H&M",
      price: 49,
      discountedPrice: 39,
      rating: 4,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      category: "Dresses",
      description: "Lightweight summer dress in floral print",
    },
    {
      id: 206,
      name: "Zara Leather Jacket",
      store: "Zara",
      price: 199,
      discountedPrice: 159,
      rating: 4,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jackets",
      description: "Premium leather jacket with modern cut",
    },
  ],
  "3": [
    // Home & Garden
    {
      id: 301,
      name: "IKEA Sofa Set",
      store: "IKEA",
      price: 899,
      discountedPrice: 799,
      rating: 4,
      reviews: 145,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
      description: "Comfortable 3-seater sofa with washable covers",
    },
    {
      id: 302,
      name: "KitchenAid Mixer",
      store: "KitchenAid",
      price: 399,
      discountedPrice: 349,
      rating: 5,
      reviews: 278,
      image: "/placeholder.svg?height=300&width=300",
      category: "Kitchen",
      description: "Professional stand mixer for baking enthusiasts",
    },
    {
      id: 303,
      name: "Dyson V15 Vacuum",
      store: "Dyson",
      price: 749,
      discountedPrice: 649,
      rating: 5,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Cleaning",
      description: "Cordless vacuum with laser dust detection",
    },
    {
      id: 304,
      name: "Garden Tool Set",
      store: "Home Depot",
      price: 129,
      discountedPrice: 99,
      rating: 4,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      category: "Garden",
      description: "Complete set of essential gardening tools",
    },
    {
      id: 305,
      name: "Smart Thermostat",
      store: "Nest",
      price: 249,
      discountedPrice: 199,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smart Home",
      description: "Energy-saving smart thermostat with app control",
    },
    {
      id: 306,
      name: "LED Floor Lamp",
      store: "Philips",
      price: 179,
      discountedPrice: 149,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Lighting",
      description: "Modern LED floor lamp with adjustable brightness",
    },
  ],
  "4": [
    // Health & Beauty
    {
      id: 401,
      name: "Vitamin C Serum",
      store: "The Ordinary",
      price: 29,
      discountedPrice: 24,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Skincare",
      description: "Brightening vitamin C serum for radiant skin",
    },
    {
      id: 402,
      name: "Protein Powder",
      store: "Optimum Nutrition",
      price: 59,
      discountedPrice: 49,
      rating: 5,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Supplements",
      description: "Whey protein powder for muscle building",
    },
    {
      id: 403,
      name: "Makeup Palette",
      store: "Urban Decay",
      price: 89,
      discountedPrice: 69,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Makeup",
      description: "Eyeshadow palette with 12 versatile shades",
    },
    {
      id: 404,
      name: "Electric Toothbrush",
      store: "Oral-B",
      price: 199,
      discountedPrice: 159,
      rating: 5,
      reviews: 278,
      image: "/placeholder.svg?height=300&width=300",
      category: "Oral Care",
      description: "Smart electric toothbrush with app connectivity",
    },
    {
      id: 405,
      name: "Hair Dryer",
      store: "Dyson",
      price: 429,
      discountedPrice: 379,
      rating: 5,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hair Care",
      description: "Professional hair dryer with intelligent heat control",
    },
    {
      id: 406,
      name: "Moisturizer",
      store: "CeraVe",
      price: 19,
      discountedPrice: 16,
      rating: 4,
      reviews: 298,
      image: "/placeholder.svg?height=300&width=300",
      category: "Skincare",
      description: "Daily moisturizing lotion for all skin types",
    },
  ],
  "5": [
    // Sports & Fitness
    {
      id: 501,
      name: "Yoga Mat",
      store: "Lululemon",
      price: 89,
      discountedPrice: 69,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Yoga",
      description: "Premium yoga mat with superior grip and cushioning",
    },
    {
      id: 502,
      name: "Dumbbells Set",
      store: "Bowflex",
      price: 299,
      discountedPrice: 249,
      rating: 5,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Weights",
      description: "Adjustable dumbbells for home workouts",
    },
    {
      id: 503,
      name: "Running Shoes",
      store: "Nike",
      price: 179,
      discountedPrice: 149,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Shoes",
      description: "Lightweight running shoes with responsive cushioning",
    },
    {
      id: 504,
      name: "Fitness Tracker",
      store: "Fitbit",
      price: 199,
      discountedPrice: 169,
      rating: 4,
      reviews: 278,
      image: "/placeholder.svg?height=300&width=300",
      category: "Wearables",
      description: "Advanced fitness tracker with heart rate monitoring",
    },
    {
      id: 505,
      name: "Protein Shaker",
      store: "BlenderBottle",
      price: 19,
      discountedPrice: 15,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      description: "Leak-proof protein shaker with mixing ball",
    },
    {
      id: 506,
      name: "Resistance Bands",
      store: "TRX",
      price: 49,
      discountedPrice: 39,
      rating: 4,
      reviews: 134,
      image: "/placeholder.svg?height=300&width=300",
      category: "Equipment",
      description: "Set of resistance bands for strength training",
    },
  ],
  "6": [
    // Books & Media
    {
      id: 601,
      name: "The Great Gatsby",
      store: "Amazon Books",
      price: 15,
      discountedPrice: 12,
      rating: 5,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Fiction",
      description: "Classic American novel by F. Scott Fitzgerald",
    },
    {
      id: 602,
      name: "Programming Book",
      store: "Tech Books",
      price: 45,
      discountedPrice: 39,
      rating: 4,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      category: "Programming",
      description: "Learn modern web development techniques",
    },
    {
      id: 603,
      name: "National Geographic",
      store: "Magazine Store",
      price: 8,
      discountedPrice: 6,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Magazines",
      description: "Monthly nature and science magazine",
    },
    {
      id: 604,
      name: "Bluetooth Speaker",
      store: "Audio Tech",
      price: 89,
      discountedPrice: 69,
      rating: 4,
      reviews: 345,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      description: "Portable wireless speaker with great sound",
    },
  ],
  "7": [
    // Food & Beverages
    {
      id: 701,
      name: "Organic Honey",
      store: "Natural Foods",
      price: 25,
      discountedPrice: 20,
      rating: 5,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Organic",
      description: "Pure organic honey from local beekeepers",
    },
    {
      id: 702,
      name: "Premium Coffee Beans",
      store: "Coffee Co.",
      price: 35,
      discountedPrice: 29,
      rating: 5,
      reviews: 456,
      image: "/placeholder.svg?height=300&width=300",
      category: "Coffee",
      description: "Single-origin arabica coffee beans",
    },
    {
      id: 703,
      name: "Olive Oil",
      store: "Mediterranean",
      price: 18,
      discountedPrice: 15,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Oils",
      description: "Extra virgin olive oil from Greece",
    },
    {
      id: 704,
      name: "Green Tea",
      store: "Tea House",
      price: 22,
      discountedPrice: 18,
      rating: 4,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tea",
      description: "Premium green tea leaves from Japan",
    },
  ],
  "8": [
    // Automotive
    {
      id: 801,
      name: "Car Phone Mount",
      store: "Auto Parts",
      price: 29,
      discountedPrice: 24,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      description: "Universal smartphone mount for car dashboard",
    },
    {
      id: 802,
      name: "Car Charger",
      store: "Electronics",
      price: 19,
      discountedPrice: 15,
      rating: 4,
      reviews: 345,
      image: "/placeholder.svg?height=300&width=300",
      category: "Chargers",
      description: "Fast charging USB car charger",
    },
    {
      id: 803,
      name: "Floor Mats",
      store: "Auto Accessories",
      price: 45,
      discountedPrice: 39,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Interior",
      description: "All-weather rubber floor mats",
    },
    {
      id: 804,
      name: "Air Freshener",
      store: "Car Care",
      price: 12,
      discountedPrice: 9,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Care",
      description: "Long-lasting car air freshener",
    },
  ],
  "9": [
    // Baby & Kids
    {
      id: 901,
      name: "Baby Stroller",
      store: "Baby Store",
      price: 299,
      discountedPrice: 249,
      rating: 5,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Strollers",
      description: "Lightweight and foldable baby stroller",
    },
    {
      id: 902,
      name: "Educational Toy",
      store: "Toy World",
      price: 39,
      discountedPrice: 29,
      rating: 4,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "Toys",
      description: "Interactive learning toy for toddlers",
    },
    {
      id: 903,
      name: "Baby Clothes Set",
      store: "Kids Fashion",
      price: 45,
      discountedPrice: 35,
      rating: 4,
      reviews: 123,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      description: "Soft cotton clothing set for babies",
    },
    {
      id: 904,
      name: "Diaper Bag",
      store: "Baby Essentials",
      price: 79,
      discountedPrice: 59,
      rating: 4,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      category: "Bags",
      description: "Spacious and organized diaper bag",
    },
  ],
  "10": [
    // Pet Supplies
    {
      id: 1001,
      name: "Dog Food",
      store: "Pet Store",
      price: 49,
      discountedPrice: 39,
      rating: 5,
      reviews: 345,
      image: "/placeholder.svg?height=300&width=300",
      category: "Food",
      description: "Premium dry dog food for all breeds",
    },
    {
      id: 1002,
      name: "Cat Toy",
      store: "Pet Paradise",
      price: 15,
      discountedPrice: 12,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Toys",
      description: "Interactive feather toy for cats",
    },
    {
      id: 1003,
      name: "Pet Bed",
      store: "Comfort Pets",
      price: 69,
      discountedPrice: 55,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Beds",
      description: "Comfortable orthopedic pet bed",
    },
    {
      id: 1004,
      name: "Dog Leash",
      store: "Pet Gear",
      price: 25,
      discountedPrice: 19,
      rating: 4,
      reviews: 123,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      description: "Durable retractable dog leash",
    },
  ],
  "11": [
    // Office & Business
    {
      id: 1101,
      name: "Office Chair",
      store: "Office Depot",
      price: 199,
      discountedPrice: 159,
      rating: 4,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
      description: "Ergonomic office chair with lumbar support",
    },
    {
      id: 1102,
      name: "Desk Organizer",
      store: "Office Solutions",
      price: 29,
      discountedPrice: 24,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Organization",
      description: "Multi-compartment desk organizer",
    },
    {
      id: 1103,
      name: "Printer Paper",
      store: "Office Supplies",
      price: 19,
      discountedPrice: 15,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Paper",
      description: "High-quality A4 printer paper pack",
    },
    {
      id: 1104,
      name: "Wireless Mouse",
      store: "Tech Office",
      price: 39,
      discountedPrice: 29,
      rating: 4,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      description: "Ergonomic wireless optical mouse",
    },
  ],
  "12": [
    // Arts & Crafts
    {
      id: 1201,
      name: "Acrylic Paint Set",
      store: "Art Store",
      price: 45,
      discountedPrice: 35,
      rating: 5,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      category: "Paints",
      description: "Professional acrylic paint set with 24 colors",
    },
    {
      id: 1202,
      name: "Sketch Pad",
      store: "Artist Supply",
      price: 19,
      discountedPrice: 15,
      rating: 4,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "Paper",
      description: "High-quality sketch pad for drawing",
    },
    {
      id: 1203,
      name: "Craft Scissors",
      store: "Craft World",
      price: 25,
      discountedPrice: 19,
      rating: 4,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tools",
      description: "Precision craft scissors for detailed work",
    },
    {
      id: 1204,
      name: "Glue Gun",
      store: "DIY Tools",
      price: 29,
      discountedPrice: 24,
      rating: 4,
      reviews: 123,
      image: "/placeholder.svg?height=300&width=300",
      category: "Tools",
      description: "Hot glue gun for crafting projects",
    },
  ],
}

type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest"
type ViewMode = "grid" | "list"

export default function CategoryDetailPage({ params }: PageProps) {
  const categoryId = params.id
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12
  const category = categoriesData[categoryId as keyof typeof categoriesData]
  const products = categoryProducts[categoryId as keyof typeof categoryProducts] || []

  // Get unique subcategories for filters
  const subcategories = [...new Set(products.map((p) => p.category))]

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.store.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPrice = product.discountedPrice >= priceRange[0] && product.discountedPrice <= priceRange[1]

      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(product.rating)

      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(product.category)

      return matchesSearch && matchesPrice && matchesRating && matchesSubcategory
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case "price-high":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [products, searchQuery, sortBy, priceRange, selectedRatings, selectedSubcategories])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRatingFilter = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleSubcategoryFilter = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory],
    )
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1500])
    setSelectedRatings([])
    setSelectedSubcategories([])
  }

  // Filters Component
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} max={1500} step={10} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="font-medium mb-3">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingFilter(rating)}
              />
              <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      <div>
        <h4 className="font-medium mb-3">Subcategories</h4>
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center space-x-2">
              <Checkbox
                id={`sub-${subcategory}`}
                checked={selectedSubcategories.includes(subcategory)}
                onCheckedChange={() => handleSubcategoryFilter(subcategory)}
              />
              <label htmlFor={`sub-${subcategory}`} className="text-sm">
                {subcategory}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearAllFilters}>
        Clear All Filters
      </Button>
    </div>
  )

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The category you're looking for doesn't exist.</p>
          <Link href="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Header - Mobile Optimized */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 sm:gap-4 mb-4">
              <Link href="/categories">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">{category.name}</h1>
                <p className="text-white/90 text-sm sm:text-lg hidden sm:block">{category.description}</p>
                <Badge className="mt-1 sm:mt-2 bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  {products.length} Products Available
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FiltersContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls - Mobile Optimized */}
            <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base"
                />
              </div>

              {/* Controls - Mobile Optimized */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                  {/* Mobile Filters Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden flex items-center gap-2 whitespace-nowrap"
                      >
                        <Filter className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <SlidersHorizontal className="h-5 w-5" />
                          Filters
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-36 sm:w-48 text-xs sm:text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="px-2 sm:px-3"
                    >
                      <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="px-2 sm:px-3"
                    >
                      <List className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                </div>
              </div>
            </div>

            {/* Products Grid/List - Mobile Optimized */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-3 sm:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {paginatedProducts.map((product) => {
                  // Map mock product to ProductCard expected shape
                  const mappedProduct = {
                    id: product.id,
                    created_at: "2024-01-01T00:00:00Z", // mock date
                    shop: 1, // mock shop id
                    title: product.name,
                    desc: product.description,
                    price: product.price,
                    images: [product.image],
                    category: category ? category.id : null,
                    sale_price: product.discountedPrice,
                    discount_type: product.discountedPrice < product.price ? "fixed" as const : null,
                    rating: product.rating,
                    reviews: product.reviews,
                    active: true, // Added required property
                  }
                  return <ProductCard key={product.id} product={mappedProduct} />
                })}
              </div>
            )}

            {/* Pagination - Mobile Optimized */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex gap-1 sm:gap-2">
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        size="sm"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                      >
                        {page}
                      </Button>
                    )
                  })}
                  {totalPages > 3 && (
                    <>
                      <span className="flex items-center px-2 text-gray-500">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        onClick={() => handlePageChange(totalPages)}
                        size="sm"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
