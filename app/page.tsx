import BestSellers from "./components/BestSellers";
import BlogSection from "./components/BlogSection";
import FeaturedCategories from "./components/FeaturedCategories";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import PromotionalBanner from "./components/PromotionalBanner";
import Testimonials from "./components/Testimonials";
import { getCategories, getBestSellers, getBlogPosts } from "@/lib/sanity.fetch";

export default async function Home() {
  const [categories, bestSellers, blogPosts] = await Promise.all([
    getCategories(),
    getBestSellers(),
    getBlogPosts(),
  ]);

  const featured = categories.slice(0, 4);
  const bestSellerProducts = bestSellers.slice(0, 8);
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCategories categories={featured} />
      <BestSellers products={bestSellerProducts} />
      <PromotionalBanner />
      <Testimonials />
      <BlogSection posts={featuredBlogs} /> {/* ✅ Pass posts as props */}
      <Newsletter />
    </main>
  );
}
