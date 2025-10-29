import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog - Home Styling Tips & Furniture Guides | Kenyan Furniture",
  description:
    "Discover home styling tips, furniture care guides, and interior design inspiration for Kenyan homes. Transform your space with our expert advice.",
  keywords: [
    "home decor",
    "furniture tips",
    "interior design",
    "Kenyan homes",
    "styling advice",
  ],
};

// Mock blog data - replace with your CMS data
const blogPosts = [
  {
    id: 1,
    slug: "5-ways-to-incorporate-kenyan-culture-in-modern-home-design",
    title: "5 Ways to Incorporate Kenyan Culture in Modern Home Design",
    excerpt:
      "Learn how to blend traditional Kenyan elements with contemporary furniture to create a space that celebrates local heritage while maintaining modern aesthetics.",
    image: "/blog-1.jpg",
    date: "2024-03-15",
    readTime: "5 min read",
    author: {
      name: "Sarah Wanjiku",
      image: "/author-1.jpg",
    },
    category: "Design Tips",
    tags: ["kenyan design", "modern", "cultural", "home styling"],
  },
  {
    id: 2,
    slug: "the-ultimate-guide-to-choosing-the-right-sofa-for-your-living-room",
    title: "The Ultimate Guide to Choosing the Right Sofa for Your Living Room",
    excerpt:
      "Everything you need to know about sofa sizes, materials, styles, and placement to create the perfect living room setup for your Kenyan home.",
    image: "/blog-2.jpg",
    date: "2024-03-12",
    readTime: "7 min read",
    author: {
      name: "James Mwangi",
      image: "/author-2.jpg",
    },
    category: "Buying Guide",
    tags: ["sofa", "living room", "furniture guide", "kenyan homes"],
  },
  {
    id: 3,
    slug: "sustainable-furniture-why-kenyan-hardwood-is-the-best-choice",
    title: "Sustainable Furniture: Why Kenyan Hardwood is the Best Choice",
    excerpt:
      "Discover the benefits of using locally sourced, sustainable materials from Kenyan forests and how they contribute to both quality furniture and environmental conservation.",
    image: "/blog-3.jpg",
    date: "2024-03-08",
    readTime: "4 min read",
    author: {
      name: "Grace Akinyi",
      image: "/author-3.jpg",
    },
    category: "Sustainability",
    tags: ["sustainable", "hardwood", "eco-friendly", "kenyan materials"],
  },
  {
    id: 4,
    slug: "maximizing-small-spaces-nairobi-apartment-design-solutions",
    title: "Maximizing Small Spaces: Nairobi Apartment Design Solutions",
    excerpt:
      "Creative furniture solutions and layout ideas for making the most of compact living spaces in Nairobi apartments and urban homes.",
    image: "/blog-4.jpg",
    date: "2024-03-05",
    readTime: "6 min read",
    author: {
      name: "David Ochieng",
      image: "/author-4.jpg",
    },
    category: "Space Planning",
    tags: ["small spaces", "nairobi", "apartment", "space saving"],
  },
  {
    id: 5,
    slug: "seasonal-furniture-care-maintaining-your-investment-in-kenyan-climate",
    title:
      "Seasonal Furniture Care: Maintaining Your Investment in Kenyan Climate",
    excerpt:
      "Essential maintenance tips to protect your furniture from humidity, sunlight, and seasonal changes specific to Kenyan weather conditions.",
    image: "/blog-5.jpg",
    date: "2024-03-01",
    readTime: "8 min read",
    author: {
      name: "Emily Atieno",
      image: "/author-5.jpg",
    },
    category: "Care & Maintenance",
    tags: ["furniture care", "maintenance", "kenyan climate", "wood care"],
  },
  {
    id: 6,
    slug: "mixing-patterns-and-textures-african-inspired-interior-design",
    title: "Mixing Patterns and Textures: African Inspired Interior Design",
    excerpt:
      "How to confidently mix traditional African patterns with modern textures to create vibrant, culturally rich interior spaces that feel both contemporary and authentic.",
    image: "/blog-6.jpg",
    date: "2024-02-25",
    readTime: "5 min read",
    author: {
      name: "Michael Kamau",
      image: "/author-6.jpg",
    },
    category: "Design Tips",
    tags: ["african design", "patterns", "textures", "interior design"],
  },
];

const categories = [
  { name: "All", slug: "all", count: 12 },
  { name: "Design Tips", slug: "design-tips", count: 4 },
  { name: "Buying Guide", slug: "buying-guide", count: 3 },
  { name: "Sustainability", slug: "sustainability", count: 2 },
  { name: "Space Planning", slug: "space-planning", count: 2 },
  { name: "Care & Maintenance", slug: "care-maintenance", count: 1 },
];

const popularPosts = blogPosts.slice(0, 3);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-amber-500 to-amber-600 text-white py-20">
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
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <div className="relative aspect-21/9 overflow-hidden">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
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
                      {new Date(blogPosts[0].date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{blogPosts[0].readTime}</span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {blogPosts[0].category}
                    </span>
                  </div>

                  <Link href={`/blog/${blogPosts[0].slug}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-amber-600 transition-colors">
                      {blogPosts[0].title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-6 text-lg">
                    {blogPosts[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {blogPosts[0].author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {blogPosts[0].author.name}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${blogPosts[0].slug}`}
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
                {blogPosts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-4/3 overflow-hidden">
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

            {/* Load More */}
            <div className="text-center">
              <button className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                Load More Articles
              </button>
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
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-gray-700 group-hover:text-amber-600">
                        {category.name}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        {category.count}
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
                  {popularPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
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
                          {new Date(post.date).toLocaleDateString("en-KE", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-linear-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
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
                  {Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
