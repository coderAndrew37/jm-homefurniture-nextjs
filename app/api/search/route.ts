// app/api/search/route.ts
import { NextResponse } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const searchQuery = groq`
  *[
    _type == "product" &&
    status == "active" &&
    (
      name match $term + "*" ||
      description match $term + "*" ||
      $term in tags
    )
  ][0...12] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    discountPercentage,
    mainImage,
    additionalImages,
    "category": category->{ name, slug },
    rating,
    stock,
    isBestSeller,
    isFeatured,
    tags
  }
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("q");

  if (!term || term.trim().length < 2) {
    return NextResponse.json({ products: [], total: 0 });
  }

  try {
    const products = await client.fetch(searchQuery, { term });
    return NextResponse.json({
      products,
      total: products.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ products: [], total: 0 });
  }
}
