import React from "react";
import {
  AboutUs,
  Hero,
  Services,
  Testimonials,
  Achievments,
  Activities,
  Foundations,
  Enrollment,
  NewSolutions
} from "@/components";

export default function Page() {
  return (
    <main>
      <Hero />
      <Foundations/>
      <AboutUs />
      <Services />
      <Enrollment/>
      <NewSolutions/>
      <Activities />
      <Testimonials />
      <Achievments />
    </main>
  );
}
