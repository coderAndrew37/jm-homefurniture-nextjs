import { Metadata } from "next";
import ProductsClient from "../components/ProductsClient";

export const metadata: Metadata = {
  title: "All Products - Kenyan Furniture Store",
  description:
    "Browse our complete collection of quality furniture for every room in your home",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
