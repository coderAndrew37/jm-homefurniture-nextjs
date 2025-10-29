import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

// Mock data - replace with your actual data source
const products = [
  {
    id: 1,
    slug: "maasai-inspired-sofa",
    name: "Maasai Inspired Sofa",
    price: 45000,
    originalPrice: 52000,
    images: ["/sofa-1.jpg", "/sofa-2.jpg", "/sofa-3.jpg", "/sofa-4.jpg"],
    category: "living-room",
    rating: 4.8,
    reviews: 124,
    description:
      "Handcrafted sofa featuring traditional Maasai patterns and modern comfort. Perfect for Kenyan living rooms.",
    features: [
      "Premium upholstery with traditional Maasai patterns",
      "Solid wood frame for durability",
      "High-density foam for ultimate comfort",
      "Easy to clean and maintain",
      "Locally sourced materials",
    ],
    dimensions: {
      width: "220cm",
      height: "85cm",
      depth: "95cm",
      weight: "85kg",
    },
    materials: ["Solid wood frame", "Premium fabric", "High-density foam"],
    delivery: "Free delivery within Nairobi. 3-5 business days.",
    warranty: "2 years warranty on frame and materials",
  },
  {
    id: 2,
    slug: "savannah-bed-frame",
    name: "Savannah Bed Frame",
    price: 67000,
    originalPrice: 75000,
    images: ["/bed-1.jpg", "/bed-2.jpg", "/bed-3.jpg"],
    category: "bedroom",
    rating: 4.7,
    reviews: 156,
    description:
      "King size bed frame inspired by the African Savannah, offering both elegance and storage solutions.",
    features: [
      "Solid wood construction from sustainable sources",
      "Ample under-bed storage",
      "Easy assembly with provided tools",
      "Anti-slip mattress support",
      "Classic Savannah-inspired design",
    ],
    dimensions: {
      width: "195cm",
      height: "110cm",
      depth: "215cm",
      weight: "120kg",
    },
    materials: [
      "Solid mahogany wood",
      "Metal reinforcements",
      "Eco-friendly finish",
    ],
    delivery: "Free delivery within Kenya. 5-7 business days.",
    warranty: "5 years warranty on frame",
  },
];

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Kenyan Furniture Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

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
              href="/categories"
              className="text-gray-500 hover:text-amber-600"
            >
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/categories/${product.category}`}
              className="text-gray-500 hover:text-amber-600"
            >
              {product.category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-2xl p-4 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-2 cursor-pointer hover:border-amber-500 border-2 border-transparent"
                  >
                    <div className="relative aspect-square rounded overflow-hidden">
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-8">
              <div className="mb-6">
                {product.originalPrice && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save{" "}
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    %
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex text-amber-400 text-lg">
                    {"★".repeat(Math.floor(product.rating))}
                    <span className="text-gray-300">
                      {"★".repeat(5 - Math.floor(product.rating))}
                    </span>
                  </div>
                  <span className="text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    KES {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      KES {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-green-600 font-semibold">
                  ✅ In stock - Ready to ship
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-4 py-2 text-xl hover:bg-gray-100">
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">
                      1
                    </span>
                    <button className="px-4 py-2 text-xl hover:bg-gray-100">
                      +
                    </button>
                  </div>

                  <button className="flex-1 bg-amber-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>

                <button className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-4">
                  Buy Now
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">{product.delivery}</p>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {["Description", "Specifications", "Delivery", "Reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className="py-4 px-1 border-b-2 border-transparent hover:text-amber-600 hover:border-amber-600 text-gray-500 font-medium"
                    >
                      {tab}
                    </button>
                  )
                )}
              </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Width</span>
                    <span className="font-medium">
                      {product.dimensions.width}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Height</span>
                    <span className="font-medium">
                      {product.dimensions.height}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Depth</span>
                    <span className="font-medium">
                      {product.dimensions.depth}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">
                      {product.dimensions.weight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Materials & Care</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Materials:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {product.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Warranty:</h4>
                    <p className="text-gray-600">{product.warranty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter(
                (p) => p.id !== product.id && p.category === product.category
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                >
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900">
                          KES {relatedProduct.price.toLocaleString()}
                        </span>
                        {relatedProduct.originalPrice && (
                          <span className="text-gray-500 line-through">
                            KES {relatedProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
