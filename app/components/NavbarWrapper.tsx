import { fetchNavbarCategories } from "@/lib/fetch/fetchCategories";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const categories = await fetchNavbarCategories();

  return <Navbar categories={categories} />;
}
