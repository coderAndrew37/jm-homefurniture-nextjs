import { getProducts } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch and normalize all active products
 */
export async function fetchAllProducts(): Promise<Product[]> {
  const products = await getProducts();

  // Normalize derived data
  return products.map((p) => ({
    ...p,
    effectivePrice: p.discountPercentage
      ? Math.round(p.price! * (1 - p.discountPercentage / 100))
      : p.price,
    isOnSale: !!p.discountPercentage && p.discountPercentage > 0,
    imageUrl: p.mainImage?.asset?.url,
    categoryName: p.category?.name ?? "Uncategorized",
  }));
}
