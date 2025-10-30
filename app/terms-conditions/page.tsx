import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Kenyan Furniture Store",
  description:
    "Read the terms and conditions governing your use of Kenyan Furniture website and services. Understand your rights and responsibilities.",
};

interface TermSection {
  title: string;
  content: string;
}

const termSections: TermSection[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "Use License",
    content:
      "Permission is granted to temporarily download one copy of the materials on Kenyan Furniture website for personal, non-commercial transitory viewing only.",
  },
  {
    title: "Products and Services",
    content:
      "All products and services are subject to availability. We reserve the right to discontinue any products at any time. Prices for our products are subject to change without notice.",
  },
  {
    title: "Orders and Payment",
    content:
      "When you place an order through our website, you agree to provide current, complete, and accurate purchase and account information. We use third-party payment processors for all payments.",
  },
  {
    title: "Shipping and Delivery",
    content:
      "We offer delivery services within Kenya. Delivery times are estimates and not guaranteed. Risk of loss and title for items purchased from us pass to you upon delivery to the carrier.",
  },
  {
    title: "Returns and Refunds",
    content:
      "We accept returns within 14 days of delivery for unused items in original packaging. Custom orders and assembled furniture may not be eligible for return. Refunds will be processed within 14 business days.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content included on this site, such as text, graphics, logos, images, and software, is the property of Kenyan Furniture or its content suppliers and protected by copyright laws.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Kenyan Furniture shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.",
  },
  {
    title: "Governing Law",
    content:
      "These terms and conditions are governed by and construed in accordance with the laws of Kenya and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                Please read these terms and conditions carefully before using
                our website and purchasing our products. Your access to and use
                of the service is conditioned on your acceptance of and
                compliance with these terms.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-8">
              {termSections.map((section, index) => (
                <section
                  key={index}
                  className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-3">
                Important Information
              </h3>
              <ul className="text-amber-800 space-y-2">
                <li>
                  • These terms affect your legal rights and responsibilities
                </li>
                <li>
                  • We reserve the right to update these terms at any time
                </li>
                <li>
                  • Continued use of our services constitutes acceptance of
                  updated terms
                </li>
                <li>
                  • If you disagree with any part of these terms, you may not
                  use our services
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                For questions about these Terms & Conditions, please contact us
                at{" "}
                <a
                  href="mailto:legal@kenyanfurniture.co.ke"
                  className="text-amber-600 hover:underline"
                >
                  legal@kenyanfurniture.co.ke
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <Link
              href="/privacy-policy"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              ← Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
