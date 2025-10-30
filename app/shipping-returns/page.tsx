import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns - Kenyan Furniture Store",
  description:
    "Learn about our shipping options, delivery timelines, and return policy. We make it easy to get your furniture and ensure your satisfaction.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shipping & Returns
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Shipping Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 text-lg mb-3">
                    Free Shipping
                  </h3>
                  <p className="text-green-800">
                    Enjoy free delivery within Nairobi for orders above KES
                    20,000. We believe in making quality furniture accessible to
                    everyone.
                  </p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 text-lg mb-3">
                    Nationwide Delivery
                  </h3>
                  <p className="text-blue-800">
                    We deliver across Kenya. Delivery charges vary by location
                    and will be calculated at checkout based on your address.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">
                  Delivery Timeline
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    • <strong>Nairobi:</strong> 3-5 business days
                  </li>
                  <li>
                    • <strong>Major Cities:</strong> 5-7 business days
                  </li>
                  <li>
                    • <strong>Other Areas:</strong> 7-14 business days
                  </li>
                  <li>
                    • <strong>Custom Orders:</strong> 4-6 weeks (varies by
                    complexity)
                  </li>
                </ul>
              </div>
            </section>

            {/* Returns Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Return Policy
              </h2>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">
                    14-Day Return Window
                  </h4>
                  <p className="text-gray-600">
                    We offer a 14-day return policy from the date of delivery.
                    Items must be unused, in original packaging, and in
                    resalable condition.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">
                    Non-Returnable Items
                  </h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Custom or made-to-order furniture</li>
                    <li>• Assembled furniture (unless defective)</li>
                    <li>• Clearance or final sale items</li>
                    <li>• Items without original packaging</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">
                    Return Process
                  </h4>
                  <ol className="text-gray-600 space-y-2 list-decimal list-inside">
                    <li>
                      Contact our customer service team within 14 days of
                      delivery
                    </li>
                    <li>Provide your order number and reason for return</li>
                    <li>
                      We&apos;ll arrange for pickup (Nairobi) or provide return
                      instructions
                    </li>
                    <li>
                      Refund will be processed within 14 business days after
                      inspection
                    </li>
                  </ol>
                </div>

                <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 text-lg mb-3">
                    Important Notes
                  </h4>
                  <ul className="text-amber-800 space-y-2">
                    <li>
                      • Return shipping costs are the responsibility of the
                      customer
                    </li>
                    <li>
                      • Refunds will be issued to the original payment method
                    </li>
                    <li>
                      • Damaged or defective items will be replaced at no cost
                    </li>
                    <li>
                      • All returns are subject to inspection and approval
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Have questions about shipping or returns?
              </p>
              <Link
                href="/contact"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors inline-block"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
