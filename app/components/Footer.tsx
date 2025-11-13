import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Living Room", href: "/categories/living-room" },
    { name: "Bedroom", href: "/categories/bedroom" },
    { name: "Dining", href: "/categories/dining" },
    { name: "Office", href: "/categories/office" },
    { name: "Outdoor", href: "/categories/outdoor" },
    { name: "Sale", href: "/sale" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Sustainability", href: "/about#sustainability" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping & Delivery", href: "/shipping" },
    { name: "Returns & Refunds", href: "/returns" },
    { name: "FAQ", href: "/faq" },
    { name: "Warranty", href: "/warranty" },
    { name: "Assembly Guide", href: "/assembly" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "📘",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "📷",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: "🐦",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: "📌",
  },
];

const paymentMethods = [
  "/visa.svg",
  "/mastercard.svg",
  "/mpesa.svg",
  "/paypal.svg",
  "/apple-pay.svg",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <section className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with JM Home Furniture
              </h3>
              <p className="text-gray-300 max-w-md">
                Get exclusive offers, new product launches, and home styling
                tips delivered to your inbox.
              </p>
            </div>

            <div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-3">
                By subscribing, you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold text-white">
                  JM Home<span className="text-amber-500">Furniture</span>
                </span>
              </Link>

              <p className="text-gray-300 mb-6 max-w-md">
                Creating beautiful, sustainable furniture that celebrates Kenyan
                craftsmanship and transforms homes across the nation.
              </p>

              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>hello@jmhomefurniture.co.ke</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <section className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} JM Home Furniture. All rights
              reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 text-lg"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm mr-2">We accept:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-6 bg-white rounded flex items-center justify-center"
                  >
                    <div className="text-xs font-bold text-gray-800">Pay</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kenya-specific badges */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>🇰🇪</span>
              <span>Proudly Kenyan</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>🌱</span>
              <span>Sustainably Sourced Materials</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>🚚</span>
              <span>Free Delivery in Nairobi</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
