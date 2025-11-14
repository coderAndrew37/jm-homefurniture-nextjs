import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // ❌ must be false for private datasets
  token: process.env.SANITY_API_TOKEN, // ✅ must be set correctly
  perspective: "published",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: Image | string) => builder.image(source);
