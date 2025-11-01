"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { urlFor } from "@/lib/sanity.client";
import { Product } from "@/lib/sanity.schema";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { mapProductToCartItem } from "@/lib/utils/mapProductToCartItem";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState<number>(1);

  // Check if product is already in wishlist
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link navigation when clicking the button

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price ?? 0,
      image: product.mainImage
        ? urlFor(product.mainImage).width(400).height(400).url()
        : "/placeholder.png",
      slug: product.slug?.current || "",
      quantity,
    });

    toast.success(`${product.name} added to cart (${quantity}) 🛒`, {
      position: "bottom-center",
      duration: 3000,
      style: { background: "#1f2937", color: "#fff" },
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist 💔`, {
        position: "bottom-center",
      });
    } else {
      addToWishlist(mapProductToCartItem(product));
      toast.success(`${product.name} added to wishlist ❤️`, {
        position: "bottom-center",
      });
    }
  };

  const decreaseQty = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200">
      <Link href={`/products/detail/${product.slug?.current || ""}`} prefetch>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={
              product.mainImage
                ? urlFor(product.mainImage).width(800).height(600).url()
                : "/placeholder.png"
            }
            alt={product.name ?? "Product image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Wishlist Button ❤️ */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isInWishlist
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-700 hover:bg-amber-500 hover:text-white"
            }`}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isBrandNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Best Seller
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400 text-sm">
              {"★".repeat(Math.floor(product.rating?.stars ?? 0))}
              <span className="text-gray-300">
                {"★".repeat(5 - Math.floor(product.rating?.stars ?? 0))}
              </span>
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews?.length ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-bold text-gray-900">
              KES {(product.price ?? 0).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                KES {(product.originalPrice ?? 0).toLocaleString()}
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decreaseQty}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-10 text-center text-gray-900 font-medium">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}
