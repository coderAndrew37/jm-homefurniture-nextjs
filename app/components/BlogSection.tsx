"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Incorporate Kenyan Culture in Modern Home Design",
    excerpt:
      "Learn how to blend traditional Kenyan elements with contemporary furniture...",
    image: "/blog-1.jpg",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Choosing the Right Sofa for Your Living Room",
    excerpt:
      "Everything you need to know about sofa sizes, materials, and styles...",
    image: "/blog-2.jpg",
    date: "March 12, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Sustainable Furniture: Why Kenyan Hardwood is the Best Choice",
    excerpt:
      "Discover the benefits of using locally sourced, sustainable materials...",
    image: "/blog-3.jpg",
    date: "March 8, 2024",
    readTime: "4 min read",
  },
];

export default function BlogSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
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
  }, []);

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
            <article key={post.id} className="blog-card group">
              <Link href={`/blog/${post.id}`}>
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-video relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </Link>
            </article>
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
