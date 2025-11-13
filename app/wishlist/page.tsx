"use client";
import { urlFor } from "@/lib/sanity.client"; // ✅ added
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { addToCart } = useCartStore();
  const { wishlist, removeFromWishlist, moveToCart } = useWishlistStore();

  // ...empty state + handlers remain identical

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            // ✅ Safe image resolution (string or Sanity image)
            const imageSrc =
              typeof product.image === "string"
                ? product.image
                : product.image
                ? urlFor(product.image).width(800).height(600).url()
                : "/placeholder.png";

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={imageSrc} // ✅ unified source logic
                    alt={product.name || "Wishlist item"}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product._id);
                      toast.success("Removed from wishlist 💔");
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>
                </Link>

                <div className="p-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-semibold text-gray-900 hover:text-amber-600 transition-colors line-clamp-2 block mb-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      KES {product.price?.toLocaleString() ?? "0"}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        KES {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addToCart({ ...product, quantity: 1 });
                        toast.success(`${product.name} added to cart 🛒`);
                      }}
                      className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        moveToCart(product._id, addToCart);
                        toast.success("Moved to cart 🛍️");
                      }}
                      className="flex-1 border-2 border-amber-500 text-amber-600 py-2 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors text-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bulk Actions */}
        {wishlist.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => {
                wishlist.forEach((p) => moveToCart(p._id, addToCart));
                toast.success("All wishlist items added to cart 🛒");
              }}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Add All to Cart
            </button>

            <Link
              href="/products"
              className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
