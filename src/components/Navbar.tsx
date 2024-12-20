"use client";
import React from "react";
import Link from "next/link";
import { CiSearch, CiUser, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cartCounts } = useCart();
  const totalCartCount = Object.values(cartCounts).reduce((a, b) => a + b, 0);


  return (
    <div className=" w-full  border-b-2 border-b-slate-400  flex items-center justify-between p-4 md:h-20 h-auto">
      <div className="title font-bold md:text-4xl sm:text-2xl text-blue-900">
        <h1>SwiftCart</h1>
      </div>
      <div className="menu hidden md:flex">
        <ul className="flex items-center gap-2 font-bold">
          <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
            <Link href={"/"}>Home</Link>
          </li>
          <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
          <Link href={"/men"}>Men's</Link>
          </li>
          <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
          <Link href={"/women"}>Women's</Link>
          </li>
          <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
          <Link href={"/jewelery"}>jewelery</Link>
          </li>
          <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
          <Link href={"/electronics"}>Electronics</Link>
          </li>
        </ul>
      </div>
      <div className="search relative w-[100px] sm:w-[400px]  md:w-[200px] lg:w-[400px]">
        <input
          title="search"
          className=" rounded-full p-2 w-full border-2 border-blue-900"
        />
        <CiSearch className=" size-8 absolute top-2 right-2" />
      </div>
      <div className="icons flex items-center gap-2">
        <CiUser className=" size-8 cursor-pointer" />
        <div className="cart w-[50px] relative">
          <Link href={'/cart'}><CiShoppingCart className="size-8 cursor-pointer" /></Link>
          <div className="oval w-[16px] h-[16px] text-sm flex items-center justify-center bg-red-600 text-white rounded-full absolute top-0 right-4">
          {totalCartCount}
          </div>
        </div>
        <div className="hamburger-small mt-2 mr-2 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <CiMenuBurger className=" size-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  <ul className="flex flex-col items-center gap-2 font-bold">
                    <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
                    <Link href={"/men"}>Men's</Link>
                    </li>
                    <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
                    <Link href={"/women"}>Women's</Link>
                    </li>
                    <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
                    <Link href={"/jewelery"}>jewelery</Link>
                    </li>
                    <li className=" hover:underline-offset-4 hover:underline cursor-pointer decoration-blue-900 text-slate-600">
                    <Link href={"/electronics"}>Electronics</Link>
                    </li>
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
