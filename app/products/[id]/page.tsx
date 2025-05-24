"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Minus, Plus, Star } from "lucide-react"
import { useCart } from "../../../components/cart-provider"
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
    "/pngimg.com - iphone16_PNG35.png?height=400&width=400",
    "/pngtree-smart-electronic-apple-watches-vector-set-png-image_5155507.png?height=400&width=400",
    "/pngimg.com - iphone16_PNG35.png?height=400&width=400",
    "/pngtree-smart-electronic-apple-watches-vector-set-png-image_5155507.png?height=400&width=400",
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

// Mock suggested products with more items to demonstrate scrolling
const suggestedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    store: "Audio Tech",
    price: 150,
    discountedPrice: 120,
    rating: 4.5,
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
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Power",
    description: "High-capacity portable charger with fast charging technology and multiple device support.",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    store: "Audio Tech",
    price: 80,
    discountedPrice: 64,
    rating: 4.3,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Audio",
    description: "Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    store: "Health Tech",
    price: 60,
    discountedPrice: 48,
    rating: 4.1,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Fitness",
    description: "Advanced fitness tracker with heart rate monitoring and sleep analysis.",
  },
  {
    id: 7,
    name: "Wireless Mouse",
    store: "Computer Accessories",
    price: 35,
    discountedPrice: 28,
    rating: 4.4,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Computer",
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
  },
  {
    id: 8,
    name: "USB-C Hub",
    store: "Tech Accessories",
    price: 55,
    discountedPrice: 44,
    rating: 4.6,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Computer",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and fast charging support.",
  },
  {
    id: 9,
    name: "Wireless Keyboard",
    store: "Computer Accessories",
    price: 70,
    discountedPrice: 56,
    rating: 4.3,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Computer",
    description: "Mechanical wireless keyboard with RGB backlighting and programmable keys.",
  },
  {
    id: 10,
    name: "Smart Home Hub",
    store: "Smart Home",
    price: 120,
    discountedPrice: 96,
    rating: 4.5,
    image: "/pngimg.com - sony_playstation_PNG17546.png?height=200&width=200",
    category: "Smart Home",
    description: "Central hub for controlling all your smart home devices with voice commands.",
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
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.images[0],
      quantity,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 h-80 flex items-center justify-center relative">
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 rounded-md overflow-hidden cursor-pointer ${
                  activeImage === index ? "border-blue-600" : "border-transparent"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <div className="relative h-20 w-full">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
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

          <div className="flex flex-col sm:flex-row gap-4">
         <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden w-max">
              <button
                className="w-14 h-14 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>
              <div className="w-14 h-14 flex items-center justify-center font-semibold text-lg select-none">
                {quantity}
              </div>
              <button
                className="w-14 h-14 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
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
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
                className={isFavorite ? "text-red-500" : ""}
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
              <p className="text-gray-500 dark:text-gray-400">Reviews feature coming soon!</p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Suggested Products Carousel */}
      <SuggestedProductsCarousel products={suggestedProducts} />
    </div>
  )
}
