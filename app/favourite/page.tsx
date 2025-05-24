"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "../../components/ui/button"
import { FavouriteItems } from "../../components/favourite-items"

export default function FavouritePage() {
  // In a real app, this would come from a context or API
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([])

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Items you add to your favorites will appear here. Start exploring and add some favorites!
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <FavouriteItems />
      )}
    </div>
  )
}
