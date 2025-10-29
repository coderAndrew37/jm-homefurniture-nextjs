'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Maasai Inspired Sofa',
    price: 'KES 45,000',
    originalPrice: 'KES 52,000',
    image: '/sofa-1.jpg',
    rating: 4.8,
    reviews: 124,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Kilimanjaro Dining Table',
    price: 'KES 38,500',
    originalPrice: 'KES 45,000',
    image: '/dining-table-1.jpg',
    rating: 4.9,
    reviews: 89,
    isBestSeller: true
  },
  {
    id: 3,
    name: 'Savannah Bed Frame',
    price: 'KES 67,000',
    originalPrice: 'KES 75,000',
    image: '/bed-1.jpg',
    rating: 4.7,
    reviews: 156,
    isBestSeller: true
  },
  {
    id: 4,
    name: 'Nairobi Office Desk',
    price: 'KES 28,900',
    image: '/desk-1.jpg',
    rating: 4.6,
    reviews: 67,
    isNew: true
  }
]

export default function BestSellers() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(".product-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    )
  }, [])

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Best Seller
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      <span className="text-gray-300">
                        {'★'.repeat(5 - Math.floor(product.rating))}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}