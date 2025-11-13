"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/sanity.schema";
import { urlFor } from "@/lib/sanity.client";

interface CategoryCardProps {
  category: Category;
  layout?: "square" | "wide";
}

export default function CategoryCard({
  category,
  layout = "square",
}: CategoryCardProps) {
  // ✅ Use urlFor to generate the image URL dynamically
  const imageUrl = category.image
    ? urlFor(category.image).width(800).height(600).url()
    : "/placeholder.png";

  return (
    <Link
      href={`/products/${category.slug?.current || ""}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <div
        className={`relative overflow-hidden ${
          layout === "square" ? "aspect-square" : "aspect-4/3"
        }`}
      >
       <Image
  src={imageUrl}
  alt={category.image?.alt || category.name || "Category image"}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-500"
/>

        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {category.name ?? "Untitled Category"}
          </h3>
          {category.productCount !== undefined && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category.productCount} items
            </span>
          )}
        </div>

        <p className="text-gray-600 line-clamp-2">
          {category.description || "Beautiful furniture for your home"}
        </p>

        <button className="mt-4 text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300 flex items-center gap-2">
          Explore →
        </button>
      </div>
    </Link>
  );
}
