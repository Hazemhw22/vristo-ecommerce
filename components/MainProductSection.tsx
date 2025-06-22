// components/MainProductSection.tsx
"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

type Product = {
  id: number;
  name: string;
  store: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviews: number;
  image: string;
};

interface MainProductSectionProps {
  title: string;
  products: Product[];
  linkToAll?: string;
}

export default function MainProductSection({
  title,
  products,
  linkToAll = "/products",
}: MainProductSectionProps) {
  return (
    <section className="py-6 px-2">
      {/* بانر العنوان في المنتصف */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg h-24 flex items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">
          {title}
        </h2>
      </div>

      {/* شبكة الكروت */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* بانر سفلي - عرض الكل */}
      <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium text-lg">
          <MoreHorizontal className="w-5 h-5" />
          منتجات مميزة
        </div>
        <Link
          href={linkToAll}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-base"
        >
          عرض الكل
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
