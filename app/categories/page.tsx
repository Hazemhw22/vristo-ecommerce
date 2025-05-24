import { CategoryList } from "../../components/category-list"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoryList />
    </div>
  )
}
