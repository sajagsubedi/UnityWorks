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
    location: "Fulbari, Pokhara",
    image:
      "data:image/jpeg;base64,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",
    content:
      "I had the pleasure of working with Unity Works Cooperative, and it was an incredible experience. Their commitment to fostering collaboration and empowering young individuals like myself is truly inspiring. The team was supportive and guided me through each step, allowing me to contribute meaningfully to the projects. Unity Works Cooperative is not just a place for teamwork but also a platform for growth, learning, and making a real difference. I highly recommend them to anyone looking to be part of a collaborative and innovative community.",
  },
  {
    name: "John Doe",
    location: "Nadipur, Pokhara",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Working with Unity Works Cooperative has been an eye-opening experience. Their unwavering commitment to nurturing talent and fostering an inclusive, collaborative environment makes it a truly unique space. The guidance and mentorship I received helped me develop new skills and increased my confidence in my work. Unity Works Cooperative is more than just a cooperative—it's a vibrant community that empowers individuals to make a positive impact. I wholeheartedly recommend joining them to anyone seeking growth, support, and meaningful work.",
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
    <div className="py-12 md:px-[15vw] px-[10vw] bg-gray-100 max-w-[100vw] overflow-hidden">
      <div className=" w-full flex flex-col items-center z-2 relative mb-8">
        <div className="h-1 w-20 bg-green-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
          TESTIMONIALS
        </h2>
      </div>
      <div className="relative w-full mx-auto md:h-96 max-h-[670px]">
        <div className="absolute bg-green-500  rounded-full p-4 md:-top-10 -top-7 left-1/2 transform -translate-x-1/2">
          <FaQuoteRight className="w-7 h-7 text-white md:w-12 md:h-12" />
        </div>
        <div className="bg-green-100 pb-8 px-6 rounded-lg shadow-lg flex pt-10">
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
