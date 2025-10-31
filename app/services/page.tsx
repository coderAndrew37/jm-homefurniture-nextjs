import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services - Kenyan Furniture Store",
  description:
    "Discover our comprehensive furniture services including delivery, assembly, interior design consultation, and custom furniture solutions.",
};

const services = [
  {
    title: "Free Delivery",
    description:
      "Enjoy free delivery within Nairobi for orders above KES 20,000. Safe and careful handling guaranteed.",
    icon: "🚚",
    features: [
      "Free within Nairobi",
      "Careful handling",
      "Tracking updates",
      "Scheduled delivery",
    ],
    price: "Free*",
    cta: "View Delivery Info",
    link: "/shipping-returns",
  },
  {
    title: "Professional Assembly",
    description:
      "Our expert team will assemble your furniture quickly and correctly, saving you time and hassle.",
    icon: "🔨",
    features: [
      "Expert technicians",
      "Proper tools",
      "Waste removal",
      "Quality check",
    ],
    price: "From KES 2,000",
    cta: "Book Assembly",
    link: "/contact",
  },
  {
    title: "Interior Design Consultation",
    description:
      "Get expert advice on furniture selection, layout, and interior design from our professional team.",
    icon: "🎨",
    features: [
      "Space planning",
      "Style matching",
      "Budget optimization",
      "3D visualization",
    ],
    price: "Free",
    cta: "Book Consultation",
    link: "/contact",
  },
  {
    title: "Custom Furniture",
    description:
      "Create bespoke furniture pieces tailored to your exact specifications, space, and style preferences.",
    icon: "✨",
    features: [
      "Custom dimensions",
      "Material selection",
      "Design collaboration",
      "Quality craftsmanship",
    ],
    price: "Get Quote",
    cta: "Start Project",
    link: "/contact",
  },
  {
    title: "Furniture Repair & Restoration",
    description:
      "Restore your beloved furniture pieces to their former glory with our expert repair services.",
    icon: "🔧",
    features: [
      "Damage repair",
      "Reupholstering",
      "Wood restoration",
      "Hardware replacement",
    ],
    price: "Get Quote",
    cta: "Inquire Now",
    link: "/contact",
  },
  {
    title: "Corporate Services",
    description:
      "Furniture solutions for businesses, offices, and commercial spaces with bulk order discounts.",
    icon: "🏢",
    features: [
      "Bulk discounts",
      "Commercial grade",
      "Project management",
      "Installation services",
    ],
    price: "Get Quote",
    cta: "Business Inquiry",
    link: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Beyond furniture - comprehensive solutions to make your home perfect
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="mb-4">
                  <div className="font-semibold text-amber-600 text-lg mb-2">
                    {service.price}
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={service.link}
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-center block"
                >
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you need a single piece of furniture or a complete home
            makeover, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <a
              href="https://wa.me/254700123456"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* Process Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Our Services Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We understand your needs and preferences",
              },
              {
                step: "2",
                title: "Planning",
                description: "We create a customized solution for you",
              },
              {
                step: "3",
                title: "Execution",
                description: "Our team delivers and implements the plan",
              },
              {
                step: "4",
                title: "Support",
                description: "We provide ongoing support and maintenance",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
