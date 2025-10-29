import { groq } from "next-sanity";

export const allProductsQuery = groq`*[_type == "product" && status == "active"]{
  _id,
  name,
  slug,
  price,
  discountPercentage,
  "imageUrl": mainImage.asset->url,
  shortDescription,
  rating,
  category->{
    name, slug
  }
}`;

export const heroBannerQuery = groq`*[_type == "heroBanner" && active == true][0]{
  headline, subheadline, ctaText, ctaLink, "backgroundImage": backgroundImage.asset->url
}`;
