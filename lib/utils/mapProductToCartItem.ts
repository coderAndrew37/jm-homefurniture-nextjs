import { Product } from "@/lib/sanity.schema";
import { CartItem } from "@/lib/store/useCartStore";
import { urlFor } from "../sanity.client";

export function mapProductToCartItem(product: Product): CartItem {
  return {
    _id: product._id,
    name: product.name,
    price: product.price ?? 0,
    quantity: 1,
    image: product.mainImage
      ? urlFor(product.mainImage).url()
      : "/placeholder.png",
    slug: product.slug?.current ?? "",
    originalPrice: product.originalPrice ?? undefined,
  };
}
