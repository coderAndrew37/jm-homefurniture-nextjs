import { Metadata } from "next";
import { fetchAllProducts } from "@/lib/products";
import ProductsClient from "../components/ProductsClient";

export const metadata: Metadata = {
  title: "All Products - Kenyan Furniture Store",
  description:
    "Browse our complete collection of quality furniture for every room in your home",
};

interface ProductsPageProps {
  searchParams?: {
    search?: string;
    category?: string;
    collection?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await fetchAllProducts({
    search: searchParams?.search,
    category: searchParams?.category,
    collection: searchParams?.collection,
  });

  return <ProductsClient initialProducts={products} />;
}
