"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const { cartCounts, incrementCart, decrementCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      const items: CartItem[] = [];
      for (const productId of Object.keys(cartCounts)) {
        if (cartCounts[productId] > 0) {
          const res = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          const data = await res.json();
          items.push({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.image,
            quantity: cartCounts[productId],
          });
        }
      }
      setCartItems(items);
    };

    fetchCartItems();
  }, [cartCounts]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-10 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold mb-4 text-blue-900">Shopping Cart</h1>
      <div className="cart-items flex flex-col gap-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="w-full flex flex-col sm:flex-row  items-center justify-between p-4">
            <CardHeader className=" sm:w-[20%]">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="rounded-lg"
              />
            </CardHeader>
            <CardContent className="sm:w-[40%] w-full">
              <CardTitle className="text-lg font-semibold w-full">{item.title}</CardTitle>
              <p className="text-green-600 font-medium">${item.price}</p>
            </CardContent>
            <CardFooter className="w-[30%] flex items-center justify-end gap-4">
              <button
                onClick={() => decrementCart(item.id)}
                className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => incrementCart(item.id)}
                className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              >
                +
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="cart-summary mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ${calculateTotal()}</h2>
        <Link href={'/buy'}>
        <button
          title="Buy Now"
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Buy Now
        </button>
        </Link>
        
      </div>
    </div>
  );
}
