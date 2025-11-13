"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";
import { urlFor } from "@/lib/sanity.client";

interface WishlistState {
  wishlist: CartItem[];
  addToWishlist: (item: CartItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  moveToCart: (id: string, addToCart: (item: CartItem) => void) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (item) => {
        const exists = get().wishlist.some((i) => i._id === item._id);
        if (exists) return;

        // ✅ Normalize image to a string URL before persisting
        let normalizedImage: string | undefined;

        if (typeof item.image === "string") {
          normalizedImage = item.image;
        } else if (item.image && (item.image as any).asset?._ref) {
          normalizedImage = urlFor(item.image).width(800).height(600).url();
        } else {
          normalizedImage = "/placeholder.png";
        }

        const normalizedItem: CartItem = {
          ...item,
          image: normalizedImage,
        };

        set({ wishlist: [...get().wishlist, normalizedItem] });
      },

      removeFromWishlist: (id) =>
        set({ wishlist: get().wishlist.filter((i) => i._id !== id) }),

      clearWishlist: () => set({ wishlist: [] }),

      moveToCart: (id, addToCart) => {
        const item = get().wishlist.find((i) => i._id === id);
        if (item) {
          addToCart({ ...item, quantity: 1 });
          set({ wishlist: get().wishlist.filter((i) => i._id !== id) });
        }
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ wishlist: state.wishlist }),
    }
  )
);
