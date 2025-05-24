"use client"

import ProductCard from "./ProductCard"

const productSample = {
  id: 1,
  name: "Product",
  store: "Store",
  price: 100,
  discountedPrice: 75,
  rating: 4,
  reviews: 5,
  image: "/pngimg.com - iphone16_PNG35.png?height=200&width=200",
  category: "Phones",
}

export function ProductsList({ count = 8 }: { count?: number }) {
  const products = Array.from({ length: count }, (_, i) => ({
    ...productSample,
    id: i + 1,
    name: `Product ${i + 1}`,
    store: `Store ${i + 1}`,
  }))

  return (
    <section className="py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
