import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/sanity.client";
import { queries } from "@/lib/sanity.queries";
import { BlogPost, BlogPostSchema } from "@/lib/sanity.schema";

export const metadata: Metadata = {
  title: "Blog - Home Styling Tips & Furniture Guides | Kenyan Furniture",
  description:
    "Discover home styling tips, furniture care guides, and interior design inspiration for Kenyan homes.",
};

async function getBlogPosts() {
  return await client.fetch(groq`${queries.blogPosts}`);
}

async function getCategories() {
  return await client.fetch(groq`${queries.categories}`);
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  const featuredPost =
    posts.find((post: BlogPost) => post.featured) || posts[0];
  const otherPosts = posts.filter(
    (post: BlogPost) => post._id !== featuredPost._id
  );
  const popularPosts = posts.slice(0, 3);

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
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Featured Articles
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <Link href={`/blog/${featuredPost.slug.current}`}>
                  <div className="relative aspect-[21/9] overflow-hidden">
                    <Image
                      src={urlFor(featuredPost.mainImage)
                        .width(800)
                        .height(400)
                        .url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        "en-KE",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {featuredPost.categories[0]?.title}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug.current}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-amber-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {featuredPost.author.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {featuredPost.author.name}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug.current}`}
                      className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center gap-2"
                    >
                      Read More
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((post: BlogPost) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage)
                            .width(400)
                            .height(300)
                            .url()}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-KE",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug.current}`}>
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
                              .map((n: string) => n[0])
                              .join("")}
                          </div>
                          <span className="text-sm text-gray-600">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug.current}`}
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

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-4">
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug.current}`}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-gray-700 group-hover:text-amber-600">
                        {category.title}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        {category.postCount}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post: BlogPost) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage)
                            .width(64)
                            .height(64)
                            .url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-KE",
                            { month: "short", day: "numeric" }
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(posts.flatMap((post: BlogPost) => post.tags))
                  )
                    .slice(0, 10)
                    .map((tag: string) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
