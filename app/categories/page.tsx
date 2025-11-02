import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getCategories } from "@/lib/sanity.fetch";

export const metadata: Metadata = {
  title: "Product Categories - Kenyan Furniture Store",
  description:
    "Browse our complete collection of furniture categories for every room in your home",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover furniture for every room in your home, crafted with Kenyan
            artistry and quality
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-600">
                Please check back later as we add more products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products/${category.slug?.current ?? ""}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={category.imageUrl || "/placeholder.png"}
                      alt={category.name || "Category image"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.productCount ?? 0} items
                      </span>
                    </div>
                    {category.description && (
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                    )}
                    <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300 flex items-center gap-2">
                      Explore Category
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
