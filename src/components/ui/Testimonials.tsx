"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronRight, FaChevronLeft, FaQuoteRight } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/constants/Testimonials";
import Image from "next/image";

export default function Testimonials() {
  const [changeImage, setChangeImage] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000 }),
  ]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-transparent py-10 max-w-full md:px-[15vw] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className=" w-full flex flex-col items-center z-2 relative mb-10">
          <div className="h-1 w-20 bg-green-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
            TESTIMONIALS
          </h2>
        </div>

        <div
          className="relative w-[90%] md:w-full mx-auto "
          onMouseEnter={() => setChangeImage(true)}
          onMouseLeave={() => setChangeImage(false)}
        >
          <div className="absolute bg-green-500 rounded-full p-4 md:-top-10 -top-7 left-1/2 transform -translate-x-1/2">
            <FaQuoteRight className="w-7 h-7 text-white md:w-12 md:h-12" />
          </div>
          <div className="overflow-hidden relative -z-10" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, ind) => (
                <div
                  className="bg-gradient-to-b from-green-100 to-lime-100 pb-8 px-6 rounded-lg shadow-lg flex pt-10 flex-[0_0_100%] min-w-0 gap-3"
                  key={ind}
                >
                  <div className=" min-h-24 min-w-24 hidden md:block">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={90}
                      height={90}
                      className="w-24 h-24 rounded-full border-4 border-green-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-green-600">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{testimonial.location}</p>
                    <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden absolute w-full min-h-6 top-1/2">
            <button
              onClick={scrollPrev}
              className={`p-2 absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all ${
                changeImage ? "left-5" : "-left-5 "
              }`}
            >
              <FaChevronLeft className="w-5 h-5 text-green-500" />
            </button>
            <button
              onClick={scrollNext}
              className={`p-2 absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 transition-all ${
                changeImage ? "right-5" : "-right-5"
              }`}
            >
              <FaChevronRight className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
