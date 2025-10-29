"use client";
import Link from "next/link";
import { useState } from "react";
import { useApp } from "../context/CartContext";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
    category: string;
  };
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useApp();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    addToCart(product);
    setIsAdding(false);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleBuyNow = () => {
    addToCart(product);
    // Redirect to cart page
    window.location.href = "/cart";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 text-xl"
          >
            -
          </button>
          <span className="w-12 text-center py-3">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 bg-amber-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-colors ${
            isWishlisted
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBuyNow}
          className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300"
        >
          Buy Now
        </button>

        <Link
          href={`https://wa.me/254700123456?text=${encodeURIComponent(
            `Hello! I'm interested in the ${
              product.name
            } for KES ${product.price.toLocaleString()}. Can you provide more details?`
          )}`}
          target="_blank"
          className="flex-1 bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 text-center flex items-center justify-center gap-2"
        >
          💬 WhatsApp
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>SKU: {product.id}</span>
        <span>Category: {product.category}</span>
      </div>
    </div>
  );
}
