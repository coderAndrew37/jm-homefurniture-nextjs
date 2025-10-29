"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useApp } from "../context/CartContext";

export default function LipaMdogoPage() {
  const { state } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<number>(3);

  const plans = [
    { months: 3, interest: 5 },
    { months: 6, interest: 8 },
    { months: 12, interest: 12 },
  ];

  const calculateInstallment = (
    total: number,
    months: number,
    interest: number
  ) => {
    const totalWithInterest = total * (1 + interest / 100);
    return Math.ceil(totalWithInterest / months);
  };

  const total = state.cart.total * 1.14; // Including tax
  const monthlyPayment = calculateInstallment(
    total,
    selectedPlan,
    plans.find((p) => p.months === selectedPlan)?.interest || 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-amber-600">
              Cart
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Lipa Mdogo Mdogo</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Plan */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Lipa Mdogo Mdogo
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Spread your payments over time with our flexible installment
              plans. Get your furniture now and pay in manageable monthly
              payments.
            </p>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2">
                {state.cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span className="font-medium">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                    <span>
                      KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {state.cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (14%)</span>
                  <span>KES {(state.cart.total * 0.14).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Plans */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Choose Your Plan
              </h2>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.months}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan === plan.months
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-300 hover:border-amber-500"
                    }`}
                    onClick={() => setSelectedPlan(plan.months)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {plan.months} Months
                        </h3>
                        <p className="text-gray-600">
                          {plan.interest}% interest
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          KES{" "}
                          {calculateInstallment(
                            total,
                            plan.months,
                            plan.interest
                          ).toLocaleString()}
                          /month
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: KES{" "}
                          {(total * (1 + plan.interest / 100)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  Why Choose Lipa Mdogo Mdogo?
                </h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ No hidden fees</li>
                  <li>✓ Quick approval process</li>
                  <li>✓ Flexible payment terms</li>
                  <li>✓ Get your furniture immediately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Apply Now
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+254 700 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your national ID number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Employed</option>
                    <option>Self-Employed</option>
                    <option>Student</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Payment Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Payment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Selected Plan:</span>
                      <span>{selectedPlan} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span className="font-semibold">
                        KES {monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span>
                        KES {(monthlyPayment * selectedPlan).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Apply for Lipa Mdogo Mdogo
                </button>

                <p className="text-center text-sm text-gray-600">
                  By applying, you agree to our{" "}
                  <a href="/terms" className="text-amber-600 hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </form>

              {/* Quick WhatsApp Option */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600 mb-4">
                  Prefer instant approval?
                </p>
                <Link
                  href={`https://wa.me/254700123456?text=${encodeURIComponent(
                    `Hello! I'd like to apply for Lipa Mdogo Mdogo for my order of KES ${total.toLocaleString()}. Please guide me through the process.`
                  )}`}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
                  target="_blank"
                >
                  💬 Apply via WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
