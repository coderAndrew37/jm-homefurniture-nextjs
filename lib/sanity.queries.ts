import { groq } from "next-sanity";

export const queries = {
  /* ===== BLOG POSTS ===== */
  blogPosts: groq`*[_type == "post"] | order(publishedAt desc) {
    _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ _id, _type, name, image, bio },
    blogCategories[]->{ _id, _type, name, slug }, // Changed title to name
    tags, body, featured,
    relatedPosts[]->{ 
      _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime 
    }
  }`,

  blogPostBySlug: groq`*[_type == "post" && slug.current == $slug][0] {
    _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ _id, _type, name, image, bio },
    blogCategories[]->{ _id, _type, name, slug }, // Changed title to name
    tags, body, featured,
    relatedPosts[]->{ 
      _id, _type, title, slug, excerpt, mainImage, publishedAt, readTime 
    }
  }`,

  /* ===== BLOG CATEGORIES ===== */
  blogCategories: groq`*[_type == "category"] | order(name asc) {
    _id, _type, name, slug,
    "postCount": count(*[_type == "post" && references(^._id)])
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

 productsByCategory: groq`
    *[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
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
      isBestSeller,
      isFeatured,
      status,
      seo
    }
  `,

  productBySlug: groq`
    *[_type == "product" && slug.current == $slug][0] {
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
    }
  `,

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
  categories: groq`
  *[_type == "category"] | order(name asc) {
    _id,
    _type,
    name,
    // Normalize slug shape
    "slug": {
      "current": slug.current
    },
    description,
    // Ensure image always returns consistent shape
    "image": select(
      defined(image) => image,
      null
    ),
    // Always return a number, even if 0
    "productCount": count(*[_type == "product" && references(^._id)]) || 0
  }
`,


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

  /* ===== SEARCH + FILTERED PRODUCTS ===== */
  searchAndFilterProducts: groq`
  *[
    _type == "product" &&
    status == "active" &&

    // ✅ Search matching
    (
      !defined($searchQuery) ||
      name match $searchQuery + "*" ||
      shortDescription match $searchQuery + "*" ||
      description match $searchQuery + "*" ||
      category->name match $searchQuery + "*" ||
      materials match $searchQuery + "*" ||
      $searchQuery in tags[] ||
      count(collections[@->name match $searchQuery + "*"]) > 0
    ) &&

    // ✅ Category filter
    (!defined($category) || category->slug.current == $category) &&

    // ✅ Collection filter
    (!defined($collection) || count(collections[@->slug.current == $collection]) > 0)
  ]
  | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    discountPercentage,
    shortDescription,
    mainImage,
    additionalImages,
    category->{ _id, name, slug },
    collections[]->{ _id, name, slug },
    rating,
    stock,
    isBestSeller,
    isFeatured
  }
`,
};
