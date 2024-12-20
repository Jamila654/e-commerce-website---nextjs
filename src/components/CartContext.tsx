"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartCounts: Record<string, number>;
  incrementCart: (productId: string) => void;
  decrementCart: (productId: string) => void;
  getCartCount: (productId: string) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});

  const clearCart = () => {
    setCartCounts({});
  };

  const incrementCart = (productId: string) => {
    setCartCounts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementCart = (productId: string) => {
    setCartCounts((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const getCartCount = (productId: string) => {
    return cartCounts[productId] || 0;
  };

  return (
    <CartContext.Provider
      value={{ cartCounts, incrementCart, decrementCart, getCartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

