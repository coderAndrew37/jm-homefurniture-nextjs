import { client, urlFor } from "@/lib/sanity.client";
import { BlogPost } from "@/lib/sanity.schema";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// Define proper TypeScript interfaces for Portable Text
interface PortableTextImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export const revalidate = 60;

async function getPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
    _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ _id, _type, name, image, bio },
    categories[]->{ _id, _type, title, slug },
    tags, body, featured,
    relatedPosts[]->{ 
      _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime 
    }
  }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  console.log("🧩 BlogDetailPage slug:", slug);

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - JM Home Furniture Blog",
    };
  }

  return {
    title: `${post.title} | JM Home Furniture Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.mainImage
            ? urlFor(post.mainImage).width(800).height(600).url()
            : "/placeholder-image.jpg",
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch(groq`*[_type == "post"]{ slug }`);
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

// Portable Text Components with proper types
const portableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      return (
        <div className="relative aspect-video my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value.asset).width(800).height(450).url()}
            alt={value.alt || "Blog post image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-700 ml-4">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-700 ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <Link
          href={href}
          className="text-amber-600 hover:text-amber-700 underline"
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </Link>
      );
    },
  },
};

// Share buttons component
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jmhomefurniture.co.ke'}/blog/${slug}`;
  const shareText = `Check out this article: ${title}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
      <span className="text-gray-900 font-medium">Share this article:</span>
      <div className="flex gap-3">
        {[
          { 
            name: "Facebook", 
            icon: "📘", 
            href: shareLinks.facebook 
          },
          { 
            name: "Twitter", 
            icon: "🐦", 
            href: shareLinks.twitter 
          },
          { 
            name: "LinkedIn", 
            icon: "💼", 
            href: shareLinks.linkedin 
          },
          { 
            name: "WhatsApp", 
            icon: "💬", 
            href: shareLinks.whatsapp 
          },
        ].map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-amber-500 hover:text-white"
            title={`Share on ${social.name}`}
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  // FIX: Properly await the params promise
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

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
            <span className="text-gray-900">
              {post.categories?.[0]?.name || 'Uncategorized'}
            </span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              {post.categories?.[0]?.name || 'Uncategorized'} {/* FIX: Changed .name to .title */}
            </span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime || '5 min read'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4">
            {post.author?.image ? (
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                {post.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <div className="text-left">
              <p className="font-semibold text-gray-900">{post.author?.name}</p>
              {post.author?.bio && (
                <p className="text-gray-600 text-sm">{post.author.bio}</p>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12">
          <Image
            src={
              post.mainImage
                ? urlFor(post.mainImage).width(800).height(400).url()
                : "/placeholder-image.jpg"
            }
            alt={post.title || "Blog post image"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed text-lg">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
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
        )}

        {/* Share Buttons */}
        <ShareButtons title={post.title} slug={post.slug.current} />

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
          <div className="flex items-start gap-6">
            {post.author?.image ? (
              <div className="w-20 h-20 relative rounded-full overflow-hidden shrink-0">
                <Image
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shrink-0">
                {post.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                About {post.author?.name}
              </h3>
              {post.author?.bio && (
                <p className="text-gray-600 leading-relaxed">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        relatedPost.mainImage
                          ? urlFor(relatedPost.mainImage)
                              .width(400)
                              .height(300)
                              .url()
                          : "/placeholder-image.jpg"
                      }
                      alt={relatedPost.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>
                        {relatedPost.publishedAt &&
                          new Date(relatedPost.publishedAt).toLocaleDateString(
                            "en-KE",
                            { month: "short", day: "numeric" }
                          )}
                      </span>
                      <span>•</span>
                      <span>{relatedPost.readTime || '5 min read'}</span>
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
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 py-16">
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