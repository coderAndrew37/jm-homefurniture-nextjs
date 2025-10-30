import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface PromotionDetailPageProps {
  params: {
    slug: string;
  };
}

// Mock data - replace with Sanity query
const promotion = {
  _id: "1",
  title: "End of Season Sale",
  slug: "end-of-season-sale",
  description:
    "Massive discounts on all furniture collections. Perfect time to upgrade your home with quality Kenyan furniture at unbeatable prices.",
  longDescription: `
    <p>Transform your living space with our biggest sale of the season! For a limited time only, enjoy incredible savings across all our furniture collections.</p>
    
    <h3>Why This is the Perfect Time to Shop:</h3>
    <ul>
      <li>Save up to 30% on premium furniture</li>
      <li>Free delivery on orders above KES 20,000</li>
      <li>Professional assembly available at 50% off</li>
      <li>Extended warranty on all purchases</li>
    </ul>

    <h3>Featured Collections on Sale:</h3>
    <ul>
      <li><strong>Living Room:</strong> Sofas, sectionals, coffee tables, and entertainment units</li>
      <li><strong>Bedroom:</strong> Bed frames, mattresses, wardrobes, and dressers</li>
      <li><strong>Dining:</strong> Dining tables, chairs, and buffets</li>
      <li><strong>Office:</strong> Desks, chairs, and storage solutions</li>
    </ul>

    <p>This is your chance to get the quality Kenyan furniture you've been dreaming of at prices that won't last long!</p>
  `,
  image: "/promo-1.jpg",
  discountType: "percentage",
  discountValue: 30,
  validFrom: "2024-03-01",
  validUntil: "2024-03-31",
  isActive: true,
  featured: true,
  category: "all",
  terms: [
    "Minimum spend: KES 15,000",
    "Valid on all categories",
    "Cannot be combined with other offers",
    "Delivery charges apply for orders below KES 20,000",
    "Professional assembly available at additional cost",
    "Offer valid while stocks last",
  ],
  products: [
    {
      id: "1",
      name: "Maasai Inspired Sofa",
      price: 45000,
      discountPrice: 31500,
      image: "/sofa-1.jpg",
    },
    {
      id: "2",
      name: "Savannah Bed Frame",
      price: 67000,
      discountPrice: 46900,
      image: "/bed-1.jpg",
    },
    {
      id: "3",
      name: "Kilimanjaro Dining Table",
      price: 38500,
      discountPrice: 26950,
      image: "/dining-table-1.jpg",
    },
  ],
};

export async function generateMetadata({
  params,
}: PromotionDetailPageProps): Promise<Metadata> {
  // In real implementation, fetch promotion data based on slug
  const promo = promotion; // This would come from Sanity

  return {
    title: `${promo.title} - Kenyan Furniture Promotions`,
    description: promo.description,
  };
}

export default function PromotionDetailPage({
  params,
}: PromotionDetailPageProps) {
  // In real implementation, fetch promotion data based on slug
  const promo = promotion; // This would come from Sanity

  if (!promo) {
    notFound();
  }

  const daysRemaining = Math.ceil(
    (new Date(promo.validUntil).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/promotions"
              className="text-gray-500 hover:text-amber-600"
            >
              Promotions
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{promo.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Promotion Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                    {promo.discountValue}% OFF
                  </span>
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {promo.category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                  {daysRemaining > 0 && (
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                      {daysRemaining} days left
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {promo.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {promo.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div>
                    <span className="font-semibold">Starts:</span>{" "}
                    {new Date(promo.validFrom).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <span className="font-semibold">Ends:</span>{" "}
                    {new Date(promo.validUntil).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {daysRemaining <= 7 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-800">
                      <span className="text-lg">🔥</span>
                      <span className="font-semibold">
                        Hurry! This offer ends in {daysRemaining} days
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Link
                    href="/products"
                    className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Shop the Sale
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>

              {/* Promotion Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Promotion Details
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: promo.longDescription }}
                />
              </div>

              {/* Featured Products */}
              {promo.products.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Featured Products
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promo.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            SAVE{" "}
                            {Math.round(
                              (1 - product.discountPrice / product.price) * 100
                            )}
                            %
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              KES {product.discountPrice.toLocaleString()}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              KES {product.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-4">
                {/* Terms & Conditions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Terms & Conditions
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {promo.terms.map((term, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-1">•</span>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Ready to Save?</h3>
                  <div className="space-y-3">
                    <Link
                      href="/products"
                      className="block w-full bg-white text-amber-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                    >
                      Browse Products
                    </Link>
                    <Link
                      href="/contact"
                      className="block w-full border-2 border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors text-center"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>

                {/* Share Promotion */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Share This Deal
                  </h3>
                  <div className="flex gap-3">
                    {[
                      {
                        name: "WhatsApp",
                        icon: "💬",
                        color: "bg-green-500 hover:bg-green-600",
                      },
                      {
                        name: "Facebook",
                        icon: "📘",
                        color: "bg-blue-500 hover:bg-blue-600",
                      },
                      {
                        name: "Twitter",
                        icon: "🐦",
                        color: "bg-blue-400 hover:bg-blue-500",
                      },
                      {
                        name: "Email",
                        icon: "✉️",
                        color: "bg-gray-500 hover:bg-gray-600",
                      },
                    ].map((social) => (
                      <button
                        key={social.name}
                        className={`flex-1 text-white py-2 rounded-lg font-semibold transition-colors ${social.color}`}
                        title={`Share on ${social.name}`}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Promotions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Other Offers
                  </h3>
                  <div className="space-y-4">
                    <Link
                      href="/promotions/lipa-mdogo-mdogo-launch"
                      className="block p-3 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">
                        Lipa Mdogo Mdogo
                      </div>
                      <div className="text-sm text-gray-600">
                        0% interest for 6 months
                      </div>
                    </Link>
                    <Link
                      href="/promotions/living-room-bundle"
                      className="block p-3 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">
                        Living Room Bundle
                      </div>
                      <div className="text-sm text-gray-600">
                        Save 25% on complete sets
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
