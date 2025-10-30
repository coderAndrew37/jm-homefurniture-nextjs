import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/sanity";

export const metadata: Metadata = {
  title: "Special Offers & Promotions - Kenyan Furniture Store",
  description:
    "Discover amazing deals, limited-time offers, and special promotions on quality furniture. Save big on living room, bedroom, and dining furniture collections.",
};

interface Promotion {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  image: string;
  discountType: "percentage" | "fixed" | "bundle";
  discountValue: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  featured: boolean;
  category: string;
  products: Product[];
  terms: string[];
}

async function getPromotions(): Promise<Promotion[]> {
  // This would be your actual Sanity query for promotions
  // For now, returning mock data that matches the interface
  return [
    {
      _id: "1",
      title: "End of Season Sale",
      slug: { current: "end-of-season-sale" },
      description:
        "Massive discounts on all furniture collections. Perfect time to upgrade your home with quality Kenyan furniture at unbeatable prices.",
      image: "/promo-1.jpg",
      discountType: "percentage",
      discountValue: 30,
      validFrom: "2024-03-01",
      validUntil: "2024-03-31",
      isActive: true,
      featured: true,
      category: "all",
      products: [],
      terms: [
        "Minimum spend: KES 15,000",
        "Valid on all categories",
        "Cannot be combined with other offers",
      ],
    },
    {
      _id: "2",
      title: "Lipa Mdogo Mdogo Launch",
      slug: { current: "lipa-mdogo-mdogo-launch" },
      description:
        "Get 0% interest on our new installment plan. Spread your payments over 6 months with no extra charges.",
      image: "/promo-2.jpg",
      discountType: "fixed",
      discountValue: 0,
      validFrom: "2024-03-15",
      validUntil: "2024-04-15",
      isActive: true,
      featured: true,
      category: "financing",
      products: [],
      terms: [
        "0% interest for 6 months",
        "Minimum order: KES 30,000",
        "Credit approval required",
      ],
    },
    {
      _id: "3",
      title: "Living Room Bundle",
      slug: { current: "living-room-bundle" },
      description:
        "Complete your living room with our special bundle offer. Sofa + Coffee Table + TV Stand at a discounted package price.",
      image: "/promo-3.jpg",
      discountType: "bundle",
      discountValue: 25,
      validFrom: "2024-03-10",
      validUntil: "2024-04-10",
      isActive: true,
      featured: false,
      category: "living-room",
      products: [],
      terms: [
        "Includes 3 pieces",
        "Customization available",
        "Free delivery included",
      ],
    },
    {
      _id: "4",
      title: "Free Assembly Weekend",
      slug: { current: "free-assembly-weekend" },
      description:
        "Get free professional assembly on all furniture purchases this weekend. Our experts will set up everything for you.",
      image: "/promo-4.jpg",
      discountType: "fixed",
      discountValue: 0,
      validFrom: "2024-03-23",
      validUntil: "2024-03-24",
      isActive: true,
      featured: false,
      category: "service",
      products: [],
      terms: [
        "Valid only on weekends",
        "Nairobi areas only",
        "Must schedule appointment",
      ],
    },
    {
      _id: "5",
      title: "Bedroom Set Special",
      slug: { current: "bedroom-set-special" },
      description:
        "Create your dream bedroom with our complete bedroom sets. Bed frame + mattress + side tables at special package pricing.",
      image: "/promo-5.jpg",
      discountType: "percentage",
      discountValue: 20,
      validFrom: "2024-03-05",
      validUntil: "2024-04-05",
      isActive: true,
      featured: false,
      category: "bedroom",
      products: [],
      terms: [
        "Complete bedroom set",
        "Mattress included",
        "Free delivery in Nairobi",
      ],
    },
    {
      _id: "6",
      title: "Refer & Earn",
      slug: { current: "refer-earn" },
      description:
        "Refer a friend and both get KES 5,000 off your next purchase. Share the love of quality furniture with your friends and family.",
      image: "/promo-6.jpg",
      discountType: "fixed",
      discountValue: 5000,
      validFrom: "2024-03-01",
      validUntil: "2024-06-01",
      isActive: true,
      featured: false,
      category: "referral",
      products: [],
      terms: [
        "Both parties get discount",
        "Minimum purchase: KES 25,000",
        "One-time use per customer",
      ],
    },
  ];
}

