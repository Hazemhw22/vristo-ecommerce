"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Minus, Plus, Star, Printer, Share2, Copy, MessageCircle } from "lucide-react"
import { useCart } from "../../../components/cart-provider"
import { useFavorites } from "../../../components/favourite-items"
import { ImageLightbox } from "../../../components/image-lightbox"
import SuggestedProductsCarousel from "../../../components/SuggestedProductsCarousel"

// Mock data - in a real app, you'd fetch the product via API based on id
const product = {
  id: 1,
  name: "Smart Watch Pro",
  store: "Tech Store",
  price: 100,
  discountedPrice: 75,
  discount: 25,
  rating: 4,
  reviews: 42,
  description:
    "The Smart Watch Pro is a premium smartwatch with advanced features including heart rate monitoring, GPS tracking, and a beautiful OLED display. It's water-resistant and has a battery life of up to 5 days.",
  images: [
    "/pngimg.com - iphone16_PNG35.png?height=400&width=400&text=Main+Image",
    "/pngtree-smart-electronic-apple-watches-vector-set-png-image_5155507.png?height=400&width=400&text=Side+View",
    "/pngimg.com - iphone16_PNG35.png?height=400&width=400&text=Main+Image",
    "/pngtree-smart-electronic-apple-watches-vector-set-png-image_5155507.png?height=400&width=400&text=Side+View",
    "/pngimg.com - iphone16_PNG35.png?height=400&width=400&text=Main+Image",
  ],
  specifications: [
    {
      category: "Display",
      features: [
        "1.9-inch AMOLED display with 484 x 396 resolution",
        "Always-on display with customizable watch faces",
        "Brightness up to 1000 nits",
        "Sapphire crystal glass protection",
        "Digital Crown with haptic feedback",
      ],
    },
    {
      category: "Health & Fitness",
      features: [
        "Advanced heart rate monitoring with ECG capability",
        "Blood oxygen level measurement (SpO2)",
        "Sleep tracking with sleep stages analysis",
        "Built-in GPS for accurate workout tracking",
        "Water resistant up to 50 meters",
        "Fall detection and emergency SOS",
        "Workout detection for 100+ exercise types",
      ],
    },
    {
      category: "Connectivity",
      features: [
        "Bluetooth 5.3 for seamless device pairing",
        "Wi-Fi 802.11 b/g/n (2.4GHz)",
        "NFC for contactless payments",
        "LTE cellular connectivity (optional)",
        "Compatible with iOS 14+ and Android 8+",
      ],
    },
    {
      category: "Battery & Performance",
      features: [
        "Up to 5 days battery life with typical usage",
        "Fast charging: 0-80% in 45 minutes",
        "Dual-core processor for smooth performance",
        "32GB internal storage",
        "Wireless charging compatible",
      ],
    },
  ],
}

// Mock suggested products
const suggestedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    store: "Audio Tech",
    price: 150,
    discountedPrice: 120,
    rating: 4.5,
    reviews: 89,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Audio",
    description: "Premium wireless earbuds with active noise cancellation and superior sound quality.",
  },
  {
    id: 3,
    name: "Smartphone Case",
    store: "Mobile Accessories",
    price: 25,
    discountedPrice: 20,
    rating: 4.2,
    reviews: 156,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Accessories",
    description: "Durable protective case with military-grade drop protection and wireless charging compatibility.",
  },
  {
    id: 4,
    name: "Portable Charger",
    store: "Power Solutions",
    price: 40,
    discountedPrice: 32,
    rating: 4.7,
    reviews: 203,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Power",
    description: "High-capacity portable charger with fast charging technology and multiple device support.",
  },
]

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedCapacity, setSelectedCapacity] = useState("128GB")
  const [selectedColor, setSelectedColor] = useState("Black")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % product.images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.images[0],
      quantity,
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.images[0],
      store: product.store,
      rating: product.rating,
      reviews: product.reviews,
      inStock: true,
    })
  }

  const handleShare = (type: string) => {
    const url = window.location.href
    const text = `Check out this ${product.name} - $${product.discountedPrice}`

    switch (type) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        break
      case "print":
        window.print()
        break
      case "share":
        if (navigator.share) {
          navigator.share({ title: product.name, text, url })
        }
        break
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div>
          {/* Main Image with Auto-rotation */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 h-80 flex items-center justify-center relative cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">New</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">Sale</span>
            </div>
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-opacity duration-500"
              priority
            />
            {/* Click to view indicator */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Click to view full size
              </div>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${
                  activeImage === index ? "border-blue-600 scale-105" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleShare("print")}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Print"
            >
              <Printer size={22} />
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle size={22} />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Copy Link"
            >
              <Copy size={22} />
            </button>
            <button
              onClick={() => handleShare("share")}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Share"
            >
              <Share2 size={22} />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{product.store}</p>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < product.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                fill={i < product.rating ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-500 dark:text-gray-400 text-xl line-through">${product.price.toFixed(2)}</span>
            <span className="text-3xl font-bold">${product.discountedPrice.toFixed(2)}</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{product.discount}% OFF</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

          {/* Product Options */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Capacity:</label>
              <div className="flex gap-2">
                {["128GB", "256GB", "512GB"].map((capacity) => (
                  <button
                    key={capacity}
                    onClick={() => setSelectedCapacity(capacity)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedCapacity === capacity
                        ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Color:</label>
              <div className="flex gap-2">
                {["Black", "White", "Blue", "Red"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden w-max">
              <button
                className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>
              <div className="w-12 h-12 flex items-center justify-center font-semibold text-lg select-none">
                {quantity}
              </div>
              <button
                className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              className="flex-1 h-12 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>

            <button
              className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center"
              onClick={handleToggleFavorite}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={20}
                fill={isFavorite(product.id) ? "currentColor" : "none"}
                className={isFavorite(product.id) ? "text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-12">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "description"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "specifications"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Experience the future of wearable technology with our Smart Watch Pro. This cutting-edge device combines
              style, functionality, and innovation to deliver an unparalleled user experience. Whether you're tracking
              your fitness goals, staying connected with loved ones, or managing your daily tasks, this smartwatch is
              your perfect companion.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""}>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 w-1/4 align-top">
                      {spec.category}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      <ul className="space-y-2">
                        {spec.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Reviews coming soon!</p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Suggested Products Carousel */}
      <SuggestedProductsCarousel products={suggestedProducts} />

      {/* Image Lightbox */}
      <ImageLightbox
        images={product.images}
        currentIndex={activeImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        productName={product.name}
      />
    </div>
  )
}
