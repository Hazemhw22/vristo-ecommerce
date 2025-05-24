import { HeroSection } from "../components/hero-section"
import { RecommendedStores } from "../components/recommended-stores"
import { PopularProducts } from "../components/popular-products"
import { GiftSection } from "../components/gift-section"
import { PopularStores } from "../components/popular-stores"
import { CategorySection } from "../components/category-section"

export default function Home() {
  return (
    <main className="flex flex-col gap-8 p-4 sm:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <HeroSection />
      <CategorySection />
      <RecommendedStores />
      <PopularProducts />
      <PopularStores />
      <GiftSection />
    </main>
  )
}
