// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

export async function GET() {
  try {
    const categories = await client.fetch(categoriesQuery);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
