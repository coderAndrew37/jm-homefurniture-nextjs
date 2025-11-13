"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import BlogCard from "./cards/BlogCard";
import { BlogPost } from "@/lib/sanity.schema";

gsap.registerPlugin(ScrollTrigger);

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (posts.length === 0) return;

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

    return () => ctx.revert();
  }, [posts]);

  if (posts.length === 0) {
    return null;
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
          {posts.map((post) => (
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
            View All Articles <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
