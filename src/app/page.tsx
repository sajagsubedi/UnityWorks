import React from "react";
import {
  AboutUs,
  Hero,
  Services,
  Testimonials,
  Achievments,
  Activities,
  Foundations
} from "@/components";

export default function Page() {
  return (
    <main>
      <Hero />
      <Foundations/>
      <AboutUs />
      <Services />
      <Activities />
      <Testimonials />
      <Achievments />
    </main>
  );
}
