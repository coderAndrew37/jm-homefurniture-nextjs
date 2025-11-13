"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        "-=0.2"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-cover bg-center flex items-center pt-20 pb-16 md:pt-0 md:pb-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/hero-bg.jpg')",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered container for desktop, full width for mobile */}
        <div className="flex justify-center">
          <div className="text-white text-center max-w-4xl w-full">
            {/* Main Text Content */}
            <div ref={textRef}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 leading-tight">
                Transform Your Space with{" "}
                <span className="text-amber-400 font-normal block mt-2 md:mt-0 md:inline">
                  Kenyan Elegance
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-95 leading-relaxed font-light max-w-3xl mx-auto">
                Handcrafted furniture that blends modern design with authentic
                Kenyan artistry.
                <span className="block mt-2 sm:mt-3 text-amber-100 font-normal">
                  Crafted for life&apos;s moments.
                </span>
              </p>
            </div>

            {/* CTA Buttons - Centered and improved spacing */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center items-center"
            >
              <Link
                href="/shop"
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-none font-medium text-base sm:text-lg transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:shadow-amber-500/20 text-center group min-w-[200px] sm:min-w-[220px]"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  Explore Collection
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>

              <Link
                href="/about"
                className="border border-white/50 text-white hover:bg-white/10 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-none font-light text-base sm:text-lg transition-all duration-300 text-center backdrop-blur-sm min-w-[200px] sm:min-w-[220px]"
              >
                Our Craftsmanship
              </Link>
            </div>

            {/* Trust Indicators - Centered and better desktop layout */}
            <div
              ref={trustRef}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 text-sm text-white/80 font-light justify-center items-center"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base whitespace-nowrap">
                  Free Delivery Nationwide
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base whitespace-nowrap">
                  5-Year Craftsmanship Warranty
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base whitespace-nowrap">
                  Sustainably Sourced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Centered */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-px h-6 sm:h-8 bg-white/60 mx-auto"></div>
          <p className="text-white/60 text-xs mt-1 sm:mt-2 text-center font-light tracking-widest">
            SCROLL
          </p>
        </div>
      </div>
    </section>
  );
}