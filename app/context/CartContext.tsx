"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: {
    items: CartItem[];
    total: number;
    itemCount: number;
  };
  wishlist: Product[];
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "MOVE_TO_CART"; payload: string };

const AppContext = createContext<
  | {
      state: AppState;
      addToCart: (product: Product) => void;
      removeFromCart: (id: string) => void;
      updateQuantity: (id: string, quantity: number) => void;
      clearCart: () => void;
      addToWishlist: (product: Product) => void;
      removeFromWishlist: (id: string) => void;
      moveToCart: (id: string) => void;
      isInWishlist: (id: string) => boolean;
    }
  | undefined
>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.cart.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.cart.items, { ...action.payload, quantity: 1 }];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.cart.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: { items: [], total: 0, itemCount: 0 },
      };

    case "ADD_TO_WISHLIST": {
      if (state.wishlist.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }

    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    }

    case "MOVE_TO_CART": {
      const product = state.wishlist.find((item) => item.id === action.payload);
      if (!product) return state;

      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
        cart: {
          ...state.cart,
          items: [...state.cart.items, { ...product, quantity: 1 }],
          total: state.cart.total + product.price,
          itemCount: state.cart.itemCount + 1,
        },
      };
    }

    default:
      return state;
  }
}

const initialState: AppState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  wishlist: [],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const moveToCart = (id: string) => {
    dispatch({ type: "MOVE_TO_CART", payload: id });
  };

  const isInWishlist = (id: string) => {
    return state.wishlist.some((item) => item.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
