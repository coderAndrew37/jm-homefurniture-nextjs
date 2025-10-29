"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Nairobi",
    rating: 5,
    text: "The Maasai inspired sofa completely transformed my living room. The quality is exceptional!",
    image: "/customer1.jpg",
  },
  {
    id: 2,
    name: "James K.",
    location: "Mombasa",
    rating: 5,
    text: "Fast delivery and excellent customer service. My new dining table is the talk of the family!",
    image: "/customer2.jpg",
  },
  {
    id: 3,
    name: "Grace W.",
    location: "Kisumu",
    rating: 5,
    text: "Beautiful craftsmanship that combines modern design with our Kenyan heritage. Love it!",
    image: "/customer3.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by hundreds of Kenyan families
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 text-xl">
                  {"★".repeat(testimonial.rating)}
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-linear-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
