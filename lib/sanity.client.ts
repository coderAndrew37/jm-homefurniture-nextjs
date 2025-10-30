import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: Image | string) => builder.image(source);

// GROQ queries
export const queries = {
  blogPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{ _id, name, image, bio },
    categories[]->{ _id, title, slug },
    tags,
    body,
    featured,
    relatedPosts[]->{ _id, title, slug, excerpt, mainImage, publishedAt, readTime }
  }`,

  blogPostBySlug: `*[_type == "post" && slug.current == $slug][0] { ... }`,

  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] { ... }`,

  postsByCategory: `*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) { ... }`,

  postsByTag: `*[_type == "post" && $tag in tags] | order(publishedAt desc) { ... }`,

  categories: `*[_type == "category"] {
    _id,
    name,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  }`,

  products: `*[_type == "product"] | order(_createdAt desc) { ... }`,

  productBySlug: `*[_type == "product" && slug.current == $slug][0] { ... }`,

  productsByCategory: `*[_type == "product" && category->slug.current == $category] | order(_createdAt desc) { ... }`,
};
