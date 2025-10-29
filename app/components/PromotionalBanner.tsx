"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function PromotionalBanner() {
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  return (
    <section
      ref={bannerRef}
      className="py-20 bg-gradient-to-r from-amber-500 to-amber-600"
    >
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <div ref={textRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              End of Season Sale!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Up to 30% off on all furniture collections. Limited time offer!
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">05</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm">Minutes</div>
              </div>
            </div>
          </div>

          <div ref={ctaRef}>
            <Link
              href="/sale"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Shop the Sale
              <span className="text-xl">🔥</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
