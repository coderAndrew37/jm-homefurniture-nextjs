import { urlFor } from "../sanity.client";
import { getProductsByCategory } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch products by category slug
 */
export async function fetchProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  if (!categorySlug) return [];

  const products = await getProductsByCategory(categorySlug);
  return products.map((p) => ({
    ...p,
    effectivePrice: p.discountPercentage
      ? Math.round(p.price! * (1 - p.discountPercentage / 100))
      : p.price,
    isOnSale: !!p.discountPercentage && p.discountPercentage > 0,
    imageUrl: p.mainImage ? urlFor(p.mainImage).url() : undefined,
  }));
}
