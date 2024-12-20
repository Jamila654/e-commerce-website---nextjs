"use client";

import React, { useEffect } from "react";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function BuyPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Purchase Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your cart has been cleared.
      </p>
      <div className="return">
      <a href="/"><button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Return to Home
        </button></a>
      </div>
    </div>
  );
}