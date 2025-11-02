import { Metadata } from "next";
import { getCategories } from "@/lib/sanity.fetch";
import CategoryCard from "../components/cards/CategoryCard";

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

      {/* Grid */}
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
                <CategoryCard
                  key={category._id}
                  category={category}
                  layout="wide"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
