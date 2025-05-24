"use client"

import Image from "next/image"
import { Heart, Plus } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export function FavouriteItems() {
  const products = [
    { id: 1, name: "Product 1", store: "Store 1", price: 100, salePrice: 75, rating: 4, reviews: 1 },
    { id: 2, name: "Product 2", store: "Store 2", price: 110, salePrice: 85, rating: 4, reviews: 2 },
    { id: 3, name: "Product 3", store: "Store 3", price: 120, salePrice: 95, rating: 4, reviews: 3 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">25% OFF</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full hover:bg-white/80 text-red-600"
              >
                <Heart className="h-5 w-5 fill-current" />
              </Button>
              <div className="relative w-full h-48 p-4">
                <Image src="/placeholder.svg" alt={product.name} fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.store}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
                <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <p className="font-bold">${product.salePrice.toFixed(2)}</p>
                </div>
                <Button size="icon" className="rounded-md bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
