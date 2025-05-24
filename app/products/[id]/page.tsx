"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Minus, Plus, Star } from "lucide-react"
import { useCart } from "../../../components/cart-provider"

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
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
}

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-12 flex items-center justify-center font-semibold">{quantity}</div>
              <button
                className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
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
    </div>
  )
}
