import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Kenyan Furniture Store",
  description:
    "Learn about Kenyan Furniture - our story, mission, and commitment to bringing quality, sustainable furniture to Kenyan homes since 2020.",
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Value {
  title: string;
  description: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Wanjiku",
    role: "Founder & CEO",
    bio: "With over 15 years in interior design, Sarah started Kenyan Furniture to bring quality, affordable furniture to Kenyan homes.",
    image: "/team-sarah.jpg",
  },
  {
    name: "James Mwangi",
    role: "Head of Production",
    bio: "James brings traditional woodworking expertise combined with modern techniques to ensure every piece meets our quality standards.",
    image: "/team-james.jpg",
  },
  {
    name: "Grace Akinyi",
    role: "Design Director",
    bio: "Grace leads our design team in creating furniture that blends Kenyan cultural elements with contemporary aesthetics.",
    image: "/team-grace.jpg",
  },
];

const values: Value[] = [
  {
    title: "Sustainability",
    description:
      "We use responsibly sourced materials and eco-friendly practices to minimize our environmental impact.",
    icon: "🌱",
  },
  {
    title: "Quality Craftsmanship",
    description:
      "Every piece is meticulously crafted by skilled artisans who take pride in their work.",
    icon: "🔨",
  },
  {
    title: "Community Impact",
    description:
      "We support local communities and preserve traditional skills through fair employment practices.",
    icon: "🤝",
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We go above and beyond to ensure you love your furniture.",
    icon: "💝",
  },
];

const milestones = [
  {
    year: "2020",
    event: "Founded Kenyan Furniture with a vision to transform Kenyan homes",
  },
  { year: "2021", event: "Opened our first showroom in Nairobi" },
  {
    year: "2022",
    event: "Launched our e-commerce platform serving all of Kenya",
  },
  {
    year: "2023",
    event: "Expanded our product line to include custom furniture",
  },
  { year: "2024", event: "Reached 10,000+ happy customers across Kenya" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Crafting beautiful, sustainable furniture that celebrates Kenyan
            artistry and transforms homes across the nation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Kenyan Craftsmanship Meets Modern Design
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2020, Kenyan Furniture was born from a passion for
                  combining traditional Kenyan craftsmanship with contemporary
                  design principles. We believe that every home deserves
                  beautiful, functional furniture that tells a story.
                </p>
                <p>
                  Our team works directly with local artisans and sustainable
                  wood sources across Kenya, ensuring that each piece not only
                  enhances your living space but also supports local communities
                  and preserves traditional skills.
                </p>
                <p>
                  From the skilled woodcarvers in Kisii to the talented weavers
                  in Kitui, we collaborate with craftspeople who take pride in
                  their work, creating pieces that are built to last and
                  designed to be cherished for generations.
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/about-showroom.jpg"
                alt="Kenyan Furniture Showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Kenyan Furniture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Kenyan Furniture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Milestones in our growth and commitment to Kenyan homes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-lg text-gray-900">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom or browse our collections to find the perfect
            furniture for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Collections
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
            >
              Visit Showroom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
