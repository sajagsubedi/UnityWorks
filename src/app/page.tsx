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
  NewSolutions,
  Affiliations
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
      <Affiliations />
      <Testimonials />
      <Achievments />
    </main>
  );
}
