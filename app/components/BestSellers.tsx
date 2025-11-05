"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/lib/sanity.schema";
import ProductCard from "./products/ProductCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".product-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );
  }, [products]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-xl text-gray-600">
            Most loved by our Kenyan customers
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No best sellers available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
