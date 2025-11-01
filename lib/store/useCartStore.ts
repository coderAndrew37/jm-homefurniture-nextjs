"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
  originalPrice?: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const existing = get().items.find((i) => i._id === item._id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i._id !== id) }),
      clearCart: () => set({ items: [] }),
      get totalItems() {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },
    }),
    { name: "cart-storage" }
  )
);
