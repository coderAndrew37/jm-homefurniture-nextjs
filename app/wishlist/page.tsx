"use client";
import { CartItem, useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { addToCart } = useCartStore();
  const { wishlist, removeFromWishlist, moveToCart } = useWishlistStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">❤️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your wishlist is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist. Review them anytime and
              easily move them to your cart.
            </p>
            <Link
              href="/products"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: CartItem) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  const handleMoveToCart = (productId: string) => {
    moveToCart(productId, addToCart);
    toast.success("Moved to cart");
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => moveToCart(product._id, addToCart));
    toast.success("All wishlist items added to cart");
  };

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
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={
                    typeof product.image === "string"
                      ? product.image
                      : product.image || "/placeholder.png"
                  }
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromWishlist(product._id);
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
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleMoveToCart(product._id)}
                    className="flex-1 border-2 border-amber-500 text-amber-600 py-2 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {wishlist.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handleAddAllToCart}
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
