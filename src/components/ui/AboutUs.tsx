import Link from "next/link";
import React from "react";

export default function AboutUs() {
  return (
    <section className="w-full md:px-[15vw] px-[10vw] py-10 md:mt-10 mt-5">
      <div className=" w-full lg:mb-0 flex flex-col items-center">
        <div className="h-1 w-20 bg-green-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
          ABOUT US
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold md:text-3xl text-2xl text-green-500 mb-4">
          UnityWorks: Fostering Sustainable Community Growth
        </h1>
        <p className="text-justify">
          UnityWorks is a cooperative based in Pokhara, Nepal, dedicated to
          fostering sustainable community growth through collaborative
          initiatives. Founded on the principles of inclusivity and
          self-reliance, UnityWorks empowers local members by offering financial
          support, skill development programs, and opportunities for cooperative
          ventures. It serves as a vital link between community members and
          sustainable development practices. UnityWorks plays a pivotal role in
          enhancing economic opportunities for its members, contributing to the
          overall development...
        </p>
        <Link
          href="/about-us/brief-introduction"
          className="inline-flex text-white mt-4  bg-green-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-600 rounded font-medium text-lg text-center"
        >
          Discover More
        </Link>
      </div>
    </section>
  );
}
