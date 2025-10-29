'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Hero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/hero-bg.jpg')"
      }}
    >
      <div className="container mx-auto px-4">
        <div ref={textRef} className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Transform Your Space with <span className="text-amber-500">Kenyan</span> Elegance
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover handcrafted furniture that combines modern design with authentic Kenyan artistry
          </p>
          <div ref={ctaRef} className="flex gap-4">
            <Link 
              href="/shop"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link 
              href="/collections"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Collections
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}