import { urlFor } from "../sanity.client";
import { getProductBySlug } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch single product by slug
 */
export async function fetchProductBySlug(slug: string): Promise<
  | (Product & {
      effectivePrice?: number;
      isOnSale: boolean;
      imageUrl?: string;
      categoryName: string;
    })
  | null
> {
  if (!slug) return null;

  const product = await getProductBySlug(slug);
  if (!product) return null;

  const effectivePrice = product.discountPercentage
    ? Math.round(product.price! * (1 - product.discountPercentage / 100))
    : (product.price ?? undefined);

  return {
    ...product,
    effectivePrice,
    isOnSale: !!product.discountPercentage && product.discountPercentage > 0,
    imageUrl: product.mainImage ? urlFor(product.mainImage).url() : undefined,
    categoryName: product.category?.name ?? "Uncategorized",
  };
}
