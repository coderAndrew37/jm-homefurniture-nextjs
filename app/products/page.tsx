import { Metadata } from "next";
import { fetchAllProducts } from "@/lib/products";
import ProductsClient from "../components/ProductsClient";

export const metadata: Metadata = {
  title: "All Products - Kenyan Furniture Store",
  description:
    "Browse our complete collection of quality furniture for every room in your home",
};

export default async function ProductsPage() {
  // Fetch products on the server
  const products = await fetchAllProducts();

  return <ProductsClient initialProducts={products} />;
}
