"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState, useEffect } from "react";

export default function Home() {
  const images = ["/one.webp", "/two.avif", "/three.jpg", "/four.jpg"];

  interface IProduct {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }
  const [products, setproducts] = useState<IProduct[] | null>(null);

  const fetchProducts = async () => {
    setproducts(null);

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      console.log(json);
      setproducts(json);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();

    return;
  }, []);

  return (
    <div className=" min-h-screen flex flex-col justify-between p-8  font-[family-name:var(--font-geist-sans)]">
      <section className="slider w-full">
        <ImagesSlider className="h-[34rem]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p className="font-bold text-xl md:text-4xl text-center bg-clip-text text-slate-400  bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              Your One-Stop Destination for Everything You Need
            </motion.p>
            <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
              <Link href={"/products"}>
                <span>Shop now →</span>
              </Link>

              <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
            </button>
          </motion.div>
        </ImagesSlider>
      </section>
      <section className="top-p w-full flex flex-col mt-20">
        <div className="title font-bold sm:text-2xl md:text-4xl text-blue-900">
          <h1>Top Products</h1>
        </div>
        <div className="pro grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
          {products?.slice(3,6).map((product)=>(
            <CardContainer key={product.id} className="inter-var w-[330px] h-[400px]">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
                  className="h-60 w-full rounded-xl group-hover/card:shadow-xl"
                  alt={product.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-7">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={`/products/${product.id}`}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal "
                >
                  View Details →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          ))}
        </div>
      </section>
      <section className="featured mt-10">
        <div className="title font-bold sm:text-2xl md:text-4xl text-blue-900 ">
          <h1>Featured Products</h1>
        </div>
        <div className="pro grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
          {products?.slice(0,3).map((product)=>(
            <CardContainer key={product.id} className="inter-var w-[330px] h-[400px]">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
                  className="h-60 w-full rounded-xl group-hover/card:shadow-xl"
                  alt={product.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-7">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={`/products/${product.id}`}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal "
                >
                  View Details →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          ))}
        </div>
      </section>
    </div>
  );
}
