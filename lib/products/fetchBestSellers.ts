import { urlFor } from "../sanity.client";
import { getBestSellers } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch all best-selling products
 */
export async function fetchBestSellers(): Promise<Product[]> {
  const products = await getBestSellers();

  return products.map((p) => ({
    ...p,
    effectivePrice: p.discountPercentage
      ? Math.round(p.price! * (1 - p.discountPercentage / 100))
      : p.price,
    isOnSale: !!p.discountPercentage && p.discountPercentage > 0,
    imageUrl: p.mainImage ? urlFor(p.mainImage).url() : undefined,
  }));
}
