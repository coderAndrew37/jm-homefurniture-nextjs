"use client";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/sanity.schema";

interface BlogCardProps {
  post: BlogPost;
  layout?: "vertical" | "horizontal" | "featured";
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

export default function BlogCard({
  post,
  layout = "vertical",
  showAuthor = false,
  showCategory = false,
  className = "",
}: BlogCardProps) {
  // Base styles
  const baseStyles =
    "group bg-white rounded-2xl overflow-hidden transition-all duration-300";

  // Layout-specific styles
  const layoutStyles = {
    vertical: "border border-gray-200 hover:shadow-md",
    horizontal: "flex border-0 hover:bg-gray-50",
    featured: "border border-gray-200 shadow-sm hover:shadow-lg",
  };

  const imageUrl = post.mainImage
    ? `urlFor(post.mainImage).width(imageDimensions[layout].width).height(imageDimensions[layout].height).url()`
    : "/blog-placeholder.jpg";

  return (
    <article className={`${baseStyles} ${layoutStyles[layout]} ${className}`}>
      <Link href={`/blog/${post.slug.current}`}>
        {/* Image Container */}
        <div
          className={`
          relative overflow-hidden bg-gray-100
          ${layout === "vertical" ? "aspect-[4/3]" : ""}
          ${layout === "featured" ? "aspect-[21/9]" : ""}
          ${layout === "horizontal" ? "w-20 h-20 flex-shrink-0 rounded-lg" : ""}
        `}
        >
          <Image
            src={imageUrl}
            alt={post.title}
            fill={layout !== "horizontal"}
            width={layout === "horizontal" ? 80 : undefined}
            height={layout === "horizontal" ? 80 : undefined}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Featured Badge */}
          {layout === "featured" && post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`
          ${layout === "vertical" ? "p-6" : ""}
          ${layout === "featured" ? "p-8" : ""}
          ${layout === "horizontal" ? "p-3 flex-1 min-w-0" : ""}
        `}
        >
          {/* Meta Information */}
          <div
            className={`
            flex items-center gap-3 text-sm text-gray-600 mb-3
            ${layout === "horizontal" ? "mb-2" : ""}
          `}
          >
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                year: layout === "featured" ? "numeric" : undefined,
                month: layout === "featured" ? "long" : "short",
                day: "numeric",
              })}
            </span>

            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}

            {/* Category */}
            {showCategory && post.categories?.[0] && (
              <>
                <span>•</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {post.categories[0].name}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            className={`
            font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-3
            ${layout === "vertical" ? "text-xl line-clamp-2" : ""}
            ${layout === "featured" ? "text-2xl" : ""}
            ${layout === "horizontal" ? "text-sm line-clamp-2" : ""}
          `}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {layout !== "horizontal" && (
            <p
              className={`
              text-gray-600 mb-4
              ${layout === "vertical" ? "line-clamp-3" : ""}
              ${layout === "featured" ? "text-lg" : ""}
            `}
            >
              {post.excerpt}
            </p>
          )}

          {/* Author and Read More */}
          <div
            className={`
            flex items-center justify-between
            ${layout === "horizontal" ? "mt-2" : ""}
          `}
          >
            {/* Author */}
            {showAuthor && post.author && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {post.author.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <span
                  className={`
                  text-gray-600
                  ${layout === "featured" ? "font-semibold text-gray-900" : "text-sm"}
                `}
                >
                  {post.author.name}
                </span>
              </div>
            )}

            {/* Read More Link */}
            <div className={showAuthor ? "" : "w-full"}>
              <Link
                href={`/blog/${post.slug.current}`}
                className={`
                  font-semibold hover:text-amber-700 transition-colors inline-flex items-center gap-2
                  ${layout === "featured" ? "text-amber-600 text-base" : "text-amber-600 text-sm"}
                  ${!showAuthor ? "w-full justify-between" : ""}
                `}
              >
                Read More
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
