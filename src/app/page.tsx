import React from "react";
import {
  AboutUs,
  Hero,
  Services,
  Testimonials,
  Achievments,
  Activities,
  Foundations,
  Enrollment
} from "@/components";

export default function Page() {
  return (
    <main>
      <Hero />
      <Foundations/>
      <AboutUs />
      <Services />
      <Enrollment/>
      <Activities />
      <Testimonials />
      <Achievments />
    </main>
  );
}
