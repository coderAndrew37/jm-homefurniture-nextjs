import { getCategories } from "../sanity.fetch";

// lib/products/fetchCategories.ts
export async function fetchNavbarCategories() {
  const categories = await getCategories(); // returns Category[]

  return categories
    .filter((c) => !!c.slug?.current && !!c.name)
    .map((c) => ({
      name: c.name!,
      href: `/products/${c.slug!.current!}`, // ← no "/categories" prefix
    }));
}
