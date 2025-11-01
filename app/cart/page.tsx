"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { urlFor } from "@/lib/sanity.client";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [selectedOption, setSelectedOption] = useState<
    "whatsapp" | "lipa-mdogo"
  >("whatsapp");

  // Computed values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = items.map((i) =>
      i._id === id ? { ...i, quantity: newQty } : i
    );
    useCartStore.setState({ items: updated });
  };

  const generateWhatsAppMessage = () => {
    const itemsText = items
      .map(
        (item) =>
          `• ${item.name} - ${item.quantity} x KES ${item.price.toLocaleString()} = KES ${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n");

    return `Hello! I'd like to order the following items from Kenyan Furniture:\n\n${itemsText}\n\nSubtotal: KES ${subtotal.toLocaleString()}\nTax (14%): KES ${tax.toLocaleString()}\nTotal: KES ${total.toLocaleString()}\n\nPlease proceed with my order.`;
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/254700123456?text=${message}`, "_blank");
  };

  useEffect(() => {
    document.title = `Cart (${itemCount}) - Kenyan Furniture`;
  }, [itemCount]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/products"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors inline-block"
              >
                Continue Shopping
              </Link>
              <Link
                href="/wishlist"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors inline-block"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              View Wishlist
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-200 last:border-b-0 p-6"
                >
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative w-24 h-24 flex-shrink-0"
                    >
                      <Image
                        src={
                          item.image
                            ? urlFor(item.image).url()
                            : "/placeholder.png"
                        }
                        alt={item.name ?? "Product image"}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-semibold text-gray-900 hover:text-amber-600 text-lg block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-amber-600 font-semibold text-lg mt-1">
                        KES {item.price.toLocaleString()}
                      </p>
                      {item.originalPrice && (
                        <p className="text-gray-500 line-through text-sm">
                          KES {item.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-12 text-center py-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-20">
                        <p className="font-semibold text-gray-900">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 p-2"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Checkout Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({itemCount})</span>
                  <span className="text-gray-900">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (14%)</span>
                  <span className="text-gray-900">
                    KES {tax.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-lg text-gray-900">
                    Total
                  </span>
                  <span className="font-semibold text-lg text-gray-900">
                    KES {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Checkout Option
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedOption("whatsapp")}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      selectedOption === "whatsapp"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    <div className="text-2xl mb-2">💬</div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm text-gray-600">Instant Order</div>
                  </button>

                  <Link
                    href="/lipa-mdogo-mdogo"
                    className="p-4 border-2 border-gray-300 rounded-lg text-center hover:border-amber-500 transition-all block"
                  >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-semibold">Lipa Mdogo</div>
                    <div className="text-sm text-gray-600">Installments</div>
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {selectedOption === "whatsapp" ? (
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    Order via WhatsApp
                  </button>
                ) : (
                  <Link
                    href="/lipa-mdogo-mdogo"
                    className="w-full bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-center block"
                  >
                    Proceed to Lipa Mdogo Mdogo
                  </Link>
                )}

                <Link
                  href="/products"
                  className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security & Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>🔒</span>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🚚</span>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>↩️</span>
                    <span>Easy Returns</span>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <p>
                    Need help?{" "}
                    <a
                      href="tel:+254700123456"
                      className="text-amber-600 hover:underline"
                    >
                      Call +254 700 123 456
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed / Recommended */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add recommended products here */}
          </div>
        </div>
      </div>
    </div>
  );
}
