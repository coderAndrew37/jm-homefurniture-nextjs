import { client } from "@/lib/sanity.client";
import { queries } from "@/lib/sanity.queries";
import { BlogCategory, BlogPost } from "@/lib/sanity.schema";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import BlogCard from "../components/cards/BlogCard";
export const metadata: Metadata = {
  title: "Blog - Home Styling Tips & Furniture Guides | Kenyan Furniture",
  description:
    "Discover home styling tips, furniture care guides, and interior design inspiration for Kenyan homes.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch(groq`${queries.blogPosts}`);
  return posts || [];
}

async function getCategories() {
  const categories = await client.fetch(groq`${queries.categories}`);
  return categories || [];
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  // Safe filtering with fallbacks
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const otherPosts = posts.filter(
    (post) => featuredPost && post._id !== featuredPost._id
  );
  const popularPosts = posts.slice(0, 3);

  // Early return if no posts
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Furniture Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Home styling tips, furniture care guides, and interior design
              inspiration for Kenyan homes
            </p>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 text-lg">No blog posts found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Furniture Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Home styling tips, furniture care guides, and interior design
            inspiration for Kenyan homes
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Featured Articles
                </h2>
                <BlogCard
                  post={featuredPost}
                  layout="featured"
                  showAuthor={true}
                  showCategory={true}
                />
              </div>
            )}

            {/* Blog Grid */}
            {otherPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {otherPosts.map((post) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                      layout="vertical"
                      showAuthor={true}
                      showCategory={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-4">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 text-lg mb-4">
                          Categories
                        </h3>
                        <div className="space-y-2">
                          {categories.map((category: BlogCategory) => (
                            <Link
                              key={category._id}
                              href={`/blog/category/${category.slug.current}`}
                              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <span className="text-gray-700 group-hover:text-amber-600">
                                {category.name}
                              </span>
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                                {category.postCount || 0}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Popular Posts */}
              {popularPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Popular Posts
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post) => (
                      <BlogCard
                        key={post._id}
                        post={post}
                        layout="horizontal"
                        showAuthor={false}
                        showCategory={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
                <p className="text-amber-100 text-sm mb-4">
                  Get the latest furniture tips and home styling advice
                  delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-amber-200 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-amber-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-amber-200 text-xs mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Tags */}
              {posts.some((post) => post.tags && post.tags.length > 0) && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(posts.flatMap((post) => post.tags || []))
                    )
                      .slice(0, 10)
                      .map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-amber-500 hover:text-white transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
