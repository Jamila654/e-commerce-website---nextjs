"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BiSolidCartAdd } from "react-icons/bi";
import { useParams } from "next/navigation";
import { useCart } from "@/components/CartContext";

export default function page() {
  interface IProduct {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { incrementCart, decrementCart, getCartCount } = useCart();

  const Params = useParams();
  const productId = Array.isArray(Params?.id) ? Params.id[0] : Params?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!product)
    return <div className="text-center text-red-500">No product found.</div>;

  const cartCount = productId ? getCartCount(productId) : 0;


  return (
    <div className=" w-full min-h-screen flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-0 items-center justify-around">
      <div className="pro-image w-full md:w-[40%] h-[500px] rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg h-[500px] w-full"
        />
      </div>
      <div className="pro-details w-full md:w-[50%] h-auto  rounded-lg shadow-lg  p-6">
        <Card className="w-full  h-auto rounded-lg">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent className=" flex flex-col gap-2">
            <div className="description w-full flex flex-col gap-3">
              <p className="text-gray-600 md:w-[270px] lg:w-full">
                {product.description}
              </p>
              <p className="text-xl font-semibold text-green-600">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
            <div className="buttons w-full flex items-center justify-between mt-4">
            {cartCount > 0 ? (
                <div className="plus-minus flex items-center">
                  <button
                    onClick={() => incrementCart(productId!)}
                    className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                  >
                    +
                  </button>
                  
                  <button
                    className="px-4 py-2 rounded-md border bg-neutral-100 text-lg text-neutral-100"
                  >
                    h
                  </button>
                  <button
                    onClick={() => decrementCart(productId!)}
                    className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  title="Add to Cart"
                  className="px-4 py-2 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                  onClick={() => incrementCart(productId!)}
                >
                  <BiSolidCartAdd className="mr-2 text-lg" />
                  Add to Cart
                </button>
              )}
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
