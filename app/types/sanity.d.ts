import type { Image, PortableTextBlock } from "sanity";

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: { current: string };
  description?: string;
  productCount?: number;
}

export interface Collection {
  _id: string;
  _type: "collection";
  name: string;
  slug: { current: string };
  description?: string;
  image?: Image;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  description?: string;
  shortDescription?: string;
  features?: string[];
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
  };
  materials?: string;
  tags?: string[];
  images?: Image[];
  mainImage?: Image;
  category?: Category;
  inStock?: boolean;
  rating?: {
    stars: number;
    count: number;
  };
  reviews?: number;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: Image;
  bio?: string;
}

export interface BlogPost {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: Image;
  publishedAt?: string;
  readTime?: number;
  author?: Author;
  categories?: Category[];
  tags?: string[];
  body?: PortableTextBlock[]; // ✅ Safe type for rich text
  featured?: boolean;
  relatedPosts?: BlogPost[];
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  role?: string;
  quote: string;
  image?: Image;
  rating?: number;
}

export interface HeroBanner {
  _id: string;
  _type: "heroBanner";
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: Image;
  active?: boolean;
}
