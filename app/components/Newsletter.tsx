"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Newsletter() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", email);
    // Reset form
    setEmail("");
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get exclusive offers, new product launches, and styling tips for your
          home
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            required
          />
          <button
            type="submit"
            className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          By subscribing, you agree to our Privacy Policy
        </p>
      </div>
    </section>
  );
}
