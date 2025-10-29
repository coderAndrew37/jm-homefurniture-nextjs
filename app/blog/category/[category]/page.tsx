import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Mock data - use the same blogPosts array from above

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${categoryName} - Kenyan Furniture Blog`,
    description: `Explore our ${categoryName.toLowerCase()} articles featuring home styling tips, furniture guides, and design inspiration for Kenyan homes.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter posts by category (you'll need to implement this logic)
  const categoryPosts = blogPosts.filter(
    (post) =>
      post.category.toLowerCase().replace(" & ", "-").replace(" ", "-") ===
      params.category
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our {categoryPosts.length} article
            {categoryPosts.length !== 1 ? "s" : ""} on{" "}
            {categoryName.toLowerCase()}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-KE", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm text-gray-600">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-amber-600 font-semibold hover:text-amber-700 transition-colors text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
