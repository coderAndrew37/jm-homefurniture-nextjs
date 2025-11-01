"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";

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
        if (!exists) set({ wishlist: [...get().wishlist, item] });
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
    { name: "wishlist-storage" }
  )
);
