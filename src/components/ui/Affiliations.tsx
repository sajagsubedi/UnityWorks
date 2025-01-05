import React from "react";
import bgImage from "@/assets/bgaffiliationssection.jpg";
import Image from "next/image";
import { AffiliationsImages } from "@/constants/Affiliations";

export default function Affiliations() {
  return (
    <section className="md:px-[15vw] px-[10vw] relative w-full min-h-48 py-10 md:py-14">
      <Image
        alt="banner"
        src={bgImage}
        className="absolute h-full w-full object-cover md:object-fill left-0 top-0 -z-1 "
      />
      <div className=" w-full flex flex-col items-center z-2 relative mb-8">
        <div className="h-1 w-20 bg-green-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
          AFFILIATIONS
        </h2>
      </div>
      <div className="flex gap-5 justify-around flex-col md:flex-row">
        {AffiliationsImages.map((image, index) => {
          return (
            <div className="min-w-20 min-h-20 relative" key={index}>
              <Image src={image} alt="logo" className="w-full h-full"/>
            </div>
          );
        })}
      </div>
    </section>
  );
}