function getDaysRemaining(validUntil: string): number {
  const today = new Date();
  const endDate = new Date(validUntil);
  const diffTime = endDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getDiscountText(promo: Promotion): string {
  switch (promo.discountType) {
    case "percentage":
      return `${promo.discountValue}% OFF`;
    case "fixed":
      return promo.discountValue === 0
        ? "SPECIAL OFFER"
        : `KES ${promo.discountValue.toLocaleString()} OFF`;
    case "bundle":
      return `${promo.discountValue}% BUNDLE SAVINGS`;
    default:
      return "SPECIAL OFFER";
  }
}

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    all: "bg-red-500",
    "living-room": "bg-blue-500",
    bedroom: "bg-purple-500",
    dining: "bg-green-500",
    financing: "bg-amber-500",
    service: "bg-cyan-500",
    referral: "bg-pink-500",
  };
  return colors[category] || "bg-gray-500";
}

export default async function PromotionsPage() {
  const promotions = await getPromotions();
  const featuredPromotions = promotions.filter((p) => p.featured);
  const otherPromotions = promotions.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Special Offers & Promotions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover amazing deals and limited-time offers on quality Kenyan
            furniture
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="font-semibold">
                {promotions.length} Active Offers
              </span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="font-semibold">Free Delivery on Most Items</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Promotions */}
        {featuredPromotions.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Offers
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPromotions.map((promo) => {
                const daysRemaining = getDaysRemaining(promo.validUntil);

                return (
                  <div
                    key={promo._id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[21/9] overflow-hidden">
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`${getCategoryColor(promo.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                        >
                          {promo.category
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {getDiscountText(promo)}
                        </span>
                      </div>
                      {daysRemaining > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                            {daysRemaining} days left
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {promo.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{promo.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-500">
                          Valid until:{" "}
                          {new Date(promo.validUntil).toLocaleDateString(
                            "en-KE",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        {daysRemaining <= 7 && (
                          <div className="text-red-500 font-semibold text-sm">
                            ⚠️ Ending soon!
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-6">
                        {promo.terms.map((term, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="text-green-500 mr-2">✓</span>
                            {term}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/promotions/${promo.slug.current}`}
                          className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/products"
                          className="flex-1 border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Promotions Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            All Ongoing Promotions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPromotions.map((promo) => {
              const daysRemaining = getDaysRemaining(promo.validUntil);

              return (
                <div
                  key={promo._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`${getCategoryColor(promo.category)} text-white px-2 py-1 rounded-full text-xs font-semibold`}
                      >
                        {promo.category
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {getDiscountText(promo)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {promo.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">
                        {daysRemaining > 0
                          ? `${daysRemaining} days left`
                          : "Last day!"}
                      </span>
                      {daysRemaining <= 3 && (
                        <span className="text-red-500 text-xs font-semibold">
                          🔥 Hot
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/promotions/${promo.slug.current}`}
                        className="flex-1 bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-center text-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            promotions, exclusive offers, and special events.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-amber-200 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-amber-200 text-sm mt-3">
            No spam. Unsubscribe at any time.
          </p>
        </section>

        {/* Expired Promotions Notice */}
        <section className="mt-12 p-6 bg-gray-100 rounded-2xl">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              Missed a Promotion?
            </h3>
            <p className="text-gray-600 mb-4">
              Don&apos;t worry! We regularly update our promotions with new
              amazing deals. Check back often or subscribe to our newsletter to
              stay updated.
            </p>
            <Link
              href="/products"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors inline-block"
            >
              Browse All Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
