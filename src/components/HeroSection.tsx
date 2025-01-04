"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronRight, FaChevronLeft} from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import Image from "next/image";

export default function Testimonials() {
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
    <div className="w-full">
      <div className="relative w-full mx-auto flex">
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
          className="rounded-full p-2 absolute left-5 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        >
          <FaChevronLeft className="w-6 h-6 text-green-500" />
        </button>
        <button
          onClick={scrollNext}
          className="rounded-full p-2 absolute right-5 top-1/2 transform -translate-y-1/2 translate-x-1/2"
        >
          <FaChevronRight className="w-6 h-6 text-green-500" />
        </button>
      </div>
    </div>
  );
}
