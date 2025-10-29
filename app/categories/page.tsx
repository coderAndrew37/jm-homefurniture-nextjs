import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

const categories = [
  {
    slug: "living-room",
    name: "Living Room",
    description: "Comfortable and stylish seating solutions",
    image: "/living-room.jpg",
    productCount: 24,
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    description: "Create your perfect sleep sanctuary",
    image: "/bedroom.jpg",
    productCount: 18,
  },
  {
    slug: "dining",
    name: "Dining",
    description: "Elegant dining experiences",
    image: "/dining.jpg",
    productCount: 15,
  },
  {
    slug: "office",
    name: "Office",
    description: "Productive and organized spaces",
    image: "/office.jpg",
    productCount: 12,
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    description: "Durable outdoor furniture",
    image: "/outdoor.jpg",
    productCount: 8,
  },
  {
    slug: "storage",
    name: "Storage",
    description: "Smart storage solutions",
    image: "/storage.jpg",
    productCount: 10,
  },
];

export const metadata: Metadata = {
  title: "Product Categories - Kenyan Furniture Store",
  description:
    "Browse our complete collection of furniture categories for every room in your home",
};

export default function CategoriesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
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
                      {category.productCount} items
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
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
        </div>
      </section>
    </div>
  );
}
