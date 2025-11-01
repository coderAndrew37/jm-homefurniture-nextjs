import { urlFor } from "../sanity.client";
import { getRelatedProducts } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch related products by category ID, excluding the current product
 */
export async function fetchRelatedProducts(
  categoryId: string,
  excludeId: string
): Promise<Product[]> {
  if (!categoryId) return [];

  const products = await getRelatedProducts(categoryId, excludeId);

  return products.map((p) => ({
    ...p,
    effectivePrice: p.discountPercentage
      ? Math.round(p.price! * (1 - p.discountPercentage / 100))
      : p.price,
    isOnSale: !!p.discountPercentage && p.discountPercentage > 0,
    imageUrl: p.mainImage ? urlFor(p.mainImage).url() : undefined,
  }));
}
