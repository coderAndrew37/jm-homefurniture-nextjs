import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// GROQ queries
export const queries = {
  // Blog posts
  blogPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{
      _id,
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title,
      slug
    },
    tags,
    body,
    featured,
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readTime
    }
  }`,

  blogPostBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{
      _id,
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title,
      slug
    },
    tags,
    body,
    featured,
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readTime
    }
  }`,

  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`,

  postsByCategory: `*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`,

  postsByTag: `*[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`,

  categories: `*[_type == "category"] {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "post" && references(^._id)])
  }`,

  // Products
  products: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    description,
    features,
    dimensions,
    materials,
    tags,
    rating,
    reviews,
    inStock,
    featured,
    bestSeller
  }`,

  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
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

  productsByCategory: `*[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    images,
    category->{
      name,
      slug
    },
    rating,
    reviews,
    inStock,
    featured,
    bestSeller
  }`,

  categories: `*[_type == "category"] {
    _id,
    name,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  }`,
};
