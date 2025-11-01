"use client";

import { urlFor } from "@/lib/sanity.client";
import { Product } from "@/lib/sanity.schema";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

export default function ProductInfo({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isWishlisted = wishlist.some((i) => i._id === product._id);

  const discount =
    typeof product.originalPrice === "number" &&
    typeof product.price === "number"
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl p-8">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
          Save {discount}%
        </span>
      )}

      {/* Product Name */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex text-amber-400 text-lg">
          {"★".repeat(Math.floor(product.rating?.stars ?? 0))}
          <span className="text-gray-300">
            {"★".repeat(5 - Math.floor(product.rating?.stars ?? 0))}
          </span>
        </div>
        <span className="text-gray-600">
          {product.rating?.stars?.toFixed(1) ?? 0} ({product.rating?.count ?? 0}{" "}
          reviews)
        </span>
      </div>

      {/* Prices */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl font-bold text-gray-900">
          KES {(product.price ?? 0).toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-500 line-through">
            KES {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Stock */}
      <p className="text-green-600 font-semibold mb-6">
        ✅ In stock - Ready to ship
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-8">
        {product.description?.toString() ?? ""}
      </p>

      {/* Add to Cart + Wishlist Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() =>
            addToCart({
              _id: product._id,
              name: product.name,
              price: product.price ?? 0,
              quantity: 1,
              image: product.additionalImages?.[0]
                ? urlFor(product.additionalImages[0]).url()
                : "",
              slug: product.slug?.current ?? "",
              originalPrice: product.originalPrice ?? undefined,
            })
          }
          className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() =>
            isWishlisted
              ? removeFromWishlist(product._id)
              : addToWishlist({
                  _id: product._id,
                  name: product.name,
                  price: product.price ?? 0,
                  quantity: 1,
                  image: product.additionalImages?.[0]
                    ? urlFor(product.additionalImages[0]).url()
                    : "",
                  slug: product.slug?.current ?? "",
                  originalPrice: product.originalPrice ?? undefined,
                })
          }
          className={`border-2 py-3 px-6 rounded-lg font-semibold transition ${
            isWishlisted
              ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
              : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          }`}
        >
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>

      <p className="text-gray-600 text-sm">Free delivery within Kenya</p>
    </div>
  );
}
