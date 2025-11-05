import { urlFor, client } from "../sanity.client";
import { Product } from "../sanity.schema";

const query = `
  *[
    _type == "product" &&
    (!defined($searchQuery) ||
      name match $searchQuery + "*" ||
      description match $searchQuery + "*" ||
      $searchQuery in tags) &&
    (!defined($category) || category->slug.current == $category) &&
    (!defined($collection) || $collection in collections[]->slug.current)
  ] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    description,
    price,
    discountPercentage,
    mainImage,
    "category": category->{name, slug},
    tags,
    rating,
    isFeatured,
    isNew,
    collections[]->{name, slug}
  }
`;

export async function fetchAllProducts(params?: {
  search?: string;
  category?: string;
  collection?: string;
}): Promise<Product[]> {
  const { search, category, collection } = params || {};

  const products = await client.fetch(query, {
    searchQuery: search?.trim() || null,
    category: category?.trim() || null,
    collection: collection?.trim() || null,
  });

  return products.map((p: Product) => ({
    ...p,
    effectivePrice: p.discountPercentage
      ? Math.round((p.price ?? 0) * (1 - p.discountPercentage / 100))
      : p.price,
    isOnSale: !!p.discountPercentage && p.discountPercentage > 0,
    imageUrl: p.mainImage ? urlFor(p.mainImage).url() : undefined,
    categoryName: p.category?.name ?? "Uncategorized",
  }));
}
