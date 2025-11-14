import {
  MILESTONES_QUERY,
  TEAM_QUERY,
  VALUES_QUERY,
} from "@/lib/aboutPageQueries";
import { client } from "@/lib/sanity.client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - JM Home Furniture Store",
  description:
    "Learn about JM Home Furniture - our story, mission, and commitment to bringing quality, sustainable furniture to Kenyan homes since 2020.",
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  _id: string;
}

interface Milestones {
  _id: string;
  year: number;
  event: string;
}

interface Value {
  title: string;
  description: string;
  icon: string;
  _id: string;
}

export default async function AboutPage() {
  const teamMembers = await client.fetch(TEAM_QUERY);
  const values = await client.fetch(VALUES_QUERY);
  const milestones = await client.fetch(MILESTONES_QUERY);
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
                  Founded in 2020, JM Home Furniture was born from a passion for
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
                alt="JM Home Furniture Showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind JM Home Furniture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember) => (
              <div key={member._id} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-amber-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: Value) => (
              <div
                key={value._id}
                className="text-center p-6 bg-white rounded-2xl shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600 mt-2">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-bold mb-12">Our Journey</h2>

          <div className="max-w-4xl mx-auto">
            {milestones.map((item: Milestones) => (
              <div key={item._id} className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.year}
                </div>
                <div className="pt-2 text-lg">{item.event}</div>
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
