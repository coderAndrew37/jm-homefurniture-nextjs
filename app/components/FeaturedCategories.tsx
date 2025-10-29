'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    id: 1,
    name: 'Living Room',
    image: '/living-room.jpg',
    description: 'Comfortable and stylish seating solutions',
    link: '/categories/living-room'
  },
  {
    id: 2,
    name: 'Bedroom',
    image: '/bedroom.jpg',
    description: 'Create your perfect sanctuary',
    link: '/categories/bedroom'
  },
  {
    id: 3,
    name: 'Dining',
    image: '/dining.jpg',
    description: 'Elegant dining experiences',
    link: '/categories/dining'
  },
  {
    id: 4,
    name: 'Office',
    image: '/office.jpg',
    description: 'Productive and organized spaces',
    link: '/categories/office'
  }
]

export default function FeaturedCategories() {
  const sectionRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <Link href={category.link}>
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                  <button className="mt-4 text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300">
                    Explore →
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}