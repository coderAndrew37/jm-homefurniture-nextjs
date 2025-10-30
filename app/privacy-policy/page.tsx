import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Kenyan Furniture Store",
  description:
    "Learn how Kenyan Furniture collects, uses, and protects your personal information. Your privacy is important to us.",
};

interface PolicySection {
  title: string;
  content: string;
}

const policySections: PolicySection[] = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, shipping address, and payment information.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to process your orders, provide customer support, communicate with you about products and promotions, improve our services, and ensure the security of our platform.",
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information below.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.",
  },
  {
    title: "Changes to This Policy",
    content:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at hello@kenyanfurniture.co.ke or +254 700 123 456.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
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
                At Kenyan Furniture, we are committed to protecting your privacy
                and ensuring the security of your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or make a
                purchase from us.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {policySections.map((section, index) => (
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

            {/* Additional Information */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Additional Information
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  • This policy applies to all information collected through our
                  website and any related services
                </li>
                <li>
                  • By using our website, you consent to our Privacy Policy
                </li>
                <li>
                  • We comply with applicable data protection laws in Kenya
                </li>
                <li>
                  • For data removal requests, please contact our support team
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                For any privacy-related questions, please contact us at{" "}
                <a
                  href="mailto:privacy@kenyanfurniture.co.ke"
                  className="text-amber-600 hover:underline"
                >
                  privacy@kenyanfurniture.co.ke
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <Link
              href="/terms-conditions"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              ← Terms & Conditions
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
