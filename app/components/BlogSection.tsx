"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import BlogCard from "./cards/BlogCard";
import { BlogPost } from "@/lib/sanity.schema";
import { getBlogPosts } from "@/lib/sanity.fetch";

export default function BlogSection() {
  const sectionRef = useRef(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Sanity
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        // Take only the first 3 posts for the section
        setBlogPosts(posts.slice(0, 3));
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Animation when posts are loaded
  useEffect(() => {
    if (blogPosts.length === 0 || loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, [blogPosts, loading]);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Home Styling Tips
            </h2>
            <p className="text-xl text-gray-600">
              Inspiration and advice for creating your dream space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-video mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Home Styling Tips
            </h2>
            <p className="text-xl text-gray-600">
              Inspiration and advice for creating your dream space
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-amber-800 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (blogPosts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Home Styling Tips
            </h2>
            <p className="text-xl text-gray-600">
              Inspiration and advice for creating your dream space
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No blog posts available at the moment.
            </p>
            <p className="text-gray-400">
              Check back soon for home styling tips and furniture guides.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Home Styling Tips
          </h2>
          <p className="text-xl text-gray-600">
            Inspiration and advice for creating your dream space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post._id} className="blog-card">
              <BlogCard
                post={post}
                layout="vertical"
                showAuthor={false}
                showCategory={false}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            View All Articles
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
