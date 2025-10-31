import { getProductBySlug } from "../sanity.fetch";
import { Product } from "../sanity.schema";

/**
 * Fetch single product by slug
 */
export async function fetchProductBySlug(slug: string): Promise<
  | (Product & {
      effectivePrice?: number | undefined;
      isOnSale: boolean;
      imageUrl?: string | undefined;
      categoryName: string;
    })
  | null
> {
  if (!slug) return null;

  const product = await getProductBySlug(slug);
  if (!product) return null;

  const effectivePrice = product.discountPercentage
    ? Math.round(product.price! * (1 - product.discountPercentage / 100))
    : product.price;

  return {
    ...product,
    effectivePrice,
    isOnSale: !!product.discountPercentage && product.discountPercentage > 0,
    imageUrl: product.mainImage?.asset?.url,
    categoryName: product.category?.name ?? "Uncategorized",
  };
}
