import { Metadata } from "next";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Kenyan Furniture Store",
  description:
    "Get in touch with Kenyan Furniture. Visit our showroom, call us, or send a message. We&apos;re here to help you create your dream space.",
};

interface ContactInfo {
  type: string;
  label: string;
  value: string;
  icon: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
  {
    type: "phone",
    label: "Call Us",
    value: "+254 700 123 456",
    icon: "📞",
    link: "tel:+254700123456",
  },
  {
    type: "email",
    label: "Email Us",
    value: "hello@kenyanfurniture.co.ke",
    icon: "✉️",
    link: "mailto:hello@kenyanfurniture.co.ke",
  },
  {
    type: "address",
    label: "Visit Our Showroom",
    value: "123 Furniture Plaza, Mombasa Road, Nairobi, Kenya",
    icon: "📍",
    link: "https://maps.google.com/?q=123+Furniture+Plaza+Mombasa+Road+Nairobi+Kenya",
  },
  {
    type: "hours",
    label: "Opening Hours",
    value: "Mon - Sat: 8:00 AM - 6:00 PM | Sun: 10:00 AM - 4:00 PM",
    icon: "🕒",
  },
];

const faqs = [
  {
    question: "Do you offer free delivery?",
    answer:
      "Yes, we offer free delivery within Nairobi for orders above KES 20,000. For orders below this amount, delivery charges start from KES 1,500 depending on your location.",
  },
  {
    question: "Can I visit your showroom?",
    answer:
      "Absolutely! Our showroom is open Monday to Saturday 8:00 AM - 6:00 PM and Sunday 10:00 AM - 4:00 PM. We recommend calling ahead to schedule a personalized tour.",
  },
  {
    question: "Do you offer custom furniture?",
    answer:
      "Yes, we specialize in custom furniture pieces. Our design team can work with you to create bespoke furniture that fits your space and style perfectly.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 14-day return policy for unused items in original packaging. Custom orders and assembled furniture may have different return conditions.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We&apos;re here to help you create the home of your dreams. Reach
            out to us with any questions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let&apos;s Talk
                </h2>
                <p className="text-gray-600 text-lg">
                  Whether you&apos;re looking for specific furniture pieces,
                  need design advice, or want to visit our showroom, we&apos;re
                  here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.type} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.label}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-amber-600 transition-colors"
                          target={item.type === "address" ? "_blank" : "_self"}
                          rel={
                            item.type === "address" ? "noopener noreferrer" : ""
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {[
                    {
                      name: "Facebook",
                      icon: "📘",
                      url: "https://facebook.com",
                    },
                    {
                      name: "Instagram",
                      icon: "📷",
                      url: "https://instagram.com",
                    },
                    { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
                    {
                      name: "Pinterest",
                      icon: "📌",
                      url: "https://pinterest.com",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-amber-500 hover:text-white transition-colors"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-21/9 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 text-lg">
                  Interactive Map Coming Soon
                </p>
                <p className="text-gray-500">
                  We&apos;re working on integrating a map to help you find us
                  easily.
                </p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Find Our Showroom
              </h3>
              <p className="text-gray-600">
                Located conveniently on Mombasa Road, our showroom is easily
                accessible with ample parking space.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
