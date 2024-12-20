"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function page() {
  interface IProduct {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }
  const [products, setproducts] = useState<IProduct[] | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");

  const fetchProducts = async () => {
    seterror("");
    setloading(true);
    setproducts(null);

    try {
      const res = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const json = await res.json();
      console.log(json);
      setproducts(json);
    } catch (error) {
      seterror("Error fetching Products");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProducts();

    return;
  }, []);
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Electronics</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => (
            <CardContainer key={product.id} className="inter-var w-[330px] h-[400px]">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-full h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {product.title}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={product.image}
                   height="1000"
                  width="1000"
                    className=" w-full h-60 object-center  rounded-xl group-hover/card:shadow-xl"
                    alt={product.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-7">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/products/${product.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-normal"
                  >
                    View Details →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
      </div>
    </div>
  )
}
