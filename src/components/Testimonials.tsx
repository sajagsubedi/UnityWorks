"use client";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaQuoteRight } from "react-icons/fa";

interface Testimonial {
  name: string;
  location: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sajag Subedi",
    location: "Fulbari-11, Pokhara",
    image: "https://sajagsubedi.vercel.app/img.jpg",
    content:
      "I had the pleasure of working with Unity Works Cooperative, and it was an incredible experience. Their commitment to fostering collaboration and empowering young individuals like myself is truly inspiring. The team was supportive and guided me through each step, allowing me to contribute meaningfully to the projects. Unity Works Cooperative is not just a place for teamwork but also a platform for growth, learning, and making a real difference. I highly recommend them to anyone looking to be part of a collaborative and innovative community.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">TESTIMONIALS</h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute bg-green-500  rounded-full p-4 md:-top-10 -top-7 left-1/2 transform -translate-x-1/2">
          <FaQuoteRight className="w-7 h-7 text-white md:w-12 md:h-12"/>
        </div>
        <div className="bg-green-100 p-8 rounded-lg shadow-lg flex pt-10">
          <div className="w-full h-full hidden md:block"> 
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-24 h-24 rounded-full border-4 border-green-500"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-green-600">
              {testimonials[currentIndex].name}
            </h3>
            <p className="text-gray-600 mb-3">
              {testimonials[currentIndex].location}
            </p>
            <p className="text-gray-700 mb-4">
              {testimonials[currentIndex].content}
            </p>
          </div>
        </div>
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <FaAngleLeft className="w-6 h-6 text-green-500" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <FaAngleRight className="w-6 h-6 text-green-500" />
        </button>
      </div>
    </div>
  );
}
