"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Category } from "@/lib/sanity.schema";
import CategoryCard from "./cards/CategoryCard";
gsap.registerPlugin(ScrollTrigger);

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({
  categories,
}: FeaturedCategoriesProps) {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [categories]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every room in
            your home
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category._id}
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[index] = el;
                }}
                className="category-card"
              >
                <CategoryCard category={category} layout="wide" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
