import React from "react";
import {
  AboutUs,
  Hero,
  Services,
  Testimonials,
  Achievments,
  Activities,
} from "@/components";

export default function Page() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Services />
      <Activities />
      <Testimonials />
      <Achievments />
    </main>
  );
}
