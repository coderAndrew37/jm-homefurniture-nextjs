import { fetchRelatedProducts } from "@/lib/products";
import { urlFor } from "@/lib/sanity.client";
import { getProductBySlug, getProducts } from "@/lib/sanity.fetch";
import { Product } from "@/lib/sanity.schema";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductInfo from "./ProductInfo"; // ✅ import new client component

export const dynamicParams = true; // ✅ ensure dynamic routes get runtime params

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };

  const desc =
    typeof product.description === "string"
      ? product.description
      : Array.isArray(product.description)
        ? product.description.join(" ")
        : "";

  return {
    title: `${product.name} - Kenyan Furniture Store`,
    description: desc,
    openGraph: {
      title: product.name,
      description: desc,
      images: product.additionalImages?.length
        ? [urlFor(product.additionalImages[0]).url()]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products
    .filter((p) => p.slug?.current?.trim())
    .map((product: Product) => ({ slug: product.slug!.current }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) notFound();

  const relatedProducts = await fetchRelatedProducts(
    product.category?._id ?? "",
    product._id
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
              href="/categories"
              className="text-gray-500 hover:text-amber-600"
            >
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/categories/${product.category?.slug?.current}`}
              className="text-gray-500 hover:text-amber-600"
            >
              {product.category?.name}
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
            {/* Images */}
            <div>
              <div className="bg-white rounded-2xl p-4 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={
                      product.additionalImages?.[0]
                        ? urlFor(product.additionalImages[0]).url()
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.additionalImages?.map((image, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-2 cursor-pointer hover:border-amber-500 border-2 border-transparent"
                  >
                    <div className="relative aspect-square rounded overflow-hidden">
                      <Image
                        src={urlFor(image).url()}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: Product) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                >
                  <Link href={`/products/detail/${p.slug?.current || ""}`}>
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={
                          product.mainImage
                            ? urlFor(product.mainImage).url()
                            : product.additionalImages?.[0]
                              ? urlFor(product.additionalImages[0]).url()
                              : "/placeholder.png"
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900">
                          KES {(p.price ?? 0).toLocaleString()}
                        </span>
                        {p.originalPrice && (
                          <span className="text-gray-500 line-through">
                            KES {p.originalPrice.toLocaleString()}
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
      )}
    </div>
  );
}
