"use client";
import React, { useEffect, useState } from "react";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Hero() {
  const [banner, setBanner] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setBanner((p) => {
        return (p + 1) % 3;
      });
    }, 10000);
  }, []);
  return (
    <section className="w-full max-h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className={`flex -translate-x-[${
          banner * 100
        }%] transition-all ease-in-out delay-150`}
      >
        <Image
          className="min-w-full max-h-[calc(100vh-80px)] object-fill"
          alt="banner"
          src={banner1}
        />
        <Image
          className="min-w-full max-h-[calc(100vh-80px)] object-fill"
          alt="banner"
          src={banner3}
        />
        <Image
          className="min-w-full max-h-[calc(100vh-80px)] object-fill"
          alt="banner"
          src={banner2}
        />
      </div>
      <div className="absolute flex justify-between w-full top-[50%] px-2">
        <button
          className="px-1 py-1  rounded-full hover:bg-white"
          onClick={() => {
            setBanner((p) => {
              return (p - 1) % 3;
            });
          }}
        >
          <FaAngleLeft className="text-green-500" />
        </button>
        <button
          className="px-1 py-1  rounded-full hover:bg-white"
          onClick={() => {
            setBanner((p) => {
              return (p + 1) % 3;
            });
          }}
        >
          <FaAngleRight className="text-green-500" />
        </button>
      </div>
    </section>
  );
}
