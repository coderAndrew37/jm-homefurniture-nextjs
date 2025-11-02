import ProductCard from "@/app/components/products/ProductCard";
import { getCategories, getProductsByCategory } from "@/lib/sanity.fetch";
import { Category } from "@/lib/sanity.schema";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find(
    (c: Category) => c.slug?.current === params.category
  );

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} - Kenyan Furniture Store`,
    description: category.description ?? "",
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories
    .filter((cat: Category) => !!cat.slug?.current)
    .map((cat: Category) => ({
      category: cat.slug!.current!,
    }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params; // ✅ unwrap promise
  const categorySlug = resolvedParams.category;

  if (!categorySlug) {
    console.error("❌ categorySlug is undefined. params:", resolvedParams);
    notFound();
  }

  const products = await getProductsByCategory(categorySlug);

  if (!products || products.length === 0) {
    notFound();
  }

  const category = products[0]?.category ?? {
    name: categorySlug.replace("-", " "),
    description: "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/categories"
              className="text-gray-500 hover:text-amber-600"
            >
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re working on adding more products to this category.
              </p>
              <Link
                href="/categories"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
