import {
  BlogPost,
  Category,
  Collection,
  HeroBanner,
  Product,
  Testimonial,
} from "@/app/types/sanity";
import { client } from "./sanity.client";
import { queries } from "./sanity.client";

/* ======================
   GENERIC FETCH WRAPPER
   ====================== */

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.error("Sanity fetch error:", err);
    throw new Error("Failed to fetch Sanity data");
  }
}

/* ======================
   PRODUCTS
   ====================== */

export async function getProducts(): Promise<Product[]> {
  return sanityFetch<Product[]>(queries.products);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityFetch<Product | null>(queries.productBySlug, { slug });
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return sanityFetch<Product[]>(queries.productsByCategory, {
    category: categorySlug,
  });
}

/* ======================
   CATEGORIES
   ====================== */

export async function getCategories(): Promise<Category[]> {
  return sanityFetch<Category[]>(queries.categories);
}

/* ======================
   BLOG POSTS
   ====================== */

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(queries.blogPosts);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(queries.blogPostBySlug, { slug });
}

/* ======================
   COLLECTIONS
   ====================== */

export async function getCollections(): Promise<Collection[]> {
  return sanityFetch<Collection[]>(queries.collections);
}

/* ======================
   TESTIMONIALS
   ====================== */

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>(queries.testimonials);
}

/* ======================
   HERO BANNERS
   ====================== */

export async function getHeroBanners(): Promise<HeroBanner[]> {
  return sanityFetch<HeroBanner[]>(queries.heroBanners);
}
