// app/page.tsx
import BestSellers from "./components/BestSellers";
import BlogSection from "./components/BlogSection";
import FeaturedCategories from "./components/FeaturedCategories";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import PromotionalBanner from "./components/PromotionalBanner";
import Testimonials from "./components/Testimonials";
import { getCategories } from "@/lib/sanity.fetch";

export default async function Home() {
  const categories = await getCategories(); // ✅ Server-side Sanity fetch
  const featured = categories.slice(0, 4); // or filter by featured flag

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCategories categories={featured} /> {/* ✅ pass as prop */}
      <BestSellers />
      <PromotionalBanner />
      <Testimonials />
      <BlogSection />
      <Newsletter />
    </main>
  );
}
