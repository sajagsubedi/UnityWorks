import React from "react";
import {
  AboutUs,
  Hero,
  Services,
  Testimonials,
  Achievements,
  Activities,
  Foundations,
  Enrollment,
  NewSolutions,
  Affiliations,
  Teams,
} from "@/components";
import teamsBg from "@/assets/teamsbackground.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <Hero />
      <Foundations />
      <AboutUs />
      <Services />
      <Enrollment />
      <NewSolutions />
      <Activities />
      <Affiliations />
      <div className="relative">
        <Image
          alt="banner"
          src={teamsBg}
          className="absolute h-full w-full object-cover md:object-fill left-0 top-0 -z-20"
        />
        <Teams />
        <Testimonials />
      </div>
      <Achievements />
    </main>
  );
}
