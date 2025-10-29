import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with your CMS
const blogPosts = [
  {
    id: 1,
    slug: "5-ways-to-incorporate-kenyan-culture-in-modern-home-design",
    title: "5 Ways to Incorporate Kenyan Culture in Modern Home Design",
    excerpt:
      "Learn how to blend traditional Kenyan elements with contemporary furniture to create a space that celebrates local heritage while maintaining modern aesthetics.",
    content: `
      <p>Creating a home that reflects your Kenyan heritage while embracing modern design can be a beautiful balancing act. In this guide, we'll explore five practical ways to incorporate Kenyan cultural elements into your contemporary living space.</p>

      <h2>1. Use Traditional Kenyan Textiles</h2>
      <p>Kanga and Kitenge fabrics are vibrant expressions of Kenyan culture. Instead of using them as full curtains or upholstery, consider these subtle approaches:</p>
      <ul>
        <li><strong>Throw pillows:</strong> Add Kitenge-print pillows to your modern sofa</li>
        <li><strong>Wall art:</strong> Frame beautiful Kanga patterns as artwork</li>
        <li><strong>Table runners:</strong> Use traditional fabrics as accent pieces on modern furniture</li>
      </ul>

      <h2>2. Incorporate Local Craftsmanship</h2>
      <p>Support local artisans while adding authentic Kenyan elements to your home:</p>
      <ul>
        <li><strong>Hand-carved furniture:</strong> Kisii stone sculptures or Lamu-style wooden chairs</li>
        <li><strong>Basketwork:</strong> Maasai baskets as storage solutions or wall decor</li>
        <li><strong>Pottery:</strong> Traditional Kenyan pots as planters or decorative elements</li>
      </ul>

      <h2>3. Color Palettes Inspired by Kenyan Landscapes</h2>
      <p>Draw inspiration from Kenya's diverse landscapes:</p>
      <ul>
        <li><strong>Savannah tones:</strong> Warm browns, golden yellows, and earthy greens</li>
        <li><strong>Coastal hues:</strong> Ocean blues, white sands, and coral accents</li>
        <li><strong>Highland colors:</strong> Deep greens, misty grays, and rich purples</li>
      </ul>

      <h2>4. Modern Furniture with Kenyan Influences</h2>
      <p>Look for contemporary pieces that incorporate traditional elements:</p>
      <ul>
        <li>Chairs with Maasai-inspired beadwork details</li>
        <li>Tables using traditional Kenyan joinery techniques</li>
        <li>Beds featuring Swahili coastal design elements</li>
      </ul>

      <h2>5. Cultural Art and Accessories</h2>
      <p>Strategically place cultural items throughout your home:</p>
      <ul>
        <li>Contemporary displays of traditional weapons or tools</li>
        <li>Modern frames for traditional artwork</li>
        <li>Cultural artifacts as focal points in minimalist spaces</li>
      </ul>

      <h2>Bringing It All Together</h2>
      <p>The key to successfully blending Kenyan culture with modern design is balance. Choose one or two cultural elements to feature prominently in each room, and let them stand out against a contemporary backdrop. Remember, your home should tell your unique story while providing the comfort and functionality of modern living.</p>

      <p>At Kenyan Furniture, we specialize in creating pieces that honor our heritage while meeting contemporary needs. Visit our showroom to see how traditional craftsmanship meets modern design.</p>
    `,
    image: "/blog-1.jpg",
    date: "2024-03-15",
    readTime: "5 min read",
    author: {
      name: "Sarah Wanjiku",
      image: "/author-1.jpg",
      bio: "Interior designer specializing in African-inspired spaces. With over 10 years of experience, Sarah helps homeowners create spaces that celebrate Kenyan heritage.",
    },
    category: "Design Tips",
    tags: [
      "kenyan design",
      "modern",
      "cultural",
      "home styling",
      "interior design",
    ],
    relatedPosts: [2, 3, 6],
  },
  // Add other posts with full content...
];

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Kenyan Furniture Blog",
    };
  }

  return {
    title: `${post.title} | Kenyan Furniture Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) =>
    post.relatedPosts?.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-600">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.category}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span>
              {new Date(post.date).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-gray-600 text-sm">{post.author.bio}</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-21/9 rounded-2xl overflow-hidden mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-amber-500 hover:text-white transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
          <span className="text-gray-900 font-medium">Share this article:</span>
          <div className="flex gap-3">
            {[
              { name: "Facebook", icon: "📘", color: "hover:bg-blue-500" },
              { name: "Twitter", icon: "🐦", color: "hover:bg-blue-400" },
              { name: "LinkedIn", icon: "💼", color: "hover:bg-blue-600" },
              { name: "WhatsApp", icon: "💬", color: "hover:bg-green-500" },
            ].map((social) => (
              <button
                key={social.name}
                className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${social.color} hover:text-white`}
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shrink-0">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                About {post.author.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>
                        {new Date(relatedPost.date).toLocaleDateString(
                          "en-KE",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3 hover:text-amber-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-linear-to-r from-amber-500 to-amber-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get more home styling tips and furniture guides delivered to your
            inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-amber-200 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
