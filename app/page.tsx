import BestSellers from "./components/BestSellers";
import BlogSection from "./components/BlogSection";
import FeaturedCategories from "./components/FeaturedCategories";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import PromotionalBanner from "./components/PromotionalBanner";
import Testimonials from "./components/Testimonials";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <PromotionalBanner />
      <Testimonials />
      <BlogSection />
      <Newsletter />
    </main>
  )
}