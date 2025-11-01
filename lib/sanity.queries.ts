import { groq } from "next-sanity";

export const queries = {
  /* ===== BLOG POSTS ===== */
  blogPosts: groq`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ _id, name, image, bio },
    categories[]->{ _id, name, slug },
    tags, body, featured,
    relatedPosts[]->{ _id, title, slug, excerpt, mainImage, publishedAt, readTime }
  }`,

  blogPostBySlug: groq`*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ _id, name, image, bio },
    categories[]->{ _id, name, slug },
    tags, body, featured,
    relatedPosts[]->{ _id, title, slug }
  }`,

  /* ===== PRODUCTS ===== */
  products: groq`*[_type == "product" && status == "active"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    discountPercentage,
    shortDescription,
    description,
    mainImage,
    additionalImages,
    category->{ _id, "name": title, slug },
    collections[]->{ _id, "name": title, slug },
    availableColors,
    materials,
    features,
    dimensions,
    weight,
    rating,
    stock,
    sku,
    isBrandNew,
    assemblyRequired,
    warranty,
    status,
    seo
  }`,

  productBySlug: groq`*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    images,
    category->{ _id, "name": title, slug },
    description,
    features,
    dimensions,
    materials,
    tags,
    rating,
    reviews,
    inStock,
    featured,
    bestSeller,
    body
  }`,

  productsByCategory: groq`*[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    images,
    category->{ _id, "name": title, slug },
    rating,
    reviews,
    inStock,
    featured,
    bestSeller
  }`,

  /* ✅ NEW: Best Sellers */
  bestSellers: groq`*[_type == "product" && status == "active" && isBestSeller == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    mainImage,
    additionalImages,
    category->{ _id, "name": title, slug },
    rating,
    stock,
    isBestSeller
  }`,

  /* ✅ NEW: Related Products */
  relatedProducts: groq`*[_type == "product" && category._ref == $categoryId && _id != $excludeId][0...4] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    mainImage,
    additionalImages,
    category->{ _id, "name": title, slug },
    rating,
    stock,
    isBestSeller
  }`,

  /* ===== CATEGORIES ===== */
  categories: groq`*[_type == "category"] {
    _id,
    "name": title,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  }`,

  /* ===== COLLECTIONS ===== */
  collections: groq`*[_type == "collection"] | order(_createdAt desc) {
    _id, "name": title, slug, description, image
  }`,

  /* ===== TESTIMONIALS ===== */
  testimonials: groq`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, role, quote, image, rating
  }`,

  /* ===== HERO BANNERS ===== */
  heroBanners: groq`*[_type == "heroBanner" && active == true] | order(_createdAt desc) {
    _id, headline, subheadline, ctaText, ctaLink, backgroundImage, active
  }`,
};
