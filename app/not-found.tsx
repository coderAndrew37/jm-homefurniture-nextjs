import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Kenyan Furniture",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-2 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <p className="text-gray-500">
            The page may have been moved, deleted, or you entered an incorrect
            URL.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 text-6xl">🛋️</div>

        {/* Actions */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 transform hover:scale-105"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            Browse Products
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Contact our customer support team for assistance:</p>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0">
              <a
                href="tel:+254700123456"
                className="hover:text-amber-600 transition-colors"
              >
                📞 +254 700 123 456
              </a>
              <a
                href="mailto:support@kenyanfurniture.co.ke"
                className="hover:text-amber-600 transition-colors"
              >
                ✉️ support@kenyanfurniture.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-4">Popular Pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Living Room", href: "/categories/living-room" },
              { name: "Bedroom", href: "/categories/bedroom" },
              { name: "Dining", href: "/categories/dining" },
              { name: "Sale", href: "/sale" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
