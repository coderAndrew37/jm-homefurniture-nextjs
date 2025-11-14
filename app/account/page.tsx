"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Order = {
  id: string;
  description: string;
  status: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-green-100 text-green-800",
      DELIVERED: "bg-emerald-100 text-emerald-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const texts = {
      PENDING: "Awaiting Confirmation",
      CONFIRMED: "Order Confirmed",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled",
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to JM Home Furniture
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access your account and manage your custom
            furniture orders.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-light text-gray-900">
              Kenyan Elegance
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-gray-600">{session.user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                My Custom Orders
              </h2>
              <Link
                href="/custom-design"
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                + New Custom Order
              </Link>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛋️</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start your custom furniture journey by creating your first
                  order.
                </p>
                <Link
                  href="/custom-design"
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors inline-block"
                >
                  Create Custom Design
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.description}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ordered on{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {order.budget && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Budget
                          </p>
                          <p className="text-gray-900">{order.budget}</p>
                        </div>
                      )}
                      {order.timeline && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Timeline
                          </p>
                          <p className="text-gray-900">{order.timeline}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Last Updated
                        </p>
                        <p className="text-gray-900">
                          {new Date(order.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Additional Notes
                        </p>
                        <p className="text-gray-900">{order.notes}</p>
                      </div>
                    )}

                    {order.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Reference Images
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {order.images.map((image, index) => (
                            <div key={index} className="relative aspect-square">
                              <Image
                                src={image}
                                alt={`Reference image ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        💬 <strong>Next Step:</strong>{" "}
                        {order.status === "PENDING"
                          ? "We'll contact you via WhatsApp to confirm your order details"
                          : order.status === "CONFIRMED"
                            ? "Our artisans have started working on your piece"
                            : order.status === "IN_PROGRESS"
                              ? "Your furniture is being crafted by our master artisans"
                              : order.status === "COMPLETED"
                                ? "Your order is ready for delivery"
                                : order.status === "DELIVERED"
                                  ? "Enjoy your custom furniture!"
                                  : "Please contact us for more information"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Profile Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={session.user?.name || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Managed by Google</p>
              </div>

              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  value={session.user?.email || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Managed by Google</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Sign Out</div>
                  <div className="text-sm text-gray-500">
                    Sign out of your account
                  </div>
                </button>

                <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="font-medium text-gray-900">
                    Delete Account
                  </div>
                  <div className="text-sm text-gray-500">
                    Contact support to permanently delete your account and data
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
