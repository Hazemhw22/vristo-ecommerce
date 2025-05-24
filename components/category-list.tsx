import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: 1, name: "Category 1", image: "/KFC_logo.svg.png" },
  { id: 2, name: "Category 2", image: "/KFC_logo.svg.png" },
  { id: 3, name: "Category 3", image: "/KFC_logo.svg.png" },
  { id: 4, name: "Category 4", image: "/KFC_logo.svg.png" },
  { id: 5, name: "Category 5", image: "/KFC_logo.svg.png" },
  { id: 6, name: "Category 6", image: "/KFC_logo.svg.png" },
  { id: 7, name: "Category 7", image: "/KFC_logo.svg.png" },
  { id: 8, name: "Category 8", image: "/KFC_logo.svg.png" },
]

export function CategoryList() {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
