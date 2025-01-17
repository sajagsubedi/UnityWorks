"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import Image from "next/image";

export default function HeroSection() {
  const [changeImage, setChangeImage] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setChangeImage(true)}
      onMouseLeave={() => setChangeImage(false)}
    >
      <div className="relative w-full mx-auto flex overflow-hidden">
        <div className="overflow-hidden relative -z-10 flex" ref={emblaRef}>
          <div className="flex">
            <div className="relative min-w-full">
              <Image
                className="w-screen max-h-[70vh]"
                alt="banner"
                src={banner1}
              />
            </div>
            <div className="relative min-w-full">
              <Image
                className="w-screen max-h-[70vh]"
                alt="banner"
                src={banner2}
              />
            </div>
            <div className="relative min-w-full">
              <Image
                className="w-screen max-h-[70vh]"
                alt="banner"
                src={banner3}
              />
            </div>
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className={`p-2 absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all ${
            changeImage ? "left-5 " : "-left-5"
          }`}
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className={`p-2 absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 ${
            changeImage ? "right-5" : "-right-5"
          }`}
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
