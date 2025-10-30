import { z } from "zod";

/* ===========================
   SHARED SANITY FIELD TYPES
   =========================== */
export const SanityImage = z.object({
  _type: z.literal("image").optional(),
  asset: z
    .object({
      _ref: z.string().optional(),
      _type: z.string().optional(),
      url: z.string().url().optional(),
    })
    .optional(),
});

/* ===========================
   CATEGORY
   =========================== */
export const CategorySchema = z.object({
  _id: z.string(),
  _type: z.literal("category").optional(),
  name: z.string(),
  slug: z.object({ current: z.string() }).optional(),
  description: z.string().optional(),
  productCount: z.number().int().nonnegative().optional(),
});
export type Category = z.infer<typeof CategorySchema>;

/* ===========================
   COLLECTION
   =========================== */
export const CollectionSchema = z.object({
  _id: z.string(),
  _type: z.literal("collection").optional(),
  name: z.string(),
  slug: z.object({ current: z.string() }).optional(),
  description: z.string().optional(),
  image: SanityImage.optional(),
});
export type Collection = z.infer<typeof CollectionSchema>;

/* ===========================
   PRODUCT
   =========================== */
export const ProductSchema = z.object({
  _id: z.string(),
  _type: z.literal("product").optional(),
  name: z.string(),
  slug: z.object({ current: z.string() }).optional(),
  price: z.number().optional(),
  originalPrice: z.number().optional(),
  shortDescription: z.string().optional(),
  description: z.union([z.string(), z.array(z.unknown())]).optional(),
  features: z.array(z.string()).optional(),
  dimensions: z
    .object({
      width: z.string().optional(),
      height: z.string().optional(),
      depth: z.string().optional(),
    })
    .optional(),
  materials: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(SanityImage).optional(),
  mainImage: SanityImage.optional(),
  category: CategorySchema.optional(),
  inStock: z.boolean().optional(),
  rating: z
    .object({
      stars: z.number().optional(),
      count: z.number().optional(),
    })
    .optional(),
  reviews: z.number().optional(),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Product = z.infer<typeof ProductSchema>;

/* ===========================
   TESTIMONIAL
   =========================== */
export const TestimonialSchema = z.object({
  _id: z.string(),
  _type: z.literal("testimonial").optional(),
  name: z.string(),
  role: z.string().optional(),
  quote: z.string(),
  image: SanityImage.optional(),
  rating: z.number().min(0).max(5).optional(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

/* ===========================
   HERO BANNER
   =========================== */
export const HeroBannerSchema = z.object({
  _id: z.string(),
  _type: z.literal("heroBanner").optional(),
  headline: z.string(),
  subheadline: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().url().optional(),
  backgroundImage: SanityImage.optional(),
  active: z.boolean().optional(),
});
export type HeroBanner = z.infer<typeof HeroBannerSchema>;

/* ===========================
   BLOG POST
   =========================== */
const PortableTextBlockSchema = z.any();
export const BlogPostSchema = z.object({
  _id: z.string(),
  _type: z.literal("post").optional(),
  title: z.string(),
  slug: z.object({ current: z.string() }).optional(),
  excerpt: z.string().optional(),
  mainImage: SanityImage.optional(),
  publishedAt: z.string().optional(),
  readTime: z.number().optional(),
  author: z
    .object({
      _id: z.string().optional(),
      name: z.string().optional(),
      image: SanityImage.optional(),
      bio: z.string().optional(),
    })
    .optional(),
  categories: z.array(CategorySchema).optional(),
  tags: z.array(z.string()).optional(),
  body: z.array(PortableTextBlockSchema).optional(),
  featured: z.boolean().optional(),
  relatedPosts: z
    .array(
      z.object({
        _id: z.string(),
        title: z.string().optional(),
        slug: z.object({ current: z.string() }).optional(),
      })
    )
    .optional(),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

/* ===========================
   SCHEMA MAP
   =========================== */
export const SchemaMap = {
  products: z.array(ProductSchema),
  productBySlug: ProductSchema,
  categories: z.array(CategorySchema),
  collections: z.array(CollectionSchema),
  testimonials: z.array(TestimonialSchema),
  heroBanners: z.array(HeroBannerSchema),
  blogPosts: z.array(BlogPostSchema),
  blogPostBySlug: BlogPostSchema,
} as const;
