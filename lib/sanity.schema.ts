import { z } from "zod";

/* ===========================
   Shared Sanity Field Types
   =========================== */
export const SanityImage = z.object({
  _type: z.literal("image"),
  asset: z.object({
    _ref: z.string(),
    _type: z.literal("reference"),
  }),
});

/* ===========================
  /* ===========================
   CATEGORY
   =========================== */
export const CategorySchema = z.object({
  _id: z.string(),
  _type: z.literal("category").optional(),
  name: z.string().nullable().optional(),
  slug: z
    .object({
      current: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
  productCount: z.number().int().nonnegative().nullable().optional(),
});
export type Category = z.infer<typeof CategorySchema>;

/* ===========================
   COLLECTION
   =========================== */
export const CollectionSchema = z.object({
  _id: z.string(),
  _type: z.literal("collection").optional(),
  name: z.string().nullable().optional(),
  slug: z
    .object({
      current: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
  image: SanityImage.nullable().optional(),
});
export type Collection = z.infer<typeof CollectionSchema>;

/* ===========================
   PRODUCT
   =========================== */
//
export const ProductSchema = z.object({
  _id: z.string(),
  _type: z.literal("product").optional(),
  name: z.string(),
  slug: z
    .object({ current: z.string().nullable().optional() })
    .nullable()
    .optional(),

  price: z.number().nullable().optional(),
  originalPrice: z.number().nullable().optional(),
  isBestSeller: z.boolean().nullable().optional(),
  isFeatured: z.boolean().nullable().optional(),
  discountPercentage: z.number().nullable().optional(),

  shortDescription: z.string().nullable().optional(),
  description: z
    .union([z.string(), z.array(z.unknown())])
    .nullable()
    .optional(),

  mainImage: SanityImage.nullable().optional(),
  additionalImages: z.array(SanityImage).nullable().optional(),

  category: CategorySchema.nullable().optional(),
  collections: z.array(CollectionSchema).nullable().optional(),

  availableColors: z.array(z.string()).nullable().optional(),
  materials: z.string().nullable().optional(),
  features: z.array(z.string()).nullable().optional(),

  dimensions: z
    .object({
      width: z.string().nullable().optional(),
      height: z.string().nullable().optional(),
      depth: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),

  weight: z.string().nullable().optional(),

  rating: z
    .object({
      stars: z.number().nullable().optional(),
      count: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),

  stock: z.number().nullable().optional(),
  sku: z.string().nullable().optional(),
  isBrandNew: z.boolean().nullable().optional(),
  assemblyRequired: z.boolean().nullable().optional(),
  warranty: z.string().nullable().optional(),
  status: z.enum(["active", "draft", "archived"]).nullable().optional(),

  seo: z
    .object({
      metaTitle: z.string().nullable().optional(),
      metaDescription: z.string().nullable().optional(),
      keywords: z.array(z.string()).nullable().optional(),
    })
    .nullable()
    .optional(),

  reviews: z
    .array(
      z.object({
        _id: z.string(),
        author: z.string().nullable().optional(),
        rating: z.number().min(1).max(5).nullable().optional(),
        comment: z.string().max(500).nullable().optional(),
        createdAt: z.string().nullable().optional(),
      })
    )
    .nullable()
    .optional(),

  tags: z.array(z.string()).nullable().optional(),
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
const PortableTextBlockSchema = z.object({
  _type: z.string().optional(),
  style: z.string().optional(),
  children: z
    .array(
      z.object({
        _type: z.string().optional(),
        text: z.string().optional(),
        marks: z.array(z.string()).optional(),
      })
    )
    .optional(),
});

export const BlogPostSchema = z.object({
  _id: z.string(),
  _type: z.literal("post").optional(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
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
