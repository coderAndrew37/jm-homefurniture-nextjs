import { client } from "./sanity.client";
import { z } from "zod";
import { SchemaMap } from "./sanity.schema";
import { queries } from "./sanity.queries";

/* ======================
   GENERIC FETCH + VALIDATE
   ====================== */
export async function fetchAndValidate<T extends z.ZodTypeAny>(
  query: string,
  schema: T,
  params: Record<string, unknown> = {}
): Promise<z.infer<T>> {
  const data = await client.fetch(query, params);

  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Zod validation failed:", err.flatten());
      throw new Error(
        `Validation failed: ${err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")}`
      );
    }
    throw err;
  }
}

/* ======================
   TYPED SANITY HELPERS
   ====================== */
export const getProducts = () =>
  fetchAndValidate(queries.products, SchemaMap.products);

export const getProductBySlug = (slug: string) =>
  fetchAndValidate(queries.productBySlug, SchemaMap.productBySlug, { slug });

export const getProductsByCategory = (category: string) =>
  fetchAndValidate(queries.productsByCategory, SchemaMap.products, {
    category,
  });

export const getCategories = () =>
  fetchAndValidate(queries.categories, SchemaMap.categories);

export const getCollections = () =>
  fetchAndValidate(queries.collections, SchemaMap.collections);

export const getTestimonials = () =>
  fetchAndValidate(queries.testimonials, SchemaMap.testimonials);

export const getHeroBanners = () =>
  fetchAndValidate(queries.heroBanners, SchemaMap.heroBanners);

export const getBlogPosts = () =>
  fetchAndValidate(queries.blogPosts, SchemaMap.blogPosts);

export const getBlogPostBySlug = (slug: string) =>
  fetchAndValidate(queries.blogPostBySlug, SchemaMap.blogPostBySlug, { slug });
